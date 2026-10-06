import { type NextRequest, NextResponse } from "next/server"
import { createSignedToken, isAdminAuthConfigured, isAllowedAdminEmail } from "@/lib/admin-session"
import { siteOrigin } from "@/lib/admin-2fa"
import { EmailService } from "@/lib/email"

const LINK_TTL_SECONDS = 15 * 60

// Emails a sign-in link to an allowed admin address. The response is the same
// whether or not the address is allowed, so it can't be used to discover admins.
export async function POST(request: NextRequest) {
  if (!isAdminAuthConfigured()) {
    return NextResponse.json({ error: "Admin sign-in is not configured on this server." }, { status: 503 })
  }

  const { email } = await request.json().catch(() => ({}))
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 })
  }

  const normalized = email.trim().toLowerCase()
  if (isAllowedAdminEmail(normalized)) {
    const token = createSignedToken("email-link", { email: normalized }, LINK_TTL_SECONDS)
    const link = `${siteOrigin(request.nextUrl.origin)}/api/admin/email-link/verify?token=${encodeURIComponent(token)}`
    const result = await EmailService.sendEmail({
      to: normalized,
      subject: "Your NADUPA admin sign-in link",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
          <h2 style="color: #059669;">Sign in to the NADUPA admin panel</h2>
          <p>Click the button below to continue signing in. You'll then be asked for the code from your authenticator app.</p>
          <p style="margin: 28px 0;">
            <a href="${link}" style="background: #059669; color: #fff; padding: 12px 20px; border-radius: 6px; text-decoration: none;">Sign in</a>
          </p>
          <p style="color: #666; font-size: 13px;">This link expires in 15 minutes. If you didn't try to sign in, you can ignore this email.</p>
        </div>
      `,
    })
    if (!result.success) {
      console.error("Admin sign-in email failed:", result.error)
      return NextResponse.json({ error: "Could not send the sign-in email - please try again" }, { status: 500 })
    }
  }

  return NextResponse.json({ success: true })
}
