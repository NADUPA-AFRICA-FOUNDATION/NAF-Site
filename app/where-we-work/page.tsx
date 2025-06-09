import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Users, Home, Leaf } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Image from "next/image"

export default function WhereWeWorkPage() {
  const counties = [
    {
      name: "Nairobi",
      description: "Urban programs focusing on slum communities, street children, and urban poverty alleviation.",
      population: "4.4M",
      programs: ["Education Support", "Youth Programs", "Urban Agriculture"],
    },
    {
      name: "Kajiado",
      description: "Our home base, working with pastoral communities on livestock, education, and water access.",
      population: "1.1M",
      programs: ["Pastoral Livelihoods", "Water Projects", "Community Training"],
    },
    {
      name: "Lamu",
      description:
        "Coastal programs addressing fishing communities, environmental conservation, and cultural preservation.",
      population: "143K",
      programs: ["Marine Conservation", "Fishing Support", "Cultural Programs"],
    },
    {
      name: "Narok",
      description: "Working with Maasai communities on education, healthcare, and sustainable tourism development.",
      population: "1.2M",
      programs: ["Healthcare Access", "Education", "Sustainable Tourism"],
    },
    {
      name: "Turkana",
      description: "Addressing food security, water scarcity, and climate resilience in this arid region.",
      population: "926K",
      programs: ["Food Security", "Water Access", "Climate Adaptation"],
    },
  ]

  return (
    <div className="min-h-screen bg-stone-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden min-h-[60vh] lg:min-h-[70vh]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/rural-community.avif"
            alt="Kenyan landscape showing our work areas"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-emerald-700/60"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white flex items-center justify-center min-h-[60vh] lg:min-h-[70vh]">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Where We Work</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Our programs reach across Kenya's diverse landscapes, from urban centers to remote rural communities,
              bringing hope and opportunity where it's needed most.
            </p>
          </div>
        </div>
      </section>

      {/* Counties Overview */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">Our Reach Across Kenya</h2>
            <p className="text-lg text-stone-600 max-w-3xl mx-auto">
              We work in five counties, each with unique challenges and opportunities. Our locally-adapted programs
              ensure maximum impact in every community we serve.
            </p>
          </div>

          <div className="grid gap-8">
            {counties.map((county, index) => (
              <Card key={index} className="overflow-hidden border-stone-200 hover:shadow-lg transition-shadow">
                <div className="grid lg:grid-cols-3 gap-0">
                  <div className={`relative h-64 lg:h-auto ${index % 2 === 1 ? "lg:col-start-3" : ""}`}>
                    <Image
                      src={
                        index % 3 === 0
                          ? "/images/traditional-huts.jpeg"
                          : index % 3 === 1
                            ? "/images/african-village.avif"
                            : "/images/community-landscape.avif"
                      }
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
                      <div className="flex items-center gap-2 text-sm opacity-90">
                        <Users className="w-4 h-4" />
                        <span>Population: {county.population}</span>
                      </div>
                    </div>
                  </div>

                  <div className={`lg:col-span-2 p-8 ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                    <h3 className="text-2xl font-bold text-stone-800 mb-4">{county.name}</h3>
                    <p className="text-stone-600 mb-6 leading-relaxed text-lg">{county.description}</p>

                    <div>
                      <h4 className="font-semibold text-stone-800 mb-3">Key Programs:</h4>
                      <div className="flex flex-wrap gap-2">
                        {county.programs.map((program, programIndex) => (
                          <span
                            key={programIndex}
                            className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {program}
                          </span>
                        ))}
                      </div>
                    </div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">Our Geographic Impact</h2>
            <p className="text-lg text-stone-600 max-w-3xl mx-auto">
              From the highlands to the coast, from urban centers to remote villages, our work spans Kenya's diverse
              geography and communities.
            </p>
          </div>

          {/* Stylized Map Representation */}
          <div className="bg-white rounded-lg p-8 shadow-lg max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
              {counties.map((county, index) => (
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
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">Community Stories</h2>
            <p className="text-lg text-stone-600">Real impact in real communities across Kenya</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-stone-200">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Home className="w-6 h-6 text-emerald-600" />
                  <h3 className="font-semibold text-stone-800 text-lg">Kajiado Pastoral Community</h3>
                </div>
                <p className="text-stone-600 leading-relaxed">
                  "Through NADUPA's water project, our community now has access to clean water year-round. Our children
                  can attend school instead of walking hours to fetch water, and our livestock are healthier."
                </p>
                <p className="text-sm text-stone-500 mt-4">- Community Elder, Kajiado West</p>
              </CardContent>
            </Card>

            <Card className="border-stone-200">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Leaf className="w-6 h-6 text-emerald-600" />
                  <h3 className="font-semibold text-stone-800 text-lg">Lamu Conservation Initiative</h3>
                </div>
                <p className="text-stone-600 leading-relaxed">
                  "The mangrove restoration project has not only protected our coastline but also provided new income
                  opportunities through eco-tourism. Our youth are now environmental champions."
                </p>
                <p className="text-sm text-stone-500 mt-4">- Fishing Community Leader, Lamu</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
