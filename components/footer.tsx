import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Users } from "lucide-react"
import { getContent } from "@/lib/cms/content"
import { getIcon } from "@/lib/cms/icons"

const IMPACT_COLORS = ["text-blue-400", "text-green-400", "text-red-400", "text-purple-400", "text-amber-400"]

export async function Footer() {
  const s = await getContent("settings")
  const socials = [
    { href: s.social.facebook, icon: Facebook, label: "Follow us on Facebook" },
    { href: s.social.twitter, icon: Twitter, label: "Follow us on X / Twitter" },
    { href: s.social.instagram, icon: Instagram, label: "Follow us on Instagram" },
    { href: s.social.linkedin, icon: Linkedin, label: "Connect with us on LinkedIn" },
  ].filter((social) => social.href)

  return (
    <footer className="bg-stone-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image src="/images/nadupa-logo.png" alt={`${s.orgName} Logo`} width={40} height={40} className="rounded-lg" />
              <div>
                <h3 className="text-lg font-bold">{s.orgName}</h3>
                <p className="text-sm text-stone-400">{s.tagline}</p>
              </div>
            </div>
            <p className="text-stone-300 text-sm leading-relaxed">{s.about}</p>
            <div className="flex space-x-4">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-400 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { href: "/about", label: "About Us" },
                { href: "/programs", label: "Our Programs" },
                { href: "/where-we-work", label: "Where We Work" },
                { href: "/get-involved", label: "Get Involved" },
                { href: "/resources", label: "Resources" },
                { href: "/transparency", label: "Transparency" },
                { href: "/contact", label: "Contact Us" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-stone-300 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Impact areas */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Impact Areas</h4>
            <ul className="space-y-2">
              {s.impactAreas.map((area, i) => {
                const Icon = getIcon(area.icon)
                return (
                  <li key={i} className="flex items-center space-x-2">
                    <Icon className={`w-4 h-4 ${IMPACT_COLORS[i % IMPACT_COLORS.length]}`} />
                    <span className="text-stone-300 text-sm">{area.label}</span>
                  </li>
                )
              })}
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
                <p className="text-stone-300 text-sm">
                  {s.addressLine1}
                  <br />
                  {s.addressLine2}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <a href={`tel:${s.phone.replace(/[^\d+]/g, "")}`} className="text-stone-300 hover:text-white transition-colors text-sm">
                  {s.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <a href={`mailto:${s.email}`} className="text-stone-300 hover:text-white transition-colors text-sm">
                  {s.email}
                </a>
              </div>
            </div>

            {s.registrationNumber && (
              <div className="mt-4 p-3 bg-stone-800 rounded-lg">
                <p className="text-xs text-stone-400 mb-1">Registration No.:</p>
                <p className="text-sm font-mono text-emerald-400">{s.registrationNumber}</p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-stone-400 text-sm">
                © {new Date().getFullYear()} {s.orgName}. {s.copyright}
              </p>
              <p className="text-stone-500 text-xs mt-1">{s.taxStatus}</p>
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
