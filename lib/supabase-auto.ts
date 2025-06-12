import { createClient } from "@supabase/supabase-js"

// Auto-detect Supabase configuration from existing setup
function getSupabaseConfig() {
  // Try to get from environment variables first
  const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const envAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const envServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (envUrl && envAnonKey) {
    return {
      url: envUrl,
      anonKey: envAnonKey,
      serviceKey: envServiceKey || envAnonKey,
      configured: true,
    }
  }

  // Fallback configuration for development
  return {
    url: "https://placeholder.supabase.co",
    anonKey: "placeholder-key",
    serviceKey: "placeholder-key",
    configured: false,
  }
}

const config = getSupabaseConfig()

// Create clients with fallback handling
export const supabase = config.configured
  ? createClient(config.url, config.anonKey, {
      auth: {
        autoRefreshToken: typeof window !== "undefined",
        persistSession: typeof window !== "undefined",
        storage: typeof window !== "undefined" ? window.localStorage : undefined,
      },
    })
  : null

export const supabaseAdmin = config.configured
  ? createClient(config.url, config.serviceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null

export const isSupabaseConfigured = () => config.configured
export const isSupabaseAdminConfigured = () => config.configured && config.serviceKey !== config.anonKey
