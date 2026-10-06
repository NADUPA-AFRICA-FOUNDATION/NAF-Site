import type { Field, PageDefinition } from "./types"
import { ICON_NAMES } from "./icons"
import { settingsPage } from "./pages/settings"
import { homePage } from "./pages/home"
import { aboutPage } from "./pages/about"
import { programsPage } from "./pages/programs"
import { whereWeWorkPage } from "./pages/where-we-work"
import { getInvolvedPage } from "./pages/get-involved"
import { volunteerPage } from "./pages/volunteer"
import { donatePage } from "./pages/donate"
import { contactPage } from "./pages/contact"
import { resourcesPage } from "./pages/resources"
import { transparencyPage } from "./pages/transparency"
import { termsPage } from "./pages/terms"
import { privacyPage } from "./pages/privacy"

export const PAGES = {
  settings: settingsPage,
  home: homePage,
  about: aboutPage,
  programs: programsPage,
  "where-we-work": whereWeWorkPage,
  "get-involved": getInvolvedPage,
  volunteer: volunteerPage,
  donate: donatePage,
  contact: contactPage,
  resources: resourcesPage,
  transparency: transparencyPage,
  terms: termsPage,
  privacy: privacyPage,
} as const

export type PageKey = keyof typeof PAGES
export type PageContent<K extends PageKey> = (typeof PAGES)[K]["defaults"]

export function isPageKey(key: string): key is PageKey {
  return Object.prototype.hasOwnProperty.call(PAGES, key)
}

export function getPath(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, part) => (acc as Record<string, unknown> | undefined)?.[part], obj)
}

export function setPath(obj: Record<string, unknown>, path: string, value: unknown) {
  const parts = path.split(".")
  let target = obj
  for (const part of parts.slice(0, -1)) {
    if (typeof target[part] !== "object" || target[part] === null) target[part] = {}
    target = target[part] as Record<string, unknown>
  }
  target[parts[parts.length - 1]] = value
}

// Stored content may predate a field or be missing a section; fall back to
// the shipped defaults for anything not saved.
export function mergeWithDefaults<T>(defaults: T, stored: unknown): T {
  if (Array.isArray(defaults)) return (Array.isArray(stored) ? stored : defaults) as T
  if (defaults && typeof defaults === "object") {
    const out: Record<string, unknown> = { ...(defaults as Record<string, unknown>) }
    if (stored && typeof stored === "object" && !Array.isArray(stored)) {
      for (const key of Object.keys(out)) {
        out[key] = mergeWithDefaults((defaults as Record<string, unknown>)[key], (stored as Record<string, unknown>)[key])
      }
    }
    return out as T
  }
  return (typeof stored === typeof defaults ? stored : defaults) as T
}

const DEFAULT_MAX = 500

function isSafeUrl(value: string): boolean {
  if (value === "") return true
  if (value.startsWith("/") && !value.startsWith("//")) return true
  try {
    return new URL(value).protocol === "https:"
  } catch {
    return false
  }
}

// Images must come from the site or its upload storage; the Content-Security-Policy
// in next.config.mjs blocks images from anywhere else.
function isAllowedImage(value: string): boolean {
  if (value === "" || (value.startsWith("/") && !value.startsWith("//"))) return true
  try {
    const url = new URL(value)
    return (
      url.protocol === "https:" &&
      (url.hostname === "blob.vercel-storage.com" ||
        url.hostname.endsWith(".public.blob.vercel-storage.com") ||
        url.hostname.endsWith(".supabase.co"))
    )
  } catch {
    return false
  }
}

// Validates one field's value; throws a readable error for the admin.
function sanitizeField(field: Field, value: unknown, where: string): unknown {
  switch (field.type) {
    case "text":
    case "textarea": {
      if (typeof value !== "string") throw new Error(`${where} must be text`)
      const max = field.max ?? DEFAULT_MAX
      if (value.length > max) throw new Error(`${where} is too long (max ${max} characters)`)
      return field.type === "text" ? value.trim() : value.replace(/\r\n/g, "\n").trim()
    }
    case "url": {
      if (typeof value !== "string" || !isSafeUrl(value.trim())) {
        throw new Error(`${where} must be an https:// link or a site path starting with /`)
      }
      return value.trim()
    }
    case "image": {
      if (typeof value !== "string" || !isAllowedImage(value.trim())) {
        throw new Error(`${where}: upload the image, or use a site path starting with /images/`)
      }
      return value.trim()
    }
    case "icon": {
      if (typeof value !== "string" || !ICON_NAMES.includes(value)) throw new Error(`${where} has an unknown icon`)
      return value
    }
    case "strings": {
      if (!Array.isArray(value)) throw new Error(`${where} must be a list`)
      const max = field.maxItems ?? 50
      if (value.length > max) throw new Error(`${where} can have at most ${max} items`)
      return value.map((item, i) => {
        if (typeof item !== "string" || item.length > 300) throw new Error(`${where} item ${i + 1} is invalid`)
        return item.trim()
      }).filter(Boolean)
    }
    case "list": {
      if (!Array.isArray(value)) throw new Error(`${where} must be a list`)
      const max = field.maxItems ?? 50
      if (value.length > max) throw new Error(`${where} can have at most ${max} items`)
      return value.map((item, i) => {
        const out: Record<string, unknown> = {}
        for (const sub of field.fields) {
          setPath(out, sub.key, sanitizeField(sub, getPath(item, sub.key), `${field.itemLabel} ${i + 1}: ${sub.label}`))
        }
        return out
      })
    }
  }
}

// Keeps only the fields the page defines, validated; unknown keys are dropped.
export function sanitizeContent(page: PageDefinition<unknown>, input: unknown): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const section of page.sections) {
    for (const field of section.fields) {
      const value = getPath(input, field.key)
      if (value === undefined) continue
      setPath(out, field.key, sanitizeField(field, value, field.label))
    }
  }
  return out
}
