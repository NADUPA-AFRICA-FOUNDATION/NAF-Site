import { definePage } from "../types"
import { heroSection } from "../common"

export const homePage = definePage({
  key: "home",
  label: "Home",
  path: "/",
  sections: [
    {
      ...heroSection(),
      fields: [
        { key: "hero.title", label: "Heading (first line)", type: "text", max: 120 },
        { key: "hero.highlight", label: "Heading (highlighted second line)", type: "text", max: 120 },
        { key: "hero.subtitle", label: "Subheading", type: "textarea", rows: 3, max: 400 },
        { key: "hero.image", label: "Background image", type: "image" },
        { key: "hero.imageAlt", label: "Image description (for screen readers)", type: "text", max: 200 },
      ],
    },
    {
      title: "Introduction",
      fields: [
        { key: "intro.title", label: "Heading", type: "text", max: 160 },
        { key: "intro.text", label: "Text", type: "textarea", rows: 3, max: 600 },
        { key: "intro.image", label: "Background image", type: "image" },
      ],
    },
    {
      title: "Impact numbers",
      fields: [
        { key: "impact.title", label: "Heading", type: "text", max: 120 },
        { key: "impact.text", label: "Text", type: "textarea", rows: 2, max: 400 },
        {
          key: "impact.stats",
          label: "Statistics",
          type: "list",
          itemLabel: "Statistic",
          maxItems: 6,
          fields: [
            { key: "icon", label: "Icon", type: "icon" },
            { key: "value", label: "Number", type: "text", max: 30 },
            { key: "label", label: "Label", type: "text", max: 80 },
          ],
        },
      ],
    },
    {
      title: "Mission",
      fields: [
        { key: "mission.title", label: "Heading", type: "text", max: 120 },
        { key: "mission.text", label: "Mission statement", type: "textarea", rows: 3, max: 600 },
        { key: "mission.image", label: "Image", type: "image" },
        { key: "mission.imageCaption", label: "Image caption", type: "text", max: 80 },
        {
          key: "mission.highlights",
          label: "Highlights",
          type: "list",
          itemLabel: "Highlight",
          maxItems: 4,
          fields: [
            { key: "icon", label: "Icon", type: "icon" },
            { key: "title", label: "Title", type: "text", max: 80 },
            { key: "description", label: "Description", type: "textarea", rows: 2, max: 300 },
          ],
        },
      ],
    },
    {
      title: "Call to action",
      fields: [
        { key: "cta.title", label: "Heading", type: "text", max: 120 },
        { key: "cta.text", label: "Text", type: "textarea", rows: 2, max: 400 },
      ],
    },
  ],
  defaults: {
    hero: {
      title: "Empowering Communities,",
      highlight: "Transforming Lives",
      subtitle: "Fostering education, supporting the vulnerable, and conserving our environment across Kenya.",
      image: "/images/maasai-women-community.png",
      imageAlt: "Smiling Maasai women in traditional attire representing the communities we serve",
    },
    intro: {
      title: "Supporting communities where help is needed most",
      text: "From the rolling hills of Kajiado to the coastal regions of Lamu, we bring hope, education, and sustainable change to Kenya's most vulnerable communities.",
      image: "/images/traditional-huts.jpeg",
    },
    impact: {
      title: "Our Impact Across Kenya",
      text: "Every number represents a life touched, a community strengthened, and hope restored.",
      stats: [
        { icon: "map-pin", value: "5", label: "Counties Served" },
        { icon: "users", value: "50+", label: "Programs Running" },
      ],
    },
    mission: {
      title: "Our Mission",
      text: "To empower vulnerable communities in Kenya by promoting access to education, supporting persons with disabilities, combating alcohol and substance abuse, and advancing environmental conservation.",
      image: "/images/maasai-celebration.jpeg",
      imageCaption: "Preserving Heritage, Building Future",
      highlights: [
        {
          icon: "leaf",
          title: "Environmental Conservation",
          description:
            "Protecting Kenya's natural heritage for future generations through community-led conservation initiatives.",
        },
        {
          icon: "graduation-cap",
          title: "Education Access",
          description:
            "Breaking barriers to education through school fees support, learning materials, and community programs.",
        },
      ],
    },
    cta: {
      title: "Join Our Mission",
      text: "Together, we can create lasting change in communities across Kenya. Your support makes the difference.",
    },
  },
})
