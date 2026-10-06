import { NextResponse } from "next/server"
import { api } from "@/convex/_generated/api"
import { checkAdminAuth } from "@/lib/auth"
import { getConvex, serverSecret } from "@/lib/convex-server"
import { PAGES } from "@/lib/cms/registry"

// Lists editable pages with their last-edited info.
export async function GET() {
  const { user } = await checkAdminAuth()
  if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 })

  try {
    const meta = await getConvex().query(api.siteContent.listMeta, { secret: serverSecret() })
    const byKey = new Map(meta.map((m) => [m.key, m]))
    return NextResponse.json({
      pages: Object.values(PAGES).map((page) => ({
        key: page.key,
        label: page.label,
        path: page.path,
        updatedAt: byKey.get(page.key)?.updatedAt ?? null,
        updatedBy: byKey.get(page.key)?.updatedBy ?? null,
      })),
    })
  } catch (error) {
    console.error("List content error:", error)
    return NextResponse.json({ error: "Could not load pages" }, { status: 500 })
  }
}
