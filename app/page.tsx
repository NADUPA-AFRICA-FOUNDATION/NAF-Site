import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { getContent } from "@/lib/cms/content"
import { getIcon } from "@/lib/cms/icons"

export const revalidate = 3600

export default async function HomePage() {
  const c = await getContent("home")

  return (
    <div className="min-h-screen bg-stone-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src={c.hero.image} alt={c.hero.imageAlt} fill className="object-cover object-center" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 via-emerald-800/70 to-emerald-700/60"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-white/30">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
                {c.hero.title}
                <span className="block text-amber-300">{c.hero.highlight}</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">{c.hero.subtitle}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/donate">
                <Button size="lg" className="bg-amber-600 hover:bg-amber-700 hover:shadow-lg transition-all duration-300 text-white px-8 py-4 text-lg">
                  <Heart className="w-5 h-5 mr-2" />
                  Donate Now
                </Button>
              </Link>
              <Link href="/get-involved">
                <Button
                  size="lg"
                  className="bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-emerald-800 hover:shadow-lg transition-all duration-300 px-8 py-4 text-lg font-semibold"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Get Involved
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src={c.intro.image} alt="" fill className="object-cover object-center" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/90 via-stone-800/80 to-transparent"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">{c.intro.title}</h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">{c.intro.text}</p>
            <Link href="/about">
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white">
                Learn Our Story
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">{c.impact.title}</h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">{c.impact.text}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {c.impact.stats.map((stat, index) => {
              const Icon = getIcon(stat.icon)
              return (
                <Card key={index} className="text-center border-stone-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <Icon className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                    <div className="text-4xl font-bold text-stone-800 mb-2">{stat.value}</div>
                    <div className="text-stone-600 font-medium">{stat.label}</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Mission Preview */}
      <section className="py-16 px-4 bg-gradient-to-br from-emerald-50 to-sky-50">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-6">{c.mission.title}</h2>
              <p className="text-xl text-stone-600 leading-relaxed mb-8">{c.mission.text}</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center mb-8">
              <div className="relative h-80 rounded-lg overflow-hidden">
                <Image src={c.mission.image} alt={c.mission.imageCaption} fill className="object-cover object-center" sizes="(max-width: 1024px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 to-transparent"></div>
                {c.mission.imageCaption && (
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm font-medium bg-emerald-600/80 backdrop-blur-sm px-3 py-1 rounded-full">{c.mission.imageCaption}</p>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {c.mission.highlights.map((item, index) => {
                  const Icon = getIcon(item.icon)
                  return (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-stone-200">
                      <Icon className="w-8 h-8 text-emerald-600 mb-4" />
                      <h3 className="font-semibold text-stone-800 mb-2">{item.title}</h3>
                      <p className="text-stone-600 text-sm">{item.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{c.cta.title}</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">{c.cta.text}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-involved">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-stone-100 hover:shadow-lg transition-all duration-300 px-8 py-3">
                Get Involved Today
              </Button>
            </Link>
            <Link href="/programs">
              <Button
                size="lg"
                className="bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-emerald-600 hover:shadow-lg transition-all duration-300 px-8 py-3 font-semibold"
              >
                View Our Programs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
