import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const UNSAFE_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"])

// Rejects state-changing API requests that come from another site (CSRF).
// Browsers always send Origin on cross-site POST/PUT/PATCH/DELETE requests.
function isCrossSiteRequest(request: NextRequest): boolean {
  if (!UNSAFE_METHODS.has(request.method)) return false
  if (request.headers.get("sec-fetch-site") === "cross-site") return true

  const origin = request.headers.get("origin")
  if (!origin) return false
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host")
  try {
    return new URL(origin).host !== host
  } catch {
    return true
  }
}

export function proxy(request: NextRequest) {
  if (isCrossSiteRequest(request)) {
    return NextResponse.json({ error: "Cross-site request blocked" }, { status: 403 })
  }
  if (request.nextUrl.pathname.startsWith("/api/")) return NextResponse.next()

  const response = NextResponse.next()

  const protocol = request.headers.get("x-forwarded-proto")
  if (protocol === "http" && process.env.NODE_ENV === "production") {
    const httpsUrl = request.url.replace("http://", "https://")
    return NextResponse.redirect(httpsUrl, 301)
  }

  response.headers.set("X-Robots-Tag", "index, follow")
  response.headers.set("X-DNS-Prefetch-Control", "on")

  response.headers.set("X-Frame-Options", "DENY")

  if (process.env.NODE_ENV === "production") {
    response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload")
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
