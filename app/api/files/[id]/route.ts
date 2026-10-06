import { type NextRequest, NextResponse } from "next/server"
import { api } from "@/convex/_generated/api"
import { getConvex, serverSecret } from "@/lib/convex-server"

// Redirects a document id to its file in Convex storage.
export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const doc = await getConvex().query(api.documents.get, { secret: serverSecret(), id })
    if (!doc?.fileUrl) return NextResponse.json({ error: "File not found" }, { status: 404 })
    return NextResponse.redirect(doc.fileUrl)
  } catch (error) {
    console.error("Error serving file:", error)
    return NextResponse.json({ error: "Failed to serve file" }, { status: 500 })
  }
}
