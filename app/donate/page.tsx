import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { DonationForm } from "@/components/donation-form"
import Image from "next/image"
import { Heart, Shield, Clock, Globe } from "lucide-react"

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/rural-homestead.jpeg"
            alt="Rural community that benefits from donations"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-emerald-700/60"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Donate</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Your generous contribution helps us empower communities and transform lives across Kenya.
          </p>
        </div>
      </section>

      {/* Donation Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Donation Form */}
            <div>
              <div className="bg-white rounded-lg shadow-lg p-6 md:p-10">
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-stone-800 mb-4">Make a Donation</h2>
                  <p className="text-stone-600">
                    Your support enables us to continue our vital work in education, health, and environmental
                    conservation.
                  </p>
                </div>

                <DonationForm />
              </div>
            </div>

            {/* Impact Information */}
            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                <h3 className="text-xl font-bold text-stone-800 mb-4 flex items-center">
                  <Heart className="w-5 h-5 text-emerald-600 mr-2" />
                  Your Impact
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 border-b border-stone-100 pb-4">
                    <div className="font-bold text-emerald-600 text-lg">$25</div>
                    <div className="text-stone-600">Provides school supplies for 5 children for a month</div>
                  </div>
                  <div className="flex items-start gap-4 border-b border-stone-100 pb-4">
                    <div className="font-bold text-emerald-600 text-lg">$50</div>
                    <div className="text-stone-600">Supports clean water access for a family for three months</div>
                  </div>
                  <div className="flex items-start gap-4 border-b border-stone-100 pb-4">
                    <div className="font-bold text-emerald-600 text-lg">$100</div>
                    <div className="text-stone-600">Funds a community training workshop for sustainable farming</div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="font-bold text-emerald-600 text-lg">$250</div>
                    <div className="text-stone-600">
                      Provides medical supplies for a rural health clinic for a month
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                <h3 className="text-xl font-bold text-stone-800 mb-4 flex items-center">
                  <Shield className="w-5 h-5 text-emerald-600 mr-2" />
                  Our Commitment
                </h3>
                <div className="space-y-4 text-stone-600">
                  <p>
                    <strong>Transparency:</strong> We provide detailed reports on how funds are used and the impact they
                    create.
                  </p>
                  <p>
                    <strong>Efficiency:</strong> 85% of all donations go directly to our programs and the communities we
                    serve.
                  </p>
                  <p>
                    <strong>Accountability:</strong> Our financial records are audited annually and available upon
                    request.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-sky-50 rounded-lg shadow-lg p-6 md:p-8">
                <h3 className="text-xl font-bold text-stone-800 mb-4 flex items-center">
                  <Clock className="w-5 h-5 text-emerald-600 mr-2" />
                  Other Ways to Give
                </h3>
                <div className="space-y-4 text-stone-600">
                  <p>
                    <strong>Monthly Giving:</strong> Become a sustaining donor with a recurring monthly contribution.
                  </p>
                  <p>
                    <strong>Legacy Gifts:</strong> Include NADUPA AFRICA FOUNDATION in your estate planning.
                  </p>
                  <p>
                    <strong>Corporate Partnerships:</strong> Engage your company in meaningful social responsibility.
                  </p>
                  <p>
                    <strong>In-Kind Donations:</strong> Donate goods, services, or expertise to support our work.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Impact Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <Globe className="w-12 h-12 opacity-90" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Together, We're Making a Difference</h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Join our community of donors from across the globe who are helping to create sustainable change in Kenya.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="text-4xl font-bold mb-2">1,200+</div>
              <div className="opacity-90">Monthly Donors</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">$350K</div>
              <div className="opacity-90">Raised Last Year</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">25+</div>
              <div className="opacity-90">Communities Supported</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
