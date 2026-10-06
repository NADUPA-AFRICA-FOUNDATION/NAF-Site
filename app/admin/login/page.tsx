"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, Mail, Shield, Eye, EyeOff, AlertCircle, KeyRound, Smartphone, Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// password -> verify (2FA already set up)
// password -> enroll (scan QR, confirm code) -> backupCodes
type Step = "password" | "verify" | "enroll" | "backupCodes"

const ADMIN_HOME = "/admin/submissions"

export default function AdminLoginPage() {
  const [step, setStep] = useState<Step>("password")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [code, setCode] = useState("")
  const [useBackupCode, setUseBackupCode] = useState(false)
  const [enrollment, setEnrollment] = useState<{ qrCode: string; manualKey: string } | null>(null)
  const [backupCodes, setBackupCodes] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  // Already signed in (password + 2FA) - skip the login page
  useEffect(() => {
    fetch("/api/admin/session")
      .then((res) => {
        if (res.ok) router.push(ADMIN_HOME)
      })
      .catch(() => {})
  }, [router])

  const post = async (url: string, body?: unknown) => {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    })
    const result = await response.json().catch(() => ({}))
    if (!response.ok) {
      // An expired pending sign-in means starting over from the password step
      if (response.status === 401 && step !== "password" && /expired/i.test(result.error ?? "")) {
        setStep("password")
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

  const handlePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const result = await post("/api/admin/login", { email, password })
      setPassword("")
      if (result.next === "enroll") {
        await startEnrollment()
      } else {
        setStep("verify")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
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
            {step === "password" && "Admin Login"}
            {step === "verify" && "Two-Factor Verification"}
            {step === "enroll" && "Set Up Two-Factor Authentication"}
            {step === "backupCodes" && "Save Your Backup Codes"}
          </CardTitle>
          <p className="text-stone-600">NADUPA AFRICA FOUNDATION</p>
        </CardHeader>
        <CardContent>
          {step === "password" && (
            <form method="post" onSubmit={handlePassword} className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@nadupa.org"
                    className="pl-10"
                    autoComplete="username"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-stone-400 hover:text-stone-600"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {errorBox}
              {submitButton("Continue", "Checking...")}
            </form>
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
            <p>If you&apos;ve lost access to your password or authenticator, contact the system administrator.</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
