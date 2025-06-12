// Simplified authentication system that works without complex setup
const ADMIN_CREDENTIALS = {
  "admin@nadupa.org": "NadupA2024!Admin",
  "director@nadupa.org": "NadupA2024!Director",
  "manager@nadupa.org": "NadupA2024!Manager",
}

export interface SimpleAdminUser {
  email: string
  role: string
  authenticated: boolean
}

// Simple session storage
const SESSION_KEY = "nadupa-admin-session"
const SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 hours

export function signInSimpleAdmin(
  email: string,
  password: string,
): { user: SimpleAdminUser | null; error: string | null } {
  try {
    // Check credentials
    const validPassword = ADMIN_CREDENTIALS[email as keyof typeof ADMIN_CREDENTIALS]

    if (validPassword && validPassword === password) {
      const user: SimpleAdminUser = {
        email,
        role: email.includes("director") ? "director" : email.includes("manager") ? "manager" : "admin",
        authenticated: true,
      }

      // Store session
      if (typeof window !== "undefined") {
        localStorage.setItem(
          SESSION_KEY,
          JSON.stringify({
            user,
            timestamp: Date.now(),
          }),
        )
      }

      return { user, error: null }
    }

    return { user: null, error: "Invalid email or password" }
  } catch (error) {
    console.error("Auth error:", error)
    return { user: null, error: "Authentication failed" }
  }
}

export function checkSimpleAdminAuth(): { user: SimpleAdminUser | null; error: string | null } {
  try {
    if (typeof window === "undefined") {
      return { user: null, error: "Server-side check not available" }
    }

    const sessionData = localStorage.getItem(SESSION_KEY)
    if (!sessionData) {
      return { user: null, error: "No active session" }
    }

    const session = JSON.parse(sessionData)

    // Check if session is expired
    if (Date.now() - session.timestamp > SESSION_DURATION) {
      localStorage.removeItem(SESSION_KEY)
      return { user: null, error: "Session expired" }
    }

    return { user: session.user, error: null }
  } catch (error) {
    console.error("Auth check error:", error)
    if (typeof window !== "undefined") {
      localStorage.removeItem(SESSION_KEY)
    }
    return { user: null, error: "Invalid session" }
  }
}

export function signOutSimpleAdmin(): { error: string | null } {
  try {
    if (typeof window !== "undefined") {
      localStorage.removeItem(SESSION_KEY)
    }
    return { error: null }
  } catch (error) {
    console.error("Sign out error:", error)
    return { error: "Sign out failed" }
  }
}

// Helper function to check if admin features are properly configured
export function isAdminLoginAvailable(): boolean {
  return true // This simple version always works
}
