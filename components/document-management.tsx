"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, Trash2, Download, Eye, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Document {
  id: string
  title: string
  description: string
  category: string
  file_url: string
  file_size: string
  file_type: string
  is_featured: boolean
  created_at: string
  reference_links?: string
}

export default function DocumentManagement() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
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

  // Load existing documents
  useEffect(() => {
    loadDocuments()
  }, [])

  const loadDocuments = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/documents")
      if (response.ok) {
        const docs = await response.json()
        setDocuments(docs)
      } else {
        const errorData = await response.json()
        console.error("Failed to load documents:", errorData)
        toast({
          title: "Failed to load documents",
          description: errorData.error || "Please refresh the page to try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error loading documents:", error)
      toast({
        title: "Error loading documents",
        description: "Please check your connection and try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
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
      // Upload file to Vercel Blob
      const uploadFormData = new FormData()
      uploadFormData.append("file", file)

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      })

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json()
        throw new Error(errorData.error || "Upload failed")
      }

      const { url } = await uploadResponse.json()

      // Save document metadata to database
      const documentData = {
        ...formData,
        file_url: url,
        file_size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        file_type: "PDF",
      }

      const saveResponse = await fetch("/api/documents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(documentData),
      })

      if (!saveResponse.ok) {
        const errorData = await saveResponse.json()
        throw new Error(errorData.error || "Failed to save document")
      }

      const savedDocument = await saveResponse.json()
      setDocuments([savedDocument, ...documents])

      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "",
        is_featured: false,
      })

      // Reset file input
      event.target.value = ""

      toast({
        title: "Document uploaded successfully",
        description: `${file.name} has been uploaded and is now available for download.`,
      })
    } catch (error) {
      console.error("Upload error:", error)
      toast({
        title: "Upload failed",
        description:
          error instanceof Error ? error.message : "There was an error uploading your document. Please try again.",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteDocument = async (documentId: string) => {
    if (!confirm("Are you sure you want to delete this document? This action cannot be undone.")) {
      return
    }

    try {
      const response = await fetch(`/api/documents/${documentId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to delete document")
      }

      setDocuments(documents.filter((doc) => doc.id !== documentId))

      toast({
        title: "Document deleted",
        description: "The document has been removed successfully.",
      })
    } catch (error) {
      console.error("Delete error:", error)
      toast({
        title: "Delete failed",
        description: error instanceof Error ? error.message : "There was an error deleting the document.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-stone-600">Loading documents...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-stone-800 mb-2">Document Management</h1>
              <p className="text-stone-600">Upload and manage PDF documents for investors and users to download</p>
            </div>
            <Button onClick={loadDocuments} variant="outline" size="sm">
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
                {documents.length === 0 ? (
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
                              {doc.is_featured && <Badge className="bg-emerald-600">Featured</Badge>}
                              <Badge variant="outline">{doc.category}</Badge>
                            </div>
                            <p className="text-sm text-stone-600 mb-2">{doc.description}</p>
                            <div className="flex items-center gap-4 text-xs text-stone-500">
                              <span>{doc.file_size}</span>
                              <span>{doc.file_type}</span>
                              <span>{new Date(doc.created_at).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <Button size="sm" variant="outline" onClick={() => window.open(doc.file_url, "_blank")}>
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                const link = document.createElement("a")
                                link.href = doc.file_url
                                link.download = `${doc.title}.pdf`
                                link.click()
                              }}
                            >
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
