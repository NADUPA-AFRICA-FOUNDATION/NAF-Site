"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface AdminAuthGuardProps {
  children: React.ReactNode
}

export default function SimpleAdminGuard({ children }: AdminAuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const authToken = localStorage.getItem("nadupa-admin-token")
    const expiry = localStorage.getItem("nadupa-admin-expiry")

    if (authToken && expiry && new Date(expiry) > new Date()) {
      setIsAuthenticated(true)
    } else {
      // Clear any expired tokens
      localStorage.removeItem("nadupa-admin-token")
      localStorage.removeItem("nadupa-admin-expiry")
      localStorage.removeItem("nadupa-admin-user")

      // Redirect to login
      router.push("/admin/login")
    }

    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-stone-600">Verifying authentication...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect in useEffect
  }

  return <>{children}</>
}
