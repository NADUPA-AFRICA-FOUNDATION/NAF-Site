import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Megaphone, Utensils, BookOpen, Package } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Image from "next/image"

export default function ProgramsPage() {
  const programs = [
    {
      icon: Users,
      title: "Community & Individual Training",
      description:
        "Comprehensive skill-building programs that empower individuals and strengthen communities through vocational training, leadership development, and capacity building initiatives.",
      features: [
        "Vocational skills training in agriculture, crafts, and trades",
        "Leadership development for community organizers",
        "Financial literacy and entrepreneurship programs",
        "Life skills workshops for personal development",
      ],
      image: "/images/rural-homestead.jpeg",
    },
    {
      icon: Megaphone,
      title: "Advocacy & Information Services",
      description:
        "Providing crucial information, advocacy support, and professional guidance to help individuals and communities access their rights and navigate complex systems.",
      features: [
        "Legal advocacy and rights awareness",
        "Health information and awareness campaigns",
        "Government services navigation support",
        "Community mobilization and organizing",
      ],
      image: "/images/forest-canopy.jpeg",
    },
    {
      icon: Utensils,
      title: "Food & Basic Aid Distribution",
      description:
        "Emergency relief and ongoing support through distribution of food, clean water, clothing, and other essential items to vulnerable populations during crises and ongoing hardship.",
      features: [
        "Emergency food relief during crises",
        "Clean water access and purification",
        "Clothing and household items distribution",
        "Hygiene supplies and health materials",
      ],
      image: "/images/rural-landscape.avif",
    },
    {
      icon: BookOpen,
      title: "Education Support Services",
      description:
        "Breaking down barriers to education through comprehensive support including school fees, learning materials, and educational programs for children and adults.",
      features: [
        "School fees payment for vulnerable children",
        "Learning materials and school supplies",
        "Adult literacy and continuing education",
        "Educational mentorship and tutoring",
      ],
      image: "/images/rural-homestead.jpeg",
    },
    {
      icon: Package,
      title: "Equipment & Accessibility Support",
      description:
        "Providing essential equipment, assistive devices, and materials to support livelihoods, accessibility, and community development initiatives.",
      features: [
        "Agricultural tools and farming equipment",
        "Assistive devices for persons with disabilities",
        "Community infrastructure support",
        "Technology access and digital literacy tools",
      ],
      image: "/images/forest-canopy.jpeg",
    },
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
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-emerald-700/60"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Programs</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Comprehensive initiatives designed to address the diverse needs of our communities and create lasting
            positive impact across Kenya.
          </p>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="space-y-12">
            {programs.map((program, index) => (
              <Card
                key={index}
                className="overflow-hidden border-stone-200 hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`grid lg:grid-cols-2 gap-0 ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}>
                  <div className={`relative h-64 lg:h-auto ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                    <Image
                      src={program.image || "/placeholder.svg"}
                      alt={`${program.title} program`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/40 to-transparent"></div>
                  </div>

                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <CardHeader className="p-0 mb-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-300">
                          <program.icon className="w-8 h-8 text-white" />
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
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-emerald-50 to-sky-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-8">Program Impact</h2>
          <p className="text-lg text-stone-600 max-w-3xl mx-auto mb-12">
            Our integrated approach ensures that each program reinforces the others, creating a comprehensive support
            system that addresses root causes and builds lasting resilience.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">500+</div>
              <div className="text-stone-600">People Trained</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">200+</div>
              <div className="text-stone-600">Children Supported</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">50+</div>
              <div className="text-stone-600">Families Assisted</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">25+</div>
              <div className="text-stone-600">Communities Reached</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
