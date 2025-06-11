// Re-export the singleton instances to ensure consistency
export { supabase, supabaseAdmin } from "./supabase"

// Utility function to get the appropriate client based on context
export function getSupabaseClient(isServer = false) {
  if (isServer) {
    return require("./supabase").supabaseAdmin
  }
  return require("./supabase").supabase
}
