import { notFound } from "next/navigation"
import { AdminShell } from "@/components/admin-shell"
import { PageEditor } from "@/components/admin/page-editor"
import { isPageKey } from "@/lib/cms/registry"

export default async function AdminPageEditorPage({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params
  if (!isPageKey(key)) notFound()
  return (
    <AdminShell>
      <PageEditor pageKey={key} />
    </AdminShell>
  )
}
