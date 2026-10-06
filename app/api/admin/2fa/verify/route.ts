import { type NextRequest, NextResponse } from "next/server"
import { api } from "@/convex/_generated/api"
import { getConvex, serverSecret } from "@/lib/convex-server"
import { getPendingAdminEmail, issueFullSession } from "@/lib/admin-2fa"
import { decryptSecret, generateBackupCodes, hashBackupCode, verifyTotp } from "@/lib/totp"

// Step 2 of sign-in. Accepts a 6-digit authenticator code, or a backup code
// once 2FA is enabled. During enrollment, a correct code turns 2FA on and
// returns the backup codes (shown to the admin exactly once).
export async function POST(request: NextRequest) {
  try {
    const email = await getPendingAdminEmail()
    if (!email) {
      return NextResponse.json({ error: "Your sign-in expired. Please sign in again." }, { status: 401 })
    }

    const body = await request.json().catch(() => ({}))
    const code = typeof body.code === "string" ? body.code.trim().replace(/\s/g, "") : ""
    if (!code) {
      return NextResponse.json({ error: "Enter the code from your authenticator app" }, { status: 400 })
    }

    const convex = getConvex()
    const secret = serverSecret()
    const totp = await convex.query(api.adminTotp.get, { secret, email })
    if (!totp) {
      return NextResponse.json({ error: "Two-factor setup has not been started" }, { status: 400 })
    }

    if (totp.lockedUntil > Date.now()) {
      const minutes = Math.ceil((totp.lockedUntil - Date.now()) / 60000)
      return NextResponse.json(
        { error: `Too many incorrect codes. Try again in ${minutes} minute${minutes === 1 ? "" : "s"}.` },
        { status: 429 },
      )
    }

    const step = verifyTotp(decryptSecret(totp.encryptedSecret), code)

    // Enrollment: confirm the authenticator works, then turn 2FA on.
    if (!totp.enabled) {
      if (step === null) {
        return NextResponse.json({ error: "That code is not correct. Check your phone's time and try again." }, { status: 401 })
      }
      const backupCodes = generateBackupCodes()
      await convex.mutation(api.adminTotp.completeEnrollment, {
        secret,
        email,
        step,
        backupCodeHashes: backupCodes.map(hashBackupCode),
      })
      const response = NextResponse.json({ success: true, backupCodes })
      issueFullSession(response, email)
      return response
    }

    const ok =
      step !== null
        ? await convex.mutation(api.adminTotp.recordSuccess, { secret, email, step })
        : await convex.mutation(api.adminTotp.recordSuccess, { secret, email, backupCodeHash: hashBackupCode(code) })

    if (!ok) {
      await convex.mutation(api.adminTotp.recordFailure, { secret, email })
      return NextResponse.json({ error: "That code is not correct or was already used" }, { status: 401 })
    }

    const response = NextResponse.json({
      success: true,
      backupCodesRemaining: step === null ? totp.backupCodesRemaining - 1 : totp.backupCodesRemaining,
    })
    issueFullSession(response, email)
    return response
  } catch (error) {
    console.error("2FA verify error:", error)
    return NextResponse.json({ error: "Verification failed - please try again" }, { status: 500 })
  }
}
