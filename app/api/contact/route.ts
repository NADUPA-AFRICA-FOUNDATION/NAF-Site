import { NextResponse } from "next/server"
import { ZodError } from "zod"
import { api } from "@/convex/_generated/api"
import { getConvex, serverSecret } from "@/lib/convex-server"
import { EmailService } from "@/lib/email"
import { contactFormSchema } from "@/lib/validation"

export async function POST(req: Request) {
  let data
  try {
    const body = await req.json()
    data = contactFormSchema.parse({
      firstName: body.first_name?.trim(),
      lastName: body.last_name?.trim(),
      email: body.email?.trim().toLowerCase(),
      phone: body.phone?.trim() || undefined,
      subject: body.subject?.trim(),
      message: body.message?.trim(),
    })
  } catch (error) {
    const message = error instanceof ZodError ? error.issues[0].message : "Invalid request"
    return NextResponse.json({ error: message }, { status: 400 })
  }

  try {
    await getConvex().mutation(api.submissions.createContactMessage, { secret: serverSecret(), ...data })
  } catch (error) {
    console.error("Contact form save error:", error)
    return NextResponse.json(
      { error: "Sorry, we couldn't send your message. Please try again or email info@nadupaafricafoundation.org." },
      { status: 500 },
    )
  }

  // The message is saved; email problems shouldn't fail the submission.
  const emails = await EmailService.sendContactFormNotification({ ...data, submittedAt: new Date().toISOString() })
  if (!emails.userConfirmation.success || !emails.adminNotification.success) {
    console.error("Contact form email failed:", emails)
  }

  return NextResponse.json({ success: true })
}
