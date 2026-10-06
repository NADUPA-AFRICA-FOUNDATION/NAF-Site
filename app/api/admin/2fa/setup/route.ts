import { NextResponse } from "next/server"
import QRCode from "qrcode"
import { api } from "@/convex/_generated/api"
import { getConvex, serverSecret } from "@/lib/convex-server"
import { getPendingAdminEmail } from "@/lib/admin-2fa"
import { encryptSecret, generateTotpSecret, totpUri } from "@/lib/totp"

// Starts authenticator enrollment for an admin who has passed the password
// step but has no 2FA yet. Returns a QR code and the manual-entry key.
export async function POST() {
  try {
    const email = await getPendingAdminEmail()
    if (!email) {
      return NextResponse.json({ error: "Your sign-in expired. Please sign in again." }, { status: 401 })
    }

    const convex = getConvex()
    const existing = await convex.query(api.adminTotp.get, { secret: serverSecret(), email })
    if (existing?.enabled) {
      return NextResponse.json({ error: "Two-factor authentication is already set up" }, { status: 409 })
    }

    const totpSecret = generateTotpSecret()
    await convex.mutation(api.adminTotp.beginEnrollment, {
      secret: serverSecret(),
      email,
      encryptedSecret: encryptSecret(totpSecret),
    })

    const uri = totpUri(totpSecret, email)
    const qrCode = await QRCode.toDataURL(uri, { margin: 1, width: 220 })
    return NextResponse.json({ qrCode, manualKey: totpSecret.match(/.{1,4}/g)?.join(" ") })
  } catch (error) {
    console.error("2FA setup error:", error)
    return NextResponse.json({ error: "Could not start 2FA setup - please try again" }, { status: 500 })
  }
}
