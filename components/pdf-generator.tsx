"use client"

import { useState } from "react"
import { Download, FileText, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface PDFGeneratorProps {
  title: string
  content: any
  downloadUrl: string
}

export function PDFGenerator({ title, content, downloadUrl }: PDFGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generatePDF = async () => {
    setIsGenerating(true)
    setError(null)

    try {
      // Create a simple HTML-to-PDF conversion
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>${title}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
            .header { text-align: center; margin-bottom: 40px; border-bottom: 3px solid #059669; padding-bottom: 20px; }
            .logo { color: #059669; font-size: 24px; font-weight: bold; }
            .title { font-size: 28px; font-weight: bold; margin: 20px 0; }
            .section { margin: 30px 0; }
            .section h2 { color: #059669; border-bottom: 2px solid #059669; padding-bottom: 10px; }
            .stats { display: flex; justify-content: space-around; margin: 20px 0; }
            .stat { text-align: center; padding: 20px; background: #f0fdf4; border-radius: 8px; }
            .stat-number { font-size: 32px; font-weight: bold; color: #059669; }
            .stat-label { font-size: 14px; color: #374151; }
            .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">NADUPA AFRICA FOUNDATION</div>
            <div class="title">${title}</div>
            <div>Transforming Lives, Building Communities</div>
          </div>
          ${content}
          <div class="footer">
            <p>© 2024 NADUPA AFRICA FOUNDATION | www.nadupaafricafoundation.org</p>
            <p>Generated on ${new Date().toLocaleDateString()}</p>
          </div>
        </body>
        </html>
      `

      // Create blob and download
      const blob = new Blob([htmlContent], { type: "text/html" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${title.replace(/\s+/g, "-").toLowerCase()}.html`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (err) {
      setError("Failed to generate document. Please try again.")
      console.error("PDF generation error:", err)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card className="border-amber-200 bg-amber-50">
      <CardContent className="p-6 text-center">
        <FileText className="w-16 h-16 text-amber-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-stone-800 mb-2">{title}</h3>
        <p className="text-stone-600 mb-4 text-sm">Document is being prepared. Click below to generate and download.</p>

        {error && (
          <div className="flex items-center justify-center gap-2 text-red-600 mb-4">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <Button onClick={generatePDF} disabled={isGenerating} className="bg-emerald-600 hover:bg-emerald-700">
          <Download className="w-4 h-4 mr-2" />
          {isGenerating ? "Generating..." : "Generate & Download"}
        </Button>

        <p className="text-xs text-stone-500 mt-2">Document will be generated in HTML format for immediate viewing</p>
      </CardContent>
    </Card>
  )
}
