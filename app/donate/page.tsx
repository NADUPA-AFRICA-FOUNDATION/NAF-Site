import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { DonationForm } from "@/components/donation-form"
import { Heart, Shield, Clock, Globe } from "lucide-react"
import { getContent } from "@/lib/cms/content"

export const revalidate = 3600

export default async function DonatePage() {
  const c = await getContent("donate")

  return (
    <div className="min-h-screen bg-stone-50">
      <Navigation />
      <PageHero hero={c.hero} />

      {/* Donation Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="bg-white rounded-lg shadow-lg p-6 md:p-10">
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-stone-800 mb-4">{c.form.title}</h2>
                  <p className="text-stone-600">{c.form.text}</p>
                </div>
                <DonationForm />
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                <h3 className="text-xl font-bold text-stone-800 mb-4 flex items-center">
                  <Heart className="w-5 h-5 text-emerald-600 mr-2" />
                  Your Impact
                </h3>
                <div className="space-y-4">
                  {c.impact.map((item, index) => (
                    <div key={index} className="flex items-start gap-4 border-b border-stone-100 pb-4 last:border-0 last:pb-0">
                      <div className="font-bold text-emerald-600 text-lg">{item.amount}</div>
                      <div className="text-stone-600">{item.text}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                <h3 className="text-xl font-bold text-stone-800 mb-4 flex items-center">
                  <Shield className="w-5 h-5 text-emerald-600 mr-2" />
                  Our Commitment
                </h3>
                <div className="space-y-4 text-stone-600">
                  {c.commitment.map((item, index) => (
                    <p key={index}>
                      <strong>{item.label}:</strong> {item.text}
                    </p>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-sky-50 rounded-lg shadow-lg p-6 md:p-8">
                <h3 className="text-xl font-bold text-stone-800 mb-4 flex items-center">
                  <Clock className="w-5 h-5 text-emerald-600 mr-2" />
                  Other Ways to Give
                </h3>
                <div className="space-y-4 text-stone-600">
                  {c.otherWays.map((item, index) => (
                    <p key={index}>
                      <strong>{item.label}:</strong> {item.text}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom banner */}
      <section className="py-16 px-4 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <Globe className="w-12 h-12 opacity-90" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{c.banner.title}</h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">{c.banner.text}</p>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {c.banner.stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
