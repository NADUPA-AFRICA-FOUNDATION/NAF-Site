import { type NextRequest, NextResponse } from "next/server"
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_DURATION_SECONDS,
  createAdminSessionToken,
  isAdminAuthConfigured,
  verifyAdminCredentials,
} from "@/lib/admin-session"

export async function POST(request: NextRequest) {
  try {
    if (!isAdminAuthConfigured()) {
      return NextResponse.json(
        { error: "Admin login is not configured on this server. Contact the system administrator." },
        { status: 503 },
      )
    }

    const { email, password } = await request.json()

    if (typeof email !== "string" || typeof password !== "string" || !email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    if (!verifyAdminCredentials(email, password)) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

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
