import type { Field, Section } from "./types"

export interface Hero {
  title: string
  subtitle: string
  image: string
  imageAlt: string
}

export function heroSection(description = "The banner at the top of the page"): Section {
  return {
    title: "Hero banner",
    description,
    fields: [
      { key: "hero.title", label: "Heading", type: "text", max: 120 },
      { key: "hero.subtitle", label: "Subheading", type: "textarea", rows: 3, max: 400 },
      { key: "hero.image", label: "Background image", type: "image" },
      { key: "hero.imageAlt", label: "Image description (for screen readers)", type: "text", max: 200 },
    ],
  }
}

export const statFields: Field[] = [
  { key: "value", label: "Number", type: "text", max: 30 },
  { key: "label", label: "Label", type: "text", max: 120 },
]

export const cardFields: Field[] = [
  { key: "icon", label: "Icon", type: "icon" },
  { key: "title", label: "Title", type: "text", max: 120 },
  { key: "description", label: "Description", type: "textarea", rows: 3, max: 600 },
]
