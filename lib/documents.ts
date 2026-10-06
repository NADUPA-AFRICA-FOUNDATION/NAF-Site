// Converts Convex documents to the JSON shape the document pages and admin use.
import "server-only"
import type { FunctionReturnType } from "convex/server"
import type { api } from "@/convex/_generated/api"

type ConvexDocument = FunctionReturnType<typeof api.documents.list>[number]

export function formatFileSize(bytes: number): string {
  return bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`
}

export function toDocumentJson(doc: ConvexDocument) {
  return {
    id: doc.id,
    title: doc.title,
    description: doc.description,
    category: doc.category,
    file_url: doc.fileUrl,
    file_size: formatFileSize(doc.fileSize),
    file_type: "PDF",
    is_featured: doc.isFeatured,
    created_at: new Date(doc.createdAt).toISOString(),
  }
}
