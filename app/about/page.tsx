import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, Shield, Home, Leaf, GraduationCap, Zap, Globe } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Image from "next/image"

export default function AboutPage() {
  const whoWeHelp = [
    { icon: Heart, title: "Poor Women", description: "Empowering women through skills training and support programs" },
    {
      icon: Home,
      title: "Orphans & Vulnerable Children",
      description: "Providing care, education, and hope for the future",
    },
    {
      icon: Shield,
      title: "People with Disabilities",
      description: "Ensuring accessibility and equal opportunities for all",
    },
    { icon: Zap, title: "Drug & Alcohol Addicts", description: "Supporting recovery and rehabilitation journeys" },
    { icon: Users, title: "The Poor in General", description: "Basic needs support and pathway to self-reliance" },
    { icon: GraduationCap, title: "Youth", description: "Skills development and leadership opportunities" },
    { icon: Heart, title: "Elderly People", description: "Dignity and care for our respected elders" },
    { icon: Globe, title: "Society at Large", description: "Community development and social cohesion" },
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
              Building bridges to a more inclusive, educated, and sustainable Kenya
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Mission & Vision Text */}
            <div className="lg:col-span-7">
              <div className="bg-gradient-to-br from-emerald-50 to-stone-50 p-8 rounded-lg border border-emerald-100">
                <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-6">Our Mission</h2>
                <p className="text-lg text-stone-600 leading-relaxed mb-8">
                  To empower vulnerable communities in Kenya by promoting access to education, supporting persons with
                  disabilities, combating alcohol and substance abuse, and advancing environmental conservation.
                </p>

                <h3 className="text-2xl font-bold text-stone-800 mb-4">Our Vision</h3>
                <p className="text-lg text-stone-600 leading-relaxed">
                  A more inclusive, educated, and sustainable Kenya where every individual has the opportunity to thrive
                  and contribute to their community's development while preserving their rich cultural heritage.
                </p>
              </div>
            </div>

            {/* Maasai Warrior Image */}
            <div className="lg:col-span-5">
              <div className="relative h-[500px] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/images/maasai-warrior.jpeg"
                  alt="Maasai individual in traditional attire representing cultural heritage preservation"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm font-medium bg-emerald-700/70 backdrop-blur-sm px-3 py-1 rounded-full">
                    Preserving Cultural Heritage
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cultural Celebration Image */}
      <section className="py-16 px-4 bg-gradient-to-br from-amber-50 to-stone-100">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/maasai-celebration.jpeg"
                alt="Maasai community celebration representing cultural preservation and community empowerment"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-sm font-medium bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                  Celebrating Culture & Community
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-stone-800 mb-4">Cultural Preservation</h2>
              <p className="text-lg text-stone-600 leading-relaxed mb-6">
                At NADUPA AFRICA FOUNDATION, we believe that sustainable development must go hand in hand with cultural
                preservation. We work closely with communities to ensure that their unique cultural heritage is
                celebrated, preserved, and passed down to future generations.
              </p>
              <p className="text-lg text-stone-600 leading-relaxed">
                Our programs are designed to empower communities while respecting their traditions, customs, and way of
                life. By integrating cultural awareness into our development initiatives, we create more meaningful and
                lasting impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Help */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">Who We Help</h2>
            <p className="text-lg text-stone-600 max-w-3xl mx-auto">
              Our programs reach across communities, touching lives and creating opportunities for Kenya's most
              vulnerable populations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whoWeHelp.map((group, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-all duration-300 border-stone-200 hover:border-emerald-200"
              >
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <group.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-stone-800 mb-3 text-lg">{group.title}</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">{group.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 bg-gradient-to-br from-emerald-50 to-sky-50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">Our Story</h2>
              <p className="text-lg text-stone-600">
                Born from a deep commitment to social justice and community empowerment
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-stone-600 leading-relaxed mb-6">
                  NADUPA AFRICA FOUNDATION was established with a clear vision: to address the multifaceted challenges
                  facing Kenya's most vulnerable communities. Our founders recognized that sustainable change requires a
                  holistic approach that addresses education, health, environmental conservation, and social inclusion
                  simultaneously.
                </p>
                <p className="text-stone-600 leading-relaxed mb-6">
                  Since our inception, we have worked tirelessly to build partnerships with local communities,
                  understanding that lasting change comes from within. Our programs are designed not just to provide
                  immediate relief, but to empower individuals and communities to become self-reliant and resilient.
                </p>
                <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-200">
                  <p className="text-stone-700 font-medium">
                    "Every community has the potential for greatness. Our role is to unlock that potential through
                    education, support, and sustainable development."
                  </p>
                  <p className="text-stone-600 text-sm mt-2">- NADUPA AFRICA FOUNDATION</p>
                </div>
              </div>

              <div className="relative h-96 rounded-lg overflow-hidden">
                <Image
                  src="/images/traditional-huts.jpeg"
                  alt="Traditional community we serve"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-stone-100">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">Our Values</h2>
            <p className="text-lg text-stone-600">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-stone-200">
              <CardContent className="p-8">
                <Heart className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="font-semibold text-stone-800 mb-3 text-xl">Compassion</h3>
                <p className="text-stone-600">
                  We approach every situation with empathy and understanding, recognizing the dignity in every person we
                  serve.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-stone-200">
              <CardContent className="p-8">
                <Users className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="font-semibold text-stone-800 mb-3 text-xl">Community</h3>
                <p className="text-stone-600">
                  We believe in the power of collective action and work hand-in-hand with communities to create lasting
                  change.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-stone-200">
              <CardContent className="p-8">
                <Leaf className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="font-semibold text-stone-800 mb-3 text-xl">Sustainability</h3>
                <p className="text-stone-600">
                  Our programs are designed to create long-term impact while protecting the environment for future
                  generations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
