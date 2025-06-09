"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react"
import { submitContactForm } from "@/app/actions/contact"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(event.currentTarget)

    // Basic client-side validation
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    if (!firstName?.trim()) {
      setError("First name is required.")
      setIsSubmitting(false)
      return
    }

    if (!lastName?.trim()) {
      setError("Last name is required.")
      setIsSubmitting(false)
      return
    }

    if (!email?.trim()) {
      setError("Email address is required.")
      setIsSubmitting(false)
      return
    }

    if (!subject?.trim()) {
      setError("Subject is required.")
      setIsSubmitting(false)
      return
    }

    if (!message?.trim()) {
      setError("Message is required.")
      setIsSubmitting(false)
      return
    }

    try {
      console.log("Submitting contact form...")
      const result = await submitContactForm(formData)
      console.log("Form submission result:", result)

      if (result.success) {
        setIsSubmitted(true)
        toast({
          title: "Message Sent",
          description: result.message,
        })
        // Reset form
        if (formRef.current) {
          formRef.current.reset()
        }
      } else {
        setError(result.message)
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Form submission error:", error)
      const errorMessage = error instanceof Error ? error.message : "Something went wrong. Please try again."
      setError(errorMessage)
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-emerald-600" />
        </div>
        <h3 className="text-2xl font-bold text-stone-800 mb-4">Message Sent!</h3>
        <p className="text-stone-600 mb-6">Thank you for contacting us. We'll get back to you within 24 hours.</p>
        <Button
          onClick={() => {
            setIsSubmitted(false)
            setError(null)
          }}
          variant="outline"
          className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
        >
          Send Another Message
        </Button>
      </div>
    )
  }

  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-red-800">Error</h4>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-stone-700 mb-2">
              First Name <span className="text-red-500">*</span>
            </label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              required
              className="border-stone-300 focus:border-emerald-500 focus:ring-emerald-500"
              placeholder="Enter your first name"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-stone-700 mb-2">
              Last Name <span className="text-red-500">*</span>
            </label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              required
              className="border-stone-300 focus:border-emerald-500 focus:ring-emerald-500"
              placeholder="Enter your last name"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            className="border-stone-300 focus:border-emerald-500 focus:ring-emerald-500"
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-2">
            Phone Number
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+254 XXX XXX XXX"
            className="border-stone-300 focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-stone-700 mb-2">
            Subject <span className="text-red-500">*</span>
          </label>
          <Input
            id="subject"
            name="subject"
            type="text"
            required
            className="border-stone-300 focus:border-emerald-500 focus:ring-emerald-500"
            placeholder="What is this message about?"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">
            Message <span className="text-red-500">*</span>
          </label>
          <Textarea
            id="message"
            name="message"
            rows={6}
            required
            className="border-stone-300 focus:border-emerald-500 focus:ring-emerald-500"
            placeholder="Tell us how we can help you or how you'd like to get involved with our mission..."
          />
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg transition-all duration-300"
          disabled={isSubmitting}
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
      <Toaster />
    </>
  )
}
