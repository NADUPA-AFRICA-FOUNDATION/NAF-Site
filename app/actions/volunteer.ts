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
      dateOfBirth: formData.get("dateOfBirth") as string,
      gender: formData.get("gender") as string,
      address: formData.get("address") as string,
      city: formData.get("city") as string,
      country: formData.get("country") as string,
      emergencyContactName: formData.get("emergencyContactName") as string,
      emergencyContactPhone: formData.get("emergencyContactPhone") as string,
      motivation: formData.get("motivation") as string,
      areaOfInterest: formData.getAll("areaOfInterest") as string[],
      availability: formData.getAll("availability") as string[],
      skills: formData.getAll("skills") as string[],
      languages: formData.get("languages") as string,
      previousExperience: formData.get("previousExperience") as string,
      heardAboutUs: formData.get("heardAboutUs") as string,
      commitmentLength: formData.get("commitmentLength") as string,
      startDate: formData.get("startDate") as string,
      references: formData.get("references") as string,
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

    // Validate the data with Zod
    const validatedData = volunteerFormSchema.parse({
      firstName: rawData.firstName.trim(),
      lastName: rawData.lastName.trim(),
      email: rawData.email.trim(),
      phone: rawData.phone?.trim() || undefined,
      dateOfBirth: rawData.dateOfBirth || undefined,
      gender: rawData.gender || undefined,
      address: rawData.address?.trim() || undefined,
      city: rawData.city?.trim() || undefined,
      country: rawData.country || undefined,
      emergencyContactName: rawData.emergencyContactName?.trim() || undefined,
      emergencyContactPhone: rawData.emergencyContactPhone?.trim() || undefined,
      motivation: rawData.motivation.trim(),
      areaOfInterest: rawData.areaOfInterest,
      availability: rawData.availability,
      skills: rawData.skills.length > 0 ? rawData.skills : undefined,
      languages: rawData.languages?.trim() || undefined,
      previousExperience: rawData.previousExperience?.trim() || undefined,
      heardAboutUs: rawData.heardAboutUs || undefined,
      commitmentLength: rawData.commitmentLength || undefined,
      startDate: rawData.startDate || undefined,
      references: rawData.references?.trim() || undefined,
      additionalInfo: rawData.additionalInfo?.trim() || undefined,
      agreeToTerms: rawData.agreeToTerms,
    })

    // Insert into Supabase
    const { error } = await supabaseAdmin.from("volunteer_signups").insert({
      first_name: validatedData.firstName,
      last_name: validatedData.lastName,
      email: validatedData.email.toLowerCase(),
      phone: validatedData.phone || null,
      date_of_birth: validatedData.dateOfBirth || null,
      gender: validatedData.gender || null,
      address: validatedData.address || null,
      city: validatedData.city || null,
      country: validatedData.country || null,
      emergency_contact_name: validatedData.emergencyContactName || null,
      emergency_contact_phone: validatedData.emergencyContactPhone || null,
      motivation: validatedData.motivation,
      area_of_interest: validatedData.areaOfInterest,
      availability: validatedData.availability,
      skills: validatedData.skills || [],
      languages: validatedData.languages || null,
      previous_experience: validatedData.previousExperience || null,
      heard_about_us: validatedData.heardAboutUs || null,
      commitment_length: validatedData.commitmentLength || null,
      start_date: validatedData.startDate || null,
      references: validatedData.references || null,
      additional_info: validatedData.additionalInfo || null,
      agree_to_terms: validatedData.agreeToTerms,
    })

    if (error) {
      console.error("Supabase error:", error)
      return {
        success: false,
        message: "There was an error submitting your application. Please try again.",
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
      const firstError = error.errors[0]
      return {
        success: false,
        message: firstError.message,
      }
    }

    return {
      success: false,
      message: "There was an error submitting your application. Please check your information and try again.",
    }
  }
}
