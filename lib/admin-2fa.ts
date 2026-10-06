// Shared helpers for the admin sign-in routes.
import "server-only"
import crypto from "crypto"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { api } from "@/convex/_generated/api"
import { getConvex, serverSecret } from "@/lib/convex-server"
import {
  ADMIN_PENDING_COOKIE,
  ADMIN_PENDING_DURATION_SECONDS,
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_DURATION_SECONDS,
  ADMIN_TRUSTED_COOKIE,
  ADMIN_TRUSTED_DURATION_SECONDS,
  createAdminSessionToken,
  createSignedToken,
  verifyAdminSessionToken,
  verifySignedToken,
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

async function getTotp(email: string) {
  return getConvex().query(api.adminTotp.get, { secret: serverSecret(), email })
}

export async function getTwoFactorStep(email: string): Promise<"verify" | "enroll"> {
  return (await getTotp(email))?.enabled ? "verify" : "enroll"
}

// Identifies the current authenticator setup. Trusted-device cookies carry it,
// so resetting or re-enrolling 2FA revokes every trusted device.
export function totpFingerprint(encryptedSecret: string): string {
  return crypto.createHash("sha256").update(encryptedSecret).digest("base64url").slice(0, 22)
}

async function isTrustedDevice(email: string): Promise<boolean> {
  const token = (await cookies()).get(ADMIN_TRUSTED_COOKIE)?.value
  const trusted = verifySignedToken<{ email: string; fp: string }>("trusted-device", token)
  if (!trusted || trusted.email !== email) return false
  const totp = await getTotp(email)
  return Boolean(totp?.enabled && totpFingerprint(totp.encryptedSecret) === trusted.fp)
}

export function redirectToLoginError(origin: string, error: string): NextResponse {
  return NextResponse.redirect(`${origin}/admin/login?error=${encodeURIComponent(error)}`)
}

// Step 1 done. A trusted device goes straight in; otherwise the login page
// asks for the authenticator code.
export async function completeFirstStep(origin: string, email: string): Promise<NextResponse> {
  if (await isTrustedDevice(email)) {
    const response = NextResponse.redirect(`${origin}/admin/pages`)
    issueFullSession(response, email)
    return response
  }
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

export async function trustThisDevice(response: NextResponse, email: string) {
  const totp = await getTotp(email)
  if (!totp?.enabled) return
  const token = createSignedToken(
    "trusted-device",
    { email, fp: totpFingerprint(totp.encryptedSecret) },
    ADMIN_TRUSTED_DURATION_SECONDS,
  )
  response.cookies.set(ADMIN_TRUSTED_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api/admin",
    maxAge: ADMIN_TRUSTED_DURATION_SECONDS,
  })
}
