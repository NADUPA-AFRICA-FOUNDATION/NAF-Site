import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import Image from "next/image"
import { getContent } from "@/lib/cms/content"
import { getIcon } from "@/lib/cms/icons"

export const revalidate = 3600

export default async function ProgramsPage() {
  const c = await getContent("programs")

  return (
    <div className="min-h-screen bg-stone-50">
      <Navigation />
      <PageHero hero={c.hero} />

      {/* Programs Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="space-y-12">
            {c.programs.map((program, index) => {
              const Icon = getIcon(program.icon)
              return (
                <Card key={index} className="overflow-hidden border-stone-200 hover:shadow-xl transition-shadow duration-300">
                  <div className={`grid lg:grid-cols-2 gap-0 ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}>
                    <div className={`relative h-64 lg:h-auto ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                      <Image src={program.image || "/placeholder.svg"} alt={`${program.title} program`} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/40 to-transparent"></div>
                    </div>

                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <CardHeader className="p-0 mb-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          <CardTitle className="text-2xl lg:text-3xl text-stone-800">{program.title}</CardTitle>
                        </div>
                      </CardHeader>

                      <CardContent className="p-0">
                        <p className="text-stone-600 mb-6 leading-relaxed text-lg">{program.description}</p>
                        <div className="grid md:grid-cols-2 gap-3">
                          {program.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-stone-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-emerald-50 to-sky-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-8">{c.impact.title}</h2>
          <p className="text-lg text-stone-600 max-w-3xl mx-auto mb-12">{c.impact.text}</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {c.impact.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-emerald-600 mb-2">{stat.value}</div>
                <div className="text-stone-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
