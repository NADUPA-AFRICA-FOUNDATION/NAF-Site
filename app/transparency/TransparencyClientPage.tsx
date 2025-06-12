"use client"

import Link from "next/link"
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  PieChart,
  BarChart3,
  TrendingUp,
  FileText,
  Download,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function TransparencyClientPage() {
  // Sample financial data - replace with actual data
  const financialData = {
    totalRevenue2023: 2450000,
    totalExpenses2023: 2180000,
    programExpenses: 1850000,
    adminExpenses: 220000,
    fundraisingExpenses: 110000,
    programPercentage: 84.9,
    adminPercentage: 10.1,
    fundraisingPercentage: 5.0,
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-stone-50">
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
            <PieChart className="w-8 h-8 text-green-600" />
            <div>
              <h1 className="text-3xl font-bold text-stone-800">Financial Transparency</h1>
              <p className="text-stone-600">Our commitment to accountability and responsible stewardship</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Overview Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="border-green-200">
              <CardHeader className="bg-green-50">
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <DollarSign className="w-5 h-5" />
                  Total Revenue 2023
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {formatCurrency(financialData.totalRevenue2023)}
                </div>
                <p className="text-sm text-stone-600">From donations, grants, and partnerships</p>
              </CardContent>
            </Card>

            <Card className="border-blue-200">
              <CardHeader className="bg-blue-50">
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <BarChart3 className="w-5 h-5" />
                  Program Expenses
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">{financialData.programPercentage}%</div>
                <p className="text-sm text-stone-600">Of total expenses go directly to programs</p>
              </CardContent>
            </Card>

            <Card className="border-purple-200">
              <CardHeader className="bg-purple-50">
                <CardTitle className="flex items-center gap-2 text-purple-800">
                  <TrendingUp className="w-5 h-5" />
                  Impact Growth
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">+32%</div>
                <p className="text-sm text-stone-600">Increase in beneficiaries reached in 2023</p>
              </CardContent>
            </Card>
          </div>

          {/* Financial Breakdown */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-6 h-6 text-green-600" />
                2023 Financial Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-4">Expense Distribution</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-green-500 rounded"></div>
                        <span>Program Services</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{financialData.programPercentage}%</div>
                        <div className="text-sm text-stone-600">{formatCurrency(financialData.programExpenses)}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-blue-500 rounded"></div>
                        <span>Administrative</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{financialData.adminPercentage}%</div>
                        <div className="text-sm text-stone-600">{formatCurrency(financialData.adminExpenses)}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-purple-500 rounded"></div>
                        <span>Fundraising</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{financialData.fundraisingPercentage}%</div>
                        <div className="text-sm text-stone-600">
                          {formatCurrency(financialData.fundraisingExpenses)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Program Impact Areas</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Education Programs</span>
                      <span className="font-semibold">35%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Water & Sanitation</span>
                      <span className="font-semibold">28%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Healthcare Initiatives</span>
                      <span className="font-semibold">20%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Community Development</span>
                      <span className="font-semibold">12%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Environmental Conservation</span>
                      <span className="font-semibold">5%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Accountability Standards */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
                Accountability Standards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Financial Management</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Annual independent financial audit</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Board oversight of financial decisions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Quarterly financial reporting</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Donor fund tracking and reporting</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Transparency Measures</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Public disclosure of financial statements</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Regular impact and outcome reporting</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Open access to organizational policies</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Stakeholder feedback mechanisms</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Documents */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-6 h-6 text-blue-600" />
                Financial Documents & Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h5 className="font-semibold">Annual Financial Report 2023</h5>
                      <p className="text-sm text-stone-600">Complete audited financial statements</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline">PDF</Badge>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h5 className="font-semibold">Q4 2023 Financial Summary</h5>
                      <p className="text-sm text-stone-600">Quarterly financial overview</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline">PDF</Badge>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h5 className="font-semibold">Independent Audit Report 2023</h5>
                      <p className="text-sm text-stone-600">External auditor's assessment</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline">PDF</Badge>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h5 className="font-semibold">Donor Impact Report 2023</h5>
                      <p className="text-sm text-stone-600">How donations created impact</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline">PDF</Badge>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h5 className="font-semibold">Budget Allocation 2024</h5>
                      <p className="text-sm text-stone-600">Planned expenditure for current year</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline">PDF</Badge>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h5 className="font-semibold">Governance Framework</h5>
                      <p className="text-sm text-stone-600">Organizational structure and policies</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline">PDF</Badge>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Donor Information */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-amber-600" />
                For Donors & Supporters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">How Your Donations Are Used</h4>
                  <p className="text-sm text-stone-600 mb-3">
                    We are committed to maximizing the impact of every donation. Here's how we ensure your contributions
                    make the greatest difference:
                  </p>
                  <ul className="space-y-1 text-sm">
                    <li>• Direct program implementation: 84.9%</li>
                    <li>• Essential administrative costs: 10.1%</li>
                    <li>• Fundraising and outreach: 5.0%</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Donation Tracking</h4>
                  <p className="text-sm text-stone-600 mb-3">
                    Every donation is tracked and reported. Major donors receive:
                  </p>
                  <ul className="space-y-1 text-sm">
                    <li>• Detailed impact reports</li>
                    <li>• Program visit opportunities</li>
                    <li>• Direct communication with beneficiaries</li>
                    <li>• Annual financial summaries</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-800">Financial Transparency Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-green-700">
                For questions about our finances, to request additional reports, or to discuss major giving
                opportunities:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-green-600" />
                    <div>
                      <p className="font-semibold text-green-800">Financial Inquiries:</p>
                      <a href="mailto:info@nadupaafricafoundation.org" className="text-green-700 hover:text-green-800">
                        info@nadupaafricafoundation.org
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-green-600" />
                    <div>
                      <p className="font-semibold text-green-800">Donor Support:</p>
                      <a href="mailto:info@nadupaafricafoundation.org" className="text-green-700 hover:text-green-800">
                        info@nadupaafricafoundation.org
                      </a>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-green-600" />
                    <div>
                      <p className="font-semibold text-green-800">Phone:</p>
                      <a href="tel:+254796093465" className="text-green-700 hover:text-green-800">
                        +254 796 093 465
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-green-600" />
                    <div>
                      <p className="font-semibold text-green-800">Office:</p>
                      <span className="text-green-700">Kajiado-West, Kajiado County, Kenya</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-green-200">
                <p className="text-sm text-green-600">
                  <strong>Last Updated:</strong> June 11, 2025 | <strong>Audit Period:</strong> January - December 2023
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Back to Top */}
          <div className="text-center mt-8">
            <Button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              variant="outline"
              className="border-green-200 text-green-700 hover:bg-green-50"
            >
              Back to Top
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
