import { type NextRequest, NextResponse } from "next/server"
import { api } from "@/convex/_generated/api"
import type { Id } from "@/convex/_generated/dataModel"
import { checkAdminAuth } from "@/lib/auth"
import { getConvex, serverSecret } from "@/lib/convex-server"
import { toDocumentJson } from "@/lib/documents"

type Params = { params: Promise<{ id: string }> }

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { user } = await checkAdminAuth()
  if (!user) return NextResponse.json({ error: "Unauthorized - admin access required" }, { status: 401 })
  const { id } = await params

  try {
    const convex = getConvex()
    const doc = await convex.query(api.documents.get, { secret: serverSecret(), id })
    if (!doc) return NextResponse.json({ error: "Document not found" }, { status: 404 })
    await convex.mutation(api.documents.remove, { secret: serverSecret(), id: doc.id as Id<"documents"> })
    console.log(`Admin ${user.email} deleted document: ${doc.title}`)
    return NextResponse.json({ success: true, message: "Document deleted successfully" })
  } catch (error) {
    console.error("Delete document error:", error)
    return NextResponse.json({ error: "Failed to delete document" }, { status: 500 })
  }
}

export async function GET(_request: NextRequest, { params }: Params) {
  const { user } = await checkAdminAuth()
  if (!user) return NextResponse.json({ error: "Unauthorized - admin access required" }, { status: 401 })
  const { id } = await params

  try {
    const doc = await getConvex().query(api.documents.get, { secret: serverSecret(), id })
    if (!doc) return NextResponse.json({ error: "Document not found" }, { status: 404 })
    return NextResponse.json(toDocumentJson(doc))
  } catch (error) {
    console.error("Get document error:", error)
    return NextResponse.json({ error: "Failed to fetch document" }, { status: 500 })
  }
}
