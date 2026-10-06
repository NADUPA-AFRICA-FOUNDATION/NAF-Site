import { type NextRequest, NextResponse } from "next/server"
import { api } from "@/convex/_generated/api"
import { getConvex, serverSecret } from "@/lib/convex-server"
import {
  ADMIN_PENDING_COOKIE,
  ADMIN_PENDING_DURATION_SECONDS,
  createAdminSessionToken,
  isAdminAuthConfigured,
  verifyAdminCredentials,
} from "@/lib/admin-session"

// Step 1 of sign-in: checks the password and issues a short-lived pending
// cookie. A full session is only issued by /api/admin/2fa/verify.
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

    const normalizedEmail = email.trim().toLowerCase()
    const totp = await getConvex().query(api.adminTotp.get, { secret: serverSecret(), email: normalizedEmail })

    const response = NextResponse.json({ next: totp?.enabled ? "verify" : "enroll" })
    response.cookies.set(ADMIN_PENDING_COOKIE, createAdminSessionToken(normalizedEmail, "password"), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/api/admin",
      maxAge: ADMIN_PENDING_DURATION_SECONDS,
    })
    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Login failed - please try again" }, { status: 500 })
  }
}
