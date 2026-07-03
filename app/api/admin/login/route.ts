import { type NextRequest, NextResponse } from "next/server"
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_DURATION_SECONDS,
  createAdminSessionToken,
  isAdminAuthConfigured,
  verifyAdminCredentials,
} from "@/lib/admin-session"
import { rateLimit, clearRateLimit } from "@/lib/rate-limit"

const LOGIN_ATTEMPT_LIMIT = 5
const LOGIN_WINDOW_MS = 15 * 60 * 1000 // 15 minutes

export async function POST(request: NextRequest) {
  try {
    if (!isAdminAuthConfigured()) {
      return NextResponse.json(
        { error: "Admin login is not configured on this server. Contact the system administrator." },
        { status: 503 },
      )
    }

    // Keyed by client IP: 5 attempts per 15 minutes, cleared on success
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
    const limitKey = `admin-login:${ip}`
    const { allowed, retryAfterSeconds } = rateLimit(limitKey, LOGIN_ATTEMPT_LIMIT, LOGIN_WINDOW_MS)
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many login attempts. Please try again later." },
        { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } },
      )
    }

    const { email, password } = await request.json()

    if (typeof email !== "string" || typeof password !== "string" || !email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    if (!verifyAdminCredentials(email, password)) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    clearRateLimit(limitKey)

    const token = createAdminSessionToken(email)
    const response = NextResponse.json({
      user: { email: email.trim().toLowerCase(), role: "admin" },
    })

    response.cookies.set(ADMIN_SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: ADMIN_SESSION_DURATION_SECONDS,
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Login failed - please try again" }, { status: 500 })
  }
}
