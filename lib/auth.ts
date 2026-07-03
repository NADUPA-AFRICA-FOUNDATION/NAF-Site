// Server-side admin authentication check, used by API routes and server actions.
// Sessions are issued by POST /api/admin/login as a signed httpOnly cookie.
import { cookies } from "next/headers"
import { ADMIN_SESSION_COOKIE, isAdminAuthConfigured, verifyAdminSessionToken } from "@/lib/admin-session"

export interface AdminUser {
  id: string
  email: string
  role: string
  created_at: string
}

export async function checkAdminAuth(): Promise<{ user: AdminUser | null; error: string | null }> {
  try {
    if (!isAdminAuthConfigured()) {
      return {
        user: null,
        error: "Admin features not configured - set ADMIN_EMAIL, ADMIN_PASSWORD and ADMIN_SESSION_SECRET",
      }
    }

    const cookieStore = await cookies()
    const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value
    const session = verifyAdminSessionToken(token)

    if (!session) {
      return { user: null, error: "Not authenticated" }
    }

    return {
      user: {
        id: session.email,
        email: session.email,
        role: "admin",
        created_at: new Date(0).toISOString(),
      },
      error: null,
    }
  } catch (error) {
    console.error("Auth check error:", error)
    return { user: null, error: "Authentication check failed" }
  }
}
