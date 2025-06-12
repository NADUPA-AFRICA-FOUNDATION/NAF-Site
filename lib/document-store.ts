"use client"

import { useEffect, useState } from "react"

// Document type definition
export interface StoredDocument {
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
  fileId?: string // Reference to the actual file in storage
}

// Storage keys
const DOCUMENTS_META_KEY = "nadupa-documents-meta"
const FILES_STORAGE_KEY = "nadupa-documents"

// Get documents from localStorage
export function getStoredDocuments(): StoredDocument[] {
  if (typeof window === "undefined") return []

  try {
    const stored = localStorage.getItem(DOCUMENTS_META_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error("Error loading documents:", error)
    return []
  }
}

// Save documents to localStorage
export function saveStoredDocuments(documents: StoredDocument[]): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(DOCUMENTS_META_KEY, JSON.stringify(documents))
  } catch (error) {
    console.error("Error saving documents:", error)
  }
}

// Add a new document
export function addStoredDocument(document: StoredDocument): void {
  const documents = getStoredDocuments()
  documents.unshift(document) // Add to beginning of array
  saveStoredDocuments(documents)
}

// Delete a document
export function deleteStoredDocument(id: string): void {
  const documents = getStoredDocuments()
  const updatedDocuments = documents.filter((doc) => doc.id !== id)
  saveStoredDocuments(updatedDocuments)
}

// Get file data by ID
export function getFileData(fileId: string): string | null {
  if (typeof window === "undefined") return null

  try {
    const files = localStorage.getItem(FILES_STORAGE_KEY)
    if (!files) return null

    const parsedFiles = JSON.parse(files)
    return parsedFiles[fileId]?.data || null
  } catch (error) {
    console.error("Error getting file data:", error)
    return null
  }
}

// React hook to use documents
export function useDocuments() {
  const [documents, setDocuments] = useState<StoredDocument[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setDocuments(getStoredDocuments())
    setLoading(false)
  }, [])

  const refreshDocuments = () => {
    setDocuments(getStoredDocuments())
  }

  return { documents, loading, refreshDocuments }
}
