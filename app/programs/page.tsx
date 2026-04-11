import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, TreePine, Users, Heart, ArrowRight, Check } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ProgramsPage() {
  const menstrualHealthImpacts = [
    "Girls maintain 100% school attendance during menstruation",
    "Improved academic performance documented through testimonials",
    "Reduced shame and increased classroom participation confidence",
    "Working toward county government budget allocation for sustainable supply",
  ]

  const environmentalImpacts = [
    "100,000+ indigenous trees planted (2023-2025)",
    "400+ university student volunteers engaged and trained",
    "Carbon sequestration contribution to Kenya's climate commitments",
    "Community ownership of environmental conservation",
  ]

  const childrenSupportImpacts = [
    "50+ children currently sponsored in primary and secondary school",
    "Zero dropout rate among sponsored children",
    "Family stability as children remain in school rather than working",
  ]

  return (
    <div className="min-h-screen bg-stone-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/rural-landscape.avif"
            alt="Rural landscape representing our program areas"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/85 to-emerald-700/65"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Three Core Programs</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Focused interventions addressing the root causes of inequality in Kenya's ASAL regions
          </p>
        </div>
      </section>

      {/* Program 1: Menstrual Health */}
      <section id="menstrual-health" className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-stone-800">Menstrual Health & Education Access</h2>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
                <h3 className="font-bold text-stone-800 mb-2">The Problem</h3>
                <p className="text-stone-700 leading-relaxed">
                  In Kenya's ASAL (Arid and Semi-Arid Land) regions, 65% of girls cannot afford sanitary products. They
                  miss 4 school days monthly—48 days yearly—causing poor grades, repetition, and dropout.
                </p>
              </div>

              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 mb-6">
                <h3 className="font-bold text-stone-800 mb-3">Our Solution</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-stone-700">
                    <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Monthly sanitary product distribution to 250+ girls in 19 schools</span>
                  </li>
                  <li className="flex items-start gap-2 text-stone-700">
                    <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Training in reusable pad production for sustainability</span>
                  </li>
                  <li className="flex items-start gap-2 text-stone-700">
                    <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Menstrual health education addressing stigma and cultural taboos</span>
                  </li>
                  <li className="flex items-start gap-2 text-stone-700">
                    <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Working toward county government budget allocation for sustainable supply</span>
                  </li>
                </ul>
              </div>

              <Card className="bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200">
                <CardContent className="p-6">
                  <h3 className="font-bold text-stone-800 mb-4">Impact Achieved</h3>
                  <div className="space-y-3">
                    {menstrualHealthImpacts.map((impact, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-pink-600 rounded-full mt-2"></div>
                        <p className="text-stone-700">{impact}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6 bg-emerald-600 text-white p-6 rounded-lg">
                <p className="text-2xl font-bold mb-2">€20 ($22) per year</p>
                <p className="text-lg mb-4">keeps one girl in school for a full year</p>
                <Link href="/get-involved#donation">
                  <Button className="bg-white text-emerald-600 hover:bg-stone-100">
                    <Heart className="w-4 h-4 mr-2" />
                    Sponsor a Girl's Education
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative h-[600px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/maasai-women-community.png"
                alt="Girls in school"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Program 2: Environmental Conservation */}
      <section id="environmental" className="py-16 px-4 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative h-[600px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/forest-canopy.jpeg"
                alt="Tree planting activities"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <TreePine className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-stone-800">
                  Environmental Conservation & Climate Action
                </h2>
              </div>

              <div className="bg-orange-50 border-l-4 border-orange-500 p-6 mb-6">
                <h3 className="font-bold text-stone-800 mb-2">The Problem</h3>
                <p className="text-stone-700 leading-relaxed">
                  Kenya faces severe deforestation and climate change impacts. Youth are disproportionately affected but
                  excluded from environmental decision-making.
                </p>
              </div>

              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 mb-6">
                <h3 className="font-bold text-stone-800 mb-3">Our Solution</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-stone-700">
                    <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Large-scale tree planting in partnership with Strathmore University Environmental Club</span>
                  </li>
                  <li className="flex items-start gap-2 text-stone-700">
                    <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Quarterly community mobilization events (500+ participants)</span>
                  </li>
                  <li className="flex items-start gap-2 text-stone-700">
                    <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Youth-led environmental education and awareness campaigns</span>
                  </li>
                </ul>
              </div>

              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <CardContent className="p-6">
                  <h3 className="font-bold text-stone-800 mb-4">Impact Achieved</h3>
                  <div className="space-y-3">
                    {environmentalImpacts.map((impact, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                        <p className="text-stone-700">{impact}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6 p-6 bg-emerald-600 text-white rounded-lg">
                <p className="text-2xl font-bold mb-2">€50</p>
                <p className="text-lg mb-2">plants 100 indigenous trees</p>
                <p className="text-sm opacity-90 mb-4">
                  Includes seedlings, community mobilization, volunteer coordination, and 3-month monitoring
                </p>
                <Link href="/get-involved#donation">
                  <Button className="bg-white text-emerald-600 hover:bg-stone-100">
                    <TreePine className="w-4 h-4 mr-2" />
                    Support Tree Planting
                  </Button>
                </Link>
              </div>

              <div className="mt-6 bg-white p-6 rounded-lg border border-stone-200">
                <h4 className="font-bold text-stone-800 mb-3">Key Partnerships</h4>
                <ul className="space-y-2 text-sm text-stone-600">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></div>
                    <span>Strathmore University Environmental Club</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></div>
                    <span>Kajiado County Government (National Tree Planting Day)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program 3: Vulnerable Children Support */}
      <section id="children-support" className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-stone-800">Vulnerable Children Support</h2>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
                <h3 className="font-bold text-stone-800 mb-2">The Problem</h3>
                <p className="text-stone-700 leading-relaxed">
                  Many children in ASAL communities cannot afford school fees, uniforms, or learning materials, forcing
                  them out of education.
                </p>
              </div>

              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 mb-6">
                <h3 className="font-bold text-stone-800 mb-3">Our Solution</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-stone-700">
                    <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Direct school fee payment for vulnerable children</span>
                  </li>
                  <li className="flex items-start gap-2 text-stone-700">
                    <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Provision of uniforms, shoes, and learning materials</span>
                  </li>
                  <li className="flex items-start gap-2 text-stone-700">
                    <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Family assessment and follow-up to ensure sustained school attendance</span>
                  </li>
                </ul>
              </div>

              <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
                <CardContent className="p-6">
                  <h3 className="font-bold text-stone-800 mb-4">Impact Achieved</h3>
                  <div className="space-y-3">
                    {childrenSupportImpacts.map((impact, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-amber-600 rounded-full mt-2"></div>
                        <p className="text-stone-700">{impact}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6 bg-emerald-600 text-white p-6 rounded-lg">
                <p className="text-2xl font-bold mb-2">€100 per term</p>
                <p className="text-lg mb-2">covers one child's school fees</p>
                <p className="text-sm opacity-90 mb-4">Includes fees, uniform, shoes, and learning materials</p>
                <Link href="/get-involved#donation">
                  <Button className="bg-white text-emerald-600 hover:bg-stone-100">
                    <Heart className="w-4 h-4 mr-2" />
                    Sponsor a Child
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative h-[600px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/rural-homestead.jpeg"
                alt="Children in school"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Choose How You Want to Help</h2>
          <p className="text-xl mb-8 opacity-90">
            Every program creates lasting change. Select the cause that resonates with you, or support all three through
            unrestricted giving.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-involved#donation">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-stone-100">
                Make a Donation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-emerald-600"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
