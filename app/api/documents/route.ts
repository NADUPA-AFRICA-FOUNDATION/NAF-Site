import { type NextRequest, NextResponse } from "next/server"
import { api } from "@/convex/_generated/api"
import type { Id } from "@/convex/_generated/dataModel"
import { checkAdminAuth } from "@/lib/auth"
import { getConvex, serverSecret } from "@/lib/convex-server"
import { toDocumentJson } from "@/lib/documents"

const CATEGORIES = [
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

// Saves a document after its PDF has been uploaded straight to Convex storage.
export async function POST(request: NextRequest) {
  const { user } = await checkAdminAuth()
  if (!user) return NextResponse.json({ error: "Unauthorized - admin access required" }, { status: 401 })

  const data = await request.json().catch(() => ({}))
  const title = typeof data.title === "string" ? data.title.trim() : ""
  const description = typeof data.description === "string" ? data.description.trim() : ""
  if (!title || title.length > 200 || description.length > 2000 || !CATEGORIES.includes(data.category)) {
    return NextResponse.json({ error: "Enter a title, a description under 2000 characters and a category" }, { status: 400 })
  }
  if (typeof data.storage_id !== "string") {
    return NextResponse.json({ error: "Missing uploaded file" }, { status: 400 })
  }

  try {
    const convex = getConvex()
    const secret = serverSecret()
    const storageId = data.storage_id as Id<"_storage">
    const check = await convex.action(api.files.verifyUpload, { secret, storageId, kind: "pdf" })
    if (!check.ok) return NextResponse.json({ error: check.error }, { status: 400 })

    const id = await convex.mutation(api.documents.create, {
      secret,
      title,
      description,
      category: data.category,
      storageId,
      fileName: typeof data.file_name === "string" ? data.file_name.slice(0, 200) : `${title}.pdf`,
      fileSize: check.size,
      isFeatured: data.is_featured === true,
    })
    const doc = await convex.query(api.documents.get, { secret, id })
    console.log(`Admin ${user.email} uploaded document: ${title}`)
    return NextResponse.json(doc ? toDocumentJson(doc) : { id })
  } catch (error) {
    console.error("Save document error:", error)
    return NextResponse.json({ error: "Failed to save document" }, { status: 500 })
  }
}

export async function GET() {
  const { user } = await checkAdminAuth()
  if (!user) return NextResponse.json({ error: "Unauthorized - admin access required" }, { status: 401 })

  try {
    const docs = await getConvex().query(api.documents.list, { secret: serverSecret() })
    return NextResponse.json(docs.map(toDocumentJson))
  } catch (error) {
    console.error("List documents error:", error)
    return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 })
  }
}
