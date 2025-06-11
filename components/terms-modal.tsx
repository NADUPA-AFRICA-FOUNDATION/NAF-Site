"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ExternalLink, FileText, Scale } from "lucide-react"
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
                that participation involves certain risks. Donations are non-refundable and will be used for our
                mission. We protect your privacy and intellectual property rights.
              </p>
            </div>

            {/* Key Points */}
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">🔒 Your Commitments:</h4>
                <ul className="text-sm space-y-1 text-stone-600">
                  <li>• Treat all individuals with respect and dignity</li>
                  <li>• Follow our volunteer code of conduct</li>
                  <li>• Use our website responsibly and legally</li>
                  <li>• Provide accurate information in all forms</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">💰 Donations:</h4>
                <ul className="text-sm space-y-1 text-stone-600">
                  <li>• All donations are voluntary and generally non-refundable</li>
                  <li>• Funds support our mission and programs in Kenya</li>
                  <li>• We maintain transparency in financial reporting</li>
                  <li>• Tax receipts provided where applicable</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">🛡️ Privacy & Safety:</h4>
                <ul className="text-sm space-y-1 text-stone-600">
                  <li>• Your personal information is protected and secure</li>
                  <li>• We don't share data without your consent</li>
                  <li>• Volunteer activities involve inherent risks</li>
                  <li>• Insurance coverage is your responsibility</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">⚖️ Legal Framework:</h4>
                <ul className="text-sm space-y-1 text-stone-600">
                  <li>• Governed by the laws of the Republic of Kenya</li>
                  <li>• Disputes resolved through Kenyan legal system</li>
                  <li>• Terms may be updated with notice</li>
                  <li>• Continued use implies acceptance of changes</li>
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
