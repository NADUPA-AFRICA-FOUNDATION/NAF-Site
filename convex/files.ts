import { action, mutation } from "./_generated/server"
import { v } from "convex/values"
import { assertServer } from "./serverAuth"

const LIMITS = { pdf: 25 * 1024 * 1024, image: 5 * 1024 * 1024 }

// One-time URL the admin's browser uploads a file to (the Next.js server
// checks the admin session before asking for one).
export const generateUploadUrl = mutation({
  args: { secret: v.string() },
  returns: v.string(),
  handler: async (ctx, { secret }) => {
    assertServer(secret)
    return await ctx.storage.generateUploadUrl()
  },
})

function detect(bytes: Uint8Array): { kind: "pdf" | "image"; type: string } | null {
  const hex = Array.from(bytes.slice(0, 12), (b) => b.toString(16).padStart(2, "0")).join("")
  if (hex.startsWith("255044462d")) return { kind: "pdf", type: "application/pdf" } // %PDF-
  if (hex.startsWith("ffd8ff")) return { kind: "image", type: "image/jpeg" }
  if (hex.startsWith("89504e470d0a1a0a")) return { kind: "image", type: "image/png" }
  if (hex.startsWith("52494646") && hex.slice(16, 24) === "57454250") return { kind: "image", type: "image/webp" }
  if (hex.slice(8, 24) === "6674797061766966") return { kind: "image", type: "image/avif" }
  return null
}

// Checks an uploaded file really is the expected kind (by its first bytes, not
// the name or browser-supplied type) and within size limits. Invalid files are
// deleted immediately.
export const verifyUpload = action({
  args: { secret: v.string(), storageId: v.id("_storage"), kind: v.union(v.literal("pdf"), v.literal("image")) },
  returns: v.union(v.object({ ok: v.literal(true), url: v.string(), size: v.number() }), v.object({ ok: v.literal(false), error: v.string() })),
  handler: async (ctx, { secret, storageId, kind }) => {
    assertServer(secret)
    const blob = await ctx.storage.get(storageId)
    if (!blob) return { ok: false as const, error: "Upload not found" }

    const detected = detect(new Uint8Array(await blob.slice(0, 16).arrayBuffer()))
    let error: string | null = null
    if (!detected || detected.kind !== kind) {
      error = kind === "pdf" ? "Only PDF files are allowed" : "Upload a JPG, PNG, WebP or AVIF image"
    } else if (blob.size > LIMITS[kind]) {
      error = `File is too large (max ${LIMITS[kind] / 1024 / 1024} MB)`
    }
    if (error) {
      await ctx.storage.delete(storageId)
      return { ok: false as const, error }
    }

    const url = await ctx.storage.getUrl(storageId)
    if (!url) return { ok: false as const, error: "Upload not found" }
    return { ok: true as const, url, size: blob.size }
  },
})
