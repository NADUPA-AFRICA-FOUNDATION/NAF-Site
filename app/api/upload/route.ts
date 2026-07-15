import { NextResponse } from "next/server"
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client"
import { checkAdminAuth } from "@/lib/auth"

const MAX_UPLOAD_BYTES = 10 * 1024 * 1024 // 10MB

// Token exchange for client-side uploads to Vercel Blob. The browser uploads
// directly to Blob storage, so files are not subject to the ~4.5MB request
// body limit of serverless functions.
export async function POST(request: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      {
        error:
          "File storage is not configured - connect a Blob store to this project in Vercel (Storage tab) so BLOB_READ_WRITE_TOKEN is set",
      },
      { status: 503 },
    )
  }

  const body = (await request.json()) as HandleUploadBody

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        const { user, error: authError } = await checkAdminAuth()
        if (authError || !user) {
          throw new Error("Unauthorized - admin access required")
        }

        return {
          allowedContentTypes: ["application/pdf"],
          maximumSizeInBytes: MAX_UPLOAD_BYTES,
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({ email: user.email }),
        }
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Called via webhook after the upload finishes (production only,
        // Vercel cannot reach localhost). Used purely for audit logging.
        try {
          const { email } = JSON.parse(tokenPayload || "{}") as { email?: string }
          console.log(`Admin ${email || "unknown"} uploaded file: ${blob.pathname}`)
        } catch {
          console.log(`Upload completed: ${blob.pathname}`)
        }
      },
    })

    return NextResponse.json(jsonResponse)
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed" },
      { status: 400 },
    )
  }
}
