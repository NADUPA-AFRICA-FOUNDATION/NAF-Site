"use server"

import { supabaseAdmin } from "@/lib/supabase"
import { donationFormSchema } from "@/lib/validation"
import { EmailService } from "@/lib/email"
import { revalidatePath } from "next/cache"
import { ZodError } from "zod"

export async function submitDonationInterest(formData: FormData) {
  try {
    // Extract form data
    const rawData = {
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      donationAmount: formData.get("donationAmount") as string,
      customAmount: formData.get("customAmount") as string,
      paymentMethod: formData.get("paymentMethod") as string,
    }

    // Basic validation checks
    if (!rawData.fullName?.trim()) {
      return {
        success: false,
        message: "Full name is required.",
      }
    }

    if (!rawData.email?.trim()) {
      return {
        success: false,
        message: "Email address is required.",
      }
    }

    if (!rawData.paymentMethod) {
      return {
        success: false,
        message: "Please select a payment method.",
      }
    }

    // Validate the data with Zod
    const validatedData = donationFormSchema.parse({
      fullName: rawData.fullName.trim(),
      email: rawData.email.trim(),
      donationAmount: rawData.donationAmount || undefined,
      customAmount: rawData.customAmount || undefined,
      paymentMethod: rawData.paymentMethod,
    })

    // Determine the actual donation amount
    const amount =
      validatedData.donationAmount === "custom"
        ? Number.parseFloat(validatedData.customAmount || "0")
        : Number.parseFloat(validatedData.donationAmount || "0")

    if (amount <= 0) {
      return {
        success: false,
        message: "Please enter a valid donation amount.",
      }
    }

    // Insert into Supabase
    const { error } = await supabaseAdmin.from("donation_interest").insert({
      full_name: validatedData.fullName,
      email: validatedData.email.toLowerCase(),
      donation_amount: validatedData.donationAmount === "custom" ? null : amount,
      custom_amount: validatedData.donationAmount === "custom" ? amount : null,
      payment_method: validatedData.paymentMethod,
    })

    if (error) {
      console.error("Supabase error:", error)
      return {
        success: false,
        message: "There was an error processing your donation interest. Please try again.",
      }
    }

    // Send email notifications
    try {
      await EmailService.sendDonationInterestNotification({
        fullName: validatedData.fullName,
        email: validatedData.email.toLowerCase(),
        donationAmount: validatedData.donationAmount === "custom" ? undefined : amount,
        customAmount: validatedData.donationAmount === "custom" ? amount : undefined,
        paymentMethod: validatedData.paymentMethod,
        submittedAt: new Date().toISOString(),
      })
    } catch (emailError) {
      console.error("Email notification error:", emailError)
      // Don't fail the form submission if email fails
    }

    revalidatePath("/donate")

    return {
      success: true,
      message: "Thank you for your donation interest! We will contact you with payment details shortly.",
    }
  } catch (error) {
    console.error("Donation form submission error:", error)

    if (error instanceof ZodError) {
      // Get the first validation error
      const firstError = error.errors[0]
      return {
        success: false,
        message: firstError.message,
      }
    }

    return {
      success: false,
      message: "There was an error processing your donation. Please check your information and try again.",
    }
  }
}
