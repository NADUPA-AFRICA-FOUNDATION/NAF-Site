"use client"

import { useState } from "react"
import { FileCard } from "@/components/file-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Grid2X2, List, Search, SlidersHorizontal, X } from "lucide-react"

interface Document {
  id: string
  title: string
  description: string
  category: string
  date: string
  size: string
  downloadUrl: string
  fileType: string
  featured?: boolean
  tags: string[]
  icon: string
  fileId?: string
}

interface DocumentGridProps {
  documents: Document[]
  title?: string
  subtitle?: string
  showFilters?: boolean
  showViewToggle?: boolean
  columns?: {
    mobile: number
    tablet: number
    desktop: number
  }
  onDocumentDownload?: (document: Document) => void
}

export function DocumentGrid({
  documents = [],
  title = "Documents",
  subtitle,
  showFilters = false,
  showViewToggle = false,
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  onDocumentDownload,
}: DocumentGridProps) {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [showFiltersPanel, setShowFiltersPanel] = useState(false)

  // Get unique categories
  const categories = ["all", ...Array.from(new Set(documents.map((doc) => doc.category)))]

  // Filter documents
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      searchQuery === "" ||
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  // Tailwind only generates classes it can see statically, so the column
  // counts must map to literal class names rather than template strings.
  const tabletColsClass: Record<number, string> = {
    1: "sm:grid-cols-1",
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-3",
    4: "sm:grid-cols-4",
  }
  const desktopColsClass: Record<number, string> = {
    1: "lg:grid-cols-1",
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
  }

  const getColumnClasses = () => {
    if (view === "list") return "grid-cols-1"
    const tablet = tabletColsClass[columns.tablet] || "sm:grid-cols-2"
    const desktop = desktopColsClass[columns.desktop] || "lg:grid-cols-3"
    return `grid-cols-1 ${tablet} ${desktop}`
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-stone-800 mb-2">{title}</h2>
        {subtitle && <p className="text-lg text-stone-600">{subtitle}</p>}
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
              <Input
                type="search"
                placeholder="Search documents..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-3 text-stone-400 hover:text-stone-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFiltersPanel(!showFiltersPanel)}
                className={showFiltersPanel ? "bg-stone-100" : ""}
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </Button>

              {showViewToggle && (
                <div className="flex border rounded-md overflow-hidden">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setView("grid")}
                    className={`rounded-none ${view === "grid" ? "bg-stone-100" : ""}`}
                  >
                    <Grid2X2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setView("list")}
                    className={`rounded-none ${view === "list" ? "bg-stone-100" : ""}`}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Expanded Filters */}
          {showFiltersPanel && (
            <div className="mt-4 p-4 bg-stone-50 rounded-lg border border-stone-200">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-stone-600 mb-1">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category === "all" ? "All Categories" : category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Results Count */}
      <div className="mb-4 text-sm text-stone-500">
        Showing {filteredDocuments.length} of {documents.length} documents
      </div>

      {/* Document Grid/List */}
      {filteredDocuments.length === 0 ? (
        <div className="text-center py-12 bg-stone-50 rounded-lg border border-stone-200">
          <div className="mx-auto w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-stone-400" />
          </div>
          <h3 className="text-lg font-medium text-stone-800 mb-2">No documents found</h3>
          <p className="text-stone-600 mb-4">Try adjusting your search or filter criteria</p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("")
              setSelectedCategory("all")
            }}
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className={`grid ${getColumnClasses()} gap-6`}>
          {filteredDocuments.map((doc) => (
            <FileCard
              key={doc.id}
              id={doc.id}
              title={doc.title}
              description={doc.description}
              category={doc.category}
              date={doc.date}
              size={doc.size}
              downloadUrl={doc.downloadUrl}
              fileType={doc.fileType}
              featured={doc.featured}
              tags={doc.tags}
              icon={doc.icon}
              fileId={doc.fileId}
              onDownload={onDocumentDownload}
            />
          ))}
        </div>
      )}
    </div>
  )
}
