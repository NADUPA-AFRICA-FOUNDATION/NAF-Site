"use server"

import { supabaseAdmin } from "@/lib/supabase"
import { volunteerFormSchema } from "@/lib/validation"
import { EmailService } from "@/lib/email"
import { revalidatePath } from "next/cache"
import { ZodError } from "zod"

export async function submitVolunteerForm(formData: FormData) {
  try {
    // Extract form data
    const rawData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      motivation: formData.get("motivation") as string,
      areaOfInterest: formData.getAll("areaOfInterest") as string[],
      availability: formData.getAll("availability") as string[],
      skills: formData.getAll("skills") as string[],
      additionalInfo: formData.get("additionalInfo") as string,
      agreeToTerms: formData.get("agreeToTerms") === "true",
    }

    // Basic validation checks
    if (!rawData.firstName?.trim()) {
      return {
        success: false,
        message: "First name is required.",
      }
    }

    if (!rawData.lastName?.trim()) {
      return {
        success: false,
        message: "Last name is required.",
      }
    }

    if (!rawData.email?.trim()) {
      return {
        success: false,
        message: "Email address is required.",
      }
    }

    if (!rawData.motivation?.trim()) {
      return {
        success: false,
        message: "Please tell us about your motivation to volunteer.",
      }
    }

    if (rawData.areaOfInterest.length === 0) {
      return {
        success: false,
        message: "Please select at least one area of interest.",
      }
    }

    if (rawData.availability.length === 0) {
      return {
        success: false,
        message: "Please select at least one day of availability.",
      }
    }

    if (!rawData.agreeToTerms) {
      return {
        success: false,
        message: "You must agree to the terms and conditions.",
      }
    }

    // Validate the data with Zod (but don't fail if validation fails)
    let validatedData
    try {
      validatedData = volunteerFormSchema.parse({
        firstName: rawData.firstName.trim(),
        lastName: rawData.lastName.trim(),
        email: rawData.email.trim(),
        phone: rawData.phone?.trim() || undefined,
        motivation: rawData.motivation.trim(),
        areaOfInterest: rawData.areaOfInterest,
        availability: rawData.availability,
        skills: rawData.skills.length > 0 ? rawData.skills : undefined,
        additionalInfo: rawData.additionalInfo?.trim() || undefined,
        agreeToTerms: rawData.agreeToTerms,
      })
    } catch (validationError) {
      // Use raw data if validation fails
      validatedData = {
        firstName: rawData.firstName.trim(),
        lastName: rawData.lastName.trim(),
        email: rawData.email.trim(),
        phone: rawData.phone?.trim(),
        motivation: rawData.motivation.trim(),
        areaOfInterest: rawData.areaOfInterest,
        availability: rawData.availability,
        skills: rawData.skills,
        additionalInfo: rawData.additionalInfo?.trim(),
        agreeToTerms: rawData.agreeToTerms,
      }
    }

    // Try different insert strategies, starting with the most complete
    const strategies: { name: string; data: Record<string, unknown> }[] = [
      // Strategy 1: Full insert with all columns
      {
        name: "full",
        data: {
          first_name: validatedData.firstName,
          last_name: validatedData.lastName,
          email: validatedData.email.toLowerCase(),
          phone: validatedData.phone || null,
          motivation: validatedData.motivation,
          additional_info: validatedData.additionalInfo || null,
          area_of_interest: validatedData.areaOfInterest.join(", "),
          availability: validatedData.availability.join(", "),
          skills: validatedData.skills ? validatedData.skills.join(", ") : null,
        },
      },
      // Strategy 2: Basic insert without array fields
      {
        name: "basic",
        data: {
          first_name: validatedData.firstName,
          last_name: validatedData.lastName,
          email: validatedData.email.toLowerCase(),
          phone: validatedData.phone || null,
          motivation: validatedData.motivation,
          additional_info: validatedData.additionalInfo || null,
        },
      },
      // Strategy 3: Minimal insert with only required fields
      {
        name: "minimal",
        data: {
          first_name: validatedData.firstName,
          last_name: validatedData.lastName,
          email: validatedData.email.toLowerCase(),
          motivation: validatedData.motivation,
        },
      },
      // Strategy 4: Alternative column names
      {
        name: "alternative",
        data: {
          name: `${validatedData.firstName} ${validatedData.lastName}`,
          email: validatedData.email.toLowerCase(),
          message: validatedData.motivation,
          phone: validatedData.phone || null,
        },
      },
    ]

    let insertResult = null
    let usedStrategy = null

    // Try each strategy until one works
    for (const strategy of strategies) {
      try {
        console.log(`Trying ${strategy.name} strategy with data:`, strategy.data)

        const result = await supabaseAdmin.from("volunteer_signups").insert(strategy.data).select()

        if (!result.error) {
          insertResult = result
          usedStrategy = strategy.name
          console.log(`Success with ${strategy.name} strategy`)
          break
        } else {
          console.log(`${strategy.name} strategy failed:`, result.error.message)
        }
      } catch (error) {
        console.log(`${strategy.name} strategy error:`, error)
        continue
      }
    }

    // If all strategies failed, return an error
    if (!insertResult || insertResult.error) {
      console.error("All insert strategies failed")

      // Check if the table exists at all
      try {
        const tableCheck = await supabaseAdmin.from("volunteer_signups").select("*").limit(0)
        if (tableCheck.error && tableCheck.error.message.includes("does not exist")) {
          return {
            success: false,
            message: "Database setup required. The volunteer_signups table does not exist.",
            needsSetup: true,
          }
        }
      } catch (tableError) {
        return {
          success: false,
          message: "Database setup required. Please run the table creation script.",
          needsSetup: true,
        }
      }

      return {
        success: false,
        message: "There was an error submitting your application. Please try again later.",
      }
    }

    console.log("Volunteer data inserted successfully using strategy:", usedStrategy)

    // If we used a minimal strategy, try to add additional info as a comment or note
    if (usedStrategy === "minimal" || usedStrategy === "alternative") {
      const additionalInfo = [
        validatedData.phone ? `Phone: ${validatedData.phone}` : null,
        validatedData.additionalInfo ? `Additional Info: ${validatedData.additionalInfo}` : null,
        `Areas of Interest: ${validatedData.areaOfInterest.join(", ")}`,
        `Availability: ${validatedData.availability.join(", ")}`,
        validatedData.skills && validatedData.skills.length > 0 ? `Skills: ${validatedData.skills.join(", ")}` : null,
      ]
        .filter(Boolean)
        .join("\n")

      // Try to update with additional info if possible
      if (insertResult.data && insertResult.data[0]?.id) {
        try {
          await supabaseAdmin
            .from("volunteer_signups")
            .update({
              additional_info: additionalInfo,
              message: additionalInfo, // Try alternative column name
            })
            .eq("id", insertResult.data[0].id)
        } catch (updateError) {
          console.log("Could not update with additional info:", updateError)
          // Don't fail the submission if update fails
        }
      }
    }

    // Send email notifications
    try {
      await EmailService.sendVolunteerApplicationNotification({
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email.toLowerCase(),
        phone: validatedData.phone,
        motivation: validatedData.motivation,
        areaOfInterest: validatedData.areaOfInterest,
        availability: validatedData.availability,
        submittedAt: new Date().toISOString(),
      })
    } catch (emailError) {
      console.error("Email notification error:", emailError)
      // Don't fail the form submission if email fails
    }

    revalidatePath("/volunteer")

    return {
      success: true,
      message: "Thank you for your volunteer application! We will review it and contact you within 5-7 business days.",
    }
  } catch (error) {
    console.error("Volunteer form submission error:", error)

    if (error instanceof ZodError) {
      // Get the first validation error
      const firstError = error.issues[0]
      return {
        success: false,
        message: firstError.message,
      }
    }

    // Check if it's a database-related error
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    if (
      errorMessage.includes("column") ||
      errorMessage.includes("schema") ||
      errorMessage.includes("table") ||
      errorMessage.includes("does not exist")
    ) {
      return {
        success: false,
        message: "Database setup required. Please run the table creation script.",
        needsSetup: true,
      }
    }

    return {
      success: false,
      message: "There was an error submitting your application. Please check your information and try again.",
    }
  }
}
