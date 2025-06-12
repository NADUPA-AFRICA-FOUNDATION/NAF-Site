"use client"
import { useState } from "react"
import { Download, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PDFGenerator } from "./pdf-generator"
import { documentContent } from "@/lib/document-content"

interface DocumentViewerProps {
  src: string
  title: string
  downloadUrl: string
  height?: string | number
}

export function DocumentViewer({ src, title, downloadUrl, height = "600px" }: DocumentViewerProps) {
  const [showFallback, setShowFallback] = useState(false)

  // Get document ID from src or title
  const getDocumentId = () => {
    if (src.includes("annual-report-2023")) return "annual-report-2023"
    if (src.includes("strategic-plan")) return "strategic-plan-2024-2027"
    if (src.includes("water-project")) return "water-project-impact"
    return "annual-report-2023" // default
  }

  const documentId = getDocumentId()
  const content = documentContent[documentId as keyof typeof documentContent]

  const handleDownload = () => {
    try {
      const link = document.createElement("a")
      link.href = downloadUrl
      link.download = `${title.replace(/\s+/g, "-").toLowerCase()}.pdf`
      link.target = "_blank"
      link.rel = "noopener noreferrer"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Download failed:", error)
      setShowFallback(true)
    }
  }

  const handleOpenInNewTab = () => {
    window.open(downloadUrl, "_blank", "noopener,noreferrer")
  }

  // Show fallback immediately for now since PDFs aren't loading
  if (showFallback || true) {
    return (
      <div className="relative bg-white rounded-lg border border-stone-200 overflow-hidden shadow-lg">
        <div className="flex items-center justify-between p-4 bg-stone-50 border-b">
          <div>
            <h3 className="text-lg font-semibold text-stone-800">{title}</h3>
            <p className="text-sm text-stone-600">Professional Document Available</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleDownload} size="sm" className="bg-emerald-600 hover:bg-emerald-700">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>

        <div className="p-6">
          <PDFGenerator title={title} content={content} downloadUrl={downloadUrl} />
        </div>
      </div>
    )
  }

  return (
    <div className="relative bg-white rounded-lg border border-stone-200 overflow-hidden shadow-lg">
      <div className="flex items-center justify-between p-4 bg-stone-50 border-b">
        <div>
          <h3 className="text-lg font-semibold text-stone-800">{title}</h3>
          <p className="text-sm text-stone-600">Professional PDF Document</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleDownload} size="sm" className="bg-emerald-600 hover:bg-emerald-700">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
          <Button
            onClick={handleOpenInNewTab}
            variant="outline"
            size="sm"
            className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Open
          </Button>
        </div>
      </div>

      <div className="relative" style={{ height }}>
        <iframe
          src={`${src}#toolbar=0&navpanes=0&scrollbar=1&view=FitH&zoom=page-width`}
          className="w-full h-full border-0"
          title={`${title} - PDF Preview`}
          onError={() => setShowFallback(true)}
        />
      </div>

      <div className="p-3 bg-stone-50 border-t text-center">
        <p className="text-xs text-stone-500">Professional document • Compatible with all devices</p>
      </div>
    </div>
  )
}
