import Link from "next/link"
import Image from "next/image"
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Heart,
  Users,
  Droplets,
  GraduationCap,
} from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-stone-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image
                src="/images/nadupa-logo.png"
                alt="NADUPA AFRICA FOUNDATION Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <div>
                <h3 className="text-lg font-bold">NADUPA AFRICA FOUNDATION</h3>
                <p className="text-sm text-stone-400">Empowering Communities</p>
              </div>
            </div>
            <p className="text-stone-300 text-sm leading-relaxed">
              Dedicated to transforming lives and empowering communities across Kenya through sustainable development,
              education, healthcare, and environmental conservation initiatives.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/nadupaafricafoundation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-white transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/nadupafrica"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-white transition-colors"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/nadupaafricafoundation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-white transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/nadupa-africa-foundation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-white transition-colors"
                aria-label="Connect with us on LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-stone-300 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-stone-300 hover:text-white transition-colors text-sm">
                  Our Programs
                </Link>
              </li>
              <li>
                <Link href="/where-we-work" className="text-stone-300 hover:text-white transition-colors text-sm">
                  Where We Work
                </Link>
              </li>
              <li>
                <Link href="/get-involved" className="text-stone-300 hover:text-white transition-colors text-sm">
                  Get Involved
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-stone-300 hover:text-white transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Impact Areas</h4>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Droplets className="w-4 h-4 text-blue-400" />
                <span className="text-stone-300 text-sm">Water & Sanitation</span>
              </li>
              <li className="flex items-center space-x-2">
                <GraduationCap className="w-4 h-4 text-green-400" />
                <span className="text-stone-300 text-sm">Education</span>
              </li>
              <li className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-red-400" />
                <span className="text-stone-300 text-sm">Healthcare</span>
              </li>
              <li className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-purple-400" />
                <span className="text-stone-300 text-sm">Community Development</span>
              </li>
            </ul>
            <div className="mt-4">
              <Link
                href="/volunteer"
                className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
              >
                <Users className="w-4 h-4" />
                <span>Volunteer With Us</span>
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-stone-300 text-sm">
                    Kajiado-West, Kajiado County
                    <br />
                    Kenya
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <a href="tel:+254796093465" className="text-stone-300 hover:text-white transition-colors text-sm">
                  +254 796 093 465
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <a
                  href="mailto:info@nadupaafricafoundation.org"
                  className="text-stone-300 hover:text-white transition-colors text-sm"
                >
                  info@nadupaafricafoundation.org
                </a>
              </div>
            </div>

            <div className="mt-4 p-3 bg-stone-800 rounded-lg">
              <p className="text-xs text-stone-400 mb-1">NGO Registration:</p>
              <p className="text-sm font-mono text-emerald-400">NGO-6DF3EM</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-stone-400 text-sm">© 2024 NADUPA AFRICA FOUNDATION. All rights reserved.</p>
              <p className="text-stone-500 text-xs mt-1">Registered NGO in Kenya | Tax-exempt status pending</p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-xs">
              <Link href="/terms" className="text-stone-400 hover:text-white transition-colors">
                Terms & Conditions
              </Link>
              <Link href="/privacy" className="text-stone-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
