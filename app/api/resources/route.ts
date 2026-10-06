import { NextResponse } from "next/server"
import { api } from "@/convex/_generated/api"
import { getConvex, serverSecret } from "@/lib/convex-server"
import { toDocumentJson } from "@/lib/documents"

// Public listing of published documents for the Resources and Transparency pages.
export async function GET() {
  try {
    const docs = await getConvex().query(api.documents.list, { secret: serverSecret() })
    return NextResponse.json(docs.map(toDocumentJson), {
      headers: { "Cache-Control": "public, max-age=0, s-maxage=60, stale-while-revalidate=300" },
    })
  } catch (error) {
    console.error("Resources API error:", error)
    return NextResponse.json({ error: "Failed to load resources" }, { status: 500 })
  }
}
