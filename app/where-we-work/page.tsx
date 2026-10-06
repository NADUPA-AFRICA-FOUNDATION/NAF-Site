import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Users } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import Image from "next/image"
import { getContent } from "@/lib/cms/content"
import { getIcon } from "@/lib/cms/icons"

export const revalidate = 3600

export default async function WhereWeWorkPage() {
  const c = await getContent("where-we-work")

  return (
    <div className="min-h-screen bg-stone-50">
      <Navigation />
      <PageHero hero={c.hero} tall />

      {/* Counties Overview */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">{c.reach.title}</h2>
            <p className="text-lg text-stone-600 max-w-3xl mx-auto">{c.reach.text}</p>
          </div>

          <div className="grid gap-8">
            {c.counties.map((county, index) => (
              <Card key={index} className="overflow-hidden border-stone-200 hover:shadow-lg transition-shadow">
                <div className="grid lg:grid-cols-3 gap-0">
                  <div className={`relative h-64 lg:h-auto ${index % 2 === 1 ? "lg:col-start-3" : ""}`}>
                    <Image
                      src={county.image || "/placeholder.svg"}
                      alt={`${county.name} county landscape`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/40 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-5 h-5" />
                        <span className="font-semibold text-lg">{county.name} County</span>
                      </div>
                      {county.population && (
                        <div className="flex items-center gap-2 text-sm opacity-90">
                          <Users className="w-4 h-4" />
                          <span>Population: {county.population}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={`lg:col-span-2 p-8 ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                    <h3 className="text-2xl font-bold text-stone-800 mb-4">{county.name}</h3>
                    <p className="text-stone-600 mb-6 leading-relaxed text-lg">{county.description}</p>
                    {county.programs.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-stone-800 mb-3">Key Programs:</h4>
                        <div className="flex flex-wrap gap-2">
                          {county.programs.map((program, programIndex) => (
                            <span key={programIndex} className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                              {program}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Map Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-emerald-50 to-sky-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">{c.map.title}</h2>
            <p className="text-lg text-stone-600 max-w-3xl mx-auto">{c.map.text}</p>
          </div>
          <div className="bg-white rounded-lg p-8 shadow-lg max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
              {c.counties.map((county, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mb-3">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-stone-800 mb-1">{county.name}</h3>
                  <p className="text-sm text-stone-600">{county.population}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Community Stories */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">{c.stories.title}</h2>
            <p className="text-lg text-stone-600">{c.stories.text}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {c.stories.items.map((story, index) => {
              const Icon = getIcon(story.icon)
              return (
                <Card key={index} className="border-stone-200">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <Icon className="w-6 h-6 text-emerald-600" />
                      <h3 className="font-semibold text-stone-800 text-lg">{story.title}</h3>
                    </div>
                    <p className="text-stone-600 leading-relaxed">&ldquo;{story.quote}&rdquo;</p>
                    {story.author && <p className="text-sm text-stone-500 mt-4">- {story.author}</p>}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
