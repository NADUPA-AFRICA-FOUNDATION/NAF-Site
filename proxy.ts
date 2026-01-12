import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
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
     * - api (API routes)
     */
    "/((?!_next/static|_next/image|favicon.ico|api).*)",
  ],
}
