import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

// Public listing of published documents for the resources page.
// Read-only: only exposes display fields, never internal columns.
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("resources")
      .select("id, title, description, category, file_url, file_size, file_type, is_featured, created_at")
      .order("is_featured", { ascending: false })
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Resources fetch error:", error)
      return NextResponse.json({ error: "Failed to load resources" }, { status: 500 })
    }

    return NextResponse.json(data || [], {
      headers: { "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=600" },
    })
  } catch (error) {
    console.error("Resources API error:", error)
    return NextResponse.json({ error: "Failed to load resources" }, { status: 500 })
  }
}
