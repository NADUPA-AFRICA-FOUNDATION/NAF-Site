import { NextResponse } from "next/server"
import { api } from "@/convex/_generated/api"
import { checkAdminAuth } from "@/lib/auth"
import { getConvex, serverSecret } from "@/lib/convex-server"

// Gives a signed-in admin a one-time URL to upload a file straight to Convex storage.
export async function POST() {
  const { user } = await checkAdminAuth()
  if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  try {
    const uploadUrl = await getConvex().mutation(api.files.generateUploadUrl, { secret: serverSecret() })
    return NextResponse.json({ uploadUrl })
  } catch (error) {
    console.error("Upload URL error:", error)
    return NextResponse.json({ error: "Could not start the upload - please try again" }, { status: 500 })
  }
}
