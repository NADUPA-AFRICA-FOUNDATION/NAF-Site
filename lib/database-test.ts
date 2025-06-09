import { supabaseAdmin } from "./supabase"

export async function testDatabaseConnection() {
  try {
    console.log("Testing database connection...")

    // Test basic connection
    const { data: healthCheck, error: healthError } = await supabaseAdmin
      .from("contact_messages")
      .select("count", { count: "exact" })
      .limit(0)

    if (healthError) {
      console.error("Health check failed:", healthError)
      return {
        success: false,
        error: healthError,
        message: "Database health check failed",
      }
    }

    console.log("Health check passed")

    // Test table structure
    const { data: tableInfo, error: tableError } = await supabaseAdmin.from("contact_messages").select("*").limit(1)

    if (tableError) {
      console.error("Table structure test failed:", tableError)
      return {
        success: false,
        error: tableError,
        message: "Table structure test failed",
      }
    }

    console.log("Table structure test passed")

    return {
      success: true,
      message: "Database connection successful",
      data: {
        healthCheck,
        tableInfo,
      },
    }
  } catch (error) {
    console.error("Database test error:", error)
    return {
      success: false,
      error,
      message: "Database test failed with exception",
    }
  }
}

// Test function for manual debugging
export async function debugDatabaseIssues() {
  console.log("=== Database Debug Information ===")

  // Check environment variables
  console.log("Environment variables:")
  console.log("- NEXT_PUBLIC_SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL ? "✓ Set" : "✗ Missing")
  console.log("- SUPABASE_SERVICE_ROLE_KEY:", process.env.SUPABASE_SERVICE_ROLE_KEY ? "✓ Set" : "✗ Missing")
  console.log("- NEXT_PUBLIC_SUPABASE_ANON_KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✓ Set" : "✗ Missing")

  // Test connection
  const connectionResult = await testDatabaseConnection()
  console.log("Connection test result:", connectionResult)

  return connectionResult
}
