import { internalMutation, mutation, query } from "./_generated/server"
import { v } from "convex/values"
import { assertServer } from "./serverAuth"

const MAX_FAILED_ATTEMPTS = 5
const LOCKOUT_MS = 15 * 60 * 1000

const totpRecord = v.object({
  encryptedSecret: v.string(),
  enabled: v.boolean(),
  lastUsedStep: v.number(),
  backupCodesRemaining: v.number(),
  lockedUntil: v.number(),
})

export const get = query({
  args: { secret: v.string(), email: v.string() },
  returns: v.union(totpRecord, v.null()),
  handler: async (ctx, { secret, email }) => {
    assertServer(secret)
    const row = await ctx.db
      .query("adminTotp")
      .withIndex("by_email", (q) => q.eq("email", email))
      .unique()
    if (!row) return null
    return {
      encryptedSecret: row.encryptedSecret,
      enabled: row.enabled,
      lastUsedStep: row.lastUsedStep,
      backupCodesRemaining: row.backupCodeHashes.length,
      lockedUntil: row.lockedUntil,
    }
  },
})

// Starts (or restarts) enrollment with a new secret. Refuses once 2FA is
// enabled, so a stolen password alone can never replace the authenticator.
export const beginEnrollment = mutation({
  args: { secret: v.string(), email: v.string(), encryptedSecret: v.string() },
  returns: v.null(),
  handler: async (ctx, { secret, email, encryptedSecret }) => {
    assertServer(secret)
    const row = await ctx.db
      .query("adminTotp")
      .withIndex("by_email", (q) => q.eq("email", email))
      .unique()
    if (row?.enabled) throw new Error("2FA is already enabled for this account")
    const fields = {
      encryptedSecret,
      enabled: false,
      lastUsedStep: 0,
      backupCodeHashes: [],
      failedAttempts: 0,
      lockedUntil: 0,
    }
    if (row) await ctx.db.patch(row._id, fields)
    else await ctx.db.insert("adminTotp", { email, ...fields })
    return null
  },
})

export const completeEnrollment = mutation({
  args: { secret: v.string(), email: v.string(), step: v.number(), backupCodeHashes: v.array(v.string()) },
  returns: v.null(),
  handler: async (ctx, { secret, email, step, backupCodeHashes }) => {
    assertServer(secret)
    const row = await ctx.db
      .query("adminTotp")
      .withIndex("by_email", (q) => q.eq("email", email))
      .unique()
    if (!row || row.enabled) throw new Error("No enrollment in progress")
    await ctx.db.patch(row._id, { enabled: true, lastUsedStep: step, backupCodeHashes, failedAttempts: 0 })
    return null
  },
})

// Records a successful code. Returns false if the step was already used
// (replay), so the same 30-second code can't sign in twice.
export const recordSuccess = mutation({
  args: { secret: v.string(), email: v.string(), step: v.optional(v.number()), backupCodeHash: v.optional(v.string()) },
  returns: v.boolean(),
  handler: async (ctx, { secret, email, step, backupCodeHash }) => {
    assertServer(secret)
    const row = await ctx.db
      .query("adminTotp")
      .withIndex("by_email", (q) => q.eq("email", email))
      .unique()
    if (!row || !row.enabled || row.lockedUntil > Date.now()) return false

    if (backupCodeHash !== undefined) {
      if (!row.backupCodeHashes.includes(backupCodeHash)) return false
      await ctx.db.patch(row._id, {
        backupCodeHashes: row.backupCodeHashes.filter((h) => h !== backupCodeHash),
        failedAttempts: 0,
      })
      return true
    }

    if (step === undefined || step <= row.lastUsedStep) return false
    await ctx.db.patch(row._id, { lastUsedStep: step, failedAttempts: 0 })
    return true
  },
})

export const recordFailure = mutation({
  args: { secret: v.string(), email: v.string() },
  returns: v.null(),
  handler: async (ctx, { secret, email }) => {
    assertServer(secret)
    const row = await ctx.db
      .query("adminTotp")
      .withIndex("by_email", (q) => q.eq("email", email))
      .unique()
    if (!row) return null
    const failedAttempts = row.failedAttempts + 1
    if (failedAttempts >= MAX_FAILED_ATTEMPTS) {
      await ctx.db.patch(row._id, { failedAttempts: 0, lockedUntil: Date.now() + LOCKOUT_MS })
    } else {
      await ctx.db.patch(row._id, { failedAttempts })
    }
    return null
  },
})

// Recovery when the authenticator and all backup codes are lost. Internal, so
// it can only be run by someone with Convex dashboard / CLI access:
//   npx convex run adminTotp:reset '{"email":"admin@example.org"}' --prod
export const reset = internalMutation({
  args: { email: v.string() },
  returns: v.null(),
  handler: async (ctx, { email }) => {
    const row = await ctx.db
      .query("adminTotp")
      .withIndex("by_email", (q) => q.eq("email", email.trim().toLowerCase()))
      .unique()
    if (row) await ctx.db.delete(row._id)
    return null
  },
})
