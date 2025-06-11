"use server"

import { supabaseAdmin } from "@/lib/supabase"
import { volunteerApplicationSchema } from "@/lib/volunteer-validation"
import { revalidatePath } from "next/cache"

export async function submitVolunteerApplication(formData: FormData) {
  try {
    // Extract form data with better handling
    const firstName = formData.get("firstName")?.toString().trim() || ""
    const lastName = formData.get("lastName")?.toString().trim() || ""
    const email = formData.get("email")?.toString().trim().toLowerCase() || ""
    const phone = formData.get("phone")?.toString().trim() || ""
    const motivation = formData.get("motivation")?.toString().trim() || ""
    const additionalInfo = formData.get("additionalInfo")?.toString().trim() || ""
    const agreeToTerms = formData.get("agreeToTerms") === "true"

    // Get arrays
    const areasOfInterest = formData.getAll("areasOfInterest").map((item) => item.toString())
    const availability = formData.getAll("availability").map((item) => item.toString())
    const skills = formData.getAll("skills").map((item) => item.toString())

    console.log("Form data received:", {
      firstName,
      lastName,
      email,
      phone,
      motivation: `"${motivation}" (length: ${motivation.length})`,
      areasOfInterest,
      availability,
      skills,
      additionalInfo,
      agreeToTerms,
    })

    // Prepare data for validation
    const rawData = {
      firstName,
      lastName,
      email,
      phone: phone || undefined,
      motivation,
      areasOfInterest,
      availability,
      skills: skills.length > 0 ? skills : undefined,
      additionalInfo: additionalInfo || undefined,
      agreeToTerms,
    }

    // Validate with Zod
    const validatedData = volunteerApplicationSchema.parse(rawData)

    // Prepare data for database
    const dbData = {
      first_name: validatedData.firstName,
      last_name: validatedData.lastName,
      email: validatedData.email,
      phone: validatedData.phone || null,
      motivation: validatedData.motivation,
      areas_of_interest: validatedData.areasOfInterest.join(", "),
      availability: validatedData.availability.join(", "),
      skills: validatedData.skills && validatedData.skills.length > 0 ? validatedData.skills.join(", ") : null,
      additional_info: validatedData.additionalInfo || null,
    }

    // Insert into database
    const { data, error } = await supabaseAdmin.from("volunteer_applications").insert(dbData).select()

    if (error) {
      console.error("Database error:", error)

      if (error.message.includes("does not exist")) {
        return {
          success: false,
          message: "Database setup required. Please run the volunteer table creation script.",
          needsSetup: true,
        }
      }

      return {
        success: false,
        message: "Failed to submit application. Please try again.",
      }
    }

    console.log("Volunteer application submitted successfully:", data[0]?.id)

    revalidatePath("/volunteer")

    return {
      success: true,
      message:
        "Thank you! Your volunteer application has been submitted successfully. We'll contact you within 5-7 business days.",
    }
  } catch (error) {
    console.error("Volunteer application error:", error)

    if (error instanceof Error && error.name === "ZodError") {
      const zodError = error as any
      const errors = zodError.errors || []

      // Get the first error message
      const firstError = errors[0]
      let errorMessage = "Please check your form data and try again."

      if (firstError) {
        if (firstError.path.includes("motivation")) {
          errorMessage = "Please provide at least 10 characters explaining your motivation to volunteer."
        } else if (firstError.path.includes("areasOfInterest")) {
          errorMessage = "Please select at least one area of interest."
        } else if (firstError.path.includes("availability")) {
          errorMessage = "Please select at least one day of availability."
        } else if (firstError.path.includes("agreeToTerms")) {
          errorMessage = "You must agree to the terms and conditions."
        } else {
          errorMessage = firstError.message || errorMessage
        }
      }

      return {
        success: false,
        message: errorMessage,
        validationErrors: errors,
      }
    }

    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    }
  }
}
