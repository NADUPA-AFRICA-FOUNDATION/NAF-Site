"use client"

import Link from "next/link"
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Shield, Lock, Database, FileText, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function PrivacyClientPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-stone-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-stone-800">Privacy Policy</h1>
              <p className="text-stone-600">How we collect, use, and protect your personal information</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Organization Info Card */}
          <Card className="mb-8 border-blue-200">
            <CardHeader className="bg-blue-50">
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <FileText className="w-5 h-5" />
                Privacy Policy Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold">Effective Date:</span>
                    <span>June 11, 2025</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold">Organization:</span>
                    <span>NADUPA AFRICA FOUNDATION</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold">Version:</span>
                    <span>1.0</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold">Jurisdiction:</span>
                    <span>Republic of Kenya</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Important Notice */}
          <Card className="mb-8 border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-green-800 mb-2">Our Commitment to Privacy</h3>
                  <p className="text-green-700">
                    NADUPA AFRICA FOUNDATION is committed to protecting your privacy and ensuring the security of your
                    personal information. This policy explains how we collect, use, store, and protect your data in
                    accordance with Kenyan data protection laws and international best practices.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Policy Content */}
          <div className="space-y-8">
            {/* Section 1 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">1</span>
                  Information We Collect
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Database className="w-4 h-4 text-blue-500" />
                    Personal Information:
                  </h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Name, email address, phone number, and mailing address</li>
                    <li>Date of birth and nationality (for volunteer applications)</li>
                    <li>Professional background and skills (for volunteer matching)</li>
                    <li>Emergency contact information (for program participants)</li>
                    <li>Payment information (for donations, processed securely by third parties)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Technical Information:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>IP address, browser type, and device information</li>
                    <li>Website usage patterns and preferences</li>
                    <li>Cookies and similar tracking technologies</li>
                    <li>Location data (with your consent)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Program-Related Information:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Volunteer application details and references</li>
                    <li>Program participation records and feedback</li>
                    <li>Photos and videos (with explicit consent)</li>
                    <li>Health and safety information (where necessary)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Section 2 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">2</span>
                  How We Use Your Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Program Operations:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Processing volunteer applications and matching skills to needs</li>
                    <li>Coordinating program activities and communications</li>
                    <li>Ensuring safety and security of participants</li>
                    <li>Providing program updates and impact reports</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Communication:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Responding to inquiries and providing customer support</li>
                    <li>Sending newsletters and program updates (with consent)</li>
                    <li>Sharing impact stories and organizational news</li>
                    <li>Emergency communications related to programs</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Legal and Administrative:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Complying with legal obligations and reporting requirements</li>
                    <li>Maintaining accurate records for audit purposes</li>
                    <li>Processing donations and issuing receipts</li>
                    <li>Protecting against fraud and ensuring security</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Section 3 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">3</span>
                  Information Sharing and Disclosure
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">
                    We DO NOT sell or rent your personal information to third parties.
                  </h4>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Limited Sharing Occurs Only When:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>You provide explicit consent for specific purposes</li>
                    <li>Required by law or legal process</li>
                    <li>Necessary for program safety and security</li>
                    <li>Working with trusted service providers (under strict confidentiality agreements)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Trusted Partners Include:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Payment processors for secure donation handling</li>
                    <li>Email service providers for communications</li>
                    <li>Cloud storage providers for data backup</li>
                    <li>Government agencies when legally required</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Section 4 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">4</span>
                  Data Security and Protection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-green-500" />
                    Security Measures:
                  </h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>SSL encryption for all data transmission</li>
                    <li>Secure cloud storage with regular backups</li>
                    <li>Access controls and user authentication</li>
                    <li>Regular security audits and updates</li>
                    <li>Staff training on data protection practices</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Data Retention:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Personal data retained only as long as necessary</li>
                    <li>Volunteer records kept for 7 years after program completion</li>
                    <li>Donation records maintained per legal requirements</li>
                    <li>Website analytics data anonymized after 2 years</li>
                  </ul>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                  <h4 className="font-semibold text-amber-800 mb-2">Data Breach Protocol:</h4>
                  <p className="text-amber-700 text-sm">
                    In the unlikely event of a data breach, we will notify affected individuals within 72 hours and take
                    immediate steps to secure the data and prevent further unauthorized access.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Section 5 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">5</span>
                  Your Rights and Choices
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">You Have the Right To:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Access your personal information we hold</li>
                    <li>Correct inaccurate or incomplete data</li>
                    <li>Request deletion of your personal information</li>
                    <li>Withdraw consent for data processing</li>
                    <li>Receive a copy of your data in portable format</li>
                    <li>Object to certain types of data processing</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Communication Preferences:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Opt out of marketing communications at any time</li>
                    <li>Choose frequency of program updates</li>
                    <li>Select preferred communication channels</li>
                    <li>Unsubscribe from newsletters with one click</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">To Exercise Your Rights:</h4>
                  <p className="text-sm">
                    Contact us at{" "}
                    <a href="mailto:info@nadupaafricafoundation.org" className="text-blue-600 hover:underline">
                      info@nadupaafricafoundation.org
                    </a>{" "}
                    or use the contact information provided below.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Section 6 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">6</span>
                  Cookies and Tracking Technologies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Types of Cookies We Use:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      <strong>Essential Cookies:</strong> Required for website functionality
                    </li>
                    <li>
                      <strong>Analytics Cookies:</strong> Help us understand website usage
                    </li>
                    <li>
                      <strong>Preference Cookies:</strong> Remember your settings and choices
                    </li>
                    <li>
                      <strong>Marketing Cookies:</strong> Used with your consent for targeted content
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Managing Cookies:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>You can control cookies through your browser settings</li>
                    <li>Disabling cookies may affect website functionality</li>
                    <li>We provide cookie preference controls on our website</li>
                    <li>Third-party cookies are governed by respective privacy policies</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Section 7 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">7</span>
                  International Data Transfers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  As an organization operating in Kenya, we primarily store and process data within Kenya. However, some
                  of our service providers may be located in other countries. When data is transferred internationally,
                  we ensure:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Adequate protection measures are in place</li>
                  <li>Service providers meet international data protection standards</li>
                  <li>Contractual safeguards protect your information</li>
                  <li>Transfers comply with Kenyan data protection laws</li>
                </ul>
              </CardContent>
            </Card>

            {/* Section 8 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">8</span>
                  Children's Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  We are committed to protecting the privacy of children. Our services are not directed to children
                  under 16, and we do not knowingly collect personal information from children under 16 without parental
                  consent.
                </p>
                <div>
                  <h4 className="font-semibold mb-2">For Minors (Under 18) Participating in Programs:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Parental or guardian consent is required</li>
                    <li>Additional privacy protections apply</li>
                    <li>Limited data collection focused on safety and program needs</li>
                    <li>Parents can access and control their child's information</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Section 9 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">9</span>
                  Changes to This Privacy Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  We may update this Privacy Policy from time to time to reflect changes in our practices, technology,
                  legal requirements, or other factors. When we make changes:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>We will post the updated policy on our website</li>
                  <li>We will notify you of significant changes via email</li>
                  <li>The effective date will be updated</li>
                  <li>You will have 30 days to review changes before they take effect</li>
                </ul>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-800">Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-blue-700">
                  For questions, concerns, or requests regarding this Privacy Policy or your personal data, please
                  contact us:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="font-semibold text-blue-800">General Inquiries:</p>
                        <a href="mailto:info@nadupaafricafoundation.org" className="text-blue-700 hover:text-blue-800">
                          info@nadupaafricafoundation.org
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="font-semibold text-blue-800">Privacy & Data Protection:</p>
                        <a href="mailto:info@nadupaafricafoundation.org" className="text-blue-700 hover:text-blue-800">
                          info@nadupaafricafoundation.org
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="font-semibold text-blue-800">Phone:</p>
                        <a href="tel:+254796093465" className="text-blue-700 hover:text-blue-800">
                          +254 796 093 465
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="font-semibold text-blue-800">Address:</p>
                        <span className="text-blue-700">Kajiado-West, Kajiado County, Kenya</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-blue-200">
                  <p className="text-sm text-blue-600">
                    <strong>Last Updated:</strong> June 11, 2025 | <strong>Version:</strong> 1.0 |
                    <strong> Next Review:</strong> June 11, 2026
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Back to Top */}
          <div className="text-center mt-8">
            <Button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              variant="outline"
              className="border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              Back to Top
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
