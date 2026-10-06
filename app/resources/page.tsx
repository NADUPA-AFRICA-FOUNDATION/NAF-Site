import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { DocumentLibrary } from "@/components/document-library"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, FileText } from "lucide-react"
import { getContent } from "@/lib/cms/content"

export const revalidate = 3600

// Foundation publications served as printable HTML by /api/documents/by-slug/[slug]
const publications = [
  {
    slug: "annual-report-2023",
    title: "Annual Report 2023",
    description: "A full review of our programs, finances, and community impact across Kenya in 2023.",
  },
  {
    slug: "strategic-plan-2024-2027",
    title: "Strategic Plan 2024-2027",
    description: "Our roadmap for the next four years: goals, priority programs, and how we measure success.",
  },
  {
    slug: "water-project-impact",
    title: "Water Project Impact Report",
    description: "Outcomes and lessons from our clean water initiatives in Kajiado County.",
  },
]

export default async function ResourcesPage() {
  const c = await getContent("resources")

  return (
    <div className="min-h-screen bg-stone-50">
      <Navigation />
      <PageHero hero={c.hero} />

      {/* Foundation Publications */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-stone-800 mb-2">{c.publications.title}</h2>
            <p className="text-lg text-stone-600">{c.publications.text}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {publications.map((pub) => (
              <Card key={pub.slug} className="border-stone-200 hover:border-emerald-500 transition-colors">
                <CardContent className="p-6">
                  <div className="p-2 rounded-lg bg-emerald-50 w-fit mb-4">
                    <FileText className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-stone-800 mb-2">{pub.title}</h3>
                  <p className="text-sm text-stone-600 mb-4">{pub.description}</p>
                  <a
                    href={`/api/documents/by-slug/${pub.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-700"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Read document
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Document Library */}
      <section className="py-16 px-4 bg-stone-50">
        <div className="container mx-auto max-w-6xl">
          <DocumentLibrary title={c.library.title} subtitle={c.library.text} emptyText={c.library.emptyText} />
        </div>
      </section>

      <Footer />
    </div>
  )
}
