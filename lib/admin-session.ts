// Server-side admin session management.
// Credentials and the session-signing secret live in environment variables:
//   ADMIN_EMAIL          - email address allowed to sign in
//   ADMIN_PASSWORD       - password for that account
//   ADMIN_SESSION_SECRET - random secret used to sign session tokens (32+ chars)
// This module uses Node's crypto and must only be imported from server code
// (API routes, server actions) - never from client components.
import crypto from "crypto"

export const ADMIN_SESSION_COOKIE = "nadupa_admin_session"
export const ADMIN_SESSION_DURATION_SECONDS = 24 * 60 * 60 // 24 hours

export interface AdminSession {
  email: string
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

export function createAdminSessionToken(email: string): string {
  const session: AdminSession = {
    email: email.trim().toLowerCase(),
    exp: Math.floor(Date.now() / 1000) + ADMIN_SESSION_DURATION_SECONDS,
  }
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url")
  return `${payload}.${sign(payload)}`
}

export function verifyAdminSessionToken(token: string | undefined | null): AdminSession | null {
  if (!token || !process.env.ADMIN_SESSION_SECRET) return null

  const [payload, signature] = token.split(".")
  if (!payload || !signature) return null

  try {
    if (!safeEqual(signature, sign(payload))) return null

    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as AdminSession
    if (typeof session.email !== "string" || typeof session.exp !== "number") return null
    if (session.exp < Math.floor(Date.now() / 1000)) return null

    return session
  } catch {
    return null
  }
}
