import { createClient } from "@supabase/supabase-js"

// Environment variables with better type safety
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string

// Validate environment variables
if (!supabaseUrl) {
  console.warn("Missing NEXT_PUBLIC_SUPABASE_URL environment variable")
}

if (!supabaseAnonKey) {
  console.warn("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable")
}

// Singleton instances
let supabaseInstance: ReturnType<typeof createClient> | null = null
let supabaseAdminInstance: ReturnType<typeof createClient> | null = null

// Client-side client for public operations (singleton)
export const supabase = (() => {
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        storage: typeof window !== "undefined" ? window.localStorage : undefined,
      },
    })
  }
  return supabaseInstance
})()

// Server-side client with service role key for admin operations (singleton)
export const supabaseAdmin = (() => {
  if (!supabaseAdminInstance) {
    supabaseAdminInstance = createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey, {
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
