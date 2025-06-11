import { z } from "zod"

export const volunteerApplicationSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50, "First name must be less than 50 characters").trim(),

  lastName: z.string().min(1, "Last name is required").max(50, "Last name must be less than 50 characters").trim(),

  email: z
    .string()
    .email("Please enter a valid email address")
    .max(100, "Email must be less than 100 characters")
    .toLowerCase(),

  phone: z.string().max(20, "Phone number must be less than 20 characters").optional(),

  motivation: z
    .string()
    .min(10, "Please provide at least 10 characters explaining your motivation")
    .max(1000, "Motivation must be less than 1000 characters")
    .trim(),

  areasOfInterest: z.array(z.string()).min(1, "Please select at least one area of interest"),

  availability: z.array(z.string()).min(1, "Please select at least one day of availability"),

  skills: z.array(z.string()).optional(),

  additionalInfo: z.string().max(500, "Additional information must be less than 500 characters").optional(),

  agreeToTerms: z.boolean().refine((val) => val === true, "You must agree to the terms and conditions"),
})

export type VolunteerApplicationData = z.infer<typeof volunteerApplicationSchema>
