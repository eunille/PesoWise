const PARTNERS = ["GoTyme", "Maya", "GSave/CIMB", "MariBank", "PDIC"] as const

export function PartnerStrip() {
  return (
    <section id="platforms" className="border-y border-blue-100 bg-white">
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-y-6 px-4 py-8 sm:grid-cols-3 sm:px-6 lg:grid-cols-5 lg:px-8">
        {PARTNERS.map((partner) => (
          <li
            key={partner}
            className="text-center text-2xl font-semibold tracking-tight text-muted-foreground/80"
          >
            {partner}
          </li>
        ))}
      </ul>
    </section>
  )
}
