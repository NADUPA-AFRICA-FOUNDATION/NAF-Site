"use server"

import { contactFormSchema } from "@/lib/validation"
import { EmailService } from "@/lib/email"
import { ZodError } from "zod"

// Fallback function that just sends emails without database storage
export async function submitContactFormFallback(formData: FormData) {
  try {
    console.log("Using fallback contact form submission (email-only mode)...")

    // Extract and validate form data
    const rawData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    }

    // Basic validation
    if (
      !rawData.firstName?.trim() ||
      !rawData.lastName?.trim() ||
      !rawData.email?.trim() ||
      !rawData.subject?.trim() ||
      !rawData.message?.trim()
    ) {
      return {
        success: false,
        message: "Please fill in all required fields.",
      }
    }

    // Validate with Zod
    const validatedData = contactFormSchema.parse({
      firstName: rawData.firstName.trim(),
      lastName: rawData.lastName.trim(),
      email: rawData.email.trim(),
      phone: rawData.phone?.trim() || undefined,
      subject: rawData.subject.trim(),
      message: rawData.message.trim(),
    })

    // Send email notifications only
    try {
      await EmailService.sendContactFormNotification({
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email.toLowerCase(),
        phone: validatedData.phone,
        subject: validatedData.subject,
        message: validatedData.message,
        submittedAt: new Date().toISOString(),
      })

      return {
        success: true,
        message: "Thank you for your message! We will get back to you within 24 hours.",
      }
    } catch (emailError) {
      console.error("Email sending failed:", emailError)

      // Even if email fails, we should still acknowledge the submission
      return {
        success: true,
        message:
          "Thank you for your message! We have received it and will get back to you within 24 hours. (Note: Email notifications are currently unavailable)",
      }
    }
  } catch (error) {
    console.error("Fallback contact form error:", error)

    if (error instanceof ZodError) {
      const firstError = error.errors[0]
      return {
        success: false,
        message: firstError.message,
      }
    }

    return {
      success: false,
      message: "An error occurred while processing your message. Please try again later or contact us directly.",
    }
  }
}
