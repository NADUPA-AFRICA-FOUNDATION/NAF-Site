import { definePage } from "../types"
import { heroSection } from "../common"

export const resourcesPage = definePage({
  key: "resources",
  label: "Resources",
  path: "/resources",
  sections: [
    heroSection("Uploaded files are managed under Documents"),
    {
      title: "Foundation publications",
      fields: [
        { key: "publications.title", label: "Heading", type: "text", max: 120 },
        { key: "publications.text", label: "Text", type: "text", max: 300 },
      ],
    },
    {
      title: "Document library",
      fields: [
        { key: "library.title", label: "Heading", type: "text", max: 120 },
        { key: "library.text", label: "Text", type: "text", max: 300 },
        { key: "library.emptyText", label: "Text when there are no documents", type: "textarea", rows: 2, max: 300 },
      ],
    },
  ],
  defaults: {
    hero: {
      title: "Resources & Publications",
      subtitle: "Reports, plans, and documents from our work empowering communities across Kenya.",
      image: "/images/rural-landscape.avif",
      imageAlt: "Rural landscape representing our documented work across Kenya",
    },
    publications: {
      title: "Foundation Publications",
      text: "Key reports and plans, readable and printable in your browser.",
    },
    library: {
      title: "Document Library",
      text: "Download our reports, assessments, and program documents.",
      emptyText: "More documents are on the way. Please check back soon for reports and other materials.",
    },
  },
})
