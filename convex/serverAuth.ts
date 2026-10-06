import { ConvexError } from "convex/values"

// Every public function in this deployment is called only by the Next.js
// server, which passes CONVEX_SERVER_SECRET. Browsers never talk to Convex
// directly, so form validation, email sending and admin auth cannot be skipped.
export function assertServer(secret: string) {
  const expected = process.env.CONVEX_SERVER_SECRET
  if (!expected || expected.length < 32) {
    throw new ConvexError("CONVEX_SERVER_SECRET is not configured on the Convex deployment")
  }
  if (secret.length !== expected.length) throw new ConvexError("Unauthorized")
  let diff = 0
  for (let i = 0; i < secret.length; i++) diff |= secret.charCodeAt(i) ^ expected.charCodeAt(i)
  if (diff !== 0) throw new ConvexError("Unauthorized")
}
