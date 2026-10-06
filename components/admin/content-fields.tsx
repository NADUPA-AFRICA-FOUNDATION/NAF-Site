"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { uploadToConvex } from "@/lib/upload-client"
import { ICON_NAMES, getIcon } from "@/lib/cms/icons"
import { getPath, setPath } from "@/lib/cms/registry"
import type { Field } from "@/lib/cms/types"
import { ArrowDown, ArrowUp, ChevronDown, ChevronRight, ImageUp, Loader2, Plus, Trash2 } from "lucide-react"

type Value = Record<string, unknown>

function emptyValue(field: Field): unknown {
  switch (field.type) {
    case "list":
    case "strings":
      return []
    case "icon":
      return "heart"
    default:
      return ""
  }
}

export function emptyItem(fields: Field[]): Value {
  const item: Value = {}
  for (const f of fields) setPath(item, f.key, emptyValue(f))
  return item
}

function moveItem<T>(items: T[], from: number, to: number): T[] {
  if (to < 0 || to >= items.length) return items
  const next = [...items]
  const [moved] = next.splice(from, 1)
  next.splice(to, 0, moved)
  return next
}

function ImageInput({ id, value, onChange }: { id: string; value: string; onChange: (v: string) => void }) {
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const upload = async (file: File) => {
    setUploading(true)
    try {
      const storageId = await uploadToConvex(file)
      const response = await fetch("/api/admin/content/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ storageId }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "Upload failed")
      onChange(result.url)
    } catch (err) {
      toast({ title: "Upload failed", description: err instanceof Error ? err.message : "", variant: "destructive" })
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ""
    }
  }

  return (
    <div className="flex gap-3 items-start">
      <div className="w-28 h-20 rounded-md border border-stone-200 bg-stone-100 overflow-hidden flex-shrink-0">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-stone-400">No image</div>
        )}
      </div>
      <div className="flex-1 space-y-2">
        <Input id={id} value={value} onChange={(e) => onChange(e.target.value)} placeholder="Upload an image, or /images/..." />
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
        />
        <Button type="button" variant="outline" size="sm" onClick={() => fileRef.current?.click()} disabled={uploading}>
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageUp className="w-4 h-4" />}
          {uploading ? "Uploading..." : "Upload image"}
        </Button>
      </div>
    </div>
  )
}

function ItemControls({
  index,
  count,
  onMove,
  onRemove,
}: {
  index: number
  count: number
  onMove: (to: number) => void
  onRemove: () => void
}) {
  return (
    <div className="flex items-center gap-1">
      <Button type="button" variant="ghost" size="icon" className="h-8 w-8" disabled={index === 0} onClick={() => onMove(index - 1)} aria-label="Move up">
        <ArrowUp className="w-4 h-4" />
      </Button>
      <Button type="button" variant="ghost" size="icon" className="h-8 w-8" disabled={index === count - 1} onClick={() => onMove(index + 1)} aria-label="Move down">
        <ArrowDown className="w-4 h-4" />
      </Button>
      <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700" onClick={onRemove} aria-label="Remove">
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  )
}

