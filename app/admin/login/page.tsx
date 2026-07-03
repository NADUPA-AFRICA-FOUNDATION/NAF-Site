"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, Mail, Shield, Eye, EyeOff, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loginStatus, setLoginStatus] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  // Check if already logged in
  useEffect(() => {
    fetch("/api/admin/session")
      .then((res) => {
        if (res.ok) {
          router.push("/admin/documents")
        }
      })
      .catch(() => {
        // Not logged in - stay on the login page
      })
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginStatus(null)

    if (!email || !password) {
      setLoginStatus("Please enter both email and password")
      toast({
        title: "Missing credentials",
        description: "Please enter both email and password.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const result = await response.json()

      if (!response.ok) {
        const message = result.error || "Login failed"
        setLoginStatus(`Login failed: ${message}`)
        toast({
          title: "Login failed",
          description: message,
          variant: "destructive",
        })
        setLoading(false)
        return
      }

      setLoginStatus("Login successful! Redirecting...")
      toast({
        title: "Login successful",
        description: `Welcome back, ${result.user.email}`,
      })
      router.push("/admin/documents")
    } catch (error) {
      console.error("Login error:", error)
      setLoginStatus(`Unexpected error: ${error}`)
      toast({
        title: "Login error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-stone-800">Admin Login</CardTitle>
          <p className="text-stone-600">NADUPA AFRICA FOUNDATION</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
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
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-stone-400 hover:text-stone-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {loginStatus && (
              <div
                className={`p-3 rounded-md text-sm ${
                  loginStatus.includes("successful") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  <span>{loginStatus}</span>
                </div>
              </div>
            )}

            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={loading}>
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-stone-500">
            <p className="mb-2">Authorized personnel only</p>
          </div>
        </CardContent>
        <CardFooter className="text-xs text-center text-stone-400 border-t pt-4">
          <div className="w-full">
            <p>If you've forgotten your password, please contact the system administrator.</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
