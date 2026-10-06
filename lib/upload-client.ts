// Browser-side helper: uploads a file straight to Convex storage using a
// one-time URL from the server, and returns its storage id.
export async function uploadToConvex(file: File): Promise<string> {
  const urlResponse = await fetch("/api/admin/upload-url", { method: "POST" })
  const urlResult = await urlResponse.json().catch(() => ({}))
  if (!urlResponse.ok) throw new Error(urlResult.error || "Could not start the upload")

  const upload = await fetch(urlResult.uploadUrl, {
    method: "POST",
    headers: { "Content-Type": file.type || "application/octet-stream" },
    body: file,
  })
  if (!upload.ok) throw new Error("Upload failed - please try again")
  const { storageId } = await upload.json()
  return storageId
}
