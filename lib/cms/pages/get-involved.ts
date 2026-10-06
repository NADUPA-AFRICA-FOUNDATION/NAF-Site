import { definePage } from "../types"
import { cardFields, heroSection } from "../common"

export const getInvolvedPage = definePage({
  key: "get-involved",
  label: "Get Involved",
  path: "/get-involved",
  sections: [
    heroSection(),
    {
      title: "Donations",
      fields: [
        { key: "donate.title", label: "Heading", type: "text", max: 120 },
        { key: "donate.text", label: "Text", type: "textarea", rows: 3, max: 600 },
        {
          key: "donate.options",
          label: "Ways to give",
          type: "list",
          itemLabel: "Option",
          maxItems: 6,
          fields: [...cardFields, { key: "button", label: "Button text", type: "text", max: 40 }],
        },
        { key: "donate.mpesaPaybill", label: "M-Pesa paybill number", type: "text", max: 40 },
        { key: "donate.mpesaAccount", label: "M-Pesa account name", type: "text", max: 60 },
        { key: "donate.bankText", label: "Bank transfer text", type: "text", max: 200 },
      ],
    },
    {
      title: "Volunteer opportunities",
      fields: [
        { key: "volunteer.title", label: "Heading", type: "text", max: 120 },
        { key: "volunteer.text", label: "Text", type: "textarea", rows: 3, max: 600 },
        {
          key: "volunteer.opportunities",
          label: "Opportunities",
          type: "list",
          itemLabel: "Opportunity",
          maxItems: 20,
          fields: [
            { key: "title", label: "Role", type: "text", max: 120 },
            { key: "description", label: "Description", type: "textarea", rows: 2, max: 600 },
            { key: "commitment", label: "Time commitment", type: "text", max: 80 },
            { key: "skills", label: "Skills needed", type: "text", max: 200 },
            { key: "location", label: "Location", type: "text", max: 120 },
          ],
        },
      ],
    },
    {
      title: "Partnerships",
      fields: [
        { key: "partners.title", label: "Heading", type: "text", max: 120 },
        { key: "partners.text", label: "Text", type: "textarea", rows: 3, max: 600 },
        { key: "partners.types", label: "Partnership types", type: "list", itemLabel: "Type", maxItems: 6, fields: cardFields },
      ],
    },
    {
      title: "Your impact",
      fields: [
        { key: "impact.title", label: "Heading", type: "text", max: 120 },
        { key: "impact.text", label: "Text", type: "textarea", rows: 3, max: 600 },
        {
          key: "impact.examples",
          label: "Examples",
          type: "list",
          itemLabel: "Example",
          maxItems: 6,
          fields: [
            { key: "value", label: "Amount", type: "text", max: 30 },
            { key: "label", label: "What it provides", type: "text", max: 160 },
          ],
        },
      ],
    },
  ],
  defaults: {
    hero: {
      title: "Get Involved",
      subtitle:
        "Join our mission to transform lives and empower communities. There are many ways you can make a meaningful difference with NADUPA AFRICA FOUNDATION.",
      image: "/images/forest-canopy.jpeg",
      imageAlt: "Forest canopy representing growth through collaboration",
    },
    donate: {
      title: "Support Our Mission",
      text: "Your generous donations directly fund our programs and help us reach more communities across Kenya. Every contribution creates lasting impact.",
      options: [
        {
          icon: "dollar-sign",
          title: "One-Time Donation",
          description: "Make an immediate impact with a single donation to support our ongoing programs.",
          button: "Donate Now",
        },
        {
          icon: "heart",
          title: "Monthly Partnership",
          description: "Provide sustained support through recurring monthly donations for long-term impact.",
          button: "Give Monthly",
        },
        {
          icon: "globe",
          title: "Sponsor a Program",
          description: "Fund specific initiatives like education, water projects, or community training programs.",
          button: "Learn More",
        },
      ],
      mpesaPaybill: "Contact us for our M-Pesa details",
      mpesaAccount: "NADUPA DONATION",
      bankText: "Direct bank transfers for larger donations:",
    },
    volunteer: {
      title: "Volunteer Opportunities",
      text: "Share your skills, time, and passion to help us create lasting change in communities across Kenya. Every volunteer makes a difference.",
      opportunities: [
        {
          title: "Community Outreach Coordinator",
          description: "Lead community engagement initiatives and help distribute aid to vulnerable families",
          commitment: "8-12 hours per week",
          skills: "Communication, Swahili/local languages, community organizing",
          location: "Kajiado, Narok",
        },
        {
          title: "Education Support Volunteer",
          description: "Assist with tutoring, adult literacy programs, and educational material distribution",
          commitment: "6-10 hours per week",
          skills: "Teaching experience, patience, subject expertise",
          location: "All counties",
        },
        {
          title: "Environmental Conservation Guide",
          description: "Support tree planting, conservation education, and sustainable farming initiatives",
          commitment: "Flexible, project-based",
          skills: "Environmental knowledge, outdoor activities, training skills",
          location: "Lamu, Turkana",
        },
        {
          title: "Digital Skills Trainer",
          description: "Teach computer literacy and digital skills to youth and adults",
          commitment: "4-8 hours per week",
          skills: "Computer proficiency, training experience, patience",
          location: "Nairobi, Kajiado",
        },
      ],
    },
    partners: {
      title: "Partnership Opportunities",
      text: "We believe in the power of collaboration. Partner with us to amplify our impact and create sustainable change across Kenya.",
      types: [
        {
          icon: "globe",
          title: "Corporate Social Responsibility",
          description:
            "Partner with us through employee volunteering, resource sharing, and funding specific programs that align with your company values.",
        },
        {
          icon: "users",
          title: "Community Organizations",
          description:
            "Collaborate with churches, community groups, and local organizations to amplify our reach and impact.",
        },
        {
          icon: "handshake",
          title: "Government & NGO Partnerships",
          description:
            "Work with county governments, national agencies, and other NGOs to create coordinated, large-scale impact.",
        },
      ],
    },
    impact: {
      title: "Your Impact Matters",
      text: "Whether through donations, volunteering, or partnerships, your support creates ripple effects that transform entire communities.",
      examples: [
        { value: "KSh 1,000", label: "Provides school supplies for 5 children" },
        { value: "KSh 5,000", label: "Funds a month of clean water access" },
        { value: "KSh 10,000", label: "Supports a family's basic needs for a month" },
      ],
    },
  },
})
