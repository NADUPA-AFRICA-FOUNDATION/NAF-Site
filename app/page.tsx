import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, TreePine, GraduationCap, ArrowRight, Quote } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Image from "next/image"

export default function HomePage() {
  const impactStats = [
    { number: "250+", label: "Girls Staying in School", icon: GraduationCap },
    { number: "100,000+", label: "Trees Planted", icon: TreePine },
    { number: "19", label: "Schools Reached", icon: Users },
  ]

  const testimonials = [
    {
      quote:
        "NADUPA gave me pads when my family could not afford them. Now I do not miss school during my period. I want to help other girls too.",
      author: "Grace, 15",
      location: "Kajiado",
    },
    {
      quote:
        "I missed exams because of my period. Teachers thought I was lazy. After receiving pads, my attendance improved and my marks increased.",
      author: "Tepilit, 17",
      location: "Kajiado West",
    },
    {
      quote: "Some girls drop out of school because of periods. Pads may seem small, but they keep girls in school.",
      author: "Mepukori, 17",
      location: "Narok",
    },
  ]

  return (
    <div className="min-h-screen bg-stone-50">
      <Navigation />

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/maasai-women-community.png"
            alt="Smiling Maasai women in traditional attire representing the communities we serve"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/85 via-emerald-800/75 to-emerald-700/65"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
                Keeping Girls in School
                <span className="block text-amber-300">Through Menstrual Dignity</span>
              </h1>
              <p className="text-xl md:text-2xl mb-6 opacity-95 leading-relaxed max-w-3xl mx-auto">
                Every month, 65% of girls in rural Kenya miss 4 days of school because they cannot afford sanitary pads.
                NADUPA ensures they don't have to choose between education and dignity.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-lg mb-8">
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  250+ girls staying in school
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  100,000+ trees planted
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  19 schools reached
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-involved#donation">
                <Button
                  size="lg"
                  className="bg-amber-600 hover:bg-amber-700 hover:shadow-lg transition-all duration-300 text-white px-8 py-6 text-lg"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Donate Now
                </Button>
              </Link>
              <Link href="/programs">
                <Button
                  size="lg"
                  className="bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-emerald-800 hover:shadow-lg transition-all duration-300 px-8 py-6 text-lg font-semibold"
                >
                  See Our Impact
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-stone-800 mb-4">Our Impact: Evidence, Not Promises</h2>
            <p className="text-lg text-stone-600 max-w-3xl mx-auto">
              In the last 3 years across Kajiado, Narok, and Turkana counties
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {impactStats.map((stat, index) => (
              <Card key={index} className="text-center border-stone-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <stat.icon className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                  <div className="text-5xl font-bold text-stone-800 mb-2">{stat.number}</div>
                  <div className="text-stone-600 font-medium text-lg">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-emerald-50 to-sky-50 p-6 rounded-lg">
              <h3 className="font-bold text-stone-800 mb-4 text-xl flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-emerald-600" />
                Education Access
              </h3>
              <ul className="space-y-3 text-stone-600">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2"></div>
                  <span>250+ adolescent girls receive monthly sanitary products</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2"></div>
                  <span>50+ vulnerable children sponsored for school fees</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2"></div>
                  <span>48 school days saved annually per girl</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg">
              <h3 className="font-bold text-stone-800 mb-4 text-xl flex items-center gap-2">
                <TreePine className="w-6 h-6 text-emerald-600" />
                Environmental Conservation
              </h3>
              <ul className="space-y-3 text-stone-600">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2"></div>
                  <span>100,000+ trees planted in Nairobi, Kiambu, and Kajiado</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2"></div>
                  <span>400+ university volunteers mobilized</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2"></div>
                  <span>500+ participants in quarterly tree planting events</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-lg">
              <h3 className="font-bold text-stone-800 mb-4 text-xl flex items-center gap-2">
                <Users className="w-6 h-6 text-emerald-600" />
                Community Empowerment
              </h3>
              <ul className="space-y-3 text-stone-600">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2"></div>
                  <span>Training in reusable pad production</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2"></div>
                  <span>50+ community volunteers trained</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2"></div>
                  <span>Partnership with Kajiado County Government</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-br from-emerald-50 to-sky-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Quote className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">What Girls Say</h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Hear directly from the young women whose lives have been transformed
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-stone-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Quote className="w-8 h-8 text-emerald-600 mb-4" />
                  <p className="text-stone-700 leading-relaxed mb-4 italic">"{testimonial.quote}"</p>
                  <div className="border-t border-stone-200 pt-4">
                    <p className="font-semibold text-stone-800">{testimonial.author}</p>
                    <p className="text-sm text-stone-600">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/about#testimonials">
              <Button
                variant="outline"
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 bg-transparent"
              >
                Read More Testimonials
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">Our Three Core Programs</h2>
            <p className="text-lg text-stone-600 max-w-3xl mx-auto">
              Focused interventions addressing the root causes of inequality in Kenya's ASAL regions
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="border-stone-200 hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center mb-6">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-stone-800 mb-4">Menstrual Health & Education Access</h3>
                <p className="text-stone-600 mb-4 leading-relaxed">
                  In Kenya's ASAL regions, 65% of girls cannot afford sanitary products, causing them to miss 48 school
                  days yearly.
                </p>
                <div className="bg-stone-50 p-4 rounded-lg mb-4">
                  <p className="text-stone-700 font-semibold mb-2">Our Solution:</p>
                  <ul className="space-y-2 text-sm text-stone-600">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-1.5"></div>
                      <span>Monthly sanitary product distribution</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-1.5"></div>
                      <span>Reusable pad production training</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-1.5"></div>
                      <span>Menstrual health education</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg mb-4">
                  <p className="text-emerald-900 font-bold text-lg">€20 ($22)</p>
                  <p className="text-emerald-800 text-sm">keeps one girl in school for a full year</p>
                </div>
                <Link href="/programs#menstrual-health">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Sponsor a Girl's Education</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-stone-200 hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-6">
                  <TreePine className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-stone-800 mb-4">Environmental Conservation & Climate Action</h3>
                <p className="text-stone-600 mb-4 leading-relaxed">
                  Kenya faces severe deforestation and climate change impacts. Youth are disproportionately affected but
                  excluded from decision-making.
                </p>
                <div className="bg-stone-50 p-4 rounded-lg mb-4">
                  <p className="text-stone-700 font-semibold mb-2">Our Solution:</p>
                  <ul className="space-y-2 text-sm text-stone-600">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-1.5"></div>
                      <span>Large-scale tree planting with Strathmore University</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-1.5"></div>
                      <span>Quarterly community mobilization events</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-1.5"></div>
                      <span>Youth environmental education campaigns</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg mb-4">
                  <p className="text-emerald-900 font-bold text-lg">€50</p>
                  <p className="text-emerald-800 text-sm">plants 100 indigenous trees</p>
                </div>
                <Link href="/programs#environmental">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Support Tree Planting</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-stone-200 hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-stone-800 mb-4">Vulnerable Children Support</h3>
                <p className="text-stone-600 mb-4 leading-relaxed">
                  Many children in ASAL communities cannot afford school fees, uniforms, or learning materials, forcing
                  them out of education.
                </p>
                <div className="bg-stone-50 p-4 rounded-lg mb-4">
                  <p className="text-stone-700 font-semibold mb-2">Our Solution:</p>
                  <ul className="space-y-2 text-sm text-stone-600">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-1.5"></div>
                      <span>Direct school fee payment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-1.5"></div>
                      <span>Uniforms, shoes, and learning materials</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-1.5"></div>
                      <span>Family assessment and follow-up</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg mb-4">
                  <p className="text-emerald-900 font-bold text-lg">€100</p>
                  <p className="text-emerald-800 text-sm">covers one term of school fees</p>
                </div>
                <Link href="/programs#children-support">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Sponsor a Child</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Together, we can create lasting change in communities across Kenya. Your support makes the difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-involved">
              <Button
                size="lg"
                className="bg-white text-emerald-600 hover:bg-stone-100 hover:shadow-lg transition-all duration-300 px-8 py-3"
              >
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
