import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { ContactFormAPI } from "@/components/contact-form-api"
import { getContent } from "@/lib/cms/content"

export const revalidate = 3600

function InfoCard({ icon: Icon, title, children }: { icon: typeof MapPin; title: string; children: React.ReactNode }) {
  return (
    <Card className="border-stone-200 shadow-lg">
      <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
        <CardTitle className="text-lg sm:text-xl text-stone-800 flex items-center gap-2">
          <Icon className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 py-3 sm:py-4">{children}</CardContent>
    </Card>
  )
}

const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`
const whatsappHref = (phone: string) => `https://wa.me/${phone.replace(/\D/g, "")}`

export default async function ContactPage() {
  const [c, s] = await Promise.all([getContent("contact"), getContent("settings")])

  return (
    <div className="min-h-screen bg-stone-50">
      <Navigation />
      <PageHero hero={c.hero} />

      {/* Contact Section */}
      <section className="py-8 md:py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Form */}
            <Card className="border-stone-200 shadow-lg order-2 lg:order-1">
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className="text-xl sm:text-2xl text-stone-800 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 flex-shrink-0" />
                  <span>Send Us a Message</span>
                </CardTitle>
                <p className="text-stone-600 text-sm sm:text-base">{c.formIntro}</p>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <ContactFormAPI />
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
              <InfoCard icon={MapPin} title="Our Location">
                <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                  <strong>{s.orgName}</strong>
                  <br />
                  {s.addressLine1}
                  <br />
                  {s.addressLine2}
                </p>
                <p className="text-stone-500 text-xs sm:text-sm mt-2 sm:mt-3">{c.serviceArea}</p>
              </InfoCard>

              <InfoCard icon={Mail} title="Email Us">
                <p className="text-stone-600 text-sm sm:text-base">
                  <strong>Contact Email:</strong>
                  <br />
                  <a href={`mailto:${s.email}`} className="text-emerald-600 hover:underline">
                    {s.email}
                  </a>
                </p>
                <p className="text-stone-500 text-xs sm:text-sm mt-2 sm:mt-3">{c.emailNote}</p>
              </InfoCard>

              <InfoCard icon={Phone} title="Call or WhatsApp">
                <div className="space-y-2">
                  <p className="text-stone-600 text-sm sm:text-base">
                    <strong>Main Office:</strong>{" "}
                    <a href={telHref(s.phone)} className="text-emerald-600 hover:underline">
                      {s.phone}
                    </a>
                  </p>
                  {s.whatsapp && (
                    <p className="text-stone-600 text-sm sm:text-base">
                      <strong>WhatsApp:</strong>{" "}
                      <a href={whatsappHref(s.whatsapp)} className="text-emerald-600 hover:underline">
                        {s.whatsapp}
                      </a>
                    </p>
                  )}
                  <p className="text-stone-500 text-xs sm:text-sm mt-2 sm:mt-3 whitespace-pre-line">{c.phoneHours}</p>
                </div>
              </InfoCard>

              <InfoCard icon={Clock} title="Office Hours">
                <div className="space-y-1 text-stone-600 text-sm sm:text-base">
                  {c.officeHours.map((row, index) => (
                    <p key={index}>
                      <strong>{row.days}:</strong> {row.hours}
                    </p>
                  ))}
                  {c.emergencyNote && <p className="text-stone-500 text-xs sm:text-sm mt-2 sm:mt-3">{c.emergencyNote}</p>}
                </div>
              </InfoCard>

              {/* Registration Info */}
              <Card className="bg-gradient-to-br from-emerald-50 to-sky-50 border-emerald-200 shadow-lg">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="font-semibold text-stone-800 mb-2 sm:mb-3 text-base sm:text-lg">Organization Details</h3>
                  <div className="space-y-1 sm:space-y-2 text-stone-600 text-sm sm:text-base">
                    <p>
                      <strong>Registration Number:</strong> {s.registrationNumber}
                    </p>
                    <p>
                      <strong>Status:</strong> {s.registrationStatus}
                    </p>
                    <p>
                      <strong>Country of Registration:</strong> Kenya
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-8 md:py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-stone-800 mb-2 md:mb-4">{c.map.title}</h2>
            <p className="text-stone-600 text-sm sm:text-base">{c.map.text}</p>
          </div>
          {c.map.embedUrl.startsWith("https://www.google.com/maps/embed") ? (
            <iframe
              src={c.map.embedUrl}
              title={`Map of ${s.addressLine1}`}
              className="w-full h-64 sm:h-80 md:h-96 rounded-lg border-0 shadow"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="bg-stone-200 h-64 sm:h-80 md:h-96 rounded-lg flex items-center justify-center shadow-inner">
              <div className="text-center text-stone-600">
                <MapPin className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-4 text-emerald-600" />
                <p className="text-base sm:text-lg font-medium">{s.addressLine1}</p>
                <p className="text-xs sm:text-sm">{s.addressLine2}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
