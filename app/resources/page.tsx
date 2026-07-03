"use client"

import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { DocumentGrid } from "@/components/document-grid"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, ExternalLink, FileText } from "lucide-react"
import Image from "next/image"

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

// Foundation publications served as printable HTML by /api/documents/by-slug/[slug]
const publications = [
  {
    slug: "annual-report-2023",
    title: "Annual Report 2023",
    description: "A full review of our programs, finances, and community impact across Kenya in 2023.",
  },
  {
    slug: "strategic-plan-2024-2027",
    title: "Strategic Plan 2024-2027",
    description: "Our roadmap for the next four years: goals, priority programs, and how we measure success.",
  },
  {
    slug: "water-project-impact",
    title: "Water Project Impact Report",
    description: "Outcomes and lessons from our clean water initiatives in Kajiado County.",
  },
]

export default function ResourcesPage() {
  const [documents, setDocuments] = useState<ResourceRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/resources")
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to load resources")
        setDocuments(await res.json())
      })
      .catch((err) => {
        console.error("Error loading resources:", err)
        setError("We couldn't load our document library right now. Please try again later.")
      })
      .finally(() => setLoading(false))
  }, [])

  const gridDocuments = documents.map((doc) => ({
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
  }))

  return (
    <div className="min-h-screen bg-stone-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/rural-landscape.avif"
            alt="Rural landscape representing our documented work across Kenya"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-emerald-700/60"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Resources & Publications</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-8">
            Reports, plans, and documents from our work empowering communities across Kenya.
          </p>
        </div>
      </section>

      {/* Foundation Publications */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-stone-800 mb-2">Foundation Publications</h2>
            <p className="text-lg text-stone-600">Key reports and plans, readable and printable in your browser.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {publications.map((pub) => (
              <Card key={pub.slug} className="border-stone-200 hover:border-emerald-500 transition-colors">
                <CardContent className="p-6">
                  <div className="p-2 rounded-lg bg-emerald-50 w-fit mb-4">
                    <FileText className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-stone-800 mb-2">{pub.title}</h3>
                  <p className="text-sm text-stone-600 mb-4">{pub.description}</p>
                  <a
                    href={`/api/documents/by-slug/${pub.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-700"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Read document
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Document Library */}
      <section className="py-16 px-4 bg-stone-50">
        <div className="container mx-auto max-w-6xl">
          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-4"></div>
              <p className="text-stone-600">Loading documents...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16 bg-white rounded-lg border border-stone-200">
              <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-4" />
              <p className="text-stone-600">{error}</p>
            </div>
          ) : documents.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg border border-stone-200">
              <FileText className="w-10 h-10 text-stone-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-stone-800 mb-2">Document Library</h2>
              <p className="text-stone-600">
                More documents are on the way. Please check back soon for reports and other materials.
              </p>
            </div>
          ) : (
            <DocumentGrid
              documents={gridDocuments}
              title="Document Library"
              subtitle="Download our reports, assessments, and program documents."
              showFilters
              showViewToggle
            />
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
