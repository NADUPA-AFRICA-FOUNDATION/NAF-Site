import { NextResponse } from "next/server"
import { isAdminAuthConfigured, isGoogleSignInConfigured } from "@/lib/admin-session"

// Which sign-in methods the login page should offer.
export async function GET() {
  return NextResponse.json({ configured: isAdminAuthConfigured(), google: isGoogleSignInConfigured() })
}
