import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { api } from "@/convex/_generated/api"
import { checkAdminAuth } from "@/lib/auth"
import { getConvex, serverSecret } from "@/lib/convex-server"
import { isPageKey, mergeWithDefaults, PAGES, sanitizeContent } from "@/lib/cms/registry"

type Params = { params: Promise<{ key: string }> }

function refreshPublicPages(path: string | null) {
  // Site settings appear on every page (navigation, footer)
  if (path === null) revalidatePath("/", "layout")
  else revalidatePath(path)
}

export async function GET(_request: NextRequest, { params }: Params) {
  const { user } = await checkAdminAuth()
  if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  const { key } = await params
  if (!isPageKey(key)) return NextResponse.json({ error: "Unknown page" }, { status: 404 })

  try {
    const page = PAGES[key]
    const row = await getConvex().query(api.siteContent.get, { secret: serverSecret(), key })
    return NextResponse.json({
      content: row ? mergeWithDefaults(page.defaults, row.content) : page.defaults,
      updatedAt: row?.updatedAt ?? null,
      updatedBy: row?.updatedBy ?? null,
    })
  } catch (error) {
    console.error("Load content error:", error)
    return NextResponse.json({ error: "Could not load page content" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  const { user } = await checkAdminAuth()
  if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  const { key } = await params
  if (!isPageKey(key)) return NextResponse.json({ error: "Unknown page" }, { status: 404 })

  const body = await request.json().catch(() => null)
  let content
  try {
    content = sanitizeContent(PAGES[key], body?.content)
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid content" }, { status: 400 })
  }

  try {
    await getConvex().mutation(api.siteContent.save, { secret: serverSecret(), key, content, updatedBy: user.email })
    refreshPublicPages(PAGES[key].path)
    return NextResponse.json({ success: true, updatedAt: Date.now(), updatedBy: user.email })
  } catch (error) {
    console.error("Save content error:", error)
    return NextResponse.json({ error: "Could not save - please try again" }, { status: 500 })
  }
}

// Restores the page to the content that ships with the site.
export async function DELETE(_request: NextRequest, { params }: Params) {
  const { user } = await checkAdminAuth()
  if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  const { key } = await params
  if (!isPageKey(key)) return NextResponse.json({ error: "Unknown page" }, { status: 404 })

  try {
    await getConvex().mutation(api.siteContent.reset, { secret: serverSecret(), key })
    refreshPublicPages(PAGES[key].path)
    return NextResponse.json({ success: true, content: PAGES[key].defaults })
  } catch (error) {
    console.error("Reset content error:", error)
    return NextResponse.json({ error: "Could not reset - please try again" }, { status: 500 })
  }
}
