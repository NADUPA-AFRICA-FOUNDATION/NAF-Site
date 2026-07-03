let resend: any = null

try {
  const { Resend } = require("resend")
  resend = new Resend(process.env.RESEND_API_KEY)
} catch (error) {
  console.warn("Resend package not available. Email notifications will be disabled.")
}

export interface EmailTemplate {
  to: string
  subject: string
  html: string
  from?: string
}

// Escape user-supplied values before interpolating them into HTML email bodies,
// so a submitter cannot inject markup into the emails we send.
export function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

export class EmailService {
  private static readonly FROM_EMAIL = "NADUPA AFRICA FOUNDATION <info@nadupaafricafoundation.org>"
  private static readonly ADMIN_EMAIL = "info@nadupaafricafoundation.org"

  static async sendEmail({ to, subject, html, from }: EmailTemplate) {
    if (!resend) {
      console.log("Email would be sent to:", to, "Subject:", subject)
      return { success: true, data: { message: "Email service not configured" } }
    }

    try {
      const result = await resend.emails.send({
        from: from || this.FROM_EMAIL,
        to,
        subject,
        html,
      })

      console.log("Email sent successfully:", result)
      return { success: true, data: result }
    } catch (error) {
      console.error("Email sending failed:", error)
      return { success: false, error }
    }
  }

  static async sendContactFormNotification(data: {
    firstName: string
    lastName: string
    email: string
    phone?: string
    subject: string
    message: string
    submittedAt: string
  }) {
    // Send confirmation email to user
    const userConfirmation = await this.sendEmail({
      to: data.email,
      subject: "Thank you for contacting NADUPA AFRICA FOUNDATION",
      html: this.generateContactConfirmationEmail(data),
    })

    // Send notification email to admin
    const adminNotification = await this.sendEmail({
      to: this.ADMIN_EMAIL,
      subject: `New Contact Form Submission: ${data.subject}`,
      html: this.generateContactAdminEmail(data),
    })

    return { userConfirmation, adminNotification }
  }

  static async sendVolunteerApplicationNotification(data: {
    firstName: string
    lastName: string
    email: string
    phone?: string
    motivation: string
    areaOfInterest: string[]
    availability: string[]
    submittedAt: string
  }) {
    // Send confirmation email to volunteer
    const userConfirmation = await this.sendEmail({
      to: data.email,
      subject: "Thank you for your volunteer application - NADUPA AFRICA FOUNDATION",
      html: this.generateVolunteerConfirmationEmail(data),
    })

    // Send notification email to admin
    const adminNotification = await this.sendEmail({
      to: this.ADMIN_EMAIL,
      subject: `New Volunteer Application: ${data.firstName} ${data.lastName}`,
      html: this.generateVolunteerAdminEmail(data),
    })

    return { userConfirmation, adminNotification }
  }

  static async sendDonationInterestNotification(data: {
    fullName: string
    email: string
    donationAmount?: number
    customAmount?: number
    paymentMethod: string
    submittedAt: string
  }) {
    const amount = data.donationAmount || data.customAmount || 0

    // Send confirmation email to donor
    const userConfirmation = await this.sendEmail({
      to: data.email,
      subject: "Thank you for your donation interest - NADUPA AFRICA FOUNDATION",
      html: this.generateDonationConfirmationEmail({ ...data, amount }),
    })

    // Send notification email to admin
    const adminNotification = await this.sendEmail({
      to: this.ADMIN_EMAIL,
      subject: `New Donation Interest: $${amount} from ${data.fullName}`,
      html: this.generateDonationAdminEmail({ ...data, amount }),
    })

    return { userConfirmation, adminNotification }
  }

