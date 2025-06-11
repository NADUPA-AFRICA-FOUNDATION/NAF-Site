import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"
import Image from "next/image"

export function Footer() {
  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/programs", label: "Programs" },
    { href: "/where-we-work", label: "Where We Work" },
    { href: "/get-involved", label: "Get Involved" },
    { href: "/volunteer", label: "Volunteer" },
    { href: "/resources", label: "Resources" },
    { href: "/donate", label: "Donate" },
    { href: "/contact", label: "Contact" },
  ]

  const programLinks = [
    { href: "/programs", label: "Community Training" },
    { href: "/programs", label: "Advocacy Services" },
    { href: "/programs", label: "Food Aid Distribution" },
    { href: "/programs", label: "Education Support" },
    { href: "/programs", label: "Equipment Support" },
  ]

  return (
    <footer className="bg-stone-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <div className="relative h-20 w-32 mb-4">
                <Image
                  src="/images/nadupa-logo-vertical.png"
                  alt="NADUPA Africa Foundation Logo"
                  fill
                  className="object-contain object-left"
                  style={{
                    filter: "brightness(0) invert(1)",
                  }}
                />
              </div>
            </div>
            <p className="text-stone-300 mb-4 max-w-md">
              A registered non-profit organization dedicated to promoting education, supporting vulnerable groups, and
              protecting the environment in Kenya.
            </p>
            <div className="text-sm text-stone-400">
              <p>Registration Number: NGO-6DF3EM</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 border-b border-stone-700 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-stone-300 hover:text-emerald-400 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

       {/* Contact Info */}
<div>
  <h3 className="font-semibold text-lg mb-4 border-b border-stone-700 pb-2">Contact Info</h3>
  <div className="space-y-3 text-stone-300">
    <div className="flex items-start gap-2">
      <MapPin className="w-4 h-4 mt-1 text-emerald-400" />
      <span className="text-sm">Kajiado-West, Kajiado County, Kenya</span>
    </div>
    <div className="flex items-center gap-2">
      <Mail className="w-4 h-4 text-emerald-400" />
      <span className="text-sm">info@nadupaafricafoundation.org</span>
    </div>
    <div className="flex items-center gap-2">
      <Phone className="w-4 h-4 text-emerald-400" />
      <span className="text-sm">+254 XXX XXX XXX</span>
    </div>
  </div>
</div>

        {/* Bottom Bar */}
        <div className="text-center">
          <p className="text-stone-400 text-sm">
            © {new Date().getFullYear()} NADUPA AFRICA FOUNDATION. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
