// Server-side admin session management.
// Credentials and the session-signing secret live in environment variables:
//   ADMIN_EMAIL          - email address allowed to sign in
//   ADMIN_PASSWORD       - password for that account
//   ADMIN_SESSION_SECRET - random secret used to sign session tokens (32+ chars)
// Signing in takes two steps: password (pending cookie), then a TOTP or backup
// code (full session cookie) - see app/api/admin/login and app/api/admin/2fa.
// This module uses Node's crypto and must only be imported from server code
// (API routes, server actions) - never from client components.
import crypto from "crypto"

export const ADMIN_SESSION_COOKIE = "nadupa_admin_session"
export const ADMIN_SESSION_DURATION_SECONDS = 12 * 60 * 60 // 12 hours

// Issued after the password check; only lets the browser finish 2FA.
export const ADMIN_PENDING_COOKIE = "nadupa_admin_pending"
export const ADMIN_PENDING_DURATION_SECONDS = 10 * 60

// "password": password verified, 2FA still required. "full": both verified.
export type AdminSessionStage = "password" | "full"

export interface AdminSession {
  email: string
  stage: AdminSessionStage
  exp: number // unix seconds
}

export function isAdminAuthConfigured(): boolean {
  return Boolean(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD && process.env.ADMIN_SESSION_SECRET)
}

// Constant-time string comparison (hashes both sides first so lengths match)
function safeEqual(a: string, b: string): boolean {
  const hashA = crypto.createHash("sha256").update(a).digest()
  const hashB = crypto.createHash("sha256").update(b).digest()
  return crypto.timingSafeEqual(hashA, hashB)
}

export function verifyAdminCredentials(email: string, password: string): boolean {
  const adminEmail = process.env.ADMIN_EMAIL
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminEmail || !adminPassword) return false

  const emailOk = safeEqual(email.trim().toLowerCase(), adminEmail.trim().toLowerCase())
  const passwordOk = safeEqual(password, adminPassword)
  return emailOk && passwordOk
}

function sign(payload: string): string {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set")
  return crypto.createHmac("sha256", secret).update(payload).digest("base64url")
}

export function createAdminSessionToken(email: string, stage: AdminSessionStage = "full"): string {
  const duration = stage === "full" ? ADMIN_SESSION_DURATION_SECONDS : ADMIN_PENDING_DURATION_SECONDS
  const session: AdminSession = {
    email: email.trim().toLowerCase(),
    stage,
    exp: Math.floor(Date.now() / 1000) + duration,
  }
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url")
  return `${payload}.${sign(payload)}`
}

export function verifyAdminSessionToken(
  token: string | undefined | null,
  stage: AdminSessionStage = "full",
): AdminSession | null {
  if (!token || !process.env.ADMIN_SESSION_SECRET) return null

  const [payload, signature] = token.split(".")
  if (!payload || !signature) return null

  try {
    if (!safeEqual(signature, sign(payload))) return null

    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as AdminSession
    if (typeof session.email !== "string" || typeof session.exp !== "number") return null
    if (session.stage !== stage) return null
    if (session.exp < Math.floor(Date.now() / 1000)) return null

    return session
  } catch {
    return null
  }
}
