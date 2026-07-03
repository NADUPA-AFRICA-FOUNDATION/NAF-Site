import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

// Resolves a document id from the resources table and redirects to its file URL.
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    if (!id) {
      return NextResponse.json({ error: "File ID is required" }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin.from("resources").select("file_url").eq("id", id).single()
    const document = data as { file_url?: string } | null

    if (error || !document?.file_url) {
      return NextResponse.json({ error: "File not found" }, { status: 404 })
    }

    return NextResponse.redirect(document.file_url)
  } catch (error) {
    console.error("Error serving file:", error)
    return NextResponse.json({ error: "Failed to serve file" }, { status: 500 })
  }
}
