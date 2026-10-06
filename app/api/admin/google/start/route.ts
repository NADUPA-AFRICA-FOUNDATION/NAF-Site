import { type NextRequest, NextResponse } from "next/server"
import { createSignedToken, isAdminAuthConfigured, isGoogleSignInConfigured } from "@/lib/admin-session"
import { redirectToLoginError, siteOrigin } from "@/lib/admin-2fa"
import { createGoogleAuthRequest, GOOGLE_STATE_COOKIE } from "@/lib/google-oauth"

export async function GET(request: NextRequest) {
  const origin = siteOrigin(request.nextUrl.origin)
  if (!isAdminAuthConfigured() || !isGoogleSignInConfigured()) {
    return redirectToLoginError(origin, "Google sign-in is not configured on this server.")
  }

  const { url, state, nonce, verifier } = createGoogleAuthRequest(origin)
  const response = NextResponse.redirect(url)
  // Lax so it survives the redirect back from Google
  response.cookies.set(GOOGLE_STATE_COOKIE, createSignedToken("google-oauth", { state, nonce, verifier }, 600), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api/admin/google",
    maxAge: 600,
  })
  return response
}
