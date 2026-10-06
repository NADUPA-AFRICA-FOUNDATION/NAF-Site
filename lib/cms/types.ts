// Field definitions that drive both the admin editor and content validation.
// Each public page declares its editable fields plus default values (the text
// that shipped in the code), so the site renders identically until edited.

export type Field =
  | { key: string; label: string; type: "text"; help?: string; max?: number }
  | { key: string; label: string; type: "textarea"; help?: string; max?: number; rows?: number }
  | { key: string; label: string; type: "image"; help?: string }
  | { key: string; label: string; type: "icon"; help?: string }
  | { key: string; label: string; type: "url"; help?: string }
  | { key: string; label: string; type: "strings"; help?: string; itemLabel?: string; maxItems?: number }
  | {
      key: string
      label: string
      type: "list"
      help?: string
      itemLabel: string
      fields: Field[]
      maxItems?: number
    }

export interface Section {
  title: string
  description?: string
  fields: Field[]
}

export interface PageDefinition<T> {
  key: string
  label: string
  path: string | null // null for site-wide settings
  sections: Section[]
  defaults: T
}

// Helper so each page file gets its content type inferred from its defaults
export function definePage<T>(page: PageDefinition<T>): PageDefinition<T> {
  return page
}

// Rich text used by long-form fields: blank line = new paragraph,
// "### " = subheading, "- " = bullet point.
export type RichBlock =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "ul"; items: string[] }

export function parseRichText(text: string): RichBlock[] {
  const blocks: RichBlock[] = []
  for (const chunk of text.split(/\n\s*\n/)) {
    const lines = chunk.split("\n").map((l) => l.trim()).filter(Boolean)
    let list: string[] | null = null
    for (const line of lines) {
      if (line.startsWith("- ")) {
        if (!list) {
          list = []
          blocks.push({ type: "ul", items: list })
        }
        list.push(line.slice(2))
        continue
      }
      list = null
      if (line.startsWith("### ")) blocks.push({ type: "h", text: line.slice(4) })
      else blocks.push({ type: "p", text: line })
    }
  }
  return blocks
}
