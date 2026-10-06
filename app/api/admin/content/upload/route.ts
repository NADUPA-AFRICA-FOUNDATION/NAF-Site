import { type NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"
import crypto from "crypto"
import { checkAdminAuth } from "@/lib/auth"

const MAX_BYTES = 5 * 1024 * 1024

// Identify the image by its first bytes rather than trusting the browser's type
function detectImage(bytes: Uint8Array): { ext: string; type: string } | null {
  const hex = Buffer.from(bytes.slice(0, 12)).toString("hex")
  if (hex.startsWith("ffd8ff")) return { ext: "jpg", type: "image/jpeg" }
  if (hex.startsWith("89504e470d0a1a0a")) return { ext: "png", type: "image/png" }
  if (hex.startsWith("52494646") && hex.slice(16, 24) === "57454250") return { ext: "webp", type: "image/webp" }
  if (hex.slice(8, 24) === "6674797061766966") return { ext: "avif", type: "image/avif" }
  return null
}

// Image uploads for page content (admin only).
export async function POST(request: NextRequest) {
  const { user } = await checkAdminAuth()
  if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 })

  try {
    const file = (await request.formData()).get("file")
    if (!(file instanceof File)) return NextResponse.json({ error: "No file provided" }, { status: 400 })
    if (file.size > MAX_BYTES) return NextResponse.json({ error: "Images must be under 5 MB" }, { status: 400 })

    const bytes = new Uint8Array(await file.arrayBuffer())
    const image = detectImage(bytes)
    if (!image) return NextResponse.json({ error: "Upload a JPG, PNG, WebP or AVIF image" }, { status: 400 })

    const blob = await put(`site-images/${crypto.randomUUID()}.${image.ext}`, Buffer.from(bytes), {
      access: "public",
      contentType: image.type,
    })
    return NextResponse.json({ url: blob.url })
  } catch (error) {
    console.error("Image upload error:", error)
    return NextResponse.json({ error: "Upload failed - please try again" }, { status: 500 })
  }
}
