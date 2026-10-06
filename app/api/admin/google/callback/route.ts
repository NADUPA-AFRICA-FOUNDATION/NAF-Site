import { type NextRequest } from "next/server"
import crypto from "crypto"
import { isAllowedAdminEmail, verifySignedToken } from "@/lib/admin-session"
import { redirectToLoginError, redirectToTwoFactor, siteOrigin } from "@/lib/admin-2fa"
import { exchangeGoogleCode, GOOGLE_STATE_COOKIE } from "@/lib/google-oauth"

export async function GET(request: NextRequest) {
  const origin = siteOrigin(request.nextUrl.origin)
  const params = request.nextUrl.searchParams
  const saved = verifySignedToken<{ state: string; nonce: string; verifier: string }>(
    "google-oauth",
    request.cookies.get(GOOGLE_STATE_COOKIE)?.value,
  )
  const state = params.get("state") ?? ""
  const code = params.get("code")

  if (params.get("error")) return redirectToLoginError(origin, "Google sign-in was cancelled.")
  if (
    !saved ||
    !code ||
    state.length !== saved.state.length ||
    !crypto.timingSafeEqual(Buffer.from(state), Buffer.from(saved.state))
  ) {
    return redirectToLoginError(origin, "Google sign-in expired. Please try again.")
  }

  let email: string
  try {
    email = await exchangeGoogleCode(origin, code, saved.verifier, saved.nonce)
  } catch (error) {
    console.error("Google sign-in error:", error)
    return redirectToLoginError(origin, "Google sign-in failed. Please try again.")
  }

  if (!isAllowedAdminEmail(email)) {
    return redirectToLoginError(origin, `${email} is not allowed to access the admin panel.`)
  }

  const response = redirectToTwoFactor(origin, email)
  response.cookies.set(GOOGLE_STATE_COOKIE, "", { path: "/api/admin/google", maxAge: 0 })
  return response
}
