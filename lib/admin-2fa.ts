// Shared helpers for the admin sign-in routes.
import "server-only"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { api } from "@/convex/_generated/api"
import { getConvex, serverSecret } from "@/lib/convex-server"
import {
  ADMIN_PENDING_COOKIE,
  ADMIN_PENDING_DURATION_SECONDS,
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_DURATION_SECONDS,
  createAdminSessionToken,
  verifyAdminSessionToken,
} from "@/lib/admin-session"

// Public base URL for links and OAuth redirects. ADMIN_BASE_URL pins it so a
// forged Host header can never point a sign-in link at another site.
export function siteOrigin(requestOrigin: string): string {
  return (process.env.ADMIN_BASE_URL ?? requestOrigin).replace(/\/$/, "")
}

// Email of the admin who passed step 1 (Google or email link), or null.
export async function getPendingAdminEmail(): Promise<string | null> {
  const token = (await cookies()).get(ADMIN_PENDING_COOKIE)?.value
  return verifyAdminSessionToken(token, "pending")?.email ?? null
}

export async function getTwoFactorStep(email: string): Promise<"verify" | "enroll"> {
  const totp = await getConvex().query(api.adminTotp.get, { secret: serverSecret(), email })
  return totp?.enabled ? "verify" : "enroll"
}

// Step 1 done: send the browser to the login page to enter its 2FA code.
export function redirectToTwoFactor(origin: string, email: string): NextResponse {
  const response = NextResponse.redirect(`${origin}/admin/login?step=2fa`)
  response.cookies.set(ADMIN_PENDING_COOKIE, createAdminSessionToken(email, "pending"), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api/admin",
    maxAge: ADMIN_PENDING_DURATION_SECONDS,
  })
  return response
}

export function redirectToLoginError(origin: string, error: string): NextResponse {
  return NextResponse.redirect(`${origin}/admin/login?error=${encodeURIComponent(error)}`)
}

export function issueFullSession(response: NextResponse, email: string) {
  response.cookies.set(ADMIN_SESSION_COOKIE, createAdminSessionToken(email, "full"), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: ADMIN_SESSION_DURATION_SECONDS,
  })
  response.cookies.set(ADMIN_PENDING_COOKIE, "", { path: "/api/admin", maxAge: 0 })
}
