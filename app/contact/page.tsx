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
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/rural-homestead.jpeg"
            alt="Rural community representing our connection to the people we serve"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-emerald-700/60"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Get in touch with NADUPA AFRICA FOUNDATION. We'd love to hear from you and discuss how we can work together
            to transform communities across Kenya.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-stone-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-stone-800 flex items-center gap-2">
                  <MessageCircle className="w-6 h-6 text-emerald-600" />
                  Send Us a Message
                </CardTitle>
                <p className="text-stone-600">Fill out the form below and we'll get back to you within 24 hours.</p>
              </CardHeader>
              <CardContent>
                <ContactFormAPI />
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="border-stone-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-stone-800 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-emerald-600" />
                    Our Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-stone-600 leading-relaxed">
                    <strong>NADUPA AFRICA FOUNDATION</strong>
                    <br />
                    Kajiado-West, Kajiado County
                    <br />
                    Kenya, East Africa
                  </p>
                  <p className="text-stone-500 text-sm mt-3">
                    We serve communities across Nairobi, Kajiado, Lamu, Narok, and Turkana counties.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-stone-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-stone-800 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-emerald-600" />
                    Email Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-stone-600">
                      <strong>Contact Email:</strong>
                      <br />
                      info@nadupaafricafoundation.org
                    </p>
                    <p className="text-stone-500 text-sm mt-3">
                      For all inquiries including general questions, partnerships, volunteer applications, and program
                      information.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-stone-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-stone-800 flex items-center gap-2">
                    <Phone className="w-5 h-5 text-emerald-600" />
                    Call or WhatsApp
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-stone-600">
                      <strong>Main Office:</strong> +254 796093465
                    </p>
                    <p className="text-stone-600">
                      <strong>WhatsApp:</strong> +254 796093465
                    </p>
                    <p className="text-stone-500 text-sm mt-3">
                      Available Monday - Friday, 8:00 AM - 5:00 PM EAT
                      <br />
                      Saturday: 9:00 AM - 1:00 PM
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-stone-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-stone-800 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-emerald-600" />
                    Office Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 text-stone-600">
                    <p>
                      <strong>Monday - Friday:</strong> 8:00 AM - 5:00 PM
                    </p>
                    <p>
                      <strong>Saturday:</strong> 9:00 AM - 1:00 PM
                    </p>
                    <p>
                      <strong>Sunday:</strong> Closed
                    </p>
                    <p className="text-stone-500 text-sm mt-3">
                      Emergency contact available 24/7 for urgent community needs.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Registration Info */}
              <Card className="bg-gradient-to-br from-emerald-50 to-sky-50 border-emerald-200 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-stone-800 mb-3 text-lg">Organization Details</h3>
                  <div className="space-y-2 text-stone-600">
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
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-stone-800 mb-4">Find Us</h2>
            <p className="text-stone-600">
              We're located in Kajiado-West, Kajiado County, Kenya. Visit us during our office hours or schedule an
              appointment to discuss partnership opportunities.
            </p>
          </div>

          {/* Placeholder for map - in a real implementation, you'd integrate Google Maps */}
          <div className="bg-stone-200 h-96 rounded-lg flex items-center justify-center shadow-inner">
            <div className="text-center text-stone-600">
              <MapPin className="w-16 h-16 mx-auto mb-4 text-emerald-600" />
              <p className="text-lg font-medium">Interactive Map</p>
              <p className="text-sm">Kajiado-West, Kajiado County, Kenya</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
