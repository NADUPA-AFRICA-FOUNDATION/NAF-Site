import type { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"
import { getContent } from "@/lib/cms/content"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Terms and Conditions | NADUPA AFRICA FOUNDATION",
  description:
    "Terms and Conditions for NADUPA Africa Foundation - governing the use of our website, volunteer programs, donations, and services.",
  keywords: "terms, conditions, legal, volunteer, donation, Kenya, NGO, NADUPA",
}

export default async function TermsPage() {
  return <LegalPage content={await getContent("terms")} />
}
