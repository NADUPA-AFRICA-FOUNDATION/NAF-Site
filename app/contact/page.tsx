import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ContactFormAPI } from "@/components/contact-form-api"
import Image from "next/image"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/rural-homestead.jpeg"
            alt="Rural community representing our connection to the people we serve"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-emerald-700/60"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">Contact Us</h1>
          <p className="text-lg sm:text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Get in touch with NADUPA AFRICA FOUNDATION. We'd love to hear from you and discuss how we can work together
            to transform communities across Kenya.
          </p>
        </div>
      </section>

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
                <p className="text-stone-600 text-sm sm:text-base">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <ContactFormAPI />
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
              <Card className="border-stone-200 shadow-lg">
                <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
                  <CardTitle className="text-lg sm:text-xl text-stone-800 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Our Location</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 sm:px-6 py-3 sm:py-4">
                  <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                    <strong>NADUPA AFRICA FOUNDATION</strong>
                    <br />
                    Kajiado-West, Kajiado County
                    <br />
                    Kenya, East Africa
                  </p>
                  <p className="text-stone-500 text-xs sm:text-sm mt-2 sm:mt-3">
                    We serve communities across Nairobi, Kajiado, Lamu, Narok, and Turkana counties.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-stone-200 shadow-lg">
                <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
                  <CardTitle className="text-lg sm:text-xl text-stone-800 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Email Us</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 sm:px-6 py-3 sm:py-4">
                  <div className="space-y-2">
                    <p className="text-stone-600 text-sm sm:text-base">
                      <strong>Contact Email:</strong>
                      <br />
                      <a href="mailto:info@nadupaafricafoundation.org" className="text-emerald-600 hover:underline">
                        info@nadupaafricafoundation.org
                      </a>
                    </p>
                    <p className="text-stone-500 text-xs sm:text-sm mt-2 sm:mt-3">
                      For all inquiries including general questions, partnerships, volunteer applications, and program
                      information.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-stone-200 shadow-lg">
                <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
                  <CardTitle className="text-lg sm:text-xl text-stone-800 flex items-center gap-2">
                    <Phone className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Call or WhatsApp</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 sm:px-6 py-3 sm:py-4">
                  <div className="space-y-2">
                    <p className="text-stone-600 text-sm sm:text-base">
                      <strong>Main Office:</strong>{" "}
                      <a href="tel:+254796093465" className="text-emerald-600 hover:underline">
                        +254 796093465
                      </a>
                    </p>
                    <p className="text-stone-600 text-sm sm:text-base">
                      <strong>WhatsApp:</strong>{" "}
                      <a href="https://wa.me/254796093465" className="text-emerald-600 hover:underline">
                        +254 796093465
                      </a>
                    </p>
                    <p className="text-stone-500 text-xs sm:text-sm mt-2 sm:mt-3">
                      Available Monday - Friday, 8:00 AM - 5:00 PM EAT
                      <br />
                      Saturday: 9:00 AM - 1:00 PM
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-stone-200 shadow-lg">
                <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
                  <CardTitle className="text-lg sm:text-xl text-stone-800 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Office Hours</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 sm:px-6 py-3 sm:py-4">
                  <div className="space-y-1 text-stone-600 text-sm sm:text-base">
                    <p>
                      <strong>Monday - Friday:</strong> 8:00 AM - 5:00 PM
                    </p>
                    <p>
                      <strong>Saturday:</strong> 9:00 AM - 1:00 PM
                    </p>
                    <p>
                      <strong>Sunday:</strong> Closed
                    </p>
                    <p className="text-stone-500 text-xs sm:text-sm mt-2 sm:mt-3">
                      Emergency contact available 24/7 for urgent community needs.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Registration Info */}
              <Card className="bg-gradient-to-br from-emerald-50 to-sky-50 border-emerald-200 shadow-lg">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="font-semibold text-stone-800 mb-2 sm:mb-3 text-base sm:text-lg">
                    Organization Details
                  </h3>
                  <div className="space-y-1 sm:space-y-2 text-stone-600 text-sm sm:text-base">
                    <p>
                      <strong>Registration Number:</strong> NGO-6DF3EM
                    </p>
                    <p>
                      <strong>Status:</strong> Registered Non-Governmental Organization
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
            <h2 className="text-2xl md:text-3xl font-bold text-stone-800 mb-2 md:mb-4">Find Us</h2>
            <p className="text-stone-600 text-sm sm:text-base">
              We're located in Kajiado-West, Kajiado County, Kenya. Visit us during our office hours or schedule an
              appointment to discuss partnership opportunities.
            </p>
          </div>

          {/* Placeholder for map - in a real implementation, you'd integrate Google Maps */}
          <div className="bg-stone-200 h-64 sm:h-80 md:h-96 rounded-lg flex items-center justify-center shadow-inner">
            <div className="text-center text-stone-600">
              <MapPin className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-4 text-emerald-600" />
              <p className="text-base sm:text-lg font-medium">Interactive Map</p>
              <p className="text-xs sm:text-sm">Kajiado-West, Kajiado County, Kenya</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
