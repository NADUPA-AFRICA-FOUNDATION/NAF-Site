"use server"

import { supabaseAdmin } from "@/lib/supabase"
import { sendEmail } from "@/lib/email"
import { validateVolunteerApplication, type VolunteerApplicationData } from "@/lib/volunteer-validation"

export async function submitVolunteerApplication(formData: FormData) {
  try {
    // Extract and validate form data
    const applicationData: VolunteerApplicationData = {
      // Personal Information
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      dateOfBirth: formData.get("dateOfBirth") as string,
      nationality: formData.get("nationality") as string,

      // Address Information
      address: formData.get("address") as string,
      city: formData.get("city") as string,
      country: formData.get("country") as string,

      // Volunteer Information
      availability: formData.get("availability") as string,
      duration: formData.get("duration") as string,
      areasOfInterest: formData.getAll("areasOfInterest") as string[],
      skills: formData.get("skills") as string,
      experience: formData.get("experience") as string,
      motivation: formData.get("motivation") as string,

      // Additional Information
      languages: formData.get("languages") as string,
      emergencyContact: formData.get("emergencyContact") as string,
      emergencyPhone: formData.get("emergencyPhone") as string,
      medicalConditions: formData.get("medicalConditions") as string,

      // Agreements
      backgroundCheck: formData.get("backgroundCheck") === "on",
      termsAccepted: formData.get("termsAccepted") === "on",
    }

    // Validate the application data
    const validation = validateVolunteerApplication(applicationData)
    if (!validation.isValid) {
      return {
        success: false,
        error: validation.errors.join(", "),
      }
    }

    // Try to save to database
    let databaseSaved = false
    try {
      const { error: dbError } = await supabaseAdmin.from("volunteer_applications").insert([
        {
          first_name: applicationData.firstName,
          last_name: applicationData.lastName,
          email: applicationData.email,
          phone: applicationData.phone,
          date_of_birth: applicationData.dateOfBirth,
          nationality: applicationData.nationality,
          address: applicationData.address,
          city: applicationData.city,
          country: applicationData.country,
          availability: applicationData.availability,
          duration: applicationData.duration,
          areas_of_interest: applicationData.areasOfInterest,
          skills: applicationData.skills,
          experience: applicationData.experience,
          motivation: applicationData.motivation,
          languages: applicationData.languages,
          emergency_contact: applicationData.emergencyContact,
          emergency_phone: applicationData.emergencyPhone,
          medical_conditions: applicationData.medicalConditions,
          background_check_consent: applicationData.backgroundCheck,
          terms_accepted: applicationData.termsAccepted,
          status: "pending",
          created_at: new Date().toISOString(),
        },
      ])

      if (dbError) {
        console.error("Database save error:", dbError)
      } else {
        databaseSaved = true
        console.log("Volunteer application saved to database successfully")
      }
    } catch (dbError) {
      console.error("Database connection error:", dbError)
    }

    // Send confirmation email to applicant
    try {
      await sendEmail({
        to: applicationData.email,
        subject: "Volunteer Application Received - NADUPA AFRICA FOUNDATION",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #059669;">Thank You for Your Volunteer Application!</h2>
            <p>Dear ${applicationData.firstName} ${applicationData.lastName},</p>
            <p>Thank you for your interest in volunteering with NADUPA AFRICA FOUNDATION. We have received your application and will review it carefully.</p>
            
            <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #0369a1; margin-top: 0;">What happens next?</h3>
              <ul style="color: #374151;">
                <li>Our team will review your application within 5-7 business days</li>
                <li>We may contact you for a brief interview or additional information</li>
                <li>If selected, we'll provide detailed information about your volunteer placement</li>
                <li>Background check and orientation will be arranged before you begin</li>
              </ul>
            </div>
            
            <p>If you have any questions, please don't hesitate to contact us at info@nadupaafricafoundation.org</p>
            
            <p>Best regards,<br>
            <strong>NADUPA AFRICA FOUNDATION</strong><br>
            Volunteer Coordination Team</p>
          </div>
        `,
      })
    } catch (emailError) {
      console.error("Confirmation email error:", emailError)
    }

    // Send notification email to admin
    try {
      await sendEmail({
        to: "info@nadupaafricafoundation.org",
        subject: `New Volunteer Application: ${applicationData.firstName} ${applicationData.lastName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #059669;">New Volunteer Application Received</h2>
            
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>Personal Information</h3>
              <p><strong>Name:</strong> ${applicationData.firstName} ${applicationData.lastName}</p>
              <p><strong>Email:</strong> ${applicationData.email}</p>
              <p><strong>Phone:</strong> ${applicationData.phone}</p>
              <p><strong>Date of Birth:</strong> ${applicationData.dateOfBirth}</p>
              <p><strong>Nationality:</strong> ${applicationData.nationality}</p>
              <p><strong>Location:</strong> ${applicationData.city}, ${applicationData.country}</p>
            </div>
            
            <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>Volunteer Preferences</h3>
              <p><strong>Availability:</strong> ${applicationData.availability}</p>
              <p><strong>Duration:</strong> ${applicationData.duration}</p>
              <p><strong>Areas of Interest:</strong> ${applicationData.areasOfInterest.join(", ")}</p>
              <p><strong>Skills:</strong> ${applicationData.skills}</p>
            </div>
            
            <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>Motivation</h3>
              <p>${applicationData.motivation}</p>
            </div>
            
            <p style="color: #666; font-size: 12px;">
              Database Status: ${databaseSaved ? "Saved successfully" : "Not saved (email fallback mode)"}
            </p>
          </div>
        `,
      })
    } catch (emailError) {
      console.error("Admin notification email error:", emailError)
    }

    return {
      success: true,
      message:
        "Thank you for your volunteer application! We will review it and get back to you within 5-7 business days.",
      databaseSaved,
    }
  } catch (error) {
    console.error("Volunteer application submission error:", error)
    return {
      success: false,
      error: "An unexpected error occurred. Please try again or contact us directly.",
    }
  }
}
