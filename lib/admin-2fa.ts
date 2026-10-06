// Shared helpers for the /api/admin/2fa routes.
import "server-only"
import { cookies } from "next/headers"
import type { NextResponse } from "next/server"
import {
  ADMIN_PENDING_COOKIE,
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_DURATION_SECONDS,
  createAdminSessionToken,
  verifyAdminSessionToken,
} from "@/lib/admin-session"

// Email of the admin who passed the password step, or null.
export async function getPendingAdminEmail(): Promise<string | null> {
  const token = (await cookies()).get(ADMIN_PENDING_COOKIE)?.value
  return verifyAdminSessionToken(token, "password")?.email ?? null
}

export function issueFullSession(response: NextResponse, email: string) {
  response.cookies.set(ADMIN_SESSION_COOKIE, createAdminSessionToken(email, "full"), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: ADMIN_SESSION_DURATION_SECONDS,
  })
  response.cookies.set(ADMIN_PENDING_COOKIE, "", { path: "/api/admin", maxAge: 0 })
}
