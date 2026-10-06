import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Users, Handshake, Clock, Globe, Phone, Mail } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { getContent } from "@/lib/cms/content"
import { getIcon } from "@/lib/cms/icons"

export const revalidate = 3600

export default async function GetInvolvedPage() {
  const c = await getContent("get-involved")

  return (
    <div className="min-h-screen bg-stone-50">
      <Navigation />
      <PageHero hero={c.hero} />

      {/* Donation Section */}
      <section id="donation" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <Heart className="w-16 h-16 text-emerald-600 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">{c.donate.title}</h2>
            <p className="text-lg text-stone-600 mb-8">{c.donate.text}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {c.donate.options.map((option, index) => {
              const Icon = getIcon(option.icon)
              return (
                <Card key={index} className="text-center border-stone-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <Icon className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                    <h3 className="font-semibold text-stone-800 mb-2 text-xl">{option.title}</h3>
                    <p className="text-stone-600 text-sm mb-6">{option.description}</p>
                    <Link href="/donate">
                      <Button className="bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg transition-all duration-300">
                        {option.button || "Donate"}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Donation Methods */}
          <div className="bg-gradient-to-br from-emerald-50 to-sky-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-stone-800 mb-6 text-center">How to Donate</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-stone-200">
                <CardContent className="p-6">
                  <Phone className="w-8 h-8 text-emerald-600 mb-4" />
                  <h4 className="font-semibold text-stone-800 mb-2">Mobile Money</h4>
                  <p className="text-stone-600 text-sm mb-3">Send donations via M-Pesa or other mobile money services:</p>
                  {/^\d+$/.test(c.donate.mpesaPaybill.trim()) ? (
                    <>
                      <p className="text-stone-700 font-medium">Paybill: {c.donate.mpesaPaybill}</p>
                      <p className="text-stone-700 font-medium">Account: {c.donate.mpesaAccount}</p>
                    </>
                  ) : (
                    <p className="text-stone-700 font-medium">{c.donate.mpesaPaybill}</p>
                  )}
                </CardContent>
              </Card>
              <Card className="border-stone-200">
                <CardContent className="p-6">
                  <Mail className="w-8 h-8 text-emerald-600 mb-4" />
                  <h4 className="font-semibold text-stone-800 mb-2">Bank Transfer</h4>
                  <p className="text-stone-600 text-sm mb-3">{c.donate.bankText}</p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">{c.volunteer.title}</h2>
            <p className="text-lg text-stone-600 max-w-3xl mx-auto">{c.volunteer.text}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {c.volunteer.opportunities.map((opportunity, index) => (
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
            <Link href="/volunteer">
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
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">{c.partners.title}</h2>
            <p className="text-lg text-stone-600 max-w-3xl mx-auto">{c.partners.text}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {c.partners.types.map((partnership, index) => {
              const Icon = getIcon(partnership.icon)
              return (
                <Card key={index} className="text-center border-stone-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <Icon className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                    <h3 className="font-semibold text-stone-800 mb-3 text-xl">{partnership.title}</h3>
                    <p className="text-stone-600 text-sm leading-relaxed">{partnership.description}</p>
                  </CardContent>
                </Card>
              )
            })}
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{c.impact.title}</h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">{c.impact.text}</p>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {c.impact.examples.map((example, index) => (
              <div key={index}>
                <div className="text-4xl font-bold mb-2">{example.value}</div>
                <div className="opacity-90">{example.label}</div>
              </div>
            ))}
          </div>
          <Link href="/donate">
            <Button size="lg" className="bg-white text-emerald-600 hover:bg-stone-100 hover:shadow-lg transition-all duration-300 px-8 py-3">
              Start Making a Difference Today
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