  private static generateContactConfirmationEmail(data: {
    firstName: string
    lastName: string
    subject: string
    submittedAt: string
  }) {
    data = {
      ...data,
      firstName: escapeHtml(data.firstName),
      lastName: escapeHtml(data.lastName),
      subject: escapeHtml(data.subject),
    }
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank you for contacting us</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #059669, #10b981); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .footer { text-align: center; margin-top: 30px; padding: 20px; color: #6b7280; font-size: 14px; }
            .button { display: inline-block; background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .highlight { background: #ecfdf5; padding: 15px; border-left: 4px solid #059669; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Thank You for Contacting Us!</h1>
            <p>NADUPA AFRICA FOUNDATION</p>
          </div>
          
          <div class="content">
            <p>Dear ${data.firstName} ${data.lastName},</p>
            
            <p>Thank you for reaching out to NADUPA AFRICA FOUNDATION. We have received your message regarding "<strong>${data.subject}</strong>" and appreciate your interest in our work.</p>
            
            <div class="highlight">
              <p><strong>What happens next?</strong></p>
              <ul>
                <li>Our team will review your message within 24 hours</li>
                <li>You'll receive a personalized response from our staff</li>
                <li>If needed, we'll schedule a call or meeting to discuss further</li>
              </ul>
            </div>
            
            <p>In the meantime, feel free to:</p>
            <ul>
              <li>Explore our <a href="https://nadupaafricafoundation.org/programs">programs and initiatives</a></li>
              <li>Learn more <a href="https://nadupaafricafoundation.org/about">about our mission</a></li>
              <li>Follow us on social media for updates</li>
            </ul>
            
            <p>Thank you for your commitment to empowering communities across Kenya.</p>
            
            <p>Warm regards,<br>
            <strong>The NADUPA AFRICA FOUNDATION Team</strong></p>
          </div>
          
          <div class="footer">
            <p>NADUPA AFRICA FOUNDATION | Kajiado-West, Kajiado County, Kenya<br>
            Email: info@nadupaafricafoundation.org | Registration: NGO-6DF3EM</p>
            <p><em>Empowering Communities, Transforming Lives</em></p>
          </div>
        </body>
      </html>
    `
  }

  private static generateContactAdminEmail(data: {
    firstName: string
    lastName: string
    email: string
    phone?: string
    subject: string
    message: string
    submittedAt: string
  }) {
    data = {
      ...data,
      firstName: escapeHtml(data.firstName),
      lastName: escapeHtml(data.lastName),
      email: escapeHtml(data.email),
      phone: data.phone ? escapeHtml(data.phone) : data.phone,
      subject: escapeHtml(data.subject),
      message: escapeHtml(data.message),
    }
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1f2937; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .field { margin: 15px 0; padding: 10px; background: white; border-radius: 4px; border-left: 4px solid #059669; }
            .field-label { font-weight: bold; color: #374151; }
            .field-value { margin-top: 5px; }
            .message-box { background: white; padding: 20px; border-radius: 6px; border: 1px solid #d1d5db; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🔔 New Contact Form Submission</h1>
            <p>NADUPA AFRICA FOUNDATION Admin Panel</p>
          </div>
          
          <div class="content">
            <p><strong>A new contact form has been submitted on the website.</strong></p>
            
            <div class="field">
              <div class="field-label">Name:</div>
              <div class="field-value">${data.firstName} ${data.lastName}</div>
            </div>
            
            <div class="field">
              <div class="field-label">Email:</div>
              <div class="field-value"><a href="mailto:${data.email}">${data.email}</a></div>
            </div>
            
            ${
              data.phone
                ? `
            <div class="field">
              <div class="field-label">Phone:</div>
              <div class="field-value"><a href="tel:${data.phone}">${data.phone}</a></div>
            </div>
            `
                : ""
            }
            
            <div class="field">
              <div class="field-label">Subject:</div>
              <div class="field-value">${data.subject}</div>
            </div>
            
            <div class="field">
              <div class="field-label">Submitted:</div>
              <div class="field-value">${new Date(data.submittedAt).toLocaleString()}</div>
            </div>
            
            <div class="message-box">
              <div class="field-label">Message:</div>
              <div class="field-value" style="white-space: pre-wrap;">${data.message}</div>
            </div>
            
            <p><strong>Action Required:</strong> Please respond to this inquiry within 24 hours.</p>
          </div>
        </body>
      </html>
    `
  }

  private static generateVolunteerConfirmationEmail(data: {
    firstName: string
    lastName: string
    areaOfInterest: string[]
    submittedAt: string
  }) {
    data = {
      ...data,
      firstName: escapeHtml(data.firstName),
      lastName: escapeHtml(data.lastName),
      areaOfInterest: data.areaOfInterest.map(escapeHtml),
    }
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Volunteer Application Received</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .footer { text-align: center; margin-top: 30px; padding: 20px; color: #6b7280; font-size: 14px; }
            .highlight { background: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; margin: 20px 0; }
            .interest-tags { display: flex; flex-wrap: wrap; gap: 8px; margin: 10px 0; }
            .tag { background: #059669; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🙌 Welcome to Our Volunteer Community!</h1>
            <p>NADUPA AFRICA FOUNDATION</p>
          </div>
          
          <div class="content">
            <p>Dear ${data.firstName} ${data.lastName},</p>
            
            <p>Thank you for your interest in volunteering with NADUPA AFRICA FOUNDATION! We are excited about your passion for making a difference in communities across Kenya.</p>
            
            <div class="highlight">
              <p><strong>Your Application Status:</strong></p>
              <ul>
                <li>✅ Application received and logged</li>
                <li>🔍 Under review by our volunteer coordinator</li>
                <li>📞 You'll hear from us within 5-7 business days</li>
              </ul>
            </div>
            
            <p><strong>Your Areas of Interest:</strong></p>
            <div class="interest-tags">
              ${data.areaOfInterest.map((interest) => `<span class="tag">${interest}</span>`).join("")}
            </div>
            
            <p><strong>Next Steps:</strong></p>
            <ol>
              <li>Our team will review your application and experience</li>
              <li>We'll match you with suitable volunteer opportunities</li>
              <li>You'll receive an invitation for an orientation session</li>
              <li>Complete any required training or background checks</li>
              <li>Begin your volunteer journey with us!</li>
            </ol>
            
            <p>While you wait, we encourage you to:</p>
            <ul>
              <li>Follow our social media for updates on current projects</li>
              <li>Read our volunteer handbook (will be provided)</li>
              <li>Prepare any questions you might have about our programs</li>
            </ul>
            
            <p>Thank you for choosing to be part of our mission to empower communities and transform lives.</p>
            
            <p>With gratitude,<br>
            <strong>The NADUPA AFRICA FOUNDATION Volunteer Team</strong></p>
          </div>
          
          <div class="footer">
            <p>NADUPA AFRICA FOUNDATION | Kajiado-West, Kajiado County, Kenya<br>
            Email: info@nadupaafricafoundation.org | Registration: NGO-6DF3EM</p>
            <p><em>Empowering Communities, Transforming Lives</em></p>
          </div>
        </body>
      </html>
    `
  }

  private static generateVolunteerAdminEmail(data: {
    firstName: string
    lastName: string
    email: string
    phone?: string
    motivation: string
    areaOfInterest: string[]
    availability: string[]
    submittedAt: string
  }) {
    data = {
      ...data,
      firstName: escapeHtml(data.firstName),
      lastName: escapeHtml(data.lastName),
      email: escapeHtml(data.email),
      phone: data.phone ? escapeHtml(data.phone) : data.phone,
      motivation: escapeHtml(data.motivation),
      areaOfInterest: data.areaOfInterest.map(escapeHtml),
      availability: data.availability.map(escapeHtml),
    }
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Volunteer Application</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1f2937; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .field { margin: 15px 0; padding: 10px; background: white; border-radius: 4px; border-left: 4px solid #f59e0b; }
            .field-label { font-weight: bold; color: #374151; }
            .field-value { margin-top: 5px; }
            .tags { display: flex; flex-wrap: wrap; gap: 8px; margin: 10px 0; }
            .tag { background: #059669; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; }
            .motivation-box { background: white; padding: 20px; border-radius: 6px; border: 1px solid #d1d5db; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🆕 New Volunteer Application</h1>
            <p>NADUPA AFRICA FOUNDATION Admin Panel</p>
          </div>
          
          <div class="content">
            <p><strong>A new volunteer application has been submitted.</strong></p>
            
            <div class="field">
              <div class="field-label">Name:</div>
              <div class="field-value">${data.firstName} ${data.lastName}</div>
            </div>
            
            <div class="field">
              <div class="field-label">Email:</div>
              <div class="field-value"><a href="mailto:${data.email}">${data.email}</a></div>
            </div>
            
            ${
              data.phone
                ? `
            <div class="field">
              <div class="field-label">Phone:</div>
              <div class="field-value"><a href="tel:${data.phone}">${data.phone}</a></div>
            </div>
            `
                : ""
            }
            
            <div class="field">
              <div class="field-label">Areas of Interest:</div>
              <div class="tags">
                ${data.areaOfInterest.map((interest) => `<span class="tag">${interest}</span>`).join("")}
              </div>
            </div>
            
            <div class="field">
              <div class="field-label">Availability:</div>
              <div class="tags">
                ${data.availability.map((time) => `<span class="tag">${time}</span>`).join("")}
              </div>
            </div>
            
            <div class="field">
              <div class="field-label">Submitted:</div>
              <div class="field-value">${new Date(data.submittedAt).toLocaleString()}</div>
            </div>
            
            <div class="motivation-box">
              <div class="field-label">Motivation:</div>
              <div class="field-value" style="white-space: pre-wrap;">${data.motivation}</div>
            </div>
            
            <p><strong>Action Required:</strong> Please review and respond to this application within 5-7 business days.</p>
          </div>
        </body>
      </html>
    `
  }

  private static generateDonationConfirmationEmail(data: {
    fullName: string
    amount: number
    paymentMethod: string
    submittedAt: string
  }) {
    data = {
      ...data,
      fullName: escapeHtml(data.fullName),
      paymentMethod: escapeHtml(data.paymentMethod),
    }
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank you for your donation interest</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #dc2626, #ef4444); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .footer { text-align: center; margin-top: 30px; padding: 20px; color: #6b7280; font-size: 14px; }
            .highlight { background: #fef2f2; padding: 15px; border-left: 4px solid #dc2626; margin: 20px 0; }
            .amount { font-size: 24px; font-weight: bold; color: #dc2626; text-align: center; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>❤️ Thank You for Your Generosity!</h1>
            <p>NADUPA AFRICA FOUNDATION</p>
          </div>
          
          <div class="content">
            <p>Dear ${data.fullName},</p>
            
            <p>Thank you for your generous donation interest to NADUPA AFRICA FOUNDATION. Your support means the world to us and the communities we serve.</p>
            
            <div class="amount">$${data.amount}</div>
            
            <div class="highlight">
              <p><strong>Next Steps:</strong></p>
              <ul>
                <li>Our team will contact you within 24 hours</li>
                <li>We'll provide secure payment instructions</li>
                <li>You'll receive a donation receipt for tax purposes</li>
                <li>We'll share impact updates on how your donation is used</li>
              </ul>
            </div>
            
            <p><strong>Your Impact:</strong></p>
            <ul>
              <li>$25 can provide clean water access for one family for a month</li>
              <li>$50 can sponsor a child's education for one term</li>
              <li>$100 can support a microfinance loan for a small business</li>
              <li>$250 can fund a community health workshop</li>
            </ul>
            
            <p>Every contribution, regardless of size, makes a meaningful difference in the lives of families across Kenya.</p>
            
            <p>With heartfelt gratitude,<br>
            <strong>The NADUPA AFRICA FOUNDATION Team</strong></p>
          </div>
          
          <div class="footer">
            <p>NADUPA AFRICA FOUNDATION | Kajiado-West, Kajiado County, Kenya<br>
            Email: info@nadupaafricafoundation.org | Registration: NGO-6DF3EM</p>
            <p><em>Empowering Communities, Transforming Lives</em></p>
          </div>
        </body>
      </html>
    `
  }

  private static generateDonationAdminEmail(data: {
    fullName: string
    email: string
    amount: number
    paymentMethod: string
    submittedAt: string
  }) {
    data = {
      ...data,
      fullName: escapeHtml(data.fullName),
      email: escapeHtml(data.email),
      paymentMethod: escapeHtml(data.paymentMethod),
    }
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Donation Interest</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1f2937; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .field { margin: 15px 0; padding: 10px; background: white; border-radius: 4px; border-left: 4px solid #dc2626; }
            .field-label { font-weight: bold; color: #374151; }
            .field-value { margin-top: 5px; }
            .amount { font-size: 24px; font-weight: bold; color: #dc2626; text-align: center; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>💰 New Donation Interest</h1>
            <p>NADUPA AFRICA FOUNDATION Admin Panel</p>
          </div>
          
          <div class="content">
            <p><strong>A new donation interest has been submitted.</strong></p>
            
            <div class="amount">$${data.amount}</div>
            
            <div class="field">
              <div class="field-label">Donor Name:</div>
              <div class="field-value">${data.fullName}</div>
            </div>
            
            <div class="field">
              <div class="field-label">Email:</div>
              <div class="field-value"><a href="mailto:${data.email}">${data.email}</a></div>
            </div>
            
            <div class="field">
              <div class="field-label">Preferred Payment Method:</div>
              <div class="field-value">${data.paymentMethod}</div>
            </div>
            
            <div class="field">
              <div class="field-label">Submitted:</div>
              <div class="field-value">${new Date(data.submittedAt).toLocaleString()}</div>
            </div>
            
            <p><strong>Action Required:</strong> Please contact the donor within 24 hours to facilitate the donation process.</p>
          </div>
        </body>
      </html>
    `
  }
}

// Named export for sendEmail function
export const sendEmail = EmailService.sendEmail.bind(EmailService)

// Export the EmailService as default
export default EmailService
