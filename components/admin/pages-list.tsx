"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Globe, Loader2, Settings } from "lucide-react"

interface PageRow {
  key: string
  label: string
  path: string | null
  updatedAt: number | null
  updatedBy: string | null
}

export function PagesList() {
  const [pages, setPages] = useState<PageRow[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/admin/content")
      .then(async (res) => {
        const result = await res.json()
        if (!res.ok) throw new Error(result.error || "Could not load pages")
        setPages(result.pages)
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Could not load pages"))
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-800">Website pages</h1>
        <p className="text-stone-600 text-sm">
          Edit the text, images and lists on every public page. Changes go live as soon as you save.
        </p>
      </div>

      {error && <div className="p-4 rounded-md bg-red-50 text-red-700 text-sm">{error}</div>}
      {!pages && !error && (
        <div className="flex justify-center py-12 text-stone-500">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      )}

      <div className="grid gap-3">
        {pages?.map((page) => (
          <Link key={page.key} href={`/admin/pages/${page.key}`}>
            <Card className="border-stone-200 hover:border-emerald-400 hover:shadow-sm transition">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                  {page.path ? <Globe className="w-5 h-5 text-emerald-600" /> : <Settings className="w-5 h-5 text-emerald-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-stone-800">{page.label}</div>
                  <div className="text-xs text-stone-500 truncate">
                    {page.path ?? "Contact details, social links and footer - shown on every page"}
                  </div>
                </div>
                {page.updatedAt ? (
                  <span className="text-xs text-stone-500 hidden sm:block">
                    Edited {new Date(page.updatedAt).toLocaleDateString()}
                  </span>
                ) : (
                  <Badge variant="secondary" className="hidden sm:inline-flex">
                    Original
                  </Badge>
                )}
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
