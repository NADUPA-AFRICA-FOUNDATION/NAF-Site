import { mutation } from "./_generated/server"
import { v } from "convex/values"
import { assertServer } from "./serverAuth"

// Counts one attempt for `key`; returns false once `limit` attempts have been
// made within the current window of `windowMs`.
export const hit = mutation({
  args: { secret: v.string(), key: v.string(), limit: v.number(), windowMs: v.number() },
  returns: v.boolean(),
  handler: async (ctx, { secret, key, limit, windowMs }) => {
    assertServer(secret)
    const now = Date.now()
    const row = await ctx.db
      .query("rateLimits")
      .withIndex("by_key", (q) => q.eq("key", key))
      .unique()
    if (!row || now - row.windowStart >= windowMs) {
      if (row) await ctx.db.patch(row._id, { count: 1, windowStart: now })
      else await ctx.db.insert("rateLimits", { key, count: 1, windowStart: now })
      return true
    }
    if (row.count >= limit) return false
    await ctx.db.patch(row._id, { count: row.count + 1 })
    return true
  },
})
