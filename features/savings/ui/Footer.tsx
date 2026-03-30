import Link from 'next/link'

const FOOTER_SECTIONS = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Contact Us', href: 'mailto:hello@pesowise.ph' },
      { label: 'Resources', href: '#' },
    ],
  },
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#how-it-works' },
      { label: 'Pricing', href: '#' },
      { label: 'How it Works', href: '#how-it-works' },
      { label: 'Security', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
    ],
  },
] as const

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Footer content grid */}
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">PesoWise</h3>
            <p className="text-sm leading-relaxed text-slate-400">
              Empower your financial decisions with transparent savings comparisons built for Filipinos.
            </p>
          </div>

          {/* Footer sections */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-slate-700" />

        {/* Copyright */}
        <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-slate-400 sm:flex-row sm:text-left">
          <p>&copy; 2026 PesoWise. All rights reserved. Built by Catalyx Solutions.</p>
          <div className="flex gap-6">
            <span>English (PH)</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
