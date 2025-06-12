"use client"

import Link from "next/link"
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Users,
  Heart,
  FileText,
  Scale,
  Globe,
  AlertTriangle,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function TermsClientPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-stone-50">
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
            <Scale className="w-8 h-8 text-emerald-600" />
            <div>
              <h1 className="text-3xl font-bold text-stone-800">Terms and Conditions</h1>
              <p className="text-stone-600">Legal framework governing our services and your participation</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Organization Info Card */}
          <Card className="mb-8 border-emerald-200">
            <CardHeader className="bg-emerald-50">
              <CardTitle className="flex items-center gap-2 text-emerald-800">
                <FileText className="w-5 h-5" />
                Organization Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-600" />
                    <span className="font-semibold">Effective Date:</span>
                    <span>June 11, 2025</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-600" />
                    <span className="font-semibold">Organization:</span>
                    <span>NADUPA AFRICA FOUNDATION</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    <span className="font-semibold">Registration:</span>
                    <span>NGO-6DF3EM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span className="font-semibold">Location:</span>
                    <span>Kajiado-West, Kajiado County, Kenya</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Important Notice */}
          <Card className="mb-8 border-amber-200 bg-amber-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-amber-800 mb-2">Important Notice</h3>
                  <p className="text-amber-700">
                    By accessing our website, making donations, volunteering, or participating in any of our programs or
                    services, you acknowledge that you have read, understood, and agree to be legally bound by these
                    Terms and Conditions. If you do not agree with any part of these terms, please discontinue use of
                    our services immediately.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Terms Content */}
          <div className="space-y-8">
            {/* Section 1 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-bold">1</span>
                  Acceptance of Terms
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  By using this website, mobile application, or engaging with NADUPA AFRICA FOUNDATION ("we," "our,"
                  "us," or "the Foundation"), you agree to be legally bound by these Terms and Conditions, our Privacy
                  Policy, Volunteer Code of Conduct, and any other policies referenced herein.
                </p>
                <p>
                  These terms constitute a legally binding agreement between you and NADUPA AFRICA FOUNDATION. Your
                  continued use of our services after any modifications to these terms constitutes acceptance of such
                  changes.
                </p>
              </CardContent>
            </Card>

            {/* Section 2 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-bold">2</span>
                  Eligibility and Age Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">General Eligibility:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Participation in volunteer programs is open to individuals aged 18 years or older</li>
                    <li>Website use and donations are open to individuals aged 16 years or older</li>
                    <li>All participants must have legal capacity to enter into binding agreements</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Minors (Under 18):</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Must have written parental or legal guardian consent</li>
                    <li>Must be accompanied by a parent/guardian during volunteer activities</li>
                    <li>Are subject to additional safety protocols and supervision requirements</li>
                    <li>May have restricted access to certain programs or activities</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">International Volunteers:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Must possess valid travel documents and appropriate visas</li>
                    <li>Must comply with Kenyan immigration laws and regulations</li>
                    <li>Are responsible for their own travel insurance and medical coverage</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Section 3 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-bold">3</span>
                  Comprehensive Volunteer Code of Conduct
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    Respect and Dignity:
                  </h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      Treat all individuals with respect, dignity, and compassion regardless of race, gender, religion,
                      or social status
                    </li>
                    <li>Respect local customs, traditions, and cultural practices</li>
                    <li>Maintain appropriate professional boundaries with beneficiaries and community members</li>
                    <li>Use respectful language and behavior at all times</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-500" />
                    Professional Standards:
                  </h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      Follow all instructions and guidelines provided by NADUPA AFRICA FOUNDATION staff and community
                      leaders
                    </li>
                    <li>Maintain punctuality and reliability in all commitments</li>
                    <li>Dress appropriately and modestly according to local customs</li>
                    <li>Maintain personal hygiene and health standards</li>
                    <li>Report any incidents, concerns, or safety issues immediately</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Prohibited Conduct:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Any form of discrimination, harassment, or abuse (physical, verbal, emotional, or sexual)</li>
                    <li>
                      Use of alcohol or illegal substances during volunteer activities or while representing the
                      Foundation
                    </li>
                    <li>Engaging in romantic or sexual relationships with beneficiaries or community members</li>
                    <li>Accepting gifts, money, or favors from beneficiaries or community members</li>
                    <li>Sharing confidential information about the Foundation, its beneficiaries, or operations</li>
                    <li>Taking photographs or videos without proper consent and authorization</li>
                    <li>Proselytizing or promoting personal religious or political beliefs</li>
                  </ul>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-800 mb-2">Consequences of Violations:</h4>
                  <p className="text-red-700">
                    Violation of this code may result in immediate dismissal from programs, termination of volunteer
                    status, legal action where applicable, and reporting to relevant authorities. Serious violations may
                    also result in permanent ban from all Foundation activities.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Section 4 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-bold">4</span>
                  Website Use and Digital Conduct
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Acceptable Use:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Use the website for legitimate purposes related to our mission</li>
                    <li>Provide accurate and truthful information in all forms and communications</li>
                    <li>Respect the privacy and rights of other users</li>
                    <li>Report any technical issues or security concerns promptly</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Prohibited Activities:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Uploading or transmitting harmful, malicious, or illegal content</li>
                    <li>Attempting to gain unauthorized access to our systems or data</li>
                    <li>Violating intellectual property rights of the Foundation or third parties</li>
                    <li>Collecting personal data of other users without explicit consent</li>
                    <li>Using automated systems (bots, scrapers) to access our website</li>
                    <li>Interfering with the proper functioning of the website</li>
                    <li>Impersonating Foundation staff or other users</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Section 5 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-bold">5</span>
                  Donations and Financial Contributions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Donation Policy:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>All donations are voluntary and made without expectation of goods or services in return</li>
                    <li>Donations are generally non-refundable except in cases of processing errors</li>
                    <li>Donors may request refunds within 30 days for technical errors or unauthorized transactions</li>
                    <li>The Foundation reserves the right to refuse or return donations at its discretion</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Use of Funds:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Funds will be used to support the Foundation's mission and programs</li>
                    <li>Administrative costs are kept to a minimum (target: under 15% of total donations)</li>
                    <li>Designated donations will be used for specified purposes where possible</li>
                    <li>
                      If designated purposes cannot be fulfilled, donors will be contacted for alternative allocation
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Transparency and Reporting:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Annual financial reports are available upon request</li>
                    <li>Major donors may request detailed impact reports</li>
                    <li>All financial activities are subject to independent audit</li>
                    <li>Tax receipts are provided where applicable under Kenyan law</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Section 6 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-bold">6</span>
                  Privacy and Data Protection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Data Collection and Use:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Personal information is collected only for legitimate Foundation purposes</li>
                    <li>Data is processed in accordance with Kenyan data protection laws</li>
                    <li>Information is stored securely and access is limited to authorized personnel</li>
                    <li>Data retention periods are established based on legal and operational requirements</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Data Sharing:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Personal data is not shared with third parties without explicit consent</li>
                    <li>Exceptions include legal requirements, safety concerns, or authorized service providers</li>
                    <li>Anonymized data may be used for research and reporting purposes</li>
                    <li>Users have the right to access, correct, or delete their personal information</li>
                  </ul>
                </div>
                <p className="text-sm text-stone-600">
                  For detailed information about our data practices, please refer to our comprehensive Privacy Policy.
                </p>
              </CardContent>
            </Card>

            {/* Section 7 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-bold">7</span>
                  Intellectual Property Rights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Foundation Content:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      All website content, including text, images, logos, videos, and documents, is owned by NADUPA
                      AFRICA FOUNDATION
                    </li>
                    <li>Content is protected by copyright, trademark, and other intellectual property laws</li>
                    <li>Unauthorized use, reproduction, or distribution is strictly prohibited</li>
                    <li>Limited use for educational or promotional purposes may be permitted with written consent</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">User-Generated Content:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Users retain ownership of content they create and submit</li>
                    <li>
                      By submitting content, users grant the Foundation a license to use it for promotional purposes
                    </li>
                    <li>Users warrant that their content does not infringe on third-party rights</li>
                    <li>The Foundation reserves the right to remove inappropriate content</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Third-Party Content:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Third-party content is used with permission or under fair use provisions</li>
                    <li>Users must respect third-party intellectual property rights</li>
                    <li>Any infringement claims will be addressed promptly</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Section 8 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-bold">8</span>
                  Limitation of Liability and Risk Acknowledgment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">General Limitations:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      NADUPA AFRICA FOUNDATION is not liable for direct, indirect, incidental, or consequential damages
                    </li>
                    <li>Participation in programs and activities is at your own risk</li>
                    <li>The Foundation's liability is limited to the maximum extent permitted by law</li>
                    <li>These limitations apply regardless of the cause of action or theory of liability</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Specific Risk Acknowledgments:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Volunteer activities may involve physical risks and exposure to rural environments</li>
                    <li>Medical facilities may be limited in remote areas where we operate</li>
                    <li>Travel to and from program sites carries inherent risks</li>
                    <li>Cultural differences may lead to misunderstandings or discomfort</li>
                    <li>Weather conditions and natural events may affect program activities</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Insurance and Medical Coverage:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Volunteers are strongly encouraged to obtain comprehensive travel and health insurance</li>
                    <li>The Foundation does not provide medical insurance for volunteers</li>
                    <li>Emergency medical evacuation costs are the responsibility of the individual</li>
                    <li>Pre-existing medical conditions must be disclosed and may affect participation</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Section 9 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-bold">9</span>
                  Modifications and Updates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Right to Modify:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>The Foundation reserves the right to update these Terms and Conditions at any time</li>
                    <li>Changes may be made to reflect legal requirements, operational needs, or policy updates</li>
                    <li>Material changes will be communicated through our website and email notifications</li>
                    <li>Users will have 30 days to review changes before they take effect</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Notification Process:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Updates will be posted on our website with the new effective date</li>
                    <li>Registered users will receive email notifications of significant changes</li>
                    <li>Continued use of services after changes constitutes acceptance</li>
                    <li>Users who disagree with changes may discontinue use of services</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Section 10 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-bold">10</span>
                  Governing Law and Dispute Resolution
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-500" />
                    Applicable Law:
                  </h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>These Terms are governed by the laws of the Republic of Kenya</li>
                    <li>Any disputes will be subject to the jurisdiction of Kenyan courts</li>
                    <li>International volunteers acknowledge Kenyan legal jurisdiction</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Dispute Resolution Process:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      Initial disputes should be addressed through direct communication with Foundation management
                    </li>
                    <li>Formal complaints may be submitted in writing to our board of directors</li>
                    <li>Mediation will be attempted before pursuing legal action</li>
                    <li>Legal proceedings will be conducted in Kajiado County or Nairobi, Kenya</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Severability:</h4>
                  <p>
                    If any provision of these Terms is found to be unenforceable, the remaining provisions will continue
                    in full force and effect. Invalid provisions will be replaced with enforceable terms that most
                    closely reflect the original intent.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-emerald-200 bg-emerald-50">
              <CardHeader>
                <CardTitle className="text-emerald-800">Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-emerald-700">
                  For questions, concerns, or clarifications regarding these Terms and Conditions, please contact us:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-emerald-600" />
                    <a
                      href="mailto:info@nadupaafricafoundation.org"
                      className="text-emerald-700 hover:text-emerald-800"
                    >
                      info@nadupaafricafoundation.org
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <a href="tel:+254796093465" className="text-emerald-700 hover:text-emerald-800">
                      +254 796 093 465
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">Kajiado-West, Kenya</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-emerald-200">
                  <p className="text-sm text-emerald-600">
                    <strong>Last Updated:</strong> June 11, 2025 |<strong> Version:</strong> 2.0 |
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
              className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
            >
              Back to Top
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
