import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, Leaf, GraduationCap, Target, Eye, Shield, Lightbulb } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Image from "next/image"

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: "Dignity",
      description:
        "Every girl deserves to manage menstruation safely, privately, and without shame. Dignity is not a privilege—it's a right.",
    },
    {
      icon: Users,
      title: "Youth Leadership",
      description:
        "Young people are not beneficiaries waiting for help. They are leaders, researchers, and advocates capable of designing and implementing solutions.",
    },
    {
      icon: Target,
      title: "Evidence-Based Action",
      description:
        "We track what works. School attendance data, testimonials, budget transparency, and partnership documentation prove our impact.",
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description:
        "Short-term charity creates dependency. We build systems (county budgets, reusable products, trained advocates) that outlast donor funding.",
    },
    {
      icon: Lightbulb,
      title: "Partnership",
      description:
        "We collaborate with universities, government officials, CBOs, and community leaders. Systemic change requires collective effort.",
    },
  ]

  const boardHighlights = [
    "100% under 35 years old",
    "4 young women, 1 young man",
    "From the communities we serve",
    "Speak Maa and Kiswahili",
  ]

  return (
    <div className="min-h-screen bg-stone-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden min-h-[60vh] lg:min-h-[70vh]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/african-village.avif"
            alt="African village representing our community focus"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-emerald-700/60"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white flex items-center justify-center min-h-[60vh] lg:min-h-[70vh]">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About NADUPA AFRICA FOUNDATION</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Youth-led. Community-rooted. Evidence-driven. Empowering adolescent girls and restoring Kenya's
              environment.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="border-stone-200 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-stone-800">Our Mission</h2>
                </div>
                <p className="text-lg text-stone-600 leading-relaxed">
                  Empower adolescent girls in Kenya's ASAL regions to access education and lead advocacy for policies
                  that support their dignity, while restoring environmental sustainability through youth-led
                  conservation.
                </p>
              </CardContent>
            </Card>

            <Card className="border-stone-200 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-stone-800">Our Vision</h2>
                </div>
                <p className="text-lg text-stone-600 leading-relaxed">
                  A Kenya where rural girls complete secondary education without menstrual barriers, and where youth
                  lead environmental restoration and policy advocacy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 px-4 bg-gradient-to-br from-emerald-50 to-sky-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">Who We Are</h2>
            <p className="text-lg text-stone-600">Community-rooted, youth-led, and proven in our track record</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="border-stone-200">
              <CardContent className="p-8 text-center">
                <Users className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-stone-800 mb-3">Youth-Led Governance</h3>
                <p className="text-stone-600 mb-4">
                  NADUPA is governed by a 5-member Board of Directors, 100% under 35 years old. All founders are under
                  35, ensuring youth perspectives drive every decision.
                </p>
                <div className="bg-emerald-50 p-4 rounded-lg">
                  {boardHighlights.map((highlight, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-stone-700 mb-2">
                      <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></div>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-stone-200">
              <CardContent className="p-8 text-center">
                <Heart className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-stone-800 mb-3">Community-Rooted</h3>
                <p className="text-stone-600 mb-4">
                  Our Board members and volunteers come from the communities we serve. We understand Maasai and Turkana
                  cultures, speak local languages, and have family ties in ASAL regions.
                </p>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <p className="text-stone-700 text-sm font-medium">
                    We don't "visit" communities—we ARE the community.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-stone-200">
              <CardContent className="p-8 text-center">
                <GraduationCap className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-stone-800 mb-3">Proven Track Record</h3>
                <p className="text-stone-600 mb-4">3 years of consistent programming with measurable impact:</p>
                <div className="space-y-2 text-left">
                  <div className="flex items-start gap-2 text-sm text-stone-700">
                    <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-1.5"></div>
                    <span>$7,000 successfully managed (April 2025)</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-stone-700">
                    <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-1.5"></div>
                    <span>0.09 hectares land ownership in Kajiado</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-stone-700">
                    <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-1.5"></div>
                    <span>Government partnerships and recognition</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Maasai Warrior Image */}
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/maasai-warrior.jpeg"
                alt="Maasai individual in traditional attire representing cultural heritage preservation"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 to-transparent"></div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-stone-800 mb-4">Cultural Preservation</h3>
              <p className="text-lg text-stone-600 leading-relaxed mb-4">
                At NADUPA AFRICA FOUNDATION, we believe that sustainable development must go hand in hand with cultural
                preservation. We work closely with communities to ensure that their unique cultural heritage is
                celebrated and passed down to future generations.
              </p>
              <p className="text-lg text-stone-600 leading-relaxed">
                "NADUPA means 'clever' in Maasai (Maa) language—reflecting our belief that communities already have the
                wisdom to solve their challenges. We simply provide resources and amplify voices."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">Our Values</h2>
            <p className="text-lg text-stone-600">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="border-stone-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <value.icon className="w-12 h-12 text-emerald-600 mb-4" />
                  <h3 className="font-semibold text-stone-800 mb-3 text-xl">{value.title}</h3>
                  <p className="text-stone-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partnerships Section */}
      <section id="partnerships" className="py-16 px-4 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">Strategic Partnerships</h2>
            <p className="text-lg text-stone-600">
              Collaborating with universities, government, and community organizations for maximum impact
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-stone-200">
              <CardContent className="p-8">
                <h3 className="font-bold text-stone-800 mb-4 text-xl">Academic Partners</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold text-stone-800 mb-2">Strathmore University Environmental Club</p>
                    <p className="text-stone-600 text-sm">
                      100,000+ trees planted together, 400+ student volunteers mobilized
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold text-stone-800 mb-2">Kwawote Community-Based Organization</p>
                    <p className="text-stone-600 text-sm">Joint training on reusable pad production in Kibera</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-stone-200">
              <CardContent className="p-8">
                <h3 className="font-bold text-stone-800 mb-4 text-xl">Government Partners</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold text-stone-800 mb-2">Hon. George Risa Sunkuiya, MP Kajiado West</p>
                    <p className="text-stone-600 text-sm">Donated land, supports sanitary product distribution</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold text-stone-800 mb-2">Hon. Justus Ngossor, County Assembly Speaker</p>
                    <p className="text-stone-600 text-sm">Attended community events, engaged in policy discussions</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold text-stone-800 mb-2">Kajiado County Government</p>
                    <p className="text-stone-600 text-sm">Partnership on youth and education policy discussions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Card className="border-emerald-200 bg-emerald-50 inline-block">
              <CardContent className="p-6">
                <p className="text-stone-700 mb-2">
                  <span className="font-bold">19 primary schools</span> in Kajiado West partnering with us
                </p>
                <p className="text-stone-600 text-sm">
                  Including Eiti Kisames, Elangata Olomayiat, Embarbal, Emboliei, Enkereyian, and 14 others
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">Community Stories</h2>
            <p className="text-lg text-stone-600">Hear from the people whose lives have been transformed</p>
          </div>

          <div className="relative h-96 rounded-lg overflow-hidden mb-8">
            <Image
              src="/images/maasai-celebration.jpeg"
              alt="Maasai community celebration"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <p className="text-lg italic mb-4">
                "Every community has the potential for greatness. Our role is to unlock that potential through
                education, support, and sustainable development."
              </p>
              <p className="font-semibold">— NADUPA AFRICA FOUNDATION</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
