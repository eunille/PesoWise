import Link from "next/link"

const NAV_ITEMS = [
  { href: "#home", label: "Home" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#platforms", label: "Platforms" },
  { href: "/calculator", label: "Calculator" },
  { href: "/education", label: "Education" },
] as const

export function MainNav() {
  return (
    <header className="w-full">
      <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="#home"
          className="flex size-10 items-center justify-center rounded-full border border-border bg-card text-sm font-semibold uppercase tracking-wider text-black"
          aria-label="PesoWise Home"
        >
          pw
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
