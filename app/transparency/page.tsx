import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PageHero, Paragraphs } from "@/components/page-hero"
import { DocumentLibrary } from "@/components/document-library"
import { Button } from "@/components/ui/button"
import { getContent } from "@/lib/cms/content"
import { TRANSPARENCY_CATEGORIES } from "@/lib/cms/pages/transparency"

export const revalidate = 3600

export default async function TransparencyPage() {
  const c = await getContent("transparency")

  return (
    <div className="min-h-screen bg-stone-50">
      <Navigation />
      <PageHero hero={c.hero} />

      {/* Introduction */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-6">{c.intro.title}</h2>
          <Paragraphs text={c.intro.text} className="text-lg text-stone-600 leading-relaxed mb-4" />

          {c.figures.length > 0 && (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
              {c.figures.map((figure, index) => (
                <div key={index} className="bg-emerald-50 border border-emerald-100 rounded-lg p-6">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">{figure.value}</div>
                  <div className="text-stone-600">{figure.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Reports from the document library */}
      <section className="py-16 px-4 bg-stone-50">
        <div className="container mx-auto max-w-6xl">
          <DocumentLibrary
            title={c.reports.title}
            subtitle={c.reports.text}
            emptyText={c.reports.emptyText}
            categories={TRANSPARENCY_CATEGORIES}
          />
          <div className="text-center mt-10">
            <Link href="/contact">
              <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                Request financial statements
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
