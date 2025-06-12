import { supabase } from "@/lib/supabase"

// Custom hook that ensures we always use the same Supabase instance
export function useSupabase() {
  // Always return the singleton instance
  return supabase
}

// Additional hook for server-side operations (if needed)
export function useSupabaseAdmin() {
  const { supabaseAdmin } = require("@/lib/supabase")
  return supabaseAdmin
}
