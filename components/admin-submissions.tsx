"use client"

import type React from "react"
import { useCallback, useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Mail, Phone, RefreshCw, Trash2 } from "lucide-react"

type Kind = "contact" | "donation" | "volunteer"
type Status = "new" | "reviewed" | "archived"

interface Submission {
  _id: string
  _creationTime: number
  status: Status
  email: string
  phone?: string
  firstName?: string
  lastName?: string
  fullName?: string
  subject?: string
  message?: string
  amount?: number
  isCustomAmount?: boolean
  paymentMethod?: string
  motivation?: string
  areasOfInterest?: string[]
  availability?: string[]
  skills?: string[]
  additionalInfo?: string
}

const KIND_LABELS: Record<Kind, string> = {
  contact: "Contact messages",
  donation: "Donation interest",
  volunteer: "Volunteer applications",
}

const STATUS_STYLES: Record<Status, string> = {
  new: "bg-emerald-100 text-emerald-800",
  reviewed: "bg-stone-200 text-stone-700",
  archived: "bg-stone-100 text-stone-500",
}

function displayName(item: Submission) {
  return item.fullName ?? `${item.firstName ?? ""} ${item.lastName ?? ""}`.trim()
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs font-medium uppercase text-stone-500">{label}</div>
      <div className="text-sm text-stone-800 whitespace-pre-wrap break-words">{children}</div>
    </div>
  )
}

export function AdminSubmissions() {
  const [kind, setKind] = useState<Kind>("contact")
  const [showArchived, setShowArchived] = useState(false)
  const [items, setItems] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/admin/submissions?kind=${kind}`)
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "Could not load submissions")
      setItems(result.items)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load submissions")
    } finally {
      setLoading(false)
    }
  }, [kind])

  useEffect(() => {
    load()
  }, [load])

  const updateStatus = async (id: string, status: Status) => {
    const response = await fetch("/api/admin/submissions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    })
    if (!response.ok) {
      toast({ title: "Update failed", description: "Please try again.", variant: "destructive" })
      return
    }
    setItems((prev) => prev.map((item) => (item._id === id ? { ...item, status } : item)))
  }

  const deleteItem = async (item: Submission) => {
    if (!confirm(`Permanently delete the submission from ${displayName(item)}? This cannot be undone.`)) return
    const response = await fetch(`/api/admin/submissions?id=${encodeURIComponent(item._id)}`, { method: "DELETE" })
    if (!response.ok) {
      toast({ title: "Delete failed", description: "Please try again.", variant: "destructive" })
      return
    }
    setItems((prev) => prev.filter((it) => it._id !== item._id))
    toast({ title: "Deleted", description: "The submission was permanently deleted." })
  }

  const visible = items.filter((item) => showArchived || item.status !== "archived")
  const newCount = items.filter((item) => item.status === "new").length

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-800">Form submissions</h1>
          <p className="text-stone-600 text-sm">
            Delete submissions once they are no longer needed, or when someone asks (Privacy Policy). {newCount} new {KIND_LABELS[kind].toLowerCase()}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-stone-600">
            <input type="checkbox" checked={showArchived} onChange={(e) => setShowArchived(e.target.checked)} />
            Show archived
          </label>
          <Button variant="outline" size="sm" onClick={load} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      <Tabs value={kind} onValueChange={(value) => setKind(value as Kind)}>
        <TabsList>
          {(Object.keys(KIND_LABELS) as Kind[]).map((k) => (
            <TabsTrigger key={k} value={k}>
              {KIND_LABELS[k]}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {loading ? (
        <div className="flex justify-center py-12 text-stone-500">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      ) : error ? (
        <div className="p-4 rounded-md bg-red-50 text-red-700 text-sm">{error}</div>
      ) : visible.length === 0 ? (
        <p className="text-center py-12 text-stone-500">No submissions yet.</p>
      ) : (
        <div className="space-y-4">
          {visible.map((item) => (
            <Card key={item._id}>
              <CardContent className="p-5 space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="font-semibold text-stone-800">{displayName(item)}</div>
                    <div className="flex flex-wrap gap-4 text-sm text-stone-600 mt-1">
                      <a href={`mailto:${item.email}`} className="flex items-center gap-1 hover:underline">
                        <Mail className="w-3 h-3" />
                        {item.email}
                      </a>
                      {item.phone && (
                        <a href={`tel:${item.phone}`} className="flex items-center gap-1 hover:underline">
                          <Phone className="w-3 h-3" />
                          {item.phone}
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-stone-500">{new Date(item._creationTime).toLocaleString()}</span>
                    <Badge className={STATUS_STYLES[item.status]}>{item.status}</Badge>
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  {item.subject && <Field label="Subject">{item.subject}</Field>}
                  {item.amount !== undefined && (
                    <Field label="Amount">
                      ${item.amount.toLocaleString()}
                      {item.isCustomAmount ? " (custom)" : ""}
                    </Field>
                  )}
                  {item.paymentMethod && <Field label="Payment method">{item.paymentMethod}</Field>}
                  {item.areasOfInterest && <Field label="Areas of interest">{item.areasOfInterest.join(", ")}</Field>}
                  {item.availability && <Field label="Availability">{item.availability.join(", ")}</Field>}
                  {item.skills && item.skills.length > 0 && <Field label="Skills">{item.skills.join(", ")}</Field>}
                </div>
                {item.message && <Field label="Message">{item.message}</Field>}
                {item.motivation && <Field label="Motivation">{item.motivation}</Field>}
                {item.additionalInfo && <Field label="Additional info">{item.additionalInfo}</Field>}

                <div className="flex gap-2 pt-2 border-t">
                  {item.status !== "reviewed" && (
                    <Button size="sm" variant="outline" onClick={() => updateStatus(item._id, "reviewed")}>
                      Mark reviewed
                    </Button>
                  )}
                  {item.status !== "new" && (
                    <Button size="sm" variant="outline" onClick={() => updateStatus(item._id, "new")}>
                      Mark new
                    </Button>
                  )}
                  {item.status !== "archived" && (
                    <Button size="sm" variant="ghost" onClick={() => updateStatus(item._id, "archived")}>
                      Archive
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" className="ml-auto text-red-600 hover:text-red-700" onClick={() => deleteItem(item)}>
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
