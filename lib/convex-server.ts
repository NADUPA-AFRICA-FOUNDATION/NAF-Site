// Server-only Convex client. Every Convex function in this project requires
// CONVEX_SERVER_SECRET, so it must never be imported from client components.
import "server-only"
import { ConvexHttpClient } from "convex/browser"

let client: ConvexHttpClient | null = null

export function getConvex(): ConvexHttpClient {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL
  if (!url) throw new Error("NEXT_PUBLIC_CONVEX_URL is not set")
  if (!client) client = new ConvexHttpClient(url)
  return client
}

export function serverSecret(): string {
  const secret = process.env.CONVEX_SERVER_SECRET
  if (!secret) throw new Error("CONVEX_SERVER_SECRET is not set")
  return secret
}
