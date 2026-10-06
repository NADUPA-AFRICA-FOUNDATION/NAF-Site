import { definePage } from "../types"
import { heroSection } from "../common"

// Document categories (from Admin → Documents) listed on the transparency page
export const TRANSPARENCY_CATEGORIES = ["Financial Reports", "Annual Reports", "Governance"]

export const transparencyPage = definePage({
  key: "transparency",
  label: "Transparency",
  path: "/transparency",
  sections: [
    heroSection(),
    {
      title: "Introduction",
      fields: [
        { key: "intro.title", label: "Heading", type: "text", max: 120 },
        { key: "intro.text", label: "Text (blank line between paragraphs)", type: "textarea", rows: 5, max: 2000 },
      ],
    },
    {
      title: "Key figures",
      fields: [
        {
          key: "figures",
          label: "Figures",
          type: "list",
          itemLabel: "Figure",
          maxItems: 6,
          fields: [
            { key: "value", label: "Value", type: "text", max: 30 },
            { key: "label", label: "Label", type: "text", max: 120 },
          ],
        },
      ],
    },
    {
      title: "Reports",
      description: `Documents uploaded under Admin → Documents in these categories appear here: ${TRANSPARENCY_CATEGORIES.join(", ")}`,
      fields: [
        { key: "reports.title", label: "Heading", type: "text", max: 120 },
        { key: "reports.text", label: "Text", type: "text", max: 300 },
        { key: "reports.emptyText", label: "Text when there are no reports yet", type: "textarea", rows: 2, max: 300 },
      ],
    },
  ],
  defaults: {
    hero: {
      title: "Financial Transparency",
      subtitle: "How we use every contribution, and the reports that show it.",
      image: "/images/rural-landscape.avif",
      imageAlt: "Rural landscape representing our documented work across Kenya",
    },
    intro: {
      title: "Accountable to the communities we serve",
      text: "We believe donors, partners, and communities deserve to see exactly how funds are used. We publish our financial reports here as they become available, and you can request our financial records at any time.",
    },
    figures: [] as { value: string; label: string }[],
    reports: {
      title: "Financial Reports & Governance",
      text: "Audited statements, annual reports, and governance documents.",
      emptyText:
        "We're preparing our latest financial reports for publication. In the meantime, contact us to request our financial statements.",
    },
  },
})
