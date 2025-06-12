import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import PrivacyClientPage from "./PrivacyClientPage"

export const metadata = {
  title: "Privacy Policy - NADUPA AFRICA FOUNDATION",
  description: "Our commitment to protecting your privacy and personal data",
}

export default function PrivacyPage() {
  return (
    <>
      <Navigation />
      <PrivacyClientPage />
      <Footer />
    </>
  )
}
