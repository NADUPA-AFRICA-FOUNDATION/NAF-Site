import { definePage } from "../types"
import { heroSection, statFields } from "../common"

const labelledText = [
  { key: "label", label: "Label", type: "text" as const, max: 80 },
  { key: "text", label: "Text", type: "textarea" as const, rows: 2, max: 400 },
]

export const donatePage = definePage({
  key: "donate",
  label: "Donate",
  path: "/donate",
  sections: [
    heroSection(),
    {
      title: "Donation form",
      fields: [
        { key: "form.title", label: "Heading", type: "text", max: 120 },
        { key: "form.text", label: "Text", type: "textarea", rows: 2, max: 400 },
      ],
    },
    {
      title: "Sidebar",
      fields: [
        {
          key: "impact",
          label: "Your impact",
          type: "list",
          itemLabel: "Amount",
          maxItems: 8,
          fields: [
            { key: "amount", label: "Amount", type: "text", max: 20 },
            { key: "text", label: "What it provides", type: "text", max: 200 },
          ],
        },
        { key: "commitment", label: "Our commitment", type: "list", itemLabel: "Point", maxItems: 6, fields: labelledText },
        { key: "otherWays", label: "Other ways to give", type: "list", itemLabel: "Way", maxItems: 8, fields: labelledText },
      ],
    },
    {
      title: "Bottom banner",
      fields: [
        { key: "banner.title", label: "Heading", type: "text", max: 120 },
        { key: "banner.text", label: "Text", type: "textarea", rows: 2, max: 400 },
        { key: "banner.stats", label: "Statistics", type: "list", itemLabel: "Statistic", maxItems: 4, fields: statFields },
      ],
    },
  ],
  defaults: {
    hero: {
      title: "Donate",
      subtitle: "Your generous contribution helps us empower communities and transform lives across Kenya.",
      image: "/images/rural-homestead.jpeg",
      imageAlt: "Rural community that benefits from donations",
    },
    form: {
      title: "Make a Donation",
      text: "Your support enables us to continue our vital work in education, health, and environmental conservation.",
    },
    impact: [
      { amount: "$25", text: "Provides school supplies for 5 children for a month" },
      { amount: "$50", text: "Supports clean water access for a family for three months" },
      { amount: "$100", text: "Funds a community training workshop for sustainable farming" },
      { amount: "$250", text: "Provides medical supplies for a rural health clinic for a month" },
    ],
    commitment: [
      { label: "Transparency", text: "We provide detailed reports on how funds are used and the impact they create." },
      { label: "Accountability", text: "Our financial records are available on request, and reports are published on our Transparency page." },
    ],
    otherWays: [
      { label: "Monthly Giving", text: "Become a sustaining donor with a recurring monthly contribution." },
      { label: "Legacy Gifts", text: "Include NADUPA AFRICA FOUNDATION in your estate planning." },
      { label: "Corporate Partnerships", text: "Engage your company in meaningful social responsibility." },
      { label: "In-Kind Donations", text: "Donate goods, services, or expertise to support our work." },
    ],
    banner: {
      title: "Together, We're Making a Difference",
      text: "Join our community of donors from across the globe who are helping to create sustainable change in Kenya.",
      stats: [
        { value: "25+", label: "Communities Supported" },
      ],
    },
  },
})
