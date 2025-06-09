import { NextResponse } from "next/server"
import { Resend } from "resend"
import { createClient } from "@supabase/supabase-js"

const resend = new Resend(process.env.RESEND_API_KEY)

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { first_name, last_name, email, phone, subject, message } = body

    // Validate required fields
    if (!first_name || !last_name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // 1. Save to Supabase
    const { error: dbError } = await supabase.from("contact_messages").insert({
      first_name,
      last_name,
      email,
      phone,
      subject,
      message,
    })

    if (dbError) {
      console.error("Database error:", dbError)
      return NextResponse.json({ error: dbError.message }, { status: 500 })
    }

    // 2. Send Email via Resend
    try {
      await resend.emails.send({
        from: "NADUPA Africa Foundation <noreply@nadupaafricafoundation.org>", // must be a verified domain in Resend
        to: "info@nadupaafricafoundation.org",
        subject: `New Contact Form: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #059669, #10b981); color: white; padding: 20px; text-align: center;">
              <h2>New Contact Form Submission</h2>
              <p>NADUPA Africa Foundation</p>
            </div>
            
            <div style="padding: 30px; background: #f9fafb;">
              <h3 style="color: #374151; margin-bottom: 20px;">Message from ${first_name} ${last_name}</h3>
              
              <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
                <p style="margin: 5px 0;"><strong>Name:</strong> ${first_name} ${last_name}</p>
                <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p style="margin: 5px 0;"><strong>Phone:</strong> ${phone || "N/A"}</p>
                <p style="margin: 5px 0;"><strong>Subject:</strong> ${subject}</p>
              </div>
              
              <div style="background: white; padding: 20px; border-radius: 8px;">
                <p style="margin: 0 0 10px 0;"><strong>Message:</strong></p>
                <p style="margin: 0; white-space: pre-wrap;">${message}</p>
              </div>
              
              <div style="margin-top: 20px; padding: 15px; background: #ecfdf5; border-left: 4px solid #059669;">
                <p style="margin: 0; color: #065f46;"><strong>Action Required:</strong> Please respond to this inquiry within 24 hours.</p>
              </div>
            </div>
            
            <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 14px;">
              <p>NADUPA Africa Foundation | Kajiado-West, Kajiado County, Kenya</p>
              <p>Registration: NGO-6DF3EM</p>
            </div>
          </div>
        `,
      })

      // Send confirmation email to user
      await resend.emails.send({
        from: "NADUPA Africa Foundation <noreply@nadupaafricafoundation.org>",
        to: email,
        subject: "Thank you for contacting NADUPA Africa Foundation",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #059669, #10b981); color: white; padding: 30px; text-align: center;">
              <h1>Thank You for Contacting Us!</h1>
              <p>NADUPA Africa Foundation</p>
            </div>
            
            <div style="padding: 30px; background: #f9fafb;">
              <p>Dear ${first_name} ${last_name},</p>
              
              <p>Thank you for reaching out to NADUPA Africa Foundation. We have received your message regarding "<strong>${subject}</strong>" and appreciate your interest in our work.</p>
              
              <div style="background: #ecfdf5; padding: 15px; border-left: 4px solid #059669; margin: 20px 0;">
                <p style="margin: 0 0 10px 0;"><strong>What happens next?</strong></p>
                <ul style="margin: 0; padding-left: 20px;">
                  <li>Our team will review your message within 24 hours</li>
                  <li>You'll receive a personalized response from our staff</li>
                  <li>If needed, we'll schedule a call or meeting to discuss further</li>
                </ul>
              </div>
              
              <p>In the meantime, feel free to:</p>
              <ul>
                <li>Explore our <a href="https://nadupaafricafoundation.org/programs" style="color: #059669;">programs and initiatives</a></li>
                <li>Learn more <a href="https://nadupaafricafoundation.org/about" style="color: #059669;">about our mission</a></li>
                <li>Follow us on social media for updates</li>
              </ul>
              
              <p>Thank you for your commitment to empowering communities across Kenya.</p>
              
              <p>Warm regards,<br>
              <strong>The NADUPA Africa Foundation Team</strong></p>
            </div>
            
            <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 14px;">
              <p>NADUPA Africa Foundation | Kajiado-West, Kajiado County, Kenya<br>
              Email: info@nadupaafricafoundation.org | Registration: NGO-6DF3EM</p>
              <p><em>Empowering Communities, Transforming Lives</em></p>
            </div>
          </div>
        `,
      })
    } catch (emailError) {
      console.error("Email error:", emailError)
      // Don't fail the request if email fails, but log it
      return NextResponse.json({
        success: true,
        warning: "Message saved but email notification failed",
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
