import { definePage } from "../types"
import { heroSection } from "../common"

export const whereWeWorkPage = definePage({
  key: "where-we-work",
  label: "Where We Work",
  path: "/where-we-work",
  sections: [
    heroSection(),
    {
      title: "Counties",
      fields: [
        { key: "reach.title", label: "Heading", type: "text", max: 120 },
        { key: "reach.text", label: "Text", type: "textarea", rows: 3, max: 600 },
        {
          key: "counties",
          label: "Counties",
          type: "list",
          itemLabel: "County",
          maxItems: 47,
          fields: [
            { key: "name", label: "County name", type: "text", max: 60 },
            { key: "description", label: "Description", type: "textarea", rows: 3, max: 600 },
            { key: "population", label: "Population", type: "text", max: 20 },
            { key: "programs", label: "Key programs", type: "strings", itemLabel: "Program", maxItems: 10 },
            { key: "image", label: "Image", type: "image" },
          ],
        },
      ],
    },
    {
      title: "Geographic impact",
      fields: [
        { key: "map.title", label: "Heading", type: "text", max: 120 },
        { key: "map.text", label: "Text", type: "textarea", rows: 3, max: 600 },
      ],
    },
    {
      title: "Community stories",
      fields: [
        { key: "stories.title", label: "Heading", type: "text", max: 120 },
        { key: "stories.text", label: "Text", type: "text", max: 200 },
        {
          key: "stories.items",
          label: "Stories",
          type: "list",
          itemLabel: "Story",
          maxItems: 10,
          fields: [
            { key: "icon", label: "Icon", type: "icon" },
            { key: "title", label: "Title", type: "text", max: 120 },
            { key: "quote", label: "Quote", type: "textarea", rows: 4, max: 1000 },
            { key: "author", label: "Attribution", type: "text", max: 120 },
          ],
        },
      ],
    },
  ],
  defaults: {
    hero: {
      title: "Where We Work",
      subtitle:
        "Our programs reach across Kenya's diverse landscapes, from urban centers to remote rural communities, bringing hope and opportunity where it's needed most.",
      image: "/images/rural-community.avif",
      imageAlt: "Kenyan landscape showing our work areas",
    },
    reach: {
      title: "Our Reach Across Kenya",
      text: "We work in five counties, each with unique challenges and opportunities. Our locally-adapted programs ensure maximum impact in every community we serve.",
    },
    counties: [
      {
        name: "Nairobi",
        description: "Urban programs focusing on slum communities, street children, and urban poverty alleviation.",
        population: "4.4M",
        programs: ["Education Support", "Youth Programs", "Urban Agriculture"],
        image: "/images/traditional-huts.jpeg",
      },
      {
        name: "Kajiado",
        description: "Our home base, working with pastoral communities on livestock, education, and water access.",
        population: "1.1M",
        programs: ["Pastoral Livelihoods", "Water Projects", "Community Training"],
        image: "/images/african-village.avif",
      },
      {
        name: "Lamu",
        description:
          "Coastal programs addressing fishing communities, environmental conservation, and cultural preservation.",
        population: "143K",
        programs: ["Marine Conservation", "Fishing Support", "Cultural Programs"],
        image: "/images/community-landscape.avif",
      },
      {
        name: "Narok",
        description: "Working with Maasai communities on education, healthcare, and sustainable tourism development.",
        population: "1.2M",
        programs: ["Healthcare Access", "Education", "Sustainable Tourism"],
        image: "/images/traditional-huts.jpeg",
      },
      {
        name: "Turkana",
        description: "Addressing food security, water scarcity, and climate resilience in this arid region.",
        population: "926K",
        programs: ["Food Security", "Water Access", "Climate Adaptation"],
        image: "/images/african-village.avif",
      },
    ],
    map: {
      title: "Our Geographic Impact",
      text: "From the highlands to the coast, from urban centers to remote villages, our work spans Kenya's diverse geography and communities.",
    },
    stories: {
      title: "Community Stories",
      text: "Real impact in real communities across Kenya",
      items: [
        {
          icon: "home",
          title: "Kajiado Pastoral Community",
          quote:
            "Through NADUPA's water project, our community now has access to clean water year-round. Our children can attend school instead of walking hours to fetch water, and our livestock are healthier.",
          author: "Community Elder, Kajiado West",
        },
        {
          icon: "leaf",
          title: "Lamu Conservation Initiative",
          quote:
            "The mangrove restoration project has not only protected our coastline but also provided new income opportunities through eco-tourism. Our youth are now environmental champions.",
          author: "Fishing Community Leader, Lamu",
        },
      ],
    },
  },
})
