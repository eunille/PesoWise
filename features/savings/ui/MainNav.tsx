import Link from "next/link"
import Image from "next/image"

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
      <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center justify-center"
          aria-label="PesoWise Home"
        >
          <Image
            src="/images/pesowise.svg"
            alt="PesoWise"
            width={70}
            height={70}
            className="w-auto h-48"
          />
        </Link>

        <ul className="mx-2 flex flex-1 items-center justify-center gap-3 overflow-x-auto px-2 sm:mx-4 sm:gap-6 lg:gap-8">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm text-black/80 transition-colors hover:text-black"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
