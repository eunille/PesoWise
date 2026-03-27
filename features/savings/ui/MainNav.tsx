import Link from "next/link"
import Image from "next/image"
import { MobileNav } from "@/components/MobileNav"

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#platforms", label: "Platforms" },
  { href: "/calculator", label: "Calculator" },
  { href: "/education", label: "Education" },
] as const

export function MainNav() {
  return (
    <header className="w-full">
      <nav className="mx-auto flex h-16 sm:h-18 md:h-20 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center justify-center flex-shrink-0"
          aria-label="PesoWise Home"
        >
          <Image
            src="/images/pesowise.svg"
            alt="PesoWise"
            width={70}
            height={70}
            className="w-32 h-32 sm:w-14 sm:h-14 md:w-44 md:h-44 object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center justify-center gap-6 lg:gap-8 flex-1 mx-4">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm text-black/80 transition-colors hover:text-black font-medium"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <MobileNav />
        </div>
      </nav>
    </header>
  )
}
