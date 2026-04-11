"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react"
import { submitVolunteerForm } from "@/app/actions/volunteer"

export function VolunteerApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const areasOfInterest = [
    { id: "education", label: "Education Support" },
    { id: "health", label: "Health & Wellness" },
    { id: "environment", label: "Environmental Conservation" },
    { id: "community", label: "Community Development" },
    { id: "agriculture", label: "Sustainable Agriculture" },
    { id: "technology", label: "Technology & Digital Skills" },
    { id: "arts", label: "Arts & Culture" },
    { id: "fundraising", label: "Fundraising & Events" },
  ]

  const skillOptions = [
    { id: "teaching", label: "Teaching" },
    { id: "medical", label: "Medical/Healthcare" },
    { id: "agriculture", label: "Agriculture" },
    { id: "construction", label: "Construction" },
    { id: "technology", label: "Technology/IT" },
    { id: "management", label: "Project Management" },
    { id: "languages", label: "Languages/Translation" },
    { id: "fundraising", label: "Fundraising" },
    { id: "photography", label: "Photography/Videography" },
    { id: "writing", label: "Writing/Communication" },
    { id: "counseling", label: "Counseling" },
    { id: "accounting", label: "Accounting/Finance" },
  ]

  const daysOfWeek = [
    { id: "monday", label: "Monday" },
    { id: "tuesday", label: "Tuesday" },
    { id: "wednesday", label: "Wednesday" },
    { id: "thursday", label: "Thursday" },
    { id: "friday", label: "Friday" },
    { id: "saturday", label: "Saturday" },
    { id: "sunday", label: "Sunday" },
  ]

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(event.currentTarget)

    // Add checkbox arrays to form data
    selectedInterests.forEach((interest) => formData.append("areaOfInterest", interest))
    selectedAvailability.forEach((day) => formData.append("availability", day))
    selectedSkills.forEach((skill) => formData.append("skills", skill))
    formData.append("agreeToTerms", agreeToTerms.toString())

    try {
      const result = await submitVolunteerForm(formData)

      if (result.success) {
        setIsSubmitted(true)
        toast({
          title: "Application Submitted",
          description: result.message,
        })
        // Reset form
        event.currentTarget.reset()
        setSelectedInterests([])
        setSelectedAvailability([])
        setSelectedSkills([])
        setAgreeToTerms(false)
      } else {
        setError(result.message)
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
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

  const handleCheckboxChange = (value: string, checked: boolean, type: "interest" | "availability" | "skills") => {
    if (type === "interest") {
      setSelectedInterests((prev) => (checked ? [...prev, value] : prev.filter((item) => item !== value)))
    } else if (type === "availability") {
      setSelectedAvailability((prev) => (checked ? [...prev, value] : prev.filter((item) => item !== value)))
    } else if (type === "skills") {
      setSelectedSkills((prev) => (checked ? [...prev, value] : prev.filter((item) => item !== value)))
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-emerald-600" />
        </div>
        <h3 className="text-2xl font-bold text-stone-800 mb-4">Application Submitted!</h3>
        <p className="text-stone-600 mb-6">
          Thank you for your interest in volunteering with NADUPA AFRICA FOUNDATION. Our team will review your
          application and contact you within 5-7 business days.
        </p>
        <Button
          onClick={() => {
            setIsSubmitted(false)
            setError(null)
          }}
          variant="outline"
          className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
        >
          Submit Another Application
        </Button>
      </div>
    )
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-8">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-red-800">Error</h4>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Personal Information */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-stone-800 border-b border-stone-200 pb-2">Personal Information</h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-stone-700 mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <Input id="firstName" name="firstName" placeholder="Enter your first name" maxLength={100} required />
              <p className="text-xs text-stone-500 mt-1">Maximum 100 characters</p>
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-stone-700 mb-2">
                Last Name <span className="text-red-500">*</span>
              </label>
              <Input id="lastName" name="lastName" placeholder="Enter your last name" maxLength={100} required />
              <p className="text-xs text-stone-500 mt-1">Maximum 100 characters</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <Input id="email" name="email" type="email" placeholder="your.email@example.com" required />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-2">
                Phone Number
              </label>
              <Input id="phone" name="phone" placeholder="+254 796093465" />
            </div>
          </div>
        </div>

        {/* Volunteer Information */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-stone-800 border-b border-stone-200 pb-2">Volunteer Information</h3>

          <div>
            <label htmlFor="motivation" className="block text-sm font-medium text-stone-700 mb-2">
              Why do you want to volunteer? <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="motivation"
              name="motivation"
              placeholder="Tell us about your motivation to volunteer with NADUPA AFRICA FOUNDATION..."
              className="min-h-32"
              maxLength={2000}
              required
            />
            <p className="text-xs text-stone-500 mt-1">Maximum 2000 characters</p>
          </div>

          <div className="space-y-4">
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-stone-700">
                  Areas of Interest <span className="text-red-500">*</span>
                </label>
                <p className="text-sm text-stone-500">Select all areas where you'd like to contribute.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {areasOfInterest.map((item) => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`interest-${item.id}`}
                      checked={selectedInterests.includes(item.id)}
                      onCheckedChange={(checked) => handleCheckboxChange(item.id, checked as boolean, "interest")}
                    />
                    <label
                      htmlFor={`interest-${item.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {item.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-stone-700">
                  Availability <span className="text-red-500">*</span>
                </label>
                <p className="text-sm text-stone-500">Select the days you're available to volunteer.</p>
              </div>
              <div className="grid md:grid-cols-4 gap-3">
                {daysOfWeek.map((day) => (
                  <div key={day.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`day-${day.id}`}
                      checked={selectedAvailability.includes(day.id)}
                      onCheckedChange={(checked) => handleCheckboxChange(day.id, checked as boolean, "availability")}
                    />
                    <label
                      htmlFor={`day-${day.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {day.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-stone-700">Skills & Expertise</label>
                <p className="text-sm text-stone-500">Select all skills that you can contribute.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-3">
                {skillOptions.map((skill) => (
                  <div key={skill.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`skill-${skill.id}`}
                      checked={selectedSkills.includes(skill.id)}
                      onCheckedChange={(checked) => handleCheckboxChange(skill.id, checked as boolean, "skills")}
                    />
                    <label
                      htmlFor={`skill-${skill.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {skill.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="additionalInfo" className="block text-sm font-medium text-stone-700 mb-2">
              Additional Information
            </label>
            <Textarea
              id="additionalInfo"
              name="additionalInfo"
              placeholder="Is there anything else you'd like us to know about you?"
              className="min-h-24"
            />
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="space-y-4 border-t border-stone-200 pt-6">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="agreeToTerms"
              checked={agreeToTerms}
              onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
            />
            <div>
              <label
                htmlFor="agreeToTerms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                I agree to the terms and conditions <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-stone-500 mt-1">
                By checking this box, you agree to our volunteer policies, code of conduct, and privacy policy.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700"
            disabled={
              isSubmitting || selectedInterests.length === 0 || selectedAvailability.length === 0 || !agreeToTerms
            }
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
        </div>
      </form>
      <Toaster />
    </>
  )
}
