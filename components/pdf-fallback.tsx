"use client"

import { useState } from "react"
import { Download, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface PDFFallbackProps {
  title: string
  downloadUrl: string
  description: string
  size: string
}

export function PDFFallback({ title, downloadUrl, description, size }: PDFFallbackProps) {
  const [downloadAttempted, setDownloadAttempted] = useState(false)

  const handleDownload = () => {
    setDownloadAttempted(true)
    const link = document.createElement("a")
    link.href = downloadUrl
    link.download = `${title.replace(/\s+/g, "-").toLowerCase()}.pdf`
    link.target = "_blank"
    link.rel = "noopener noreferrer"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Card className="border-amber-200 bg-amber-50">
      <CardContent className="p-6 text-center">
        <FileText className="w-16 h-16 text-amber-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-stone-800 mb-2">{title}</h3>
        <p className="text-stone-600 mb-4 text-sm">{description}</p>
        <div className="flex items-center justify-center gap-2 text-sm text-stone-500 mb-4">
          <span>PDF Document</span>
          <span>•</span>
          <span>{size}</span>
        </div>
        <Button onClick={handleDownload} className="bg-emerald-600 hover:bg-emerald-700">
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
        {downloadAttempted && (
          <p className="text-xs text-stone-500 mt-2">
            If download doesn't start, please check your browser's download settings
          </p>
        )}
      </CardContent>
    </Card>
  )
}
