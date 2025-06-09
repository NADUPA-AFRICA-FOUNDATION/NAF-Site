import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { VolunteerForm } from "@/components/volunteer-form"
import Image from "next/image"

export default function VolunteerPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden min-h-[60vh] lg:min-h-[70vh]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/forest-canopy.jpeg"
            alt="Forest canopy representing growth through volunteering"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-emerald-700/60"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white flex items-center justify-center min-h-[60vh] lg:min-h-[70vh]">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Apply to Volunteer</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Join our team of dedicated volunteers and make a meaningful impact in communities across Kenya.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-10">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-stone-800 mb-4">Volunteer Application Form</h2>
              <p className="text-stone-600">
                Please fill out the form below to apply for volunteer opportunities with NADUPA AFRICA FOUNDATION. We'll
                review your application and contact you within 5-7 business days.
              </p>
            </div>

            <VolunteerForm />
          </div>
        </div>
      </section>

      {/* Volunteer Impact Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-emerald-50 to-sky-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-800 mb-4">The Impact of Our Volunteers</h2>
            <p className="text-lg text-stone-600 max-w-3xl mx-auto">
              Our volunteers are the heart of our organization, bringing skills, passion, and dedication to communities
              across Kenya.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">500+</div>
              <div className="text-stone-600">Active Volunteers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">10,000+</div>
              <div className="text-stone-600">Volunteer Hours</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">25+</div>
              <div className="text-stone-600">Communities Served</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
