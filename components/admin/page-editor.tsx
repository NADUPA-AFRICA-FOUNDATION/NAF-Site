"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { getPath, PAGES, setPath, type PageKey } from "@/lib/cms/registry"
import { FieldInput } from "./content-fields"
import { ArrowLeft, ExternalLink, Loader2, RotateCcw, Save } from "lucide-react"

export function PageEditor({ pageKey }: { pageKey: PageKey }) {
  const page = PAGES[pageKey]
  const [content, setContent] = useState<Record<string, unknown> | null>(null)
  const [savedJson, setSavedJson] = useState("")
  const [meta, setMeta] = useState<{ updatedAt: number | null; updatedBy: string | null }>({ updatedAt: null, updatedBy: null })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const dirty = content !== null && JSON.stringify(content) !== savedJson

  useEffect(() => {
    fetch(`/api/admin/content/${pageKey}`)
      .then(async (res) => {
        const result = await res.json()
        if (!res.ok) throw new Error(result.error || "Could not load page")
        setContent(result.content)
        setSavedJson(JSON.stringify(result.content))
        setMeta({ updatedAt: result.updatedAt, updatedBy: result.updatedBy })
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Could not load page"))
  }, [pageKey])

  // Warn before leaving with unsaved changes
  useEffect(() => {
    if (!dirty) return
    const handler = (e: BeforeUnloadEvent) => e.preventDefault()
    window.addEventListener("beforeunload", handler)
    return () => window.removeEventListener("beforeunload", handler)
  }, [dirty])

  const update = useCallback((key: string, value: unknown) => {
    setContent((prev) => {
      const next = structuredClone(prev ?? {})
      setPath(next, key, value)
      return next
    })
  }, [])

  const save = async () => {
    if (!content) return
    setSaving(true)
    try {
      const response = await fetch(`/api/admin/content/${pageKey}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "Save failed")
      setSavedJson(JSON.stringify(content))
      setMeta({ updatedAt: result.updatedAt, updatedBy: result.updatedBy })
      toast({ title: "Saved", description: page.path ? "The live page has been updated." : "Updated across the site." })
    } catch (err) {
      toast({ title: "Not saved", description: err instanceof Error ? err.message : "", variant: "destructive" })
    } finally {
      setSaving(false)
    }
  }

  const reset = async () => {
    if (!confirm(`Restore "${page.label}" to its original content? Your edits to this page will be lost.`)) return
    setSaving(true)
    try {
      const response = await fetch(`/api/admin/content/${pageKey}`, { method: "DELETE" })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "Reset failed")
      setContent(result.content)
      setSavedJson(JSON.stringify(result.content))
      setMeta({ updatedAt: null, updatedBy: null })
      toast({ title: "Restored", description: "Original content restored." })
    } catch (err) {
      toast({ title: "Not restored", description: err instanceof Error ? err.message : "", variant: "destructive" })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 pb-28 space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link href="/admin/pages" className="inline-flex items-center gap-1 text-sm text-emerald-700 hover:underline mb-2">
            <ArrowLeft className="w-4 h-4" />
            All pages
          </Link>
          <h1 className="text-2xl font-bold text-stone-800">{page.label}</h1>
          <p className="text-sm text-stone-500">
            {meta.updatedAt
              ? `Last edited ${new Date(meta.updatedAt).toLocaleString()} by ${meta.updatedBy}`
              : "Showing the original content - not edited yet"}
          </p>
        </div>
        {page.path && (
          <Button asChild variant="outline" size="sm">
            <a href={page.path} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" />
              View page
            </a>
          </Button>
        )}
      </div>

      {error && <div className="p-4 rounded-md bg-red-50 text-red-700 text-sm">{error}</div>}
      {!content && !error && (
        <div className="flex justify-center py-16 text-stone-500">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      )}

      {content &&
        page.sections.map((section) => (
          <Card key={section.title} className="border-stone-200">
            <CardHeader>
              <CardTitle className="text-lg text-stone-800">{section.title}</CardTitle>
              {section.description && <p className="text-sm text-stone-500">{section.description}</p>}
            </CardHeader>
            <CardContent className="space-y-5">
              {section.fields.map((field) => (
                <FieldInput key={field.key} field={field} value={getPath(content, field.key)} onChange={(v) => update(field.key, v)} />
              ))}
            </CardContent>
          </Card>
        ))}

      {content && (
        <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur border-t border-stone-200 z-40">
          <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
            <span className="text-sm text-stone-600">{dirty ? "You have unsaved changes" : "All changes saved"}</span>
            <div className="flex gap-2">
              <Button type="button" variant="ghost" onClick={reset} disabled={saving || meta.updatedAt === null}>
                <RotateCcw className="w-4 h-4" />
                Restore original
              </Button>
              <Button type="button" className="bg-emerald-600 hover:bg-emerald-700" onClick={save} disabled={saving || !dirty}>
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
