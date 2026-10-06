import { definePage } from "../types"

export const settingsPage = definePage({
  key: "settings",
  label: "Site settings",
  path: null,
  sections: [
    {
      title: "Organization",
      description: "Shown in the footer, contact page and legal pages",
      fields: [
        { key: "orgName", label: "Organization name", type: "text", max: 120 },
        { key: "tagline", label: "Tagline", type: "text", max: 120 },
        { key: "about", label: "Short description (footer)", type: "textarea", rows: 3, max: 500 },
        { key: "registrationNumber", label: "NGO registration number", type: "text", max: 60 },
        { key: "registrationStatus", label: "Registration status", type: "text", max: 200 },
        { key: "taxStatus", label: "Tax status note (footer)", type: "text", max: 200 },
      ],
    },
    {
      title: "Contact details",
      fields: [
        { key: "addressLine1", label: "Address line 1", type: "text", max: 120 },
        { key: "addressLine2", label: "Address line 2", type: "text", max: 120 },
        { key: "email", label: "Email address", type: "text", max: 120 },
        { key: "phone", label: "Phone number", type: "text", max: 40 },
        { key: "whatsapp", label: "WhatsApp number", type: "text", max: 40 },
      ],
    },
    {
      title: "Social media",
      description: "Leave a link empty to hide that icon",
      fields: [
        { key: "social.facebook", label: "Facebook URL", type: "url" },
        { key: "social.twitter", label: "X / Twitter URL", type: "url" },
        { key: "social.instagram", label: "Instagram URL", type: "url" },
        { key: "social.linkedin", label: "LinkedIn URL", type: "url" },
      ],
    },
    {
      title: "Footer",
      fields: [
        {
          key: "impactAreas",
          label: "Impact areas",
          type: "list",
          itemLabel: "Area",
          maxItems: 8,
          fields: [
            { key: "icon", label: "Icon", type: "icon" },
            { key: "label", label: "Label", type: "text", max: 60 },
          ],
        },
        { key: "copyright", label: "Copyright line", type: "text", max: 200 },
      ],
    },
  ],
  defaults: {
    orgName: "NADUPA AFRICA FOUNDATION",
    tagline: "Empowering Communities",
    about:
      "Dedicated to transforming lives and empowering communities across Kenya through sustainable development, education, healthcare, and environmental conservation initiatives.",
    registrationNumber: "NGO-6DF3EM",
    registrationStatus: "Registered Non-Governmental Organization",
    taxStatus: "Registered NGO in Kenya | Tax-exempt status pending",
    addressLine1: "Kajiado-West, Kajiado County",
    addressLine2: "Kenya",
    email: "info@nadupaafricafoundation.org",
    phone: "+254 796 093 465",
    whatsapp: "+254 796 093 465",
    social: {
      facebook: "https://facebook.com/nadupaafricafoundation",
      twitter: "https://twitter.com/nadupafrica",
      instagram: "https://instagram.com/nadupaafricafoundation",
      linkedin: "https://linkedin.com/company/nadupa-africa-foundation",
    },
    impactAreas: [
      { icon: "droplets", label: "Water & Sanitation" },
      { icon: "graduation-cap", label: "Education" },
      { icon: "heart", label: "Healthcare" },
      { icon: "users", label: "Community Development" },
    ],
    copyright: "© 2024 NADUPA AFRICA FOUNDATION. All rights reserved.",
  },
})
