// Loads editable page content for public pages (server-only).
import "server-only"
import { api } from "@/convex/_generated/api"
import { getConvex, serverSecret } from "@/lib/convex-server"
import { mergeWithDefaults, PAGES, type PageContent, type PageKey } from "./registry"

// Pages are statically rendered; saving in the admin revalidates them
// immediately, and this is a safety net in case a revalidation is missed.
export const CONTENT_REVALIDATE_SECONDS = 3600

export async function getContent<K extends PageKey>(key: K): Promise<PageContent<K>> {
  const defaults = PAGES[key].defaults as PageContent<K>
  if (!process.env.NEXT_PUBLIC_CONVEX_URL || !process.env.CONVEX_SERVER_SECRET) return defaults
  try {
    const row = await getConvex().query(api.siteContent.get, { secret: serverSecret(), key })
    return row ? mergeWithDefaults(defaults, row.content) : defaults
  } catch (error) {
    // Never take the public site down because content couldn't load
    console.error(`Content load failed for "${key}", using defaults:`, error)
    return defaults
  }
}
