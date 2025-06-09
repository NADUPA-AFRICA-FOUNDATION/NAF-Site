import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Users, Handshake, DollarSign, Clock, Globe, Phone, Mail } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Image from "next/image"

export default function GetInvolvedPage() {
  const volunteerOpportunities = [
    {
      title: "Community Outreach Coordinator",
      description: "Lead community engagement initiatives and help distribute aid to vulnerable families",
      commitment: "8-12 hours per week",
      skills: "Communication, Swahili/local languages, community organizing",
      location: "Kajiado, Narok",
    },
    {
      title: "Education Support Volunteer",
      description: "Assist with tutoring, adult literacy programs, and educational material distribution",
      commitment: "6-10 hours per week",
      skills: "Teaching experience, patience, subject expertise",
      location: "All counties",
    },
    {
      title: "Environmental Conservation Guide",
      description: "Support tree planting, conservation education, and sustainable farming initiatives",
      commitment: "Flexible, project-based",
      skills: "Environmental knowledge, outdoor activities, training skills",
      location: "Lamu, Turkana",
    },
    {
      title: "Digital Skills Trainer",
      description: "Teach computer literacy and digital skills to youth and adults",
      commitment: "4-8 hours per week",
      skills: "Computer proficiency, training experience, patience",
      location: "Nairobi, Kajiado",
    },
  ]

  const partnershipTypes = [
    {
      icon: Globe,
      title: "Corporate Social Responsibility",
      description:
        "Partner with us through employee volunteering, resource sharing, and funding specific programs that align with your company values.",
    },
    {
      icon: Users,
      title: "Community Organizations",
      description:
        "Collaborate with churches, community groups, and local organizations to amplify our reach and impact.",
    },
    {
      icon: Handshake,
      title: "Government & NGO Partnerships",
      description:
        "Work with county governments, national agencies, and other NGOs to create coordinated, large-scale impact.",
    },
  ]

  return (
    <div className="min-h-screen bg-stone-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/forest-canopy.jpeg"
            alt="Forest canopy representing growth through collaboration"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-emerald-700/60"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Get Involved</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Join our mission to transform lives and empower communities. There are many ways you can make a meaningful
            difference with NADUPA AFRICA FOUNDATION.
          </p>
        </div>
      </section>

      {/* Donation Section */}
      <section id="donation" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <Heart className="w-16 h-16 text-emerald-600 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">Support Our Mission</h2>
            <p className="text-lg text-stone-600 mb-8">
              Your generous donations directly fund our programs and help us reach more communities across Kenya. Every
              contribution creates lasting impact.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center border-stone-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <DollarSign className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="font-semibold text-stone-800 mb-2 text-xl">One-Time Donation</h3>
                <p className="text-stone-600 text-sm mb-6">
                  Make an immediate impact with a single donation to support our ongoing programs.
                </p>
                <Button className="bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg transition-all duration-300">
                  Donate Now
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center border-stone-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Heart className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="font-semibold text-stone-800 mb-2 text-xl">Monthly Partnership</h3>
                <p className="text-stone-600 text-sm mb-6">
                  Provide sustained support through recurring monthly donations for long-term impact.
                </p>
                <Button className="bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg transition-all duration-300">
                  Give Monthly
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center border-stone-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Globe className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="font-semibold text-stone-800 mb-2 text-xl">Sponsor a Program</h3>
                <p className="text-stone-600 text-sm mb-6">
                  Fund specific initiatives like education, water projects, or community training programs.
                </p>
                <Button className="bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg transition-all duration-300">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Donation Methods */}
          <div className="bg-gradient-to-br from-emerald-50 to-sky-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-stone-800 mb-6 text-center">How to Donate</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-stone-200">
                <CardContent className="p-6">
                  <Phone className="w-8 h-8 text-emerald-600 mb-4" />
                  <h4 className="font-semibold text-stone-800 mb-2">Mobile Money</h4>
                  <p className="text-stone-600 text-sm mb-3">
                    Send donations via M-Pesa or other mobile money services:
                  </p>
                  <p className="text-stone-700 font-medium">Paybill: [To be provided]</p>
                  <p className="text-stone-700 font-medium">Account: NADUPA DONATION</p>
                </CardContent>
              </Card>

              <Card className="border-stone-200">
                <CardContent className="p-6">
                  <Mail className="w-8 h-8 text-emerald-600 mb-4" />
                  <h4 className="font-semibold text-stone-800 mb-2">Bank Transfer</h4>
                  <p className="text-stone-600 text-sm mb-3">Direct bank transfers for larger donations:</p>
                  <Link href="/contact">
                    <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                      Get Bank Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Users className="w-16 h-16 text-amber-600 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">Volunteer Opportunities</h2>
            <p className="text-lg text-stone-600 max-w-3xl mx-auto">
              Share your skills, time, and passion to help us create lasting change in communities across Kenya. Every
              volunteer makes a difference.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {volunteerOpportunities.map((opportunity, index) => (
              <Card key={index} className="border-stone-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-stone-800">{opportunity.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-stone-600 mb-4">{opportunity.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-600" />
                      <span className="text-stone-700">
                        <strong>Time Commitment:</strong> {opportunity.commitment}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Users className="w-4 h-4 text-amber-600 mt-0.5" />
                      <span className="text-stone-700">
                        <strong>Skills Needed:</strong> {opportunity.skills}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-amber-600" />
                      <span className="text-stone-700">
                        <strong>Location:</strong> {opportunity.location}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link href="/contact">
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700 hover:shadow-lg transition-all duration-300">
                Apply to Volunteer
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Handshake className="w-16 h-16 text-emerald-600 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">Partnership Opportunities</h2>
            <p className="text-lg text-stone-600 max-w-3xl mx-auto">
              We believe in the power of collaboration. Partner with us to amplify our impact and create sustainable
              change across Kenya.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {partnershipTypes.map((partnership, index) => (
              <Card key={index} className="text-center border-stone-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <partnership.icon className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-stone-800 mb-3 text-xl">{partnership.title}</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">{partnership.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 hover:shadow-lg transition-all duration-300"
              >
                Explore Partnerships
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Your Impact Matters</h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Whether through donations, volunteering, or partnerships, your support creates ripple effects that transform
            entire communities.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="text-4xl font-bold mb-2">KSh 1,000</div>
              <div className="opacity-90">Provides school supplies for 5 children</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">KSh 5,000</div>
              <div className="opacity-90">Funds a month of clean water access</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">KSh 10,000</div>
              <div className="opacity-90">Supports a family's basic needs for a month</div>
            </div>
          </div>

          <Link href="/contact">
            <Button
              size="lg"
              className="bg-white text-emerald-600 hover:bg-stone-100 hover:shadow-lg transition-all duration-300 px-8 py-3"
            >
              Start Making a Difference Today
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
