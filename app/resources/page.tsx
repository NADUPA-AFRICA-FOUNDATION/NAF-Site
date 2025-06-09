import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, FileText, Calendar, BarChart3, Leaf, DollarSign, ExternalLink } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

// Define the resource type
interface Resource {
  id: string
  title: string
  description: string | null
  category: string | null
  reference_links: string | null
  file_url: string | null
  file_size: string | null
  file_type: string | null
  is_featured: boolean
  created_at: string
}

// Function to get icon based on category
function getCategoryIcon(category: string | null) {
  switch (category?.toLowerCase()) {
    case "annual reports":
      return Calendar
    case "impact reports":
      return BarChart3
    case "environmental reports":
      return Leaf
    case "financial reports":
      return DollarSign
    default:
      return FileText
  }
}

// Function to format date
function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

async function getResources(): Promise<Resource[]> {
  try {
    const { data, error } = await supabase.from("resources").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching resources:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error fetching resources:", error)
    return []
  }
}

export default async function ResourcesPage() {
  const resources = await getResources()

  // Separate featured and regular resources
  const featuredResources = resources.filter((resource) => resource.is_featured)
  const regularResources = resources.filter((resource) => !resource.is_featured)

  // Fallback data if no resources are found
  const fallbackReports = [
    {
      title: "Annual Report 2023",
      description: "Comprehensive overview of our programs, achievements, and financial performance for 2023.",
      icon: Calendar,
      category: "Annual Reports",
      date: "December 2023",
      size: "2.4 MB",
    },
    {
      title: "Program Impact Overview 2022",
      description: "Detailed analysis of our program outcomes and community impact across all five counties.",
      icon: BarChart3,
      category: "Impact Reports",
      date: "March 2023",
      size: "1.8 MB",
    },
    {
      title: "Environmental Conservation Summary",
      description:
        "Summary of our environmental conservation initiatives and their measurable impact on local ecosystems.",
      icon: Leaf,
      category: "Environmental Reports",
      date: "September 2023",
      size: "1.2 MB",
    },
    {
      title: "Financial Transparency Statement",
      description: "Detailed breakdown of our financial operations, funding sources, and expenditure allocation.",
      icon: DollarSign,
      category: "Financial Reports",
      date: "January 2024",
      size: "950 KB",
    },
  ]

  const fallbackAdditionalResources = [
    {
      title: "Volunteer Handbook",
      description: "Complete guide for new volunteers including policies, procedures, and expectations.",
      category: "Volunteer Resources",
    },
    {
      title: "Community Partnership Guidelines",
      description: "Framework for establishing and maintaining partnerships with local communities.",
      category: "Partnership Resources",
    },
    {
      title: "Donor Impact Stories",
      description: "Collection of stories showcasing how donations have transformed lives across Kenya.",
      category: "Impact Stories",
    },
    {
      title: "Educational Materials Catalog",
      description: "Comprehensive list of educational resources and materials available for our programs.",
      category: "Educational Resources",
    },
  ]

  return (
    <div className="min-h-screen bg-stone-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/rural-landscape.avif"
            alt="Rural landscape representing our documented work across Kenya"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-emerald-700/60"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Resources</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Browse and download our reports, documents, and publications that highlight our work and impact across
            Kenya.
          </p>
        </div>
      </section>

      {/* Featured Resources Section */}
      {featuredResources.length > 0 && (
        <section className="py-16 px-4 bg-gradient-to-br from-emerald-50 to-sky-50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">Featured Resources</h2>
              <p className="text-lg text-stone-600 max-w-3xl mx-auto">
                Our most important and recent publications highlighting our impact and transparency.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {featuredResources.map((resource) => {
                const IconComponent = getCategoryIcon(resource.category)
                return (
                  <Card key={resource.id} className="border-stone-200 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>

                        <div className="flex-1">
                          <div className="flex flex-col gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-xl font-semibold text-stone-800">{resource.title}</h3>
                                {resource.category && (
                                  <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs font-medium">
                                    {resource.category}
                                  </span>
                                )}
                              </div>
                              {resource.description && <p className="text-stone-600 mb-3">{resource.description}</p>}
                              <div className="flex items-center gap-4 text-sm text-stone-500">
                                <span>{formatDate(resource.created_at)}</span>
                                {resource.file_size && (
                                  <>
                                    <span>•</span>
                                    <span>{resource.file_size}</span>
                                  </>
                                )}
                              </div>
                            </div>

                            {resource.reference_links && (
                              <div className="flex gap-2">
                                <Link href={resource.reference_links} target="_blank" rel="noopener noreferrer">
                                  <Button className="bg-emerald-600 hover:bg-emerald-700 flex-shrink-0">
                                    <Download className="w-4 h-4 mr-2" />
                                    Download
                                  </Button>
                                </Link>
                                <Link href={resource.reference_links} target="_blank" rel="noopener noreferrer">
                                  <Button
                                    variant="outline"
                                    className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                                  >
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    View Online
                                  </Button>
                                </Link>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Main Reports Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">
              {featuredResources.length > 0 ? "All Resources" : "Reports & Publications"}
            </h2>
            <p className="text-lg text-stone-600 max-w-3xl mx-auto">
              Access our comprehensive reports that document our impact, financial transparency, and program outcomes
              across all our initiatives.
            </p>
          </div>

          <div className="grid gap-6 max-w-4xl mx-auto">
            {regularResources.length > 0
              ? regularResources.map((resource) => {
                  const IconComponent = getCategoryIcon(resource.category)
                  return (
                    <Card key={resource.id} className="border-stone-200 hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>

                          <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h3 className="text-xl font-semibold text-stone-800">{resource.title}</h3>
                                  {resource.category && (
                                    <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs font-medium">
                                      {resource.category}
                                    </span>
                                  )}
                                </div>
                                {resource.description && <p className="text-stone-600 mb-3">{resource.description}</p>}
                                <div className="flex items-center gap-4 text-sm text-stone-500">
                                  <span>{formatDate(resource.created_at)}</span>
                                  {resource.file_size && (
                                    <>
                                      <span>•</span>
                                      <span>{resource.file_size}</span>
                                    </>
                                  )}
                                </div>
                              </div>

                              {resource.reference_links && (
                                <Link href={resource.reference_links} target="_blank" rel="noopener noreferrer">
                                  <Button className="bg-emerald-600 hover:bg-emerald-700 flex-shrink-0">
                                    <Download className="w-4 h-4 mr-2" />
                                    Download PDF
                                  </Button>
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })
              : // Fallback to static data if no resources in database
                fallbackReports.map((report, index) => (
                  <Card key={index} className="border-stone-200 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <report.icon className="w-6 h-6 text-white" />
                        </div>

                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-xl font-semibold text-stone-800">{report.title}</h3>
                                <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs font-medium">
                                  {report.category}
                                </span>
                              </div>
                              <p className="text-stone-600 mb-3">{report.description}</p>
                              <div className="flex items-center gap-4 text-sm text-stone-500">
                                <span>{report.date}</span>
                                <span>•</span>
                                <span>{report.size}</span>
                              </div>
                            </div>

                            <Button className="bg-emerald-600 hover:bg-emerald-700 flex-shrink-0">
                              <Download className="w-4 h-4 mr-2" />
                              Download PDF
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
          </div>
        </div>
      </section>

      {/* Additional Resources Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-emerald-50 to-sky-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">Additional Resources</h2>
            <p className="text-lg text-stone-600 max-w-3xl mx-auto">
              Explore our collection of guides, handbooks, and educational materials designed to support our community
              and partners.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {fallbackAdditionalResources.map((resource, index) => (
              <Card key={index} className="border-stone-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-emerald-600" />
                    <div>
                      <CardTitle className="text-lg text-stone-800">{resource.title}</CardTitle>
                      <span className="text-sm text-emerald-600 font-medium">{resource.category}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-stone-600 mb-4">{resource.description}</p>
                  <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-stone-800 mb-4">Stay Updated</h2>
            <p className="text-lg text-stone-600 mb-8">
              Subscribe to our newsletter to receive the latest reports and updates about our work directly in your
              inbox.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <Button className="bg-emerald-600 hover:bg-emerald-700 px-6">Subscribe</Button>
            </div>

            <p className="text-sm text-stone-500 mt-4">
              We respect your privacy and will never share your email address.
            </p>
          </div>
        </div>
      </section>

      {/* Contact for More Resources */}
      <section className="py-16 px-4 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Need More Information?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Can't find what you're looking for? Contact us for additional reports, data, or custom research requests.
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-white text-emerald-600 hover:bg-stone-100 hover:shadow-lg transition-all duration-300"
            >
              Contact Our Team
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
