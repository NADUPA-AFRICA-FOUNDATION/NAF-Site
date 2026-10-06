"use server"

import { ZodError } from "zod"
import { api } from "@/convex/_generated/api"
import { getConvex, serverSecret } from "@/lib/convex-server"
import { EmailService } from "@/lib/email"
import { donationFormSchema } from "@/lib/validation"

export async function submitDonationInterest(formData: FormData) {
  let data
  try {
    data = donationFormSchema.parse({
      fullName: (formData.get("fullName") as string | null)?.trim(),
      email: (formData.get("email") as string | null)?.trim().toLowerCase(),
      donationAmount: (formData.get("donationAmount") as string | null) || undefined,
      customAmount: (formData.get("customAmount") as string | null) || undefined,
      paymentMethod: (formData.get("paymentMethod") as string | null) ?? "",
    })
  } catch (error) {
    return {
      success: false,
      message: error instanceof ZodError ? error.issues[0].message : "Please check your information and try again.",
    }
  }

  const isCustomAmount = data.donationAmount === "custom"
  const amount = Number.parseFloat((isCustomAmount ? data.customAmount : data.donationAmount) ?? "")
  if (!Number.isFinite(amount) || amount <= 0 || amount > 10_000_000) {
    return { success: false, message: "Please enter a valid donation amount." }
  }

  try {
    await getConvex().mutation(api.submissions.createDonationInterest, {
      secret: serverSecret(),
      fullName: data.fullName,
      email: data.email,
      amount,
      isCustomAmount,
      paymentMethod: data.paymentMethod,
    })
  } catch (error) {
    console.error("Donation form save error:", error)
    return {
      success: false,
      message: "There was an error processing your donation interest. Please try again.",
    }
  }

  // The submission is saved; email problems shouldn't fail it.
  const emails = await EmailService.sendDonationInterestNotification({
    fullName: data.fullName,
    email: data.email,
    donationAmount: isCustomAmount ? undefined : amount,
    customAmount: isCustomAmount ? amount : undefined,
    paymentMethod: data.paymentMethod,
    submittedAt: new Date().toISOString(),
  })
  if (!emails.userConfirmation.success || !emails.adminNotification.success) {
    console.error("Donation form email failed:", emails)
  }

  return {
    success: true,
    message: "Thank you for your donation interest! We will contact you with payment details shortly.",
  }
}
