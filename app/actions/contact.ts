"use server"

import { supabaseAdmin } from "@/lib/supabase"
import { sendEmail } from "@/lib/email"

export async function submitContactForm(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return {
        success: false,
        error: "All fields are required",
      }
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: "Please enter a valid email address",
      }
    }

    // Try to save to database first
    let databaseSaved = false
    try {
      const { error: dbError } = await supabaseAdmin.from("contact_messages").insert([
        {
          name,
          email,
          subject,
          message,
          created_at: new Date().toISOString(),
        },
      ])

      if (dbError) {
        console.error("Database save error:", dbError)
      } else {
        databaseSaved = true
        console.log("Contact message saved to database successfully")
      }
    } catch (dbError) {
      console.error("Database connection error:", dbError)
    }

    // Send email notification
    try {
      await sendEmail({
        to: "info@nadupaafricafoundation.org",
        subject: `New Contact Form Submission: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #059669;">New Contact Form Submission</h2>
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Message:</strong></p>
              <div style="background-color: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
                ${message.replace(/\n/g, "<br>")}
              </div>
            </div>
            <p style="color: #666; font-size: 12px;">
              Database Status: ${databaseSaved ? "Saved successfully" : "Not saved (using email fallback)"}
            </p>
          </div>
        `,
      })

      return {
        success: true,
        message: "Thank you for your message! We will get back to you soon.",
        databaseSaved,
      }
    } catch (emailError) {
      console.error("Email send error:", emailError)

      if (databaseSaved) {
        return {
          success: true,
          message: "Your message has been received and saved. We will get back to you soon.",
          databaseSaved: true,
        }
      } else {
        return {
          success: false,
          error: "Sorry, there was an error sending your message. Please try again or contact us directly.",
        }
      }
    }
  } catch (error) {
    console.error("Contact form submission error:", error)
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    }
  }
}
