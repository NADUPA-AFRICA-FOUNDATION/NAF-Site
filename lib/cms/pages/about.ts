import { definePage } from "../types"
import { cardFields, heroSection } from "../common"

export const aboutPage = definePage({
  key: "about",
  label: "About Us",
  path: "/about",
  sections: [
    heroSection(),
    {
      title: "Mission & vision",
      fields: [
        { key: "mission", label: "Mission", type: "textarea", rows: 3, max: 800 },
        { key: "vision", label: "Vision", type: "textarea", rows: 3, max: 800 },
        { key: "missionImage", label: "Image", type: "image" },
        { key: "missionImageCaption", label: "Image caption", type: "text", max: 80 },
      ],
    },
    {
      title: "Cultural preservation",
      fields: [
        { key: "culture.title", label: "Heading", type: "text", max: 120 },
        { key: "culture.text", label: "Text (blank line between paragraphs)", type: "textarea", rows: 6, max: 2000 },
        { key: "culture.image", label: "Image", type: "image" },
        { key: "culture.imageCaption", label: "Image caption", type: "text", max: 80 },
      ],
    },
    {
      title: "Who we help",
      fields: [
        { key: "whoWeHelp.title", label: "Heading", type: "text", max: 120 },
        { key: "whoWeHelp.text", label: "Text", type: "textarea", rows: 2, max: 400 },
        { key: "whoWeHelp.groups", label: "Groups", type: "list", itemLabel: "Group", maxItems: 16, fields: cardFields },
      ],
    },
    {
      title: "Our story",
      fields: [
        { key: "story.title", label: "Heading", type: "text", max: 120 },
        { key: "story.subtitle", label: "Subheading", type: "text", max: 200 },
        { key: "story.text", label: "Text (blank line between paragraphs)", type: "textarea", rows: 8, max: 3000 },
        { key: "story.quote", label: "Quote", type: "textarea", rows: 2, max: 400 },
        { key: "story.quoteAuthor", label: "Quote author", type: "text", max: 80 },
        { key: "story.image", label: "Image", type: "image" },
      ],
    },
    {
      title: "Values",
      fields: [
        { key: "values.title", label: "Heading", type: "text", max: 120 },
        { key: "values.text", label: "Text", type: "text", max: 200 },
        { key: "values.items", label: "Values", type: "list", itemLabel: "Value", maxItems: 6, fields: cardFields },
      ],
    },
  ],
  defaults: {
    hero: {
      title: "About NADUPA AFRICA FOUNDATION",
      subtitle: "Building bridges to a more inclusive, educated, and sustainable Kenya",
      image: "/images/african-village.avif",
      imageAlt: "African village representing our community focus",
    },
    mission:
      "To empower vulnerable communities in Kenya by promoting access to education, supporting persons with disabilities, combating alcohol and substance abuse, and advancing environmental conservation.",
    vision:
      "A more inclusive, educated, and sustainable Kenya where every individual has the opportunity to thrive and contribute to their community's development while preserving their rich cultural heritage.",
    missionImage: "/images/maasai-warrior.jpeg",
    missionImageCaption: "Preserving Cultural Heritage",
    culture: {
      title: "Cultural Preservation",
      text: "At NADUPA AFRICA FOUNDATION, we believe that sustainable development must go hand in hand with cultural preservation. We work closely with communities to ensure that their unique cultural heritage is celebrated, preserved, and passed down to future generations.\n\nOur programs are designed to empower communities while respecting their traditions, customs, and way of life. By integrating cultural awareness into our development initiatives, we create more meaningful and lasting impact.",
      image: "/images/maasai-celebration.jpeg",
      imageCaption: "Celebrating Culture & Community",
    },
    whoWeHelp: {
      title: "Who We Help",
      text: "Our programs reach across communities, touching lives and creating opportunities for Kenya's most vulnerable populations.",
      groups: [
        { icon: "heart", title: "Poor Women", description: "Empowering women through skills training and support programs" },
        { icon: "home", title: "Orphans & Vulnerable Children", description: "Providing care, education, and hope for the future" },
        { icon: "shield", title: "People with Disabilities", description: "Ensuring accessibility and equal opportunities for all" },
        { icon: "zap", title: "Drug & Alcohol Addicts", description: "Supporting recovery and rehabilitation journeys" },
        { icon: "users", title: "The Poor in General", description: "Basic needs support and pathway to self-reliance" },
        { icon: "graduation-cap", title: "Youth", description: "Skills development and leadership opportunities" },
        { icon: "heart", title: "Elderly People", description: "Dignity and care for our respected elders" },
        { icon: "globe", title: "Society at Large", description: "Community development and social cohesion" },
      ],
    },
    story: {
      title: "Our Story",
      subtitle: "Born from a deep commitment to social justice and community empowerment",
      text: "NADUPA AFRICA FOUNDATION was established with a clear vision: to address the multifaceted challenges facing Kenya's most vulnerable communities. Our founders recognized that sustainable change requires a holistic approach that addresses education, health, environmental conservation, and social inclusion simultaneously.\n\nSince our inception, we have worked tirelessly to build partnerships with local communities, understanding that lasting change comes from within. Our programs are designed not just to provide immediate relief, but to empower individuals and communities to become self-reliant and resilient.",
      quote:
        "Every community has the potential for greatness. Our role is to unlock that potential through education, support, and sustainable development.",
      quoteAuthor: "NADUPA AFRICA FOUNDATION",
      image: "/images/traditional-huts.jpeg",
    },
    values: {
      title: "Our Values",
      text: "The principles that guide everything we do",
      items: [
        {
          icon: "heart",
          title: "Compassion",
          description:
            "We approach every situation with empathy and understanding, recognizing the dignity in every person we serve.",
        },
        {
          icon: "users",
          title: "Community",
          description:
            "We believe in the power of collective action and work hand-in-hand with communities to create lasting change.",
        },
        {
          icon: "leaf",
          title: "Sustainability",
          description:
            "Our programs are designed to create long-term impact while protecting the environment for future generations.",
        },
      ],
    },
  },
})
