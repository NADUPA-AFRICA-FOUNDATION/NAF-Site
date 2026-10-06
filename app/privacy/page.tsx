import type { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"
import { getContent } from "@/lib/cms/content"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Privacy Policy - NADUPA AFRICA FOUNDATION",
  description: "Our commitment to protecting your privacy and personal data",
}

export default async function PrivacyPage() {
  return <LegalPage content={await getContent("privacy")} />
}
