import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    // Return a response that will trigger client-side handling
    return NextResponse.json({
      id,
      success: true,
      message: "Use client-side storage to access this file",
    })
  } catch (error) {
    console.error("Error serving file:", error)
    return NextResponse.json({ error: "File not found" }, { status: 404 })
  }
}
