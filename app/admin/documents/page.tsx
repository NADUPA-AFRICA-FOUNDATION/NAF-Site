"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { checkSimpleAdminAuth, signOutSimpleAdmin } from "@/lib/simple-auth"
import { Shield, LogOut, FileText, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AdminDocumentsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = () => {
    try {
      const { user, error } = checkSimpleAdminAuth()

      if (error || !user) {
        console.log("Auth check failed:", error)
        router.push("/admin/login")
        return
      }

      setUserEmail(user.email)
      setIsAuthenticated(true)
    } catch (err) {
      console.error("Auth check error:", err)
      router.push("/admin/login")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = () => {
    signOutSimpleAdmin()
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

      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-stone-800">Document Management</h1>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="w-4 h-4 mr-2" />
            Add New Document
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Document Library
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-stone-600">
              This is a placeholder for the document management system. You can upload, edit, and delete documents here.
            </p>
            <div className="mt-4">
              <Button variant="outline" onClick={() => router.push("/")}>
                Return to Website
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
