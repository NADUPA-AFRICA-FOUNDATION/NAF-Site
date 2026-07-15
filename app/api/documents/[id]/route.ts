import { type NextRequest, NextResponse } from "next/server"
import { del } from "@vercel/blob"
import { supabaseAdmin } from "@/lib/supabase"
import { checkAdminAuth } from "@/lib/auth"

function isVercelBlobUrl(url: string): boolean {
  try {
    return new URL(url).hostname.endsWith(".blob.vercel-storage.com")
  } catch {
    return false
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Check admin authentication
    const { user, error: authError } = await checkAdminAuth()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized - admin access required" }, { status: 401 })
    }

    const { id } = await params

    if (!id) {
      return NextResponse.json({ error: "Document ID is required" }, { status: 400 })
    }

    // First get the document to get the file URL for cleanup
    const { data: document, error: fetchError } = await supabaseAdmin
      .from("resources")
      .select("file_url, title")
      .eq("id", id)
      .single()

    if (fetchError) {
      console.error("Error fetching document:", fetchError)
      return NextResponse.json({ error: "Document not found" }, { status: 404 })
    }

    // Delete from database
    const { error: deleteError } = await supabaseAdmin.from("resources").delete().eq("id", id)

    if (deleteError) {
      console.error("Error deleting document:", deleteError)
      return NextResponse.json({ error: `Failed to delete document: ${deleteError.message}` }, { status: 500 })
    }

    // Remove the file from Blob storage so deleted documents stop being
    // publicly downloadable. Non-fatal: the database row is already gone.
    if (document.file_url && isVercelBlobUrl(document.file_url) && process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        await del(document.file_url)
      } catch (blobError) {
        console.error(`Blob cleanup failed for ${document.file_url}:`, blobError)
      }
    }

    // Log admin action
    console.log(`Admin ${user.email} deleted document: ${document.title}`)

    return NextResponse.json({ success: true, message: "Document deleted successfully" })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Failed to delete document" }, { status: 500 })
  }
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Check admin authentication
    const { user, error: authError } = await checkAdminAuth()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized - admin access required" }, { status: 401 })
    }

    const { id } = await params

    if (!id) {
      return NextResponse.json({ error: "Document ID is required" }, { status: 400 })
    }

    const { data: document, error } = await supabaseAdmin.from("resources").select("*").eq("id", id).single()

    if (error) {
      console.error("Supabase select error:", error)
      return NextResponse.json({ error: `Database error: ${error.message}` }, { status: 500 })
    }

    return NextResponse.json(document)
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Failed to fetch document" }, { status: 500 })
  }
}
