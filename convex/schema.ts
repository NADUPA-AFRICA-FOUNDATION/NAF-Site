import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export const submissionStatus = v.union(v.literal("new"), v.literal("reviewed"), v.literal("archived"))

export default defineSchema({
  contactMessages: defineTable({
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    subject: v.string(),
    message: v.string(),
    status: submissionStatus,
  }).index("by_status", ["status"]),

  donationInterests: defineTable({
    fullName: v.string(),
    email: v.string(),
    amount: v.number(),
    isCustomAmount: v.boolean(),
    paymentMethod: v.string(),
    status: submissionStatus,
  }).index("by_status", ["status"]),

  volunteerSignups: defineTable({
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    motivation: v.string(),
    areasOfInterest: v.array(v.string()),
    availability: v.array(v.string()),
    skills: v.array(v.string()),
    additionalInfo: v.optional(v.string()),
    status: submissionStatus,
  }).index("by_status", ["status"]),

  // Editable public-site content (one row per page, see lib/cms)
  siteContent: defineTable({
    key: v.string(),
    content: v.any(),
    updatedAt: v.number(),
    updatedBy: v.string(),
  }).index("by_key", ["key"]),

  // TOTP two-factor state for admin accounts. The secret is encrypted by the
  // Next.js server before it is stored here; Convex never sees it in plain text.
  adminTotp: defineTable({
    email: v.string(),
    encryptedSecret: v.string(),
    enabled: v.boolean(),
    lastUsedStep: v.number(),
    backupCodeHashes: v.array(v.string()),
    failedAttempts: v.number(),
    lockedUntil: v.number(),
  }).index("by_email", ["email"]),
})
