// "Sign in with Google" (OpenID Connect authorization-code flow with PKCE).
import "server-only"
import crypto from "crypto"

export const GOOGLE_STATE_COOKIE = "nadupa_google_oauth"

export function googleRedirectUri(origin: string): string {
  return `${origin}/api/admin/google/callback`
}

export function createGoogleAuthRequest(origin: string) {
  const state = crypto.randomBytes(16).toString("base64url")
  const nonce = crypto.randomBytes(16).toString("base64url")
  const verifier = crypto.randomBytes(32).toString("base64url")
  const challenge = crypto.createHash("sha256").update(verifier).digest("base64url")

  const url = new URL("https://accounts.google.com/o/oauth2/v2/auth")
  url.search = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: googleRedirectUri(origin),
    response_type: "code",
    scope: "openid email",
    state,
    nonce,
    code_challenge: challenge,
    code_challenge_method: "S256",
    prompt: "select_account",
  }).toString()

  return { url: url.toString(), state, nonce, verifier }
}

// Exchanges the code and returns the verified email address, or throws.
// The ID token comes straight from Google's token endpoint over TLS, so its
// claims can be trusted without a separate signature check (OIDC Core 3.1.3.7).
export async function exchangeGoogleCode(
  origin: string,
  code: string,
  verifier: string,
  expectedNonce: string,
): Promise<string> {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: googleRedirectUri(origin),
      grant_type: "authorization_code",
      code_verifier: verifier,
    }),
  })
  const tokens = await response.json()
  if (!response.ok || typeof tokens.id_token !== "string") {
    throw new Error(`Google token exchange failed: ${tokens.error ?? response.status}`)
  }

  const claims = JSON.parse(Buffer.from(tokens.id_token.split(".")[1], "base64url").toString("utf8"))
  if (!["https://accounts.google.com", "accounts.google.com"].includes(claims.iss)) throw new Error("Bad issuer")
  if (claims.aud !== process.env.GOOGLE_CLIENT_ID) throw new Error("Bad audience")
  if (typeof claims.exp !== "number" || claims.exp * 1000 < Date.now()) throw new Error("Token expired")
  if (claims.nonce !== expectedNonce) throw new Error("Bad nonce")
  if (claims.email_verified !== true || typeof claims.email !== "string") throw new Error("Email not verified")
  return claims.email.toLowerCase()
}
