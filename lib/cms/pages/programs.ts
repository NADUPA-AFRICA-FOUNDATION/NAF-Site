import { definePage } from "../types"
import { heroSection, statFields } from "../common"

export const programsPage = definePage({
  key: "programs",
  label: "Programs",
  path: "/programs",
  sections: [
    heroSection(),
    {
      title: "Programs",
      fields: [
        {
          key: "programs",
          label: "Programs",
          type: "list",
          itemLabel: "Program",
          maxItems: 20,
          fields: [
            { key: "icon", label: "Icon", type: "icon" },
            { key: "title", label: "Title", type: "text", max: 120 },
            { key: "description", label: "Description", type: "textarea", rows: 3, max: 1000 },
            { key: "features", label: "Key activities", type: "strings", itemLabel: "Activity", maxItems: 12 },
            { key: "image", label: "Image", type: "image" },
          ],
        },
      ],
    },
    {
      title: "Program impact",
      fields: [
        { key: "impact.title", label: "Heading", type: "text", max: 120 },
        { key: "impact.text", label: "Text", type: "textarea", rows: 3, max: 600 },
        { key: "impact.stats", label: "Statistics", type: "list", itemLabel: "Statistic", maxItems: 8, fields: statFields },
      ],
    },
  ],
  defaults: {
    hero: {
      title: "Our Programs",
      subtitle:
        "Comprehensive initiatives designed to address the diverse needs of our communities and create lasting positive impact across Kenya.",
      image: "/images/rural-landscape.avif",
      imageAlt: "Rural landscape representing our program areas",
    },
    programs: [
      {
        icon: "users",
        title: "Community & Individual Training",
        description:
          "Comprehensive skill-building programs that empower individuals and strengthen communities through vocational training, leadership development, and capacity building initiatives.",
        features: [
          "Vocational skills training in agriculture, crafts, and trades",
          "Leadership development for community organizers",
          "Financial literacy and entrepreneurship programs",
          "Life skills workshops for personal development",
        ],
        image: "/images/rural-homestead.jpeg",
      },
      {
        icon: "megaphone",
        title: "Advocacy & Information Services",
        description:
          "Providing crucial information, advocacy support, and professional guidance to help individuals and communities access their rights and navigate complex systems.",
        features: [
          "Legal advocacy and rights awareness",
          "Health information and awareness campaigns",
          "Government services navigation support",
          "Community mobilization and organizing",
        ],
        image: "/images/forest-canopy.jpeg",
      },
      {
        icon: "utensils",
        title: "Food & Basic Aid Distribution",
        description:
          "Emergency relief and ongoing support through distribution of food, clean water, clothing, and other essential items to vulnerable populations during crises and ongoing hardship.",
        features: [
          "Emergency food relief during crises",
          "Clean water access and purification",
          "Clothing and household items distribution",
          "Hygiene supplies and health materials",
        ],
        image: "/images/rural-landscape.avif",
      },
      {
        icon: "book-open",
        title: "Education Support Services",
        description:
          "Breaking down barriers to education through comprehensive support including school fees, learning materials, and educational programs for children and adults.",
        features: [
          "School fees payment for vulnerable children",
          "Learning materials and school supplies",
          "Adult literacy and continuing education",
          "Educational mentorship and tutoring",
        ],
        image: "/images/rural-homestead.jpeg",
      },
      {
        icon: "package",
        title: "Equipment & Accessibility Support",
        description:
          "Providing essential equipment, assistive devices, and materials to support livelihoods, accessibility, and community development initiatives.",
        features: [
          "Agricultural tools and farming equipment",
          "Assistive devices for persons with disabilities",
          "Community infrastructure support",
          "Technology access and digital literacy tools",
        ],
        image: "/images/forest-canopy.jpeg",
      },
    ],
    impact: {
      title: "Program Impact",
      text: "Our integrated approach ensures that each program reinforces the others, creating a comprehensive support system that addresses root causes and builds lasting resilience.",
      stats: [
        { value: "500+", label: "People Trained" },
        { value: "200+", label: "Children Supported" },
        { value: "50+", label: "Families Assisted" },
        { value: "25+", label: "Communities Reached" },
      ],
    },
  },
})
