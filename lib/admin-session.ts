// Server-side admin session management.
// Credentials and the session-signing secret live in environment variables:
//   ADMIN_EMAIL          - email address allowed to sign in
//   ADMIN_PASSWORD_HASH  - scrypt hash of the password (preferred; generate
//                          with: node scripts/hash-admin-password.mjs)
//   ADMIN_PASSWORD       - plaintext password (fallback if no hash is set)
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
  return Boolean(
    process.env.ADMIN_EMAIL &&
      (process.env.ADMIN_PASSWORD_HASH || process.env.ADMIN_PASSWORD) &&
      process.env.ADMIN_SESSION_SECRET,
  )
}

// Constant-time string comparison (hashes both sides first so lengths match)
function safeEqual(a: string, b: string): boolean {
  const hashA = crypto.createHash("sha256").update(a).digest()
  const hashB = crypto.createHash("sha256").update(b).digest()
  return crypto.timingSafeEqual(hashA, hashB)
}

// Stored format: scrypt:<salt_hex>:<key_hex> (see scripts/hash-admin-password.mjs)
function verifyScryptHash(password: string, stored: string): boolean {
  const parts = stored.split(":")
  if (parts.length !== 3 || parts[0] !== "scrypt") return false
  try {
    const salt = Buffer.from(parts[1], "hex")
    const expected = Buffer.from(parts[2], "hex")
    if (salt.length < 8 || expected.length !== 64) return false
    const actual = crypto.scryptSync(password, salt, 64)
    return crypto.timingSafeEqual(actual, expected)
  } catch {
    return false
  }
}

export function verifyAdminCredentials(email: string, password: string): boolean {
  const adminEmail = process.env.ADMIN_EMAIL
  if (!adminEmail) return false

  const emailOk = safeEqual(email.trim().toLowerCase(), adminEmail.trim().toLowerCase())

  const passwordHash = process.env.ADMIN_PASSWORD_HASH
  let passwordOk = false
  if (passwordHash) {
    passwordOk = verifyScryptHash(password, passwordHash)
  } else if (process.env.ADMIN_PASSWORD) {
    passwordOk = safeEqual(password, process.env.ADMIN_PASSWORD)
  }

  return emailOk && passwordOk
}

// The signing key is derived from the session secret AND the current
// credential material, so rotating the password (or the hash, or the secret)
// immediately invalidates every outstanding session token.
function signingKey(): Buffer {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set")
  const credentialMaterial = process.env.ADMIN_PASSWORD_HASH || process.env.ADMIN_PASSWORD || ""
  const fingerprint = crypto.createHash("sha256").update(credentialMaterial).digest("hex")
  return crypto.createHmac("sha256", secret).update(`admin-session-key:v1:${fingerprint}`).digest()
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", signingKey()).update(payload).digest("base64url")
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
