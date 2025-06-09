import { z } from "zod"

// Contact form validation schema
export const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Subject is required").max(200),
  message: z.string().min(1, "Message is required").max(2000),
})

// Volunteer form validation schema
export const volunteerFormSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
  motivation: z.string().min(1, "Please tell us about your motivation").max(2000),
  areaOfInterest: z.array(z.string()).min(1, "Please select at least one area of interest"),
  availability: z.array(z.string()).min(1, "Please select at least one day of availability"),
  skills: z.array(z.string()).optional(),
  languages: z.string().optional(),
  previousExperience: z.string().optional(),
  heardAboutUs: z.string().optional(),
  commitmentLength: z.string().optional(),
  startDate: z.string().optional(),
  references: z.string().optional(),
  additionalInfo: z.string().optional(),
  agreeToTerms: z.boolean().refine((val) => val === true, "You must agree to the terms and conditions"),
})

// Donation form validation schema
export const donationFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required").max(100),
  email: z.string().email("Please enter a valid email address"),
  donationAmount: z.string().optional(),
  customAmount: z.string().optional(),
  paymentMethod: z.string().min(1, "Please select a payment method"),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
export type VolunteerFormData = z.infer<typeof volunteerFormSchema>
export type DonationFormData = z.infer<typeof donationFormSchema>
