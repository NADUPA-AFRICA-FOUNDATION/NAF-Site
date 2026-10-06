import { definePage } from "../types"
import { heroSection, statFields } from "../common"

export const volunteerPage = definePage({
  key: "volunteer",
  label: "Volunteer",
  path: "/volunteer",
  sections: [
    {
      ...heroSection(),
      fields: [
        ...heroSection().fields,
        { key: "hero.stats", label: "Statistics", type: "list", itemLabel: "Statistic", maxItems: 4, fields: statFields },
      ],
    },
    {
      title: "Why volunteer",
      fields: [
        { key: "why.title", label: "Heading", type: "text", max: 120 },
        {
          key: "why.reasons",
          label: "Reasons",
          type: "list",
          itemLabel: "Reason",
          maxItems: 8,
          fields: [
            { key: "title", label: "Title", type: "text", max: 80 },
            { key: "description", label: "Description", type: "textarea", rows: 2, max: 400 },
          ],
        },
      ],
    },
    {
      title: "Application form",
      fields: [
        { key: "form.title", label: "Heading", type: "text", max: 120 },
        { key: "form.text", label: "Text", type: "text", max: 300 },
      ],
    },
  ],
  defaults: {
    hero: {
      title: "Volunteer With Us",
      subtitle:
        "Join our mission to empower African communities through sustainable development and cultural preservation.",
      image: "/images/maasai-celebration.jpeg",
      imageAlt: "Community celebration with NADUPA volunteers",
      stats: [
        { value: "500+", label: "Active Volunteers" },
        { value: "50+", label: "Communities Served" },
        { value: "10+", label: "Years of Impact" },
      ],
    },
    why: {
      title: "Why Volunteer With NADUPA?",
      reasons: [
        {
          title: "Make Real Impact",
          description:
            "Work directly with communities to create lasting change in education, health, environmental conservation, and sustainable development.",
        },
        {
          title: "Cultural Exchange",
          description:
            "Immerse yourself in rich African cultures, learn from local communities, and share your own knowledge and skills.",
        },
        {
          title: "Professional Growth",
          description:
            "Develop new skills, gain international experience, and build a network of like-minded individuals committed to social change.",
        },
        {
          title: "Flexible Opportunities",
          description:
            "Choose from various volunteer programs that match your skills, interests, and availability, from short-term projects to long-term commitments.",
        },
      ],
    },
    form: {
      title: "Apply to Volunteer",
      text: "Ready to make a difference? Fill out our application form and we'll get back to you soon.",
    },
  },
})
