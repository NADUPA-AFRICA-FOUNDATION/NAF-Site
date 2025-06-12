import { supabase, isSupabaseAdminConfigured } from "@/lib/supabase"

export interface AdminUser {
  id: string
  email: string
  role: string
  created_at: string
}

// Simple admin authentication using Supabase Auth
export async function signInAdmin(email: string, password: string) {
  try {
    // Check if admin features are properly configured
    if (!isSupabaseAdminConfigured()) {
      return {
        user: null,
        error: "Admin features not configured - missing service role key",
      }
    }

    // Sign in with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error("Sign in error:", error)
      return {
        user: null,
        error: error.message,
      }
    }

    if (!data.user) {
      return {
        user: null,
        error: "No user returned from authentication",
      }
    }

    // Check if user is an admin (you can customize this logic)
    const isAdmin = await checkIfUserIsAdmin(data.user.email!)

    if (!isAdmin) {
      // Sign out the user since they're not an admin
      await supabase.auth.signOut()
      return {
        user: null,
        error: "Access denied - admin privileges required",
      }
    }

    // Store admin session
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "nadupa-admin-session",
        JSON.stringify({
          user: data.user,
          timestamp: Date.now(),
        }),
      )
    }

    return {
      user: {
        id: data.user.id,
        email: data.user.email!,
        role: "admin",
        created_at: data.user.created_at,
      } as AdminUser,
      error: null,
    }
  } catch (error) {
    console.error("Sign in exception:", error)
    return {
      user: null,
      error: "Authentication failed - please try again",
    }
  }
}

// Check if user is admin (customize this logic based on your needs)
async function checkIfUserIsAdmin(email: string): Promise<boolean> {
  try {
    // For now, check against a list of admin emails
    const adminEmails = ["admin@nadupa.org", "director@nadupa.org", "manager@nadupa.org"]

    return adminEmails.includes(email.toLowerCase())
  } catch (error) {
    console.error("Admin check error:", error)
    return false
  }
}

// Check current admin authentication
export async function checkAdminAuth() {
  try {
    // Check if admin features are configured
    if (!isSupabaseAdminConfigured()) {
      return {
        user: null,
        error: "Admin features not configured",
      }
    }

    // Check client-side session first
    if (typeof window !== "undefined") {
      const sessionData = localStorage.getItem("nadupa-admin-session")
      if (sessionData) {
        try {
          const session = JSON.parse(sessionData)
          // Check if session is less than 24 hours old
          if (Date.now() - session.timestamp < 24 * 60 * 60 * 1000) {
            // Verify with Supabase
            const { data, error } = await supabase.auth.getUser()
            if (!error && data.user && data.user.email === session.user.email) {
              return {
                user: {
                  id: data.user.id,
                  email: data.user.email!,
                  role: "admin",
                  created_at: data.user.created_at,
                } as AdminUser,
                error: null,
              }
            }
          }
        } catch (e) {
          // Invalid session data
          localStorage.removeItem("nadupa-admin-session")
        }
      }
    }

    // Check Supabase session
    const { data, error } = await supabase.auth.getUser()

    if (error || !data.user) {
      return {
        user: null,
        error: "Not authenticated",
      }
    }

    // Check if user is admin
    const isAdmin = await checkIfUserIsAdmin(data.user.email!)

    if (!isAdmin) {
      return {
        user: null,
        error: "Admin privileges required",
      }
    }

    return {
      user: {
        id: data.user.id,
        email: data.user.email!,
        role: "admin",
        created_at: data.user.created_at,
      } as AdminUser,
      error: null,
    }
  } catch (error) {
    console.error("Auth check error:", error)
    return {
      user: null,
      error: "Authentication check failed",
    }
  }
}

// Sign out admin
export async function signOut() {
  try {
    // Clear local session
    if (typeof window !== "undefined") {
      localStorage.removeItem("nadupa-admin-session")
    }

    // Sign out from Supabase
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error("Sign out error:", error)
      return { error: error.message }
    }

    return { error: null }
  } catch (error) {
    console.error("Sign out exception:", error)
    return { error: "Sign out failed" }
  }
}
