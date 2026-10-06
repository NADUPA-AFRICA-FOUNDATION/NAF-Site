"use client"

import { useEffect, useState } from "react"
import { DocumentGrid } from "@/components/document-grid"
import { AlertCircle, FileText } from "lucide-react"

interface ResourceRow {
  id: string
  title: string
  description: string | null
  category: string
  file_url: string
  file_size: string | null
  file_type: string | null
  is_featured: boolean
  created_at: string
}

// Published documents from Admin → Documents, optionally limited to some categories.
export function DocumentLibrary({
  title,
  subtitle,
  emptyText,
  categories,
}: {
  title: string
  subtitle: string
  emptyText: string
  categories?: string[]
}) {
  const [documents, setDocuments] = useState<ResourceRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/resources")
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to load resources")
        const rows: ResourceRow[] = await res.json()
        setDocuments(categories ? rows.filter((row) => categories.includes(row.category)) : rows)
      })
      .catch((err) => {
        console.error("Error loading resources:", err)
        setError("We couldn't load our document library right now. Please try again later.")
      })
      .finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-4"></div>
        <p className="text-stone-600">Loading documents...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-16 bg-white rounded-lg border border-stone-200">
        <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-4" />
        <p className="text-stone-600">{error}</p>
      </div>
    )
  }

  if (documents.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-lg border border-stone-200 px-6">
        <FileText className="w-10 h-10 text-stone-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-stone-800 mb-2">{title}</h2>
        <p className="text-stone-600 max-w-xl mx-auto">{emptyText}</p>
      </div>
    )
  }

  return (
    <DocumentGrid
      documents={documents.map((doc) => ({
        id: doc.id,
        title: doc.title,
        description: doc.description || "",
        category: doc.category,
        date: new Date(doc.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
        size: doc.file_size || "",
        downloadUrl: doc.file_url,
        fileType: doc.file_type || "PDF",
        featured: doc.is_featured,
        tags: [doc.category],
        icon: "file",
      }))}
      title={title}
      subtitle={subtitle}
      showFilters={!categories}
      showViewToggle
    />
  )
}
