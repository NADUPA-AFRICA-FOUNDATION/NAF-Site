"use server"

import { ZodError } from "zod"
import { api } from "@/convex/_generated/api"
import { getConvex, serverSecret } from "@/lib/convex-server"
import { EmailService } from "@/lib/email"
import { volunteerFormSchema } from "@/lib/validation"

export async function submitVolunteerForm(formData: FormData) {
  let data
  try {
    data = volunteerFormSchema.parse({
      firstName: (formData.get("firstName") as string | null)?.trim(),
      lastName: (formData.get("lastName") as string | null)?.trim(),
      email: (formData.get("email") as string | null)?.trim().toLowerCase(),
      phone: (formData.get("phone") as string | null)?.trim() || undefined,
      motivation: (formData.get("motivation") as string | null)?.trim(),
      areaOfInterest: formData.getAll("areaOfInterest") as string[],
      availability: formData.getAll("availability") as string[],
      skills: formData.getAll("skills") as string[],
      additionalInfo: (formData.get("additionalInfo") as string | null)?.trim() || undefined,
      agreeToTerms: formData.get("agreeToTerms") === "true",
    })
  } catch (error) {
    return {
      success: false,
      message: error instanceof ZodError ? error.issues[0].message : "Please check your information and try again.",
    }
  }

  try {
    await getConvex().mutation(api.submissions.createVolunteerSignup, {
      secret: serverSecret(),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      motivation: data.motivation,
      areasOfInterest: data.areaOfInterest,
      availability: data.availability,
      skills: data.skills ?? [],
      additionalInfo: data.additionalInfo,
    })
  } catch (error) {
    console.error("Volunteer form save error:", error)
    return {
      success: false,
      message: "There was an error submitting your application. Please try again.",
    }
  }

  // The application is saved; email problems shouldn't fail it.
  const emails = await EmailService.sendVolunteerApplicationNotification({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    motivation: data.motivation,
    areaOfInterest: data.areaOfInterest,
    availability: data.availability,
    submittedAt: new Date().toISOString(),
  })
  if (!emails.userConfirmation.success || !emails.adminNotification.success) {
    console.error("Volunteer form email failed:", emails)
  }

  return {
    success: true,
    message: "Thank you for your volunteer application! We will review it and contact you within 5-7 business days.",
  }
}
