"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { checkAdminAuth, type AdminUser } from "@/lib/auth"
import { Shield, AlertTriangle } from "lucide-react"

interface AdminAuthGuardProps {
  children: React.ReactNode
}

export default function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const { user, error } = await checkAdminAuth()

      if (error || !user) {
        setError(error || "Access denied")
        router.push("/admin/login")
        return
      }

      setUser(user)
    } catch (err) {
      setError("Authentication check failed")
      router.push("/admin/login")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-stone-600">Verifying credentials...</p>
        </div>
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-stone-800 mb-2">Access Denied</h2>
          <p className="text-stone-600 mb-4">{error}</p>
          <button
            onClick={() => router.push("/admin/login")}
            className="text-emerald-600 hover:text-emerald-700 underline"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Admin Header */}
      <div className="bg-emerald-600 text-white p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            <span className="font-semibold">Admin Panel</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm">Welcome, {user.email}</span>
            <button
              onClick={async () => {
                const { signOut } = await import("@/lib/auth")
                await signOut()
                router.push("/admin/login")
              }}
              className="text-sm bg-emerald-700 hover:bg-emerald-800 px-3 py-1 rounded"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}
