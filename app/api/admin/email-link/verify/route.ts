import { type NextRequest } from "next/server"
import { isAllowedAdminEmail, verifySignedToken } from "@/lib/admin-session"
import { redirectToLoginError, redirectToTwoFactor, siteOrigin } from "@/lib/admin-2fa"

// Landing point for the emailed sign-in link. A valid link only completes
// step 1; the admin still has to enter an authenticator code.
export async function GET(request: NextRequest) {
  const origin = siteOrigin(request.nextUrl.origin)
  const data = verifySignedToken<{ email: string }>("email-link", request.nextUrl.searchParams.get("token"))
  if (!data || !isAllowedAdminEmail(data.email)) {
    return redirectToLoginError(origin, "This sign-in link is invalid or has expired. Request a new one.")
  }
  return redirectToTwoFactor(origin, data.email)
}
