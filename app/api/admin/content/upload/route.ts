import { type NextRequest, NextResponse } from "next/server"
import { api } from "@/convex/_generated/api"
import type { Id } from "@/convex/_generated/dataModel"
import { checkAdminAuth } from "@/lib/auth"
import { getConvex, serverSecret } from "@/lib/convex-server"

// Confirms an image uploaded to Convex storage really is an image and returns its URL.
export async function POST(request: NextRequest) {
  const { user } = await checkAdminAuth()
  if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 })

  const { storageId } = await request.json().catch(() => ({}))
  if (typeof storageId !== "string") return NextResponse.json({ error: "No file provided" }, { status: 400 })

  try {
    const check = await getConvex().action(api.files.verifyUpload, {
      secret: serverSecret(),
      storageId: storageId as Id<"_storage">,
      kind: "image",
    })
    if (!check.ok) return NextResponse.json({ error: check.error }, { status: 400 })
    return NextResponse.json({ url: check.url })
  } catch (error) {
    console.error("Image upload error:", error)
    return NextResponse.json({ error: "Upload failed - please try again" }, { status: 500 })
  }
}
