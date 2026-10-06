import { NextResponse } from "next/server"
import { getPendingAdminEmail, getTwoFactorStep } from "@/lib/admin-2fa"

// Tells the login page whether to ask for a code or show 2FA setup.
export async function GET() {
  const email = await getPendingAdminEmail()
  if (!email) {
    return NextResponse.json({ error: "Your sign-in expired. Please sign in again." }, { status: 401 })
  }
  try {
    return NextResponse.json({ email, next: await getTwoFactorStep(email) })
  } catch (error) {
    console.error("2FA status error:", error)
    return NextResponse.json({ error: "Could not check two-factor status" }, { status: 500 })
  }
}
