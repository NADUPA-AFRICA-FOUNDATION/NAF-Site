import { type NextRequest, NextResponse } from "next/server"
import { api } from "@/convex/_generated/api"
import { createSignedToken, isAdminAuthConfigured, isAllowedAdminEmail } from "@/lib/admin-session"
import { siteOrigin } from "@/lib/admin-2fa"
import { getConvex, serverSecret } from "@/lib/convex-server"
import { EmailService } from "@/lib/email"

const LINK_TTL_SECONDS = 15 * 60
const HOUR = 60 * 60 * 1000

function clientIp(request: NextRequest): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0].trim() || request.headers.get("x-real-ip") || "unknown"
}

// Emails a sign-in link, but only to addresses in ADMIN_EMAILS.
export async function POST(request: NextRequest) {
  if (!isAdminAuthConfigured()) {
    return NextResponse.json({ error: "Admin sign-in is not configured on this server." }, { status: 503 })
  }

  const { email } = await request.json().catch(() => ({}))
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 })
  }
  const normalized = email.trim().toLowerCase()

  // Limit attempts per network (stops address guessing) and links per admin
  // (stops someone flooding the admin's inbox).
  const convex = getConvex()
  const secret = serverSecret()
  const ipAllowed = await convex.mutation(api.rateLimits.hit, {
    secret,
    key: `email-link-ip:${clientIp(request)}`,
    limit: 10,
    windowMs: HOUR,
  })
  if (!ipAllowed) {
    return NextResponse.json({ error: "Too many attempts. Please try again in an hour." }, { status: 429 })
  }

  if (!isAllowedAdminEmail(normalized)) {
    return NextResponse.json({ error: "This email address is not authorized to access the admin panel." }, { status: 403 })
  }

  const emailAllowed = await convex.mutation(api.rateLimits.hit, {
    secret,
    key: `email-link-to:${normalized}`,
    limit: 5,
    windowMs: HOUR,
  })
  if (!emailAllowed) {
    return NextResponse.json(
      { error: "Too many sign-in links were requested for this address. Use the latest email, or try again in an hour." },
      { status: 429 },
    )
  }

  const token = createSignedToken("email-link", { email: normalized }, LINK_TTL_SECONDS)
  const link = `${siteOrigin(request.nextUrl.origin)}/api/admin/email-link/verify?token=${encodeURIComponent(token)}`
  const result = await EmailService.sendEmail({
    to: normalized,
    subject: "Your NADUPA admin sign-in link",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color: #059669;">Sign in to the NADUPA admin panel</h2>
        <p>Click the button below to continue signing in.</p>
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

  return NextResponse.json({ success: true })
}
