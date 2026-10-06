import { mutation, query } from "./_generated/server"
import { v } from "convex/values"
import { submissionStatus } from "./schema"
import { assertServer } from "./serverAuth"

export const createContactMessage = mutation({
  args: {
    secret: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    subject: v.string(),
    message: v.string(),
  },
  returns: v.id("contactMessages"),
  handler: async (ctx, { secret, ...data }) => {
    assertServer(secret)
    return await ctx.db.insert("contactMessages", { ...data, status: "new" })
  },
})

export const createDonationInterest = mutation({
  args: {
    secret: v.string(),
    fullName: v.string(),
    email: v.string(),
    amount: v.number(),
    isCustomAmount: v.boolean(),
    paymentMethod: v.string(),
  },
  returns: v.id("donationInterests"),
  handler: async (ctx, { secret, ...data }) => {
    assertServer(secret)
    if (!Number.isFinite(data.amount) || data.amount <= 0 || data.amount > 10_000_000) {
      throw new Error("Invalid donation amount")
    }
    return await ctx.db.insert("donationInterests", { ...data, status: "new" })
  },
})

export const createVolunteerSignup = mutation({
  args: {
    secret: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    motivation: v.string(),
    areasOfInterest: v.array(v.string()),
    availability: v.array(v.string()),
    skills: v.array(v.string()),
    additionalInfo: v.optional(v.string()),
  },
  returns: v.id("volunteerSignups"),
  handler: async (ctx, { secret, ...data }) => {
    assertServer(secret)
    return await ctx.db.insert("volunteerSignups", { ...data, status: "new" })
  },
})

const kind = v.union(v.literal("contact"), v.literal("donation"), v.literal("volunteer"))
const tableFor = {
  contact: "contactMessages",
  donation: "donationInterests",
  volunteer: "volunteerSignups",
} as const

// Admin views. The Next.js server checks the admin session (password + 2FA)
// before calling these.
export const list = query({
  args: { secret: v.string(), kind },
  handler: async (ctx, { secret, kind }) => {
    assertServer(secret)
    return await ctx.db.query(tableFor[kind]).order("desc").take(500)
  },
})

export const setStatus = mutation({
  args: {
    secret: v.string(),
    id: v.union(v.id("contactMessages"), v.id("donationInterests"), v.id("volunteerSignups")),
    status: submissionStatus,
  },
  returns: v.null(),
  handler: async (ctx, { secret, id, status }) => {
    assertServer(secret)
    await ctx.db.patch(id, { status })
    return null
  },
})
