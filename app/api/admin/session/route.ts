import { NextResponse } from "next/server"
import { checkAdminAuth } from "@/lib/auth"

export async function GET() {
  const { user, error } = await checkAdminAuth()

  if (error || !user) {
    return NextResponse.json({ error: error || "Not authenticated" }, { status: 401 })
  }

  return NextResponse.json({ user: { email: user.email, role: user.role } })
}
