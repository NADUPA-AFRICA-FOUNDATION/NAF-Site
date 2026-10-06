"use client"

import { PrivacyNotice } from "@/components/privacy-notice"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { CheckCircle2, CreditCard, Loader2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { submitDonationInterest } from "@/app/actions/donation"

export function DonationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [donationAmount, setDonationAmount] = useState("50")
  const [showCustomAmount, setShowCustomAmount] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("creditCard")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)

    // Add additional form data
    formData.append("donationAmount", donationAmount)
    formData.append("paymentMethod", paymentMethod)

    try {
      const result = await submitDonationInterest(formData)

      if (result.success) {
        setIsSubmitted(true)
        toast({
          title: "Donation Interest Submitted",
          description: result.message,
        })
        // The success view replaces the form, so only the controlled fields need clearing
        setDonationAmount("50")
        setShowCustomAmount(false)
        setPaymentMethod("creditCard")
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Form submission error:", error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAmountSelect = (amount: string) => {
    setDonationAmount(amount)
    setShowCustomAmount(amount === "custom")
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-emerald-600" />
        </div>
        <h3 className="text-2xl font-bold text-stone-800 mb-4">Thank You for Your Interest!</h3>
        <p className="text-stone-600 mb-6">
          We've received your donation interest. Our team will contact you with payment details shortly.
        </p>
        <Button
          onClick={() => setIsSubmitted(false)}
          variant="outline"
          className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
        >
          Submit Another Interest
        </Button>
      </div>
    )
  }

  return (
    <>
      <form method="post" onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-stone-700 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <Input id="fullName" name="fullName" placeholder="Enter your full name" required />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <Input id="email" name="email" type="email" placeholder="your.email@example.com" required />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-stone-700">
              Donation Amount <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {["25", "50", "100", "250", "custom"].map((amount) => (
                <div key={amount}>
                  <button
                    type="button"
                    onClick={() => handleAmountSelect(amount)}
                    className={`w-full border rounded-md p-4 text-center transition-colors ${
                      donationAmount === amount
                        ? "border-emerald-600 bg-emerald-50"
                        : "hover:border-emerald-600 hover:bg-emerald-50"
                    }`}
                  >
                    <span className="text-lg font-semibold">{amount === "custom" ? "Custom" : `$${amount}`}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {showCustomAmount && (
            <div>
              <label htmlFor="customAmount" className="block text-sm font-medium text-stone-700 mb-2">
                Custom Amount <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500">$</span>
                <Input
                  id="customAmount"
                  name="customAmount"
                  type="number"
                  min="1"
                  step="any"
                  placeholder="Enter amount"
                  className="pl-8"
                />
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-stone-700">
              Payment Method <span className="text-red-500">*</span>
            </label>
            <Tabs value={paymentMethod} onValueChange={setPaymentMethod} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="creditCard">Credit Card</TabsTrigger>
                <TabsTrigger value="paypal">PayPal</TabsTrigger>
                <TabsTrigger value="mpesa">M-Pesa</TabsTrigger>
              </TabsList>
              <TabsContent value="creditCard" className="mt-4 border rounded-md p-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-stone-600 mb-2">
                    <CreditCard className="w-5 h-5" />
                    <span>Credit Card Payment</span>
                  </div>
                  <p className="text-sm text-stone-500">
                    We'll contact you with secure payment details for credit card processing.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="paypal" className="mt-4 border rounded-md p-4">
                <div className="text-center py-4">
                  <p className="text-stone-600 mb-4">
                    We'll send you a PayPal payment request to complete your donation.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="mpesa" className="mt-4 border rounded-md p-4">
                <div className="space-y-4">
                  <p className="text-stone-600">We'll send you M-Pesa payment instructions to your phone number.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <PrivacyNotice purpose="arrange your donation" />

        <div className="pt-4">
          <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? "Processing..." : "Submit Donation Interest"}
          </Button>
        </div>
      </form>
      <Toaster />
    </>
  )
}
