import DocumentManagement from "@/components/document-management"
import { AdminShell } from "@/components/admin-shell"

export default function AdminDocumentsPage() {
  return (
    <AdminShell>
      <DocumentManagement />
    </AdminShell>
  )
}
