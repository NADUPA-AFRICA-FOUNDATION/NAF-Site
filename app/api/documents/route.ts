import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"
import { checkAdminAuth } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    // Check admin authentication
    const { user, error: authError } = await checkAdminAuth()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized - admin access required" }, { status: 401 })
    }

    const data = await request.json()

    // Validate required fields
    if (!data.title || !data.category || !data.file_url) {
      return NextResponse.json({ error: "Missing required fields: title, category, or file_url" }, { status: 400 })
    }

    // Only use columns that exist in the resources table
    const insertData = {
      title: data.title,
      description: data.description || "",
      category: data.category,
      file_url: data.file_url,
      file_size: data.file_size || "Unknown",
      file_type: data.file_type || "PDF",
      is_featured: data.is_featured || false,
      reference_links: data.file_url, // Use file_url as reference_links for compatibility
    }

    // Use supabaseAdmin to bypass RLS for admin operations
    const { data: document, error } = await supabaseAdmin.from("resources").insert([insertData]).select().single()

    if (error) {
      console.error("Supabase insert error:", error)
      return NextResponse.json({ error: `Database error: ${error.message}` }, { status: 500 })
    }

    // Log admin action
    console.log(`Admin ${user.email} uploaded document: ${data.title}`)

    return NextResponse.json(document)
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Failed to save document" }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Check admin authentication for listing documents
    const { user, error: authError } = await checkAdminAuth()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized - admin access required" }, { status: 401 })
    }

    // Use supabaseAdmin for consistent access
    const { data: documents, error } = await supabaseAdmin
      .from("resources")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Supabase select error:", error)
      return NextResponse.json({ error: `Database error: ${error.message}` }, { status: 500 })
    }

    return NextResponse.json(documents || [])
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 })
  }
}
