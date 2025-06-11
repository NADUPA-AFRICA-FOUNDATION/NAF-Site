"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { AlertCircle, CheckCircle2, Database, ExternalLink, Loader2 } from "lucide-react"
import { submitVolunteerApplication } from "@/app/actions/volunteer-application"

const AREAS_OF_INTEREST = [
  { id: "education", label: "Education & Training" },
  { id: "health", label: "Health & Wellness" },
  { id: "environment", label: "Environmental Conservation" },
  { id: "community", label: "Community Development" },
  { id: "agriculture", label: "Sustainable Agriculture" },
  { id: "technology", label: "Technology & Digital Skills" },
  { id: "arts", label: "Arts & Culture" },
  { id: "fundraising", label: "Fundraising & Events" },
]

const SKILLS = [
  { id: "teaching", label: "Teaching" },
  { id: "healthcare", label: "Healthcare" },
  { id: "agriculture", label: "Agriculture" },
  { id: "construction", label: "Construction" },
  { id: "technology", label: "Technology/IT" },
  { id: "management", label: "Project Management" },
  { id: "languages", label: "Languages" },
  { id: "fundraising", label: "Fundraising" },
  { id: "photography", label: "Photography/Video" },
  { id: "writing", label: "Writing/Communication" },
  { id: "counseling", label: "Counseling" },
  { id: "finance", label: "Finance/Accounting" },
]

const AVAILABILITY = [
  { id: "monday", label: "Monday" },
  { id: "tuesday", label: "Tuesday" },
  { id: "wednesday", label: "Wednesday" },
  { id: "thursday", label: "Thursday" },
  { id: "friday", label: "Friday" },
  { id: "saturday", label: "Saturday" },
  { id: "sunday", label: "Sunday" },
]

