import type { Metadata } from "next"
import TermsClientPage from "./TermsClientPage"

export const metadata: Metadata = {
  title: "Terms and Conditions | NADUPA AFRICA FOUNDATION",
  description:
    "Terms and Conditions for NADUPA Africa Foundation - governing the use of our website, volunteer programs, donations, and services.",
  keywords: "terms, conditions, legal, volunteer, donation, Kenya, NGO, NADUPA",
}

export default function TermsPage() {
  return <TermsClientPage />
}
