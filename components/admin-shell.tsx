"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ExternalLink, FileText, Inbox, LayoutTemplate, LogOut, Menu, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const NAV = [
  { href: "/admin/pages", label: "Website pages", icon: LayoutTemplate },
  { href: "/admin/submissions", label: "Submissions", icon: Inbox },
  { href: "/admin/documents", label: "Documents", icon: FileText },
]

// Header, navigation and session check shared by every admin page.
// Styled like the public site's navigation so the two feel like one product.
export function AdminShell({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()

  useEffect(() => {
    fetch("/api/admin/session")
      .then(async (response) => {
        if (!response.ok) {
          router.push("/admin/login")
          return
        }
        const { user } = await response.json()
        setUserEmail(user.email)
        setIsAuthenticated(true)
      })
      .catch(() => router.push("/admin/login"))
      .finally(() => setIsLoading(false))
  }, [router])

  const handleSignOut = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" })
    } catch (err) {
      console.error("Sign out error:", err)
    }
    toast({ title: "Signed out", description: "You have been signed out successfully." })
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

  if (!isAuthenticated) return null

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <div className="min-h-screen bg-stone-50">
      <nav className="bg-white shadow-sm border-b border-stone-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 gap-4">
            <Link href="/admin/pages" className="flex items-center gap-3">
              <div className="relative h-12 w-24">
                <Image
                  src="/images/nadupa-logo-vertical.png"
                  alt="NADUPA AFRICA FOUNDATION"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
              <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wide text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                Admin
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md font-medium transition-colors ${
                    isActive(item.href) ? "text-emerald-700 bg-emerald-50" : "text-stone-600 hover:text-emerald-600"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-stone-600 hover:text-emerald-600">
                <ExternalLink className="w-4 h-4" />
                View site
              </a>
              {userEmail && <span className="text-sm text-stone-500 hidden xl:inline">{userEmail}</span>}
              <Button variant="outline" size="sm" onClick={handleSignOut} className="border-stone-300">
                <LogOut className="w-4 h-4" />
                Sign out
              </Button>
            </div>

            <button className="lg:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              {menuOpen ? <X className="w-6 h-6 text-stone-600" /> : <Menu className="w-6 h-6 text-stone-600" />}
            </button>
          </div>

          {menuOpen && (
            <div className="lg:hidden py-4 border-t border-stone-200 flex flex-col gap-3">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-2 font-medium ${isActive(item.href) ? "text-emerald-700" : "text-stone-600"}`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}
              <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-stone-600">
                <ExternalLink className="w-4 h-4" />
                View site
              </a>
              <Button variant="outline" size="sm" onClick={handleSignOut} className="w-fit">
                <LogOut className="w-4 h-4" />
                Sign out
              </Button>
            </div>
          )}
        </div>
      </nav>

      {children}
    </div>
  )
}
