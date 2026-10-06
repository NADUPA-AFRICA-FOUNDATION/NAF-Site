// Server-side admin session management.
// Configuration lives in environment variables:
//   ADMIN_EMAILS         - comma-separated addresses allowed to sign in
//   ADMIN_SESSION_SECRET - random secret used to sign tokens and encrypt 2FA secrets (32+ chars)
//   GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET - optional, enables "Sign in with Google"
// Signing in takes two steps:
//   1. Prove the email address: Google sign-in (app/api/admin/google) or an
//      emailed sign-in link (app/api/admin/email-link). This sets a short-lived
//      pending cookie.
//   2. Enter an authenticator or backup code (app/api/admin/2fa), which issues
//      the full session cookie.
// This module uses Node's crypto and must only be imported from server code
// (API routes, server actions, proxy) - never from client components.
import crypto from "crypto"

export const ADMIN_SESSION_COOKIE = "nadupa_admin_session"
export const ADMIN_SESSION_DURATION_SECONDS = 12 * 60 * 60 // 12 hours

// Issued after step 1; only lets the browser finish 2FA.
export const ADMIN_PENDING_COOKIE = "nadupa_admin_pending"
export const ADMIN_PENDING_DURATION_SECONDS = 10 * 60

// "pending": email address proven, 2FA still required. "full": both done.
export type AdminSessionStage = "pending" | "full"

export interface AdminSession {
  email: string
  stage: AdminSessionStage
  exp: number // unix seconds
}

export function getAllowedAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? process.env.ADMIN_EMAIL ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)
}

export function isAllowedAdminEmail(email: string): boolean {
  return getAllowedAdminEmails().includes(email.trim().toLowerCase())
}

export function isAdminAuthConfigured(): boolean {
  return Boolean(getAllowedAdminEmails().length > 0 && process.env.ADMIN_SESSION_SECRET)
}

export function isGoogleSignInConfigured(): boolean {
  return Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)
}

// Constant-time string comparison (hashes both sides first so lengths match)
function safeEqual(a: string, b: string): boolean {
  const hashA = crypto.createHash("sha256").update(a).digest()
  const hashB = crypto.createHash("sha256").update(b).digest()
  return crypto.timingSafeEqual(hashA, hashB)
}

function sign(payload: string): string {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set")
  return crypto.createHmac("sha256", secret).update(payload).digest("base64url")
}

// Signs any JSON payload; `purpose` keeps tokens of one kind from being used as another.
export function createSignedToken(purpose: string, data: Record<string, unknown>, ttlSeconds: number): string {
  const payload = Buffer.from(
    JSON.stringify({ ...data, purpose, exp: Math.floor(Date.now() / 1000) + ttlSeconds }),
  ).toString("base64url")
  return `${payload}.${sign(payload)}`
}

export function verifySignedToken<T>(purpose: string, token: string | undefined | null): T | null {
  if (!token || !process.env.ADMIN_SESSION_SECRET) return null

  const [payload, signature] = token.split(".")
  if (!payload || !signature) return null

  try {
    if (!safeEqual(signature, sign(payload))) return null
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"))
    if (data.purpose !== purpose || typeof data.exp !== "number") return null
    if (data.exp < Math.floor(Date.now() / 1000)) return null
    return data as T
  } catch {
    return null
  }
}

export function createAdminSessionToken(email: string, stage: AdminSessionStage = "full"): string {
  const duration = stage === "full" ? ADMIN_SESSION_DURATION_SECONDS : ADMIN_PENDING_DURATION_SECONDS
  return createSignedToken(`session:${stage}`, { email: email.trim().toLowerCase(), stage }, duration)
}

export function verifyAdminSessionToken(
  token: string | undefined | null,
  stage: AdminSessionStage = "full",
): AdminSession | null {
  const session = verifySignedToken<AdminSession>(`session:${stage}`, token)
  if (!session || typeof session.email !== "string") return null
  // Removing an address from ADMIN_EMAILS ends its sessions immediately
  if (!isAllowedAdminEmail(session.email)) return null
  return session
}
