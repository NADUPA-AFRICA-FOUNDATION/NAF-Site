"use server"

import { supabaseAdmin, testSupabaseConnection, isSupabaseConfigured } from "@/lib/supabase"
import { contactFormSchema } from "@/lib/validation"
import { EmailService } from "@/lib/email"
import { revalidatePath } from "next/cache"
import { ZodError } from "zod"
import { submitContactFormFallback } from "./contact-fallback"

export async function submitContactForm(formData: FormData) {
  try {
    console.log("Starting contact form submission...")

    // Extract and validate form data first
    const rawData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    }

    console.log("Raw form data received")

    // Basic null checks
    if (!rawData.firstName?.trim()) {
      return { success: false, message: "First name is required." }
    }
    if (!rawData.lastName?.trim()) {
      return { success: false, message: "Last name is required." }
    }
    if (!rawData.email?.trim()) {
      return { success: false, message: "Email address is required." }
    }
    if (!rawData.subject?.trim()) {
      return { success: false, message: "Subject is required." }
    }
    if (!rawData.message?.trim()) {
      return { success: false, message: "Message is required." }
    }

    // Validate the data with Zod
    const validatedData = contactFormSchema.parse({
      firstName: rawData.firstName.trim(),
      lastName: rawData.lastName.trim(),
      email: rawData.email.trim(),
      phone: rawData.phone?.trim() || undefined,
      subject: rawData.subject.trim(),
      message: rawData.message.trim(),
    })

    console.log("Data validated successfully")

    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      console.log("Supabase not configured, using fallback method")
      return await submitContactFormFallback(formData)
    }

    // Test Supabase connection
    const connectionTest = await testSupabaseConnection()

    if (!connectionTest.success) {
      console.log("Database not available, using fallback method:", connectionTest.message)
      return await submitContactFormFallback(formData)
    }

    // Prepare data for insertion
    const insertData = {
      name: `${validatedData.firstName} ${validatedData.lastName}`, // Add name field
      first_name: validatedData.firstName,
      last_name: validatedData.lastName,
      email: validatedData.email.toLowerCase(),
      phone: validatedData.phone || null,
      subject: validatedData.subject,
      message: validatedData.message,
    }

    console.log("Attempting to insert data into Supabase...")

    // Insert into Supabase with detailed error handling
    const { data: insertedData, error } = await supabaseAdmin.from("contact_messages").insert(insertData).select()

    if (error) {
      console.error("Supabase insertion error:", error)
      console.log("Database insertion failed, using fallback method...")
      return await submitContactFormFallback(formData)
    }

    console.log("Data inserted successfully:", insertedData)

    // Send email notifications
    try {
      console.log("Sending email notifications...")
      await EmailService.sendContactFormNotification({
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email.toLowerCase(),
        phone: validatedData.phone,
        subject: validatedData.subject,
        message: validatedData.message,
        submittedAt: new Date().toISOString(),
      })
      console.log("Email notifications sent successfully")
    } catch (emailError) {
      console.error("Email notification error:", emailError)
      // Don't fail the form submission if email fails
    }

    revalidatePath("/contact")

    return {
      success: true,
      message: "Thank you for your message! We will get back to you within 24 hours.",
    }
  } catch (error) {
    console.error("Contact form submission error:", error)

    if (error instanceof ZodError) {
      const firstError = error.errors[0]
      console.error("Validation error:", firstError)
      return {
        success: false,
        message: firstError.message,
      }
    }

    // If all else fails, try the fallback
    console.log("Main submission failed, trying fallback...")
    return await submitContactFormFallback(formData)
  }
}
