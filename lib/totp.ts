// RFC 6238 TOTP (Google Authenticator, Authy, 1Password, ...) plus helpers for
// encrypting the shared secret at rest and generating one-time backup codes.
// Server-only: uses Node's crypto and ADMIN_SESSION_SECRET.
import "server-only"
import crypto from "crypto"

const PERIOD_SECONDS = 30
const DIGITS = 6
const BASE32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"

function base32Encode(buf: Buffer): string {
  let bits = 0
  let value = 0
  let out = ""
  for (const byte of buf) {
    value = (value << 8) | byte
    bits += 8
    while (bits >= 5) {
      out += BASE32_ALPHABET[(value >>> (bits - 5)) & 31]
      bits -= 5
    }
  }
  if (bits > 0) out += BASE32_ALPHABET[(value << (5 - bits)) & 31]
  return out
}

function base32Decode(input: string): Buffer {
  const clean = input.replace(/=+$/, "").toUpperCase()
  let bits = 0
  let value = 0
  const out: number[] = []
  for (const char of clean) {
    const idx = BASE32_ALPHABET.indexOf(char)
    if (idx === -1) throw new Error("Invalid base32 secret")
    value = (value << 5) | idx
    bits += 5
    if (bits >= 8) {
      out.push((value >>> (bits - 8)) & 255)
      bits -= 8
    }
  }
  return Buffer.from(out)
}

function hotp(secret: Buffer, counter: number): string {
  const buf = Buffer.alloc(8)
  buf.writeBigUInt64BE(BigInt(counter))
  const hmac = crypto.createHmac("sha1", secret).update(buf).digest()
  const offset = hmac[hmac.length - 1] & 0xf
  const code = (hmac.readUInt32BE(offset) & 0x7fffffff) % 10 ** DIGITS
  return code.toString().padStart(DIGITS, "0")
}

export function generateTotpSecret(): string {
  return base32Encode(crypto.randomBytes(20))
}

export function totpUri(secret: string, accountEmail: string): string {
  const issuer = "NADUPA Admin"
  const label = encodeURIComponent(`${issuer}:${accountEmail}`)
  return `otpauth://totp/${label}?secret=${secret}&issuer=${encodeURIComponent(issuer)}&algorithm=SHA1&digits=${DIGITS}&period=${PERIOD_SECONDS}`
}

// Returns the matching time step (to block replays), or null. Accepts one
// step either side to tolerate phone clock drift.
export function verifyTotp(secret: string, code: string, now = Date.now()): number | null {
  if (!/^\d{6}$/.test(code)) return null
  const key = base32Decode(secret)
  const current = Math.floor(now / 1000 / PERIOD_SECONDS)
  for (const step of [current - 1, current, current + 1]) {
    const expected = hotp(key, step)
    if (crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(code))) return step
  }
  return null
}

function encryptionKey(): Buffer {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set")
  return crypto.createHash("sha256").update(`totp-encryption:${secret}`).digest()
}

export function encryptSecret(plain: string): string {
  const iv = crypto.randomBytes(12)
  const cipher = crypto.createCipheriv("aes-256-gcm", encryptionKey(), iv)
  const data = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()])
  return [iv, cipher.getAuthTag(), data].map((b) => b.toString("base64url")).join(".")
}

export function decryptSecret(encoded: string): string {
  const [iv, tag, data] = encoded.split(".").map((p) => Buffer.from(p, "base64url"))
  const decipher = crypto.createDecipheriv("aes-256-gcm", encryptionKey(), iv)
  decipher.setAuthTag(tag)
  return Buffer.concat([decipher.update(data), decipher.final()]).toString("utf8")
}

// Backup codes look like "k7m2-9xqp"; only their hashes are stored.
export function generateBackupCodes(count = 10): string[] {
  const alphabet = "abcdefghjkmnpqrstuvwxyz23456789"
  return Array.from({ length: count }, () => {
    const chars = Array.from(crypto.randomBytes(8), (b) => alphabet[b % alphabet.length]).join("")
    return `${chars.slice(0, 4)}-${chars.slice(4)}`
  })
}

export function normalizeBackupCode(code: string): string {
  const clean = code.toLowerCase().replace(/[^a-z0-9]/g, "")
  return `${clean.slice(0, 4)}-${clean.slice(4)}`
}

export function hashBackupCode(code: string): string {
  return crypto
    .createHmac("sha256", encryptionKey())
    .update(normalizeBackupCode(code))
    .digest("hex")
}
