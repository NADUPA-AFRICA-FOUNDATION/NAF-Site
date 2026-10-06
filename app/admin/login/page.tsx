"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Shield, AlertCircle, KeyRound, Smartphone, Copy, MailCheck } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// choose (Google, or email link -> linkSent) -> verify (2FA already set up)
// choose -> enroll (scan QR, confirm code) -> backupCodes
// Google and the email link both land back here with ?step=2fa.
type Step = "choose" | "linkSent" | "loading" | "verify" | "enroll" | "backupCodes"

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.2-2.1 3.5-5.1 3.5-8.7z" />
      <path fill="#34A853" d="M12 24c3.2 0 6-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9h-4v3.1A12 12 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.4 14.4a7.2 7.2 0 0 1 0-4.7V6.6h-4a12 12 0 0 0 0 10.8l4-3z" />
      <path fill="#EA4335" d="M12 4.8c1.7 0 3.3.6 4.5 1.8l3.4-3.4A12 12 0 0 0 1.4 6.6l4 3.1C6.3 6.9 8.9 4.8 12 4.8z" />
    </svg>
  )
}

const ADMIN_HOME = "/admin/submissions"

export default function AdminLoginPage() {
  const [step, setStep] = useState<Step>("loading")
  const [email, setEmail] = useState("")
  const [googleEnabled, setGoogleEnabled] = useState(false)
  const [code, setCode] = useState("")
  const [useBackupCode, setUseBackupCode] = useState(false)
  const [enrollment, setEnrollment] = useState<{ qrCode: string; manualKey: string } | null>(null)
  const [backupCodes, setBackupCodes] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const urlError = params.get("error")
    const returningFor2fa = params.get("step") === "2fa"
    window.history.replaceState(null, "", "/admin/login")

    fetch("/api/admin/options")
      .then((res) => res.json())
      .then((options) => setGoogleEnabled(Boolean(options.google)))
      .catch(() => {})

    if (urlError) setError(urlError)

    if (returningFor2fa) {
      // Step 1 (Google or email link) is done - ask for the authenticator code
      fetch("/api/admin/2fa/status")
        .then(async (res) => {
          const result = await res.json()
          if (!res.ok) throw new Error(result.error || "Your sign-in expired. Please sign in again.")
          setEmail(result.email)
          if (result.next === "enroll") await startEnrollment()
          else setStep("verify")
        })
        .catch((err) => {
          setError(err instanceof Error ? err.message : "Sign-in failed")
          setStep("choose")
        })
      return
    }

    // Already fully signed in - skip the login page
    fetch("/api/admin/session")
      .then((res) => {
        if (res.ok) router.push(ADMIN_HOME)
        else setStep("choose")
      })
      .catch(() => setStep("choose"))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const post = async (url: string, body?: unknown) => {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    })
    const result = await response.json().catch(() => ({}))
    if (!response.ok) {
      // An expired pending sign-in means starting over
      if (response.status === 401 && /expired/i.test(result.error ?? "")) {
        setStep("choose")
        setCode("")
      }
      throw new Error(result.error || "Something went wrong - please try again")
    }
    return result
  }

  const startEnrollment = async () => {
    const result = await post("/api/admin/2fa/setup")
    setEnrollment(result)
    setStep("enroll")
  }

  const handleEmailLink = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await post("/api/admin/email-link", { email })
      setStep("linkSent")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send the sign-in link")
    } finally {
      setLoading(false)
    }
  }

  const handleCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const result = await post("/api/admin/2fa/verify", { code })
      setCode("")
      if (result.backupCodes) {
        setBackupCodes(result.backupCodes)
        setStep("backupCodes")
        return
      }
      if (useBackupCode && typeof result.backupCodesRemaining === "number") {
        toast({
          title: "Backup code used",
          description: `${result.backupCodesRemaining} backup code${result.backupCodesRemaining === 1 ? "" : "s"} left.`,
        })
      }
      router.push(ADMIN_HOME)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed")
    } finally {
      setLoading(false)
    }
  }

  const copyBackupCodes = async () => {
    await navigator.clipboard.writeText(backupCodes.join("\n"))
    toast({ title: "Copied", description: "Backup codes copied to clipboard" })
  }

  const errorBox = error && (
    <div className="p-3 rounded-md text-sm bg-red-50 text-red-700 flex items-center gap-2" role="alert">
      <AlertCircle className="h-4 w-4 flex-shrink-0" />
      <span>{error}</span>
    </div>
  )

  const submitButton = (label: string, busyLabel: string) => (
    <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={loading}>
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          {busyLabel}
        </div>
      ) : (
        label
      )}
    </Button>
  )

  const codeInput = (
    <div>
      <Label htmlFor="code">{useBackupCode ? "Backup code" : "6-digit code"}</Label>
      <div className="relative">
        <KeyRound className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
        <Input
          id="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={useBackupCode ? "xxxx-xxxx" : "123456"}
          className="pl-10 tracking-widest"
          inputMode={useBackupCode ? "text" : "numeric"}
          autoComplete="one-time-code"
          maxLength={useBackupCode ? 9 : 6}
          autoFocus
          required
        />
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-stone-800">
            {(step === "choose" || step === "loading" || step === "linkSent") && "Admin Login"}
            {step === "verify" && "Two-Factor Verification"}
            {step === "enroll" && "Set Up Two-Factor Authentication"}
            {step === "backupCodes" && "Save Your Backup Codes"}
          </CardTitle>
          <p className="text-stone-600">NADUPA AFRICA FOUNDATION</p>
        </CardHeader>
        <CardContent>
          {step === "loading" && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600"></div>
            </div>
          )}

          {step === "choose" && (
            <div className="space-y-5">
              {googleEnabled && (
                <>
                  <Button asChild variant="outline" className="w-full">
                    <a href="/api/admin/google/start">
                      <GoogleIcon />
                      Sign in with Google
                    </a>
                  </Button>
                  <div className="flex items-center gap-3 text-xs text-stone-400">
                    <div className="h-px flex-1 bg-stone-200" />
                    or
                    <div className="h-px flex-1 bg-stone-200" />
                  </div>
                </>
              )}
              <form method="post" onSubmit={handleEmailLink} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email a sign-in link</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@nadupaafricafoundation.org"
                      className="pl-10"
                      autoComplete="username"
                      required
                    />
                  </div>
                </div>
                {errorBox}
                {submitButton("Send sign-in link", "Sending...")}
              </form>
            </div>
          )}

          {step === "linkSent" && (
            <div className="space-y-4 text-center">
              <MailCheck className="mx-auto h-10 w-10 text-emerald-600" />
              <p className="text-sm text-stone-600">
                If <strong>{email}</strong> is an admin address, a sign-in link is on its way. It expires in 15
                minutes. Open it on this device to continue.
              </p>
              <button
                type="button"
                className="text-sm text-emerald-700 hover:underline"
                onClick={() => {
                  setStep("choose")
                  setError(null)
                }}
              >
                Use a different method
              </button>
            </div>
          )}

          {step === "verify" && (
            <form method="post" onSubmit={handleCode} className="space-y-4">
              <p className="text-sm text-stone-600 flex items-start gap-2">
                <Smartphone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                {useBackupCode
                  ? "Enter one of the backup codes you saved when you set up two-factor authentication."
                  : "Open your authenticator app and enter the 6-digit code for NADUPA Admin."}
              </p>
              {codeInput}
              {errorBox}
              {submitButton("Verify", "Verifying...")}
              <button
                type="button"
                className="w-full text-sm text-emerald-700 hover:underline"
                onClick={() => {
                  setUseBackupCode(!useBackupCode)
                  setCode("")
                  setError(null)
                }}
              >
                {useBackupCode ? "Use authenticator app instead" : "Lost your phone? Use a backup code"}
              </button>
            </form>
          )}

          {step === "enroll" && enrollment && (
            <form method="post" onSubmit={handleCode} className="space-y-4">
              <ol className="text-sm text-stone-600 list-decimal list-inside space-y-1">
                <li>Install an authenticator app (Google Authenticator, Microsoft Authenticator, Authy or 1Password).</li>
                <li>Scan this QR code with the app.</li>
                <li>Enter the 6-digit code the app shows.</li>
              </ol>
              <div className="flex justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={enrollment.qrCode} alt="QR code for your authenticator app" width={220} height={220} />
              </div>
              <div className="text-xs text-center text-stone-500">
                Can&apos;t scan? Enter this key manually:
                <code className="block mt-1 font-mono text-sm text-stone-800 break-all">{enrollment.manualKey}</code>
              </div>
              {codeInput}
              {errorBox}
              {submitButton("Turn On Two-Factor", "Verifying...")}
            </form>
          )}

          {step === "backupCodes" && (
            <div className="space-y-4">
              <p className="text-sm text-stone-600">
                Two-factor authentication is on. If you lose your phone, each of these codes can be used once to sign
                in. <strong>Store them somewhere safe now - they won&apos;t be shown again.</strong>
              </p>
              <div className="grid grid-cols-2 gap-2 bg-stone-100 p-4 rounded-md font-mono text-sm text-center">
                {backupCodes.map((backupCode) => (
                  <span key={backupCode}>{backupCode}</span>
                ))}
              </div>
              <Button type="button" variant="outline" className="w-full" onClick={copyBackupCodes}>
                <Copy className="h-4 w-4 mr-2" />
                Copy codes
              </Button>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={() => router.push(ADMIN_HOME)}>
                I&apos;ve saved my codes - continue
              </Button>
            </div>
          )}

          {step !== "backupCodes" && (
            <div className="mt-6 text-center text-sm text-stone-500">
              <p className="mb-2">Authorized personnel only</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="text-xs text-center text-stone-400 border-t pt-4">
          <div className="w-full">
            <p>If you&apos;ve lost access to your authenticator and backup codes, contact the system administrator.</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