function ListInput({ field, items, onChange }: { field: Extract<Field, { type: "list" }>; items: Value[]; onChange: (v: Value[]) => void }) {
  const [open, setOpen] = useState<number | null>(null)
  const max = field.maxItems ?? 50
  const titleKey = field.fields.find((f) => f.type === "text")?.key

  return (
    <div className="space-y-2">
      {items.map((item, i) => {
        const title = (titleKey && (getPath(item, titleKey) as string)) || `${field.itemLabel} ${i + 1}`
        const isOpen = open === i
        return (
          <div key={i} className="border border-stone-200 rounded-lg bg-white">
            <div className="flex items-center justify-between px-3 py-2">
              <button type="button" className="flex items-center gap-2 text-left text-sm font-medium text-stone-800 flex-1 min-w-0" onClick={() => setOpen(isOpen ? null : i)}>
                {isOpen ? <ChevronDown className="w-4 h-4 flex-shrink-0" /> : <ChevronRight className="w-4 h-4 flex-shrink-0" />}
                <span className="truncate">{title}</span>
              </button>
              <ItemControls
                index={i}
                count={items.length}
                onMove={(to) => {
                  onChange(moveItem(items, i, to))
                  setOpen(isOpen ? to : open)
                }}
                onRemove={() => {
                  if (confirm(`Remove "${title}"?`)) {
                    onChange(items.filter((_, j) => j !== i))
                    setOpen(null)
                  }
                }}
              />
            </div>
            {isOpen && (
              <div className="border-t border-stone-100 p-4 space-y-4">
                {field.fields.map((sub) => (
                  <FieldInput
                    key={sub.key}
                    field={sub}
                    idPrefix={`${field.key}-${i}`}
                    value={getPath(item, sub.key)}
                    onChange={(v) => {
                      const next = structuredClone(item)
                      setPath(next, sub.key, v)
                      onChange(items.map((it, j) => (j === i ? next : it)))
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )
      })}
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={items.length >= max}
        onClick={() => {
          onChange([...items, emptyItem(field.fields)])
          setOpen(items.length)
        }}
      >
        <Plus className="w-4 h-4" />
        Add {field.itemLabel.toLowerCase()}
      </Button>
    </div>
  )
}

function StringsInput({ field, items, onChange }: { field: Extract<Field, { type: "strings" }>; items: string[]; onChange: (v: string[]) => void }) {
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <Input value={item} onChange={(e) => onChange(items.map((it, j) => (j === i ? e.target.value : it)))} />
          <ItemControls index={i} count={items.length} onMove={(to) => onChange(moveItem(items, i, to))} onRemove={() => onChange(items.filter((_, j) => j !== i))} />
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" disabled={items.length >= (field.maxItems ?? 50)} onClick={() => onChange([...items, ""])}>
        <Plus className="w-4 h-4" />
        Add {(field.itemLabel ?? "item").toLowerCase()}
      </Button>
    </div>
  )
}

export function FieldInput({ field, value, onChange, idPrefix = "" }: { field: Field; value: unknown; onChange: (v: unknown) => void; idPrefix?: string }) {
  const id = `${idPrefix}-${field.key}`.replace(/[^a-zA-Z0-9-]/g, "-")
  const label = (
    <Label htmlFor={id} className="text-stone-700">
      {field.label}
    </Label>
  )
  const help = field.help && <p className="text-xs text-stone-500">{field.help}</p>

  let input: React.ReactNode
  switch (field.type) {
    case "text":
    case "url":
      input = <Input id={id} value={(value as string) ?? ""} maxLength={field.type === "text" ? field.max : undefined} onChange={(e) => onChange(e.target.value)} />
      break
    case "textarea":
      input = <Textarea id={id} value={(value as string) ?? ""} rows={field.rows ?? 4} maxLength={field.max} onChange={(e) => onChange(e.target.value)} />
      break
    case "image":
      input = <ImageInput id={id} value={(value as string) ?? ""} onChange={onChange} />
      break
    case "icon": {
      const Current = getIcon(value as string)
      input = (
        <Select value={(value as string) || "heart"} onValueChange={onChange}>
          <SelectTrigger id={id} className="w-56">
            <SelectValue>
              <span className="flex items-center gap-2">
                <Current className="w-4 h-4 text-emerald-600" />
                {value as string}
              </span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {ICON_NAMES.map((name) => {
              const Icon = getIcon(name)
              return (
                <SelectItem key={name} value={name}>
                  <span className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-emerald-600" />
                    {name}
                  </span>
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      )
      break
    }
    case "strings":
      input = <StringsInput field={field} items={(value as string[]) ?? []} onChange={onChange} />
      break
    case "list":
      input = <ListInput field={field} items={(value as Value[]) ?? []} onChange={onChange} />
      break
  }

  return (
    <div className="space-y-2">
      {label}
      {help}
      {input}
    </div>
  )
}
