import { VolunteerForm } from "@/components/volunteer-form"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function VolunteerPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-6">
        <Link href="/get-involved">
          <Button variant="outline" className="flex items-center gap-2 mb-6">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Get Involved</span>
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="bg-emerald-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Volunteer With Us</h1>
            <p className="text-xl md:text-2xl mb-8 text-emerald-100">
              Join our mission to empower African communities through sustainable development and cultural preservation.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-emerald-700 p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-2">500+</h3>
                <p className="text-emerald-100">Active Volunteers</p>
              </div>
              <div className="bg-emerald-700 p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-2">50+</h3>
                <p className="text-emerald-100">Communities Served</p>
              </div>
              <div className="bg-emerald-700 p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-2">10+</h3>
                <p className="text-emerald-100">Years of Impact</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Volunteer Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-stone-800 mb-8 text-center">Why Volunteer With NADUPA?</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-stone-800 mb-4">Make Real Impact</h3>
                <p className="text-stone-600">
                  Work directly with communities to create lasting change in education, health, environmental
                  conservation, and sustainable development.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-stone-800 mb-4">Cultural Exchange</h3>
                <p className="text-stone-600">
                  Immerse yourself in rich African cultures, learn from local communities, and share your own knowledge
                  and skills.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-stone-800 mb-4">Professional Growth</h3>
                <p className="text-stone-600">
                  Develop new skills, gain international experience, and build a network of like-minded individuals
                  committed to social change.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-stone-800 mb-4">Flexible Opportunities</h3>
                <p className="text-stone-600">
                  Choose from various volunteer programs that match your skills, interests, and availability, from
                  short-term projects to long-term commitments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-stone-800 mb-4">Apply to Volunteer</h2>
              <p className="text-lg text-stone-600">
                Ready to make a difference? Fill out our application form and we'll get back to you soon.
              </p>
            </div>
            <VolunteerForm />

            {/* Back Button at Bottom */}
            <div className="mt-8 text-center">
              <Link href="/get-involved">
                <Button variant="outline" className="flex items-center gap-2 mx-auto">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Get Involved</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
