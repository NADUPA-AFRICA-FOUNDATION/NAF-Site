"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { CheckCircle2, Loader2 } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { submitVolunteerForm } from "@/app/actions/volunteer"

export function VolunteerForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [agreeToTerms, setAgreeToTerms] = useState(false)

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
          onClick={() => setIsSubmitted(false)}
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
        {/* Personal Information */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-stone-800 border-b border-stone-200 pb-2">Personal Information</h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-stone-700 mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <Input id="firstName" name="firstName" placeholder="Enter your first name" required />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-stone-700 mb-2">
                Last Name <span className="text-red-500">*</span>
              </label>
              <Input id="lastName" name="lastName" placeholder="Enter your last name" required />
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
              <Input id="phone" name="phone" placeholder="+254 XXX XXX XXX" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-stone-700 mb-2">
                Date of Birth
              </label>
              <Input id="dateOfBirth" name="dateOfBirth" type="date" />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Gender</label>
              <RadioGroup name="gender" className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-stone-700 mb-2">
                Address
              </label>
              <Input id="address" name="address" placeholder="Street address" />
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-stone-700 mb-2">
                City
              </label>
              <Input id="city" name="city" placeholder="City" />
            </div>
          </div>

          <div>
            <label htmlFor="country" className="block text-sm font-medium text-stone-700 mb-2">
              Country
            </label>
            <Select name="country">
              <SelectTrigger>
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kenya">Kenya</SelectItem>
                <SelectItem value="uganda">Uganda</SelectItem>
                <SelectItem value="tanzania">Tanzania</SelectItem>
                <SelectItem value="ethiopia">Ethiopia</SelectItem>
                <SelectItem value="rwanda">Rwanda</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-stone-800 border-b border-stone-200 pb-2">Emergency Contact</h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="emergencyContactName" className="block text-sm font-medium text-stone-700 mb-2">
                Emergency Contact Name
              </label>
              <Input id="emergencyContactName" name="emergencyContactName" placeholder="Full name" />
            </div>

            <div>
              <label htmlFor="emergencyContactPhone" className="block text-sm font-medium text-stone-700 mb-2">
                Emergency Contact Phone
              </label>
              <Input id="emergencyContactPhone" name="emergencyContactPhone" placeholder="Phone number" />
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
              required
            />
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
            <label htmlFor="languages" className="block text-sm font-medium text-stone-700 mb-2">
              Languages Spoken
            </label>
            <Input id="languages" name="languages" placeholder="E.g., English, Swahili, etc." />
          </div>

          <div>
            <label htmlFor="previousExperience" className="block text-sm font-medium text-stone-700 mb-2">
              Previous Volunteer Experience
            </label>
            <Textarea
              id="previousExperience"
              name="previousExperience"
              placeholder="Please describe any previous volunteer experience you have..."
              className="min-h-24"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="commitmentLength" className="block text-sm font-medium text-stone-700 mb-2">
                How long can you commit to volunteering?
              </label>
              <Select name="commitmentLength">
                <SelectTrigger>
                  <SelectValue placeholder="Select commitment period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-3months">1-3 months</SelectItem>
                  <SelectItem value="3-6months">3-6 months</SelectItem>
                  <SelectItem value="6-12months">6-12 months</SelectItem>
                  <SelectItem value="1year+">More than 1 year</SelectItem>
                  <SelectItem value="ongoing">Ongoing/No specific timeframe</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-stone-700 mb-2">
                When can you start?
              </label>
              <Input id="startDate" name="startDate" type="date" />
            </div>
          </div>

          <div>
            <label htmlFor="heardAboutUs" className="block text-sm font-medium text-stone-700 mb-2">
              How did you hear about us?
            </label>
            <Select name="heardAboutUs">
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="website">Website</SelectItem>
                <SelectItem value="socialMedia">Social Media</SelectItem>
                <SelectItem value="friend">Friend/Family</SelectItem>
                <SelectItem value="event">Event</SelectItem>
                <SelectItem value="newspaper">Newspaper/Magazine</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="references" className="block text-sm font-medium text-stone-700 mb-2">
              References
            </label>
            <Textarea
              id="references"
              name="references"
              placeholder="Please provide names and contact information for 1-2 references..."
              className="min-h-24"
            />
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
