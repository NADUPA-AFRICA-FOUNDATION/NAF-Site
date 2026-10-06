import { mutation, query } from "./_generated/server"
import { v } from "convex/values"
import type { Doc } from "./_generated/dataModel"
import type { QueryCtx } from "./_generated/server"
import { assertServer } from "./serverAuth"

const documentShape = v.object({
  id: v.id("documents"),
  title: v.string(),
  description: v.string(),
  category: v.string(),
  fileUrl: v.string(),
  fileName: v.string(),
  fileSize: v.number(),
  isFeatured: v.boolean(),
  createdAt: v.number(),
})

async function toPublic(ctx: QueryCtx, doc: Doc<"documents">) {
  return {
    id: doc._id,
    title: doc.title,
    description: doc.description,
    category: doc.category,
    fileUrl: (await ctx.storage.getUrl(doc.storageId)) ?? "",
    fileName: doc.fileName,
    fileSize: doc.fileSize,
    isFeatured: doc.isFeatured,
    createdAt: doc._creationTime,
  }
}

// Featured first, then newest first.
export const list = query({
  args: { secret: v.string() },
  returns: v.array(documentShape),
  handler: async (ctx, { secret }) => {
    assertServer(secret)
    const docs = await ctx.db.query("documents").order("desc").take(500)
    docs.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured))
    return await Promise.all(docs.map((doc) => toPublic(ctx, doc)))
  },
})

export const get = query({
  args: { secret: v.string(), id: v.string() },
  returns: v.union(documentShape, v.null()),
  handler: async (ctx, { secret, id }) => {
    assertServer(secret)
    const docId = ctx.db.normalizeId("documents", id)
    const doc = docId ? await ctx.db.get(docId) : null
    return doc ? await toPublic(ctx, doc) : null
  },
})

// Call files.verifyUpload (kind "pdf") before this.
export const create = mutation({
  args: {
    secret: v.string(),
    title: v.string(),
    description: v.string(),
    category: v.string(),
    storageId: v.id("_storage"),
    fileName: v.string(),
    fileSize: v.number(),
    isFeatured: v.boolean(),
  },
  returns: v.id("documents"),
  handler: async (ctx, { secret, ...doc }) => {
    assertServer(secret)
    return await ctx.db.insert("documents", doc)
  },
})

// Deletes the document and its file.
export const remove = mutation({
  args: { secret: v.string(), id: v.id("documents") },
  returns: v.union(v.string(), v.null()),
  handler: async (ctx, { secret, id }) => {
    assertServer(secret)
    const doc = await ctx.db.get(id)
    if (!doc) return null
    await ctx.storage.delete(doc.storageId)
    await ctx.db.delete(id)
    return doc.title
  },
})
