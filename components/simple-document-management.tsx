"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, Trash2, Download, Eye, RefreshCw } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { storeFile, getStoredFiles, deleteStoredFile } from "@/lib/simple-storage"
import {
  addStoredDocument,
  deleteStoredDocument as deleteDocMeta,
  useDocuments,
  type StoredDocument,
} from "@/lib/document-store"

export default function SimpleDocumentManagement() {
  const { documents, loading, refreshDocuments } = useDocuments()
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
    is_featured: false,
  })
  const { toast } = useToast()

  const categories = [
    "Annual Reports",
    "Strategic Planning",
    "Impact Reports",
    "Financial Reports",
    "Program Reports",
    "Community Assessments",
    "Partnership Documents",
    "Governance",
    "Water Projects",
    "Education Programs",
    "Healthcare Initiatives",
    "Environmental Reports",
  ]

  const iconMap: Record<string, string> = {
    "Annual Reports": "calendar",
    "Strategic Planning": "target",
    "Impact Reports": "bar-chart",
    "Financial Reports": "dollar-sign",
    "Program Reports": "clipboard",
    "Community Assessments": "users",
    "Partnership Documents": "handshake",
    Governance: "shield",
    "Water Projects": "droplets",
    "Education Programs": "graduation-cap",
    "Healthcare Initiatives": "heart",
    "Environmental Reports": "leaf",
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate form data
    if (!formData.title.trim()) {
      toast({
        title: "Missing title",
        description: "Please enter a document title.",
        variant: "destructive",
      })
      return
    }

    if (!formData.category) {
      toast({
        title: "Missing category",
        description: "Please select a document category.",
        variant: "destructive",
      })
      return
    }

    if (file.type !== "application/pdf") {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file only.",
        variant: "destructive",
      })
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive",
      })
      return
    }

    setUploading(true)

    try {
      // Store file
      const { id: fileId } = await storeFile(file)

      // Parse tags
      const tags = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0)

      // Create document metadata
      const newDocument: StoredDocument = {
        id: `doc_${Date.now()}`,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        downloadUrl: `/api/files/${fileId}`,
        fileType: "PDF",
        featured: formData.is_featured,
        tags: tags.length > 0 ? tags : [formData.category],
        icon: iconMap[formData.category] || "file-text",
        fileId: fileId,
      }

      // Save to documents list
      addStoredDocument(newDocument)
      refreshDocuments()

      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "",
        tags: "",
        is_featured: false,
      })

      // Reset file input
      event.target.value = ""

      toast({
        title: "Document uploaded successfully",
        description: `${file.name} has been uploaded and is now available on the site.`,
      })
    } catch (error) {
      console.error("Upload error:", error)
      toast({
        title: "Upload failed",
        description: "There was an error uploading your document. Please try again.",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteDocument = (documentId: string) => {
    if (!confirm("Are you sure you want to delete this document? This action cannot be undone.")) {
      return
    }

    try {
      const doc = documents.find((d) => d.id === documentId)
      if (doc && doc.fileId) {
        // Delete file from storage
        deleteStoredFile(doc.fileId)

        // Delete document metadata
        deleteDocMeta(documentId)
        refreshDocuments()

        toast({
          title: "Document deleted",
          description: "The document has been removed successfully.",
        })
      }
    } catch (error) {
      console.error("Delete error:", error)
      toast({
        title: "Delete failed",
        description: "There was an error deleting the document.",
        variant: "destructive",
      })
    }
  }

  const handleDownloadDocument = (doc: StoredDocument) => {
    try {
      if (doc.fileId) {
        const files = getStoredFiles()
        const file = files[doc.fileId]

        if (file) {
          // Create download link
          const link = document.createElement("a")
          link.href = file.data
          link.download = `${doc.title}.pdf`
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        }
      }
    } catch (error) {
      console.error("Download error:", error)
      toast({
        title: "Download failed",
        description: "There was an error downloading the document.",
        variant: "destructive",
      })
    }
  }

  const handlePreviewDocument = (doc: StoredDocument) => {
    try {
      if (doc.fileId) {
        const files = getStoredFiles()
        const file = files[doc.fileId]

        if (file) {
          // Open in new tab
          const newWindow = window.open()
          if (newWindow) {
            newWindow.document.write(`
              <html>
                <head><title>${doc.title}</title></head>
                <body style="margin:0;">
                  <embed src="${file.data}" type="application/pdf" width="100%" height="100%" />
                </body>
              </html>
            `)
          }
        }
      }
    } catch (error) {
      console.error("Preview error:", error)
      toast({
        title: "Preview failed",
        description: "There was an error previewing the document.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-stone-800 mb-2">Document Management</h1>
              <p className="text-stone-600">Upload and manage PDF documents for the public website</p>
            </div>
            <Button onClick={refreshDocuments} variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upload Form */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload New Document
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Document Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Annual Report 2024"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description of the document content..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="e.g., Report, Finance, 2024"
                  />
                  <p className="text-xs text-stone-500 mt-1">Separate tags with commas</p>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="rounded border-stone-300"
                  />
                  <Label htmlFor="featured">Mark as featured document</Label>
                </div>

                <div>
                  <Label htmlFor="file">PDF File *</Label>
                  <Input
                    id="file"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    disabled={uploading}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-stone-500 mt-1">PDF files only, max 10MB</p>
                </div>

                {uploading && (
                  <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 p-3 rounded-lg">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-emerald-600"></div>
                    <span className="text-sm">Uploading document...</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Document List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Uploaded Documents ({documents.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                  </div>
                ) : documents.length === 0 ? (
                  <div className="text-center py-8 text-stone-500">
                    <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No documents uploaded yet</p>
                    <p className="text-sm">Upload your first PDF document to get started</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {documents.map((doc) => (
                      <div key={doc.id} className="border border-stone-200 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-stone-800">{doc.title}</h3>
                              {doc.featured && <Badge className="bg-emerald-600">Featured</Badge>}
                              <Badge variant="outline">{doc.category}</Badge>
                            </div>
                            <p className="text-sm text-stone-600 mb-2">{doc.description}</p>
                            <div className="flex flex-wrap gap-2 mb-2">
                              {doc.tags.map((tag, index) => (
                                <Badge key={index} variant="secondary" className="bg-stone-100">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center gap-4 text-xs text-stone-500">
                              <span>{doc.size}</span>
                              <span>{doc.fileType}</span>
                              <span>{doc.date}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <Button size="sm" variant="outline" onClick={() => handlePreviewDocument(doc)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleDownloadDocument(doc)}>
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteDocument(doc.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
