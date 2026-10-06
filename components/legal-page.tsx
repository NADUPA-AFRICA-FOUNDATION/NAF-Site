import { AlertTriangle, Calendar, FileText, Mail, MapPin, Phone, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { getContent } from "@/lib/cms/content"
import { parseRichText } from "@/lib/cms/types"

interface LegalContent {
  hero: { title: string; subtitle: string }
  effectiveDate: string
  notice: { title: string; text: string }
  sections: { title: string; body: string }[]
  contactIntro: string
  lastUpdated: string
}

function RichText({ text }: { text: string }) {
  return (
    <div className="space-y-4 text-stone-700">
      {parseRichText(text).map((block, i) => {
        if (block.type === "h") return <h4 key={i} className="font-semibold text-stone-800">{block.text}</h4>
        if (block.type === "ul")
          return (
            <ul key={i} className="list-disc pl-6 space-y-1">
              {block.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          )
        return <p key={i}>{block.text}</p>
      })}
    </div>
  )
}

// Shared layout for Terms and Privacy so they match the rest of the site.
export async function LegalPage({ content: c }: { content: LegalContent }) {
  const s = await getContent("settings")

  return (
    <div className="min-h-screen bg-stone-50">
      <Navigation />

      <section className="bg-gradient-to-r from-emerald-900 to-emerald-700 text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{c.hero.title}</h1>
          <p className="text-xl opacity-90">{c.hero.subtitle}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="border-emerald-200">
            <CardHeader className="bg-emerald-50">
              <CardTitle className="flex items-center gap-2 text-emerald-800">
                <FileText className="w-5 h-5" />
                Organization Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 grid md:grid-cols-2 gap-3 text-sm text-stone-700">
              {[
                { icon: Calendar, label: "Effective Date", value: c.effectiveDate },
                { icon: Users, label: "Organization", value: s.orgName },
                { icon: FileText, label: "Registration", value: s.registrationNumber },
                { icon: MapPin, label: "Location", value: `${s.addressLine1}, ${s.addressLine2}` },
              ].map((row) => (
                <div key={row.label} className="flex items-center gap-2">
                  <row.icon className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="font-semibold">{row.label}:</span>
                  <span>{row.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {c.notice.text && (
            <Card className="border-amber-200 bg-amber-50">
              <CardContent className="pt-6 flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="font-semibold text-amber-800 mb-2">{c.notice.title}</h2>
                  <p className="text-amber-700">{c.notice.text}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {c.sections.map((section, index) => (
            <Card key={index} className="border-stone-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-stone-800">
                  <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-bold">{index + 1}</span>
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RichText text={section.body} />
              </CardContent>
            </Card>
          ))}

          <Card className="border-emerald-200 bg-emerald-50">
            <CardHeader>
              <CardTitle className="text-emerald-800">Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-emerald-700">{c.contactIntro}</p>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <a href={`mailto:${s.email}`} className="flex items-center gap-2 text-emerald-700 hover:text-emerald-800">
                  <Mail className="w-4 h-4 text-emerald-600" />
                  {s.email}
                </a>
                <a href={`tel:${s.phone.replace(/[^\d+]/g, "")}`} className="flex items-center gap-2 text-emerald-700 hover:text-emerald-800">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  {s.phone}
                </a>
                <span className="flex items-center gap-2 text-emerald-700">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  {s.addressLine1}
                </span>
              </div>
              {c.lastUpdated && (
                <p className="mt-4 pt-4 border-t border-emerald-200 text-sm text-emerald-600">{c.lastUpdated}</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
