import { createClient } from "@supabase/supabase-js"

// Environment variables with better type safety and validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Validate required environment variables
if (!supabaseUrl) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable")
  throw new Error("Supabase URL is required")
}

if (!supabaseAnonKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable")
  throw new Error("Supabase anon key is required")
}

// Global singleton instances to prevent multiple GoTrueClient instances
let supabaseInstance: ReturnType<typeof createClient> | null = null
let supabaseAdminInstance: ReturnType<typeof createClient> | null = null

// Client-side client for public operations (singleton)
export const supabase = (() => {
  if (typeof window === "undefined") {
    // Server-side: create a new instance each time to avoid sharing state
    return createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  }

  // Client-side: use singleton
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        storage: window.localStorage,
        storageKey: "nadupa-auth-token", // Custom storage key to avoid conflicts
      },
    })
  }
  return supabaseInstance
})()

// Server-side client with service role key for admin operations (singleton)
export const supabaseAdmin = (() => {
  // Use service role key if available, otherwise fall back to anon key
  const adminKey = supabaseServiceKey || supabaseAnonKey

  if (!supabaseAdminInstance) {
    supabaseAdminInstance = createClient(supabaseUrl, adminKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  }
  return supabaseAdminInstance
})()

// Check if Supabase is configured
export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey)
}

// Check if admin features are available
export function isSupabaseAdminConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey && supabaseServiceKey)
}

// Test connection function
export async function testSupabaseConnection() {
  try {
    console.log("Testing Supabase connection...")

    // Test basic connection by trying to access the auth endpoint
    const { data, error } = await supabaseAdmin.auth.getSession()

    if (error && error.message.includes("Invalid API key")) {
      console.error("Invalid Supabase API key")
      return {
        success: false,
        error,
        message: "Invalid Supabase API key - check your environment variables",
      }
    }

    // Test if tables exist
    const { data: tableData, error: tableError } = await supabaseAdmin
      .from("contact_messages")
      .select("count", { count: "exact" })
      .limit(0)

    if (tableError) {
      // If table doesn't exist, that's okay - we'll use fallback
      if (tableError.message?.includes("does not exist")) {
        console.log("Database tables not yet created - using fallback mode")
        return {
          success: false,
          error: tableError,
          message: "Database tables not created yet",
          usesFallback: true,
        }
      }

      console.error("Table access test failed:", tableError)
      return {
        success: false,
        error: tableError,
        message: "Cannot access database tables",
      }
    }

    console.log("Supabase connection and tables test successful")
    return {
      success: true,
      data: tableData,
      message: "Database fully operational",
    }
  } catch (err) {
    console.error("Supabase connection test error:", err)

    // Check if it's a network/URL issue
    if (err instanceof Error && err.message.includes("fetch")) {
      return {
        success: false,
        error: err,
        message: "Cannot reach Supabase - check your SUPABASE_URL",
      }
    }

    return {
      success: false,
      error: err,
      message: "Connection test failed with exception",
    }
  }
}
