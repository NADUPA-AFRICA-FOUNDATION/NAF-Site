import { definePage } from "../types"
import { heroSection } from "../common"

export const contactPage = definePage({
  key: "contact",
  label: "Contact",
  path: "/contact",
  sections: [
    heroSection(),
    {
      title: "Contact details",
      description: "Address, email and phone numbers come from Site settings",
      fields: [
        { key: "formIntro", label: "Text above the form", type: "text", max: 200 },
        { key: "serviceArea", label: "Counties served note", type: "text", max: 300 },
        { key: "emailNote", label: "Email note", type: "textarea", rows: 2, max: 300 },
        { key: "phoneHours", label: "Phone availability", type: "textarea", rows: 2, max: 200 },
        {
          key: "officeHours",
          label: "Office hours",
          type: "list",
          itemLabel: "Row",
          maxItems: 7,
          fields: [
            { key: "days", label: "Days", type: "text", max: 40 },
            { key: "hours", label: "Hours", type: "text", max: 60 },
          ],
        },
        { key: "emergencyNote", label: "Emergency note", type: "text", max: 200 },
      ],
    },
    {
      title: "Map",
      fields: [
        { key: "map.title", label: "Heading", type: "text", max: 120 },
        { key: "map.text", label: "Text", type: "textarea", rows: 2, max: 400 },
        {
          key: "map.embedUrl",
          label: "Google Maps embed URL",
          type: "url",
          help: "In Google Maps: Share → Embed a map → copy only the https://www.google.com/maps/embed?... address. Leave empty for a placeholder.",
        },
      ],
    },
  ],
  defaults: {
    hero: {
      title: "Contact Us",
      subtitle:
        "Get in touch with NADUPA AFRICA FOUNDATION. We'd love to hear from you and discuss how we can work together to transform communities across Kenya.",
      image: "/images/rural-homestead.jpeg",
      imageAlt: "Rural community representing our connection to the people we serve",
    },
    formIntro: "Fill out the form below and we'll get back to you within 24 hours.",
    serviceArea: "We serve communities across Nairobi, Kajiado, Lamu, Narok, and Turkana counties.",
    emailNote:
      "For all inquiries including general questions, partnerships, volunteer applications, and program information.",
    phoneHours: "Available Monday - Friday, 8:00 AM - 5:00 PM EAT\nSaturday: 9:00 AM - 1:00 PM",
    officeHours: [
      { days: "Monday - Friday", hours: "8:00 AM - 5:00 PM" },
      { days: "Saturday", hours: "9:00 AM - 1:00 PM" },
      { days: "Sunday", hours: "Closed" },
    ],
    emergencyNote: "Emergency contact available 24/7 for urgent community needs.",
    map: {
      title: "Find Us",
      text: "We're located in Kajiado-West, Kajiado County, Kenya. Visit us during our office hours or schedule an appointment to discuss partnership opportunities.",
      embedUrl: "",
    },
  },
})
