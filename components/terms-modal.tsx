"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ExternalLink, FileText, HandCoins, Lock, Scale, ShieldCheck } from "lucide-react"
import Link from "next/link"

interface TermsModalProps {
  trigger?: React.ReactNode
  children?: React.ReactNode
}

export function TermsModal({ trigger, children }: TermsModalProps) {
  const [open, setOpen] = useState(false)

  const defaultTrigger = (
    <button type="button" className="text-emerald-600 hover:text-emerald-700 underline text-sm">
      Terms and Conditions
    </button>
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-emerald-600" />
            Terms and Conditions Summary
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6">
            {/* Quick Summary */}
            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
              <h3 className="font-semibold text-emerald-800 mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Quick Summary
              </h3>
              <p className="text-emerald-700 text-sm">
                By using our services, you agree to treat everyone with respect, follow our guidelines, and understand
                that volunteering involves some risks. Donations are voluntary and support our mission. We handle your
                personal data under Kenya&apos;s Data Protection Act, 2019.
              </p>
            </div>

            {/* Key Points */}
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-600 motion-safe:animate-icon-bob" aria-hidden="true" />
                  Your Commitments:
                </h4>
                <ul className="text-sm space-y-1 text-stone-600">
                  <li>• Treat all individuals with respect and dignity</li>
                  <li>• Follow our volunteer code of conduct</li>
                  <li>• Use our website responsibly and legally</li>
                  <li>• Provide accurate information in all forms</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <HandCoins className="w-4 h-4 text-emerald-600 motion-safe:animate-icon-sway" aria-hidden="true" />
                  Donations:
                </h4>
                <ul className="text-sm space-y-1 text-stone-600">
                  <li>• This website does not take payments; we contact you to arrange your gift</li>
                  <li>• Funds support our mission and programs in Kenya</li>
                  <li>• Gifts made in error are refunded if you tell us within 30 days</li>
                  <li>• Our tax-exempt status is pending</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 motion-safe:animate-icon-beat" aria-hidden="true" />
                  Privacy & Safety:
                </h4>
                <ul className="text-sm space-y-1 text-stone-600">
                  <li>• We use your details only for the purpose you gave them</li>
                  <li>• We share them only with the service providers that run this site, or where the law requires</li>
                  <li>• Volunteer activities involve some risks</li>
                  <li>• Volunteers arrange their own travel and health insurance</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-emerald-600 motion-safe:animate-icon-sway" aria-hidden="true" />
                  Legal Framework:
                </h4>
                <ul className="text-sm space-y-1 text-stone-600">
                  <li>• Governed by the laws of the Republic of Kenya</li>
                  <li>• Disputes are resolved under the Kenyan legal system</li>
                  <li>• We may update these terms; the current version is always on our website</li>
                  <li>• Nothing limits your rights under the Consumer Protection Act, 2012</li>
                </ul>
              </div>
            </div>

            {/* Organization Info */}
            <div className="bg-stone-50 p-4 rounded-lg border">
              <h4 className="font-semibold mb-2">Organization Details:</h4>
              <div className="text-sm space-y-1 text-stone-600">
                <p>
                  <strong>Name:</strong> NADUPA AFRICA FOUNDATION
                </p>
                <p>
                  <strong>Registration:</strong> NGO-6DF3EM
                </p>
                <p>
                  <strong>Location:</strong> Kajiado-West, Kajiado County, Kenya
                </p>
                <p>
                  <strong>Effective Date:</strong> June 11, 2025
                </p>
              </div>
            </div>

            {/* Full Terms Link */}
            <div className="text-center pt-4 border-t">
              <Link
                href="/terms"
                target="_blank"
                className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium"
              >
                <ExternalLink className="w-4 h-4" />
                Read Full Terms and Conditions
              </Link>
              <p className="text-xs text-stone-500 mt-2">Opens in a new tab for detailed review</p>
            </div>
          </div>
        </ScrollArea>
        <div className="flex justify-end pt-4 border-t">
          <Button onClick={() => setOpen(false)} className="bg-emerald-600 hover:bg-emerald-700">
            I Understand
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
