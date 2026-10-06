import { NextResponse } from "next/server"
import { ADMIN_PENDING_COOKIE, ADMIN_SESSION_COOKIE } from "@/lib/admin-session"

export async function POST() {
  const response = NextResponse.json({ success: true })
  response.cookies.set(ADMIN_SESSION_COOKIE, "", { path: "/", maxAge: 0 })
  response.cookies.set(ADMIN_PENDING_COOKIE, "", { path: "/api/admin", maxAge: 0 })
  return response
}
