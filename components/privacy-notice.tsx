import Link from "next/link"

// Shown on every form at the point of collection (Data Protection Act, 2019, s.29).
export function PrivacyNotice({ purpose }: { purpose: string }) {
  return (
    <p className="text-xs text-stone-500 leading-relaxed">
      We use the details you give us only to {purpose}, and keep them only as long as that purpose requires. They are
      stored with our service providers outside Kenya. See our{" "}
      <Link href="/privacy" className="text-emerald-700 underline hover:text-emerald-800">
        Privacy Policy
      </Link>{" "}
      for your rights, including access and deletion.
    </p>
  )
}
