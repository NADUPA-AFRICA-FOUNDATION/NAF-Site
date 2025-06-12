"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Download, FileText, Eye } from "lucide-react"

interface FileCardProps {
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
  onDownload?: (document: any) => void
}

export function FileCard({
  id,
  title,
  description,
  category,
  date,
  size,
  downloadUrl,
  fileType,
  featured = false,
  tags,
  icon,
  fileId,
  onDownload,
}: FileCardProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDownloading(true)

    try {
      window.open(downloadUrl, "_blank")

      if (onDownload) {
        onDownload({ id, title, downloadUrl, fileId })
      }
    } catch (error) {
      console.error("Download error:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  const handlePreview = (e: React.MouseEvent) => {
    e.preventDefault()
    window.open(downloadUrl, "_blank")
  }

  return (
    <Card className={`border ${featured ? "border-emerald-500 border-2" : "border-stone-200"}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3 mb-3">
          <div className={`p-2 rounded-lg ${featured ? "bg-emerald-100" : "bg-stone-100"}`}>
            <FileText className="w-5 h-5 text-stone-600" />
          </div>
          <div>
            <h3 className="font-medium text-stone-800 line-clamp-1">{title}</h3>
            <div className="flex items-center gap-2 text-xs text-stone-500">
              <span>{fileType}</span>
              <span>•</span>
              <span>{size}</span>
            </div>
          </div>
          {featured && <Badge className="ml-auto bg-emerald-600">Featured</Badge>}
        </div>

        <p className="text-sm text-stone-600 mb-3 line-clamp-2">{description}</p>

        <div className="flex items-center justify-between text-xs text-stone-500 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{date}</span>
          </div>
          <Badge variant="outline" className="text-xs font-normal">
            {category}
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={handlePreview}
            className="flex items-center gap-1 text-xs font-medium text-stone-600 hover:text-emerald-600"
          >
            <Eye className="w-3 h-3" />
            Preview
          </button>
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex items-center gap-1 text-xs font-medium text-emerald-600 hover:text-emerald-700"
          >
            {isDownloading ? (
              <span>Downloading...</span>
            ) : (
              <>
                <Download className="w-3 h-3" />
                <span>Download</span>
              </>
            )}
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
