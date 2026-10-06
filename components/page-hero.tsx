import Image from "next/image"
import type { Hero } from "@/lib/cms/common"

// Shared hero banner used across public pages so they all look alike.
export function PageHero({ hero, tall = false, children }: { hero: Hero; tall?: boolean; children?: React.ReactNode }) {
  const height = tall ? "min-h-[60vh] lg:min-h-[70vh] flex items-center justify-center" : ""
  return (
    <section className={`relative py-20 overflow-hidden ${height}`}>
      <div className="absolute inset-0 z-0">
        <Image src={hero.image || "/placeholder.svg"} alt={hero.imageAlt} fill className="object-cover object-center" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-emerald-700/60"></div>
      </div>
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">{hero.title}</h1>
        <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">{hero.subtitle}</p>
        {children}
      </div>
    </section>
  )
}

// Renders a textarea value with blank lines as paragraph breaks.
export function Paragraphs({ text, className }: { text: string; className?: string }) {
  return (
    <>
      {text
        .split(/\n\s*\n/)
        .filter((p) => p.trim())
        .map((p, i) => (
          <p key={i} className={className}>
            {p.trim()}
          </p>
        ))}
    </>
  )
}