export function VolunteerApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [needsSetup, setNeedsSetup] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  // Form state
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([])
  const [agreeToTerms, setAgreeToTerms] = useState(false)

  const handleInterestChange = (interestId: string, checked: boolean) => {
    setSelectedInterests((prev) => (checked ? [...prev, interestId] : prev.filter((id) => id !== interestId)))
  }

  const handleSkillChange = (skillId: string, checked: boolean) => {
    setSelectedSkills((prev) => (checked ? [...prev, skillId] : prev.filter((id) => id !== skillId)))
  }

  const handleAvailabilityChange = (dayId: string, checked: boolean) => {
    setSelectedAvailability((prev) => (checked ? [...prev, dayId] : prev.filter((id) => id !== dayId)))
  }

  const validateForm = (formData: FormData): Record<string, string> => {
    const errors: Record<string, string> = {}

    const firstName = formData.get("firstName")?.toString().trim() || ""
    const lastName = formData.get("lastName")?.toString().trim() || ""
    const email = formData.get("email")?.toString().trim() || ""
    const motivation = formData.get("motivation")?.toString().trim() || ""

    if (!firstName) errors.firstName = "First name is required"
    if (!lastName) errors.lastName = "Last name is required"
    if (!email) errors.email = "Email is required"
    if (!motivation) errors.motivation = "Motivation is required"
    if (motivation && motivation.length < 10) {
      errors.motivation = "Please provide at least 10 characters explaining your motivation"
    }
    if (selectedInterests.length === 0) {
      errors.areasOfInterest = "Please select at least one area of interest"
    }
    if (selectedAvailability.length === 0) {
      errors.availability = "Please select at least one day of availability"
    }
    if (!agreeToTerms) {
      errors.agreeToTerms = "You must agree to the terms and conditions"
    }

    return errors
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setNeedsSetup(false)
    setValidationErrors({})

    const formData = new FormData(event.currentTarget)

    // Add checkbox data
    selectedInterests.forEach((interest) => formData.append("areasOfInterest", interest))
    selectedAvailability.forEach((day) => formData.append("availability", day))
    selectedSkills.forEach((skill) => formData.append("skills", skill))
    formData.append("agreeToTerms", agreeToTerms.toString())

    // Client-side validation
    const clientErrors = validateForm(formData)
    if (Object.keys(clientErrors).length > 0) {
      setValidationErrors(clientErrors)
      setError("Please fix the errors below and try again.")
      setIsSubmitting(false)
      return
    }

    try {
      const result = await submitVolunteerApplication(formData)

      if (result.success) {
        setIsSubmitted(true)
        toast({
          title: "Application Submitted!",
          description: result.message,
        })
      } else {
        if ((result as any).needsSetup) {
          setNeedsSetup(true)
        }
        setError(result.message)

        // Handle validation errors from server
        if ((result as any).validationErrors) {
          const serverErrors: Record<string, string> = {}
          ;(result as any).validationErrors.forEach((err: any) => {
            if (err.path && err.path.length > 0) {
              serverErrors[err.path[0]] = err.message
            }
          })
          setValidationErrors(serverErrors)
        }

        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred"
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

  const resetForm = () => {
    setIsSubmitted(false)
    setError(null)
    setValidationErrors({})
    setSelectedInterests([])
    setSelectedSkills([])
    setSelectedAvailability([])
    setAgreeToTerms(false)
  }

  // Database setup required
  if (needsSetup) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <Database className="w-12 h-12 text-red-600" />
            <h3 className="text-xl font-bold text-red-800">Database Setup Required</h3>
            <p className="text-red-700">
              The volunteer application system needs to be set up. Please run the database setup script.
            </p>
            <div className="bg-white p-4 rounded-lg border border-red-200 text-left w-full max-w-md">
              <h4 className="font-semibold text-red-800 mb-2">Setup Instructions:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-red-700">
                <li>Open your Supabase dashboard</li>
                <li>Go to SQL Editor</li>
                <li>
                  Run: <code className="bg-red-100 px-1 rounded">scripts/10-volunteer-table-fresh.sql</code>
                </li>
                <li>Return here and try again</li>
              </ol>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setNeedsSetup(false)} className="bg-red-600 hover:bg-red-700">
                Try Again
              </Button>
              <Button
                variant="outline"
                className="border-red-600 text-red-600 hover:bg-red-50"
                onClick={() => window.open("https://supabase.com/dashboard", "_blank")}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open Supabase
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Success state
  if (isSubmitted) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-green-800 mb-4">Application Submitted!</h3>
          <p className="text-green-700 mb-6">
            Thank you for your interest in volunteering with NADUPA AFRICA FOUNDATION. We'll review your application and
            contact you within 5-7 business days.
          </p>
          <Button onClick={resetForm} variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
            Submit Another Application
          </Button>
        </CardContent>
      </Card>
    )
  }

  // Main form
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-stone-800">Volunteer Application</CardTitle>
          <p className="text-stone-600">
            Join us in making a difference in African communities. Fill out this form to apply as a volunteer.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Error Display */}
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
              <h3 className="text-lg font-semibold text-stone-800 border-b border-stone-200 pb-2">
                Personal Information
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="Enter your first name"
                    maxLength={50}
                    required
                    className={validationErrors.firstName ? "border-red-500" : ""}
                  />
                  {validationErrors.firstName && (
                    <p className="text-sm text-red-600 mt-1">{validationErrors.firstName}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="lastName">
                    Last Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Enter your last name"
                    maxLength={50}
                    required
                    className={validationErrors.lastName ? "border-red-500" : ""}
                  />
                  {validationErrors.lastName && (
                    <p className="text-sm text-red-600 mt-1">{validationErrors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    maxLength={100}
                    required
                    className={validationErrors.email ? "border-red-500" : ""}
                  />
                  {validationErrors.email && <p className="text-sm text-red-600 mt-1">{validationErrors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" placeholder="+254 796093465" maxLength={20} />
                </div>
              </div>
            </div>

            {/* Volunteer Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-stone-800 border-b border-stone-200 pb-2">
                Volunteer Information
              </h3>

              <div>
                <Label htmlFor="motivation">
                  Why do you want to volunteer? <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="motivation"
                  name="motivation"
                  placeholder="Tell us about your motivation to volunteer with NADUPA AFRICA FOUNDATION..."
                  className={`min-h-32 ${validationErrors.motivation ? "border-red-500" : ""}`}
                  maxLength={1000}
                  required
                />
                {validationErrors.motivation && (
                  <p className="text-sm text-red-600 mt-1">{validationErrors.motivation}</p>
                )}
                <p className="text-xs text-stone-500 mt-1">Minimum 10 characters, maximum 1000</p>
              </div>

              <div>
                <Label className="text-base font-medium">
                  Areas of Interest <span className="text-red-500">*</span>
                </Label>
                <p className="text-sm text-stone-500 mb-3">Select all areas where you'd like to contribute</p>
                <div className="grid md:grid-cols-2 gap-3">
                  {AREAS_OF_INTEREST.map((area) => (
                    <div key={area.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`interest-${area.id}`}
                        checked={selectedInterests.includes(area.id)}
                        onCheckedChange={(checked) => handleInterestChange(area.id, checked as boolean)}
                      />
                      <Label htmlFor={`interest-${area.id}`} className="text-sm cursor-pointer">
                        {area.label}
                      </Label>
                    </div>
                  ))}
                </div>
                {validationErrors.areasOfInterest && (
                  <p className="text-sm text-red-600 mt-1">{validationErrors.areasOfInterest}</p>
                )}
              </div>

              <div>
                <Label className="text-base font-medium">
                  Availability <span className="text-red-500">*</span>
                </Label>
                <p className="text-sm text-stone-500 mb-3">Select the days you're available</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {AVAILABILITY.map((day) => (
                    <div key={day.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`day-${day.id}`}
                        checked={selectedAvailability.includes(day.id)}
                        onCheckedChange={(checked) => handleAvailabilityChange(day.id, checked as boolean)}
                      />
                      <Label htmlFor={`day-${day.id}`} className="text-sm cursor-pointer">
                        {day.label}
                      </Label>
                    </div>
                  ))}
                </div>
                {validationErrors.availability && (
                  <p className="text-sm text-red-600 mt-1">{validationErrors.availability}</p>
                )}
              </div>

              <div>
                <Label className="text-base font-medium">Skills & Expertise</Label>
                <p className="text-sm text-stone-500 mb-3">Select your relevant skills (optional)</p>
                <div className="grid md:grid-cols-3 gap-3">
                  {SKILLS.map((skill) => (
                    <div key={skill.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`skill-${skill.id}`}
                        checked={selectedSkills.includes(skill.id)}
                        onCheckedChange={(checked) => handleSkillChange(skill.id, checked as boolean)}
                      />
                      <Label htmlFor={`skill-${skill.id}`} className="text-sm cursor-pointer">
                        {skill.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="additionalInfo">Additional Information</Label>
                <Textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  placeholder="Is there anything else you'd like us to know?"
                  className="min-h-24"
                  maxLength={500}
                />
                <p className="text-xs text-stone-500 mt-1">Maximum 500 characters</p>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="border-t border-stone-200 pt-6">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="agreeToTerms"
                  checked={agreeToTerms}
                  onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                  className={validationErrors.agreeToTerms ? "border-red-500" : ""}
                />
                <div>
                  <Label htmlFor="agreeToTerms" className="cursor-pointer">
                    I agree to the terms and conditions <span className="text-red-500">*</span>
                  </Label>
                  <p className="text-sm text-stone-500 mt-1">
                    By checking this box, you agree to our volunteer policies and code of conduct.
                  </p>
                  {validationErrors.agreeToTerms && (
                    <p className="text-sm text-red-600 mt-1">{validationErrors.agreeToTerms}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
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
        </CardContent>
      </Card>
      <Toaster />
    </>
  )
}
