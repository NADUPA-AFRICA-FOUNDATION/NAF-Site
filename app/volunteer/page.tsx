import { VolunteerForm } from "@/components/volunteer-form"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { getContent } from "@/lib/cms/content"

export const revalidate = 3600

export default async function VolunteerPage() {
  const c = await getContent("volunteer")

  return (
    <div className="min-h-screen bg-stone-50">
      <Navigation />
      <PageHero hero={c.hero}>
        {c.hero.stats.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6 text-center max-w-4xl mx-auto mt-10">
            {c.hero.stats.map((stat, index) => (
              <div key={index} className="bg-white/15 backdrop-blur-sm border border-white/20 p-6 rounded-lg">
                <div className="text-2xl font-bold mb-2">{stat.value}</div>
                <p className="opacity-90">{stat.label}</p>
              </div>
            ))}
          </div>
        )}
      </PageHero>

      {/* Why Volunteer Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-8 text-center">{c.why.title}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {c.why.reasons.map((reason, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-stone-200">
                  <h3 className="text-xl font-semibold text-stone-800 mb-4">{reason.title}</h3>
                  <p className="text-stone-600">{reason.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">{c.form.title}</h2>
              <p className="text-lg text-stone-600">{c.form.text}</p>
            </div>
            <VolunteerForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
