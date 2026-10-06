import { mutation, query } from "./_generated/server"
import { v } from "convex/values"
import { assertServer } from "./serverAuth"

// Editable public-site content, one document per page. The Next.js server
// validates content against the page's field definitions before saving.

export const get = query({
  args: { secret: v.string(), key: v.string() },
  returns: v.union(v.object({ content: v.any(), updatedAt: v.number(), updatedBy: v.string() }), v.null()),
  handler: async (ctx, { secret, key }) => {
    assertServer(secret)
    const row = await ctx.db
      .query("siteContent")
      .withIndex("by_key", (q) => q.eq("key", key))
      .unique()
    return row ? { content: row.content, updatedAt: row.updatedAt, updatedBy: row.updatedBy } : null
  },
})

export const listMeta = query({
  args: { secret: v.string() },
  returns: v.array(v.object({ key: v.string(), updatedAt: v.number(), updatedBy: v.string() })),
  handler: async (ctx, { secret }) => {
    assertServer(secret)
    const rows = await ctx.db.query("siteContent").take(100)
    return rows.map((row) => ({ key: row.key, updatedAt: row.updatedAt, updatedBy: row.updatedBy }))
  },
})

export const save = mutation({
  args: { secret: v.string(), key: v.string(), content: v.any(), updatedBy: v.string() },
  returns: v.null(),
  handler: async (ctx, { secret, key, content, updatedBy }) => {
    assertServer(secret)
    const row = await ctx.db
      .query("siteContent")
      .withIndex("by_key", (q) => q.eq("key", key))
      .unique()
    const fields = { content, updatedAt: Date.now(), updatedBy }
    if (row) await ctx.db.patch(row._id, fields)
    else await ctx.db.insert("siteContent", { key, ...fields })
    return null
  },
})

// Reverts a page to the content that ships with the code.
export const reset = mutation({
  args: { secret: v.string(), key: v.string() },
  returns: v.null(),
  handler: async (ctx, { secret, key }) => {
    assertServer(secret)
    const row = await ctx.db
      .query("siteContent")
      .withIndex("by_key", (q) => q.eq("key", key))
      .unique()
    if (row) await ctx.db.delete(row._id)
    return null
  },
})
