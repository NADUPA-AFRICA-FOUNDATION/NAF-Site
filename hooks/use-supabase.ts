import { supabase } from "@/lib/supabase"

// Custom hook to ensure we always use the same Supabase instance
export function useSupabase() {
  return supabase
}
