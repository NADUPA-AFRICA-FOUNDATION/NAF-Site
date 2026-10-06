import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PageHero, Paragraphs } from "@/components/page-hero"
import Image from "next/image"
import { getContent } from "@/lib/cms/content"
import { getIcon } from "@/lib/cms/icons"

export const revalidate = 3600

function Caption({ text, className }: { text: string; className: string }) {
  if (!text) return null
  return (
    <div className="absolute bottom-4 left-4 text-white">
      <p className={`text-sm font-medium backdrop-blur-sm px-3 py-1 rounded-full ${className}`}>{text}</p>
    </div>
  )
}

export default async function AboutPage() {
  const c = await getContent("about")

  return (
    <div className="min-h-screen bg-stone-50">
      <Navigation />
      <PageHero hero={c.hero} tall />

      {/* Mission & Vision */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="bg-gradient-to-br from-emerald-50 to-stone-50 p-8 rounded-lg border border-emerald-100">
                <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-6">Our Mission</h2>
                <p className="text-lg text-stone-600 leading-relaxed mb-8">{c.mission}</p>
                <h3 className="text-2xl font-bold text-stone-800 mb-4">Our Vision</h3>
                <p className="text-lg text-stone-600 leading-relaxed">{c.vision}</p>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative h-[500px] rounded-lg overflow-hidden shadow-lg">
                <Image src={c.missionImage} alt={c.missionImageCaption} fill className="object-cover object-center" sizes="(max-width: 1024px) 100vw, 40vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 to-transparent"></div>
                <Caption text={c.missionImageCaption} className="bg-emerald-700/70" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cultural Preservation */}
      <section className="py-16 px-4 bg-gradient-to-br from-amber-50 to-stone-100">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <Image src={c.culture.image} alt={c.culture.imageCaption} fill className="object-cover object-center" sizes="(max-width: 768px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <Caption text={c.culture.imageCaption} className="bg-black/50" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-stone-800 mb-4">{c.culture.title}</h2>
              <Paragraphs text={c.culture.text} className="text-lg text-stone-600 leading-relaxed mb-6 last:mb-0" />
            </div>
          </div>
        </div>
      </section>

      {/* Who We Help */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">{c.whoWeHelp.title}</h2>
            <p className="text-lg text-stone-600 max-w-3xl mx-auto">{c.whoWeHelp.text}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.whoWeHelp.groups.map((group, index) => {
              const Icon = getIcon(group.icon)
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border-stone-200 hover:border-emerald-200">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-stone-800 mb-3 text-lg">{group.title}</h3>
                    <p className="text-sm text-stone-600 leading-relaxed">{group.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 bg-gradient-to-br from-emerald-50 to-sky-50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">{c.story.title}</h2>
              <p className="text-lg text-stone-600">{c.story.subtitle}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Paragraphs text={c.story.text} className="text-stone-600 leading-relaxed mb-6" />
                {c.story.quote && (
                  <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-200">
                    <p className="text-stone-700 font-medium">&ldquo;{c.story.quote}&rdquo;</p>
                    {c.story.quoteAuthor && <p className="text-stone-600 text-sm mt-2">- {c.story.quoteAuthor}</p>}
                  </div>
                )}
              </div>
              <div className="relative h-96 rounded-lg overflow-hidden">
                <Image src={c.story.image} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-stone-100">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">{c.values.title}</h2>
            <p className="text-lg text-stone-600">{c.values.text}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {c.values.items.map((value, index) => {
              const Icon = getIcon(value.icon)
              return (
                <Card key={index} className="text-center border-stone-200">
                  <CardContent className="p-8">
                    <Icon className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                    <h3 className="font-semibold text-stone-800 mb-3 text-xl">{value.title}</h3>
                    <p className="text-stone-600">{value.description}</p>
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
