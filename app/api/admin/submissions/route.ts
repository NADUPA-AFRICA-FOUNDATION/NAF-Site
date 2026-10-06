import { type NextRequest, NextResponse } from "next/server"
import { api } from "@/convex/_generated/api"
import type { Id } from "@/convex/_generated/dataModel"
import { checkAdminAuth } from "@/lib/auth"
import { getConvex, serverSecret } from "@/lib/convex-server"

const KINDS = ["contact", "donation", "volunteer"] as const
const STATUSES = ["new", "reviewed", "archived"] as const
type Kind = (typeof KINDS)[number]
type Status = (typeof STATUSES)[number]

export async function GET(request: NextRequest) {
  const { user } = await checkAdminAuth()
  if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 })

  const kind = request.nextUrl.searchParams.get("kind") as Kind
  if (!KINDS.includes(kind)) return NextResponse.json({ error: "Invalid kind" }, { status: 400 })

  try {
    const items = await getConvex().query(api.submissions.list, { secret: serverSecret(), kind })
    return NextResponse.json({ items })
  } catch (error) {
    console.error("List submissions error:", error)
    return NextResponse.json({ error: "Could not load submissions" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  const { user } = await checkAdminAuth()
  if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 })

  const { id, status } = await request.json().catch(() => ({}))
  if (typeof id !== "string" || !STATUSES.includes(status)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  try {
    await getConvex().mutation(api.submissions.setStatus, {
      secret: serverSecret(),
      id: id as Id<"contactMessages">,
      status: status as Status,
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Update submission error:", error)
    return NextResponse.json({ error: "Could not update submission" }, { status: 500 })
  }
}
