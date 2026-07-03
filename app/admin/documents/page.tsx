"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import DocumentManagement from "@/components/document-management"
import { Shield, LogOut } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AdminDocumentsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    checkAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/admin/session")

      if (!response.ok) {
        router.push("/admin/login")
        return
      }

      const { user } = await response.json()
      setUserEmail(user.email)
      setIsAuthenticated(true)
    } catch (err) {
      console.error("Auth check error:", err)
      router.push("/admin/login")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" })
    } catch (err) {
      console.error("Sign out error:", err)
    }
    toast({
      title: "Signed out",
      description: "You have been signed out successfully.",
    })
    router.push("/admin/login")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-stone-600">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Admin Header */}
      <div className="bg-emerald-600 text-white p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            <span className="font-semibold">Admin Panel</span>
          </div>
          <div className="flex items-center gap-4">
            {userEmail && <span className="text-sm hidden md:inline">Welcome, {userEmail}</span>}
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="bg-emerald-700 hover:bg-emerald-800 text-white border-emerald-500"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <DocumentManagement />
    </div>
  )
}
