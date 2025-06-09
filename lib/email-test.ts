import { EmailService } from "./email"

// Test function to verify email configuration
export async function testEmailConfiguration() {
  try {
    console.log("Testing email configuration...")

    // Test contact form email
    const contactTest = await EmailService.sendContactFormNotification({
      firstName: "Test",
      lastName: "User",
      email: "test@example.com",
      subject: "Test Contact Form",
      message: "This is a test message to verify email functionality.",
      submittedAt: new Date().toISOString(),
    })

    console.log("Contact form email test:", contactTest)

    // Test volunteer application email
    const volunteerTest = await EmailService.sendVolunteerApplicationNotification({
      firstName: "Test",
      lastName: "Volunteer",
      email: "volunteer@example.com",
      motivation: "I want to help communities in Kenya.",
      areaOfInterest: ["education", "environment"],
      availability: ["monday", "wednesday", "friday"],
      submittedAt: new Date().toISOString(),
    })

    console.log("Volunteer application email test:", volunteerTest)

    // Test donation interest email
    const donationTest = await EmailService.sendDonationInterestNotification({
      fullName: "Test Donor",
      email: "donor@example.com",
      donationAmount: 100,
      paymentMethod: "creditCard",
      submittedAt: new Date().toISOString(),
    })

    console.log("Donation interest email test:", donationTest)

    return {
      success: true,
      message: "All email tests completed. Check console for results.",
    }
  } catch (error) {
    console.error("Email test failed:", error)
    return {
      success: false,
      error: error.message,
    }
  }
}

// Usage: Call this function in development to test email setup
// testEmailConfiguration()
