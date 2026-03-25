import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { HeroVisual } from "@/features/savings/ui/HeroVisual"

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-10 pt-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-8 lg:px-8">
        <div className="space-y-6">
          <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs uppercase tracking-wide">
            Financial comparison platform
          </Badge>

          <h1 className="font-heading text-4xl font-semibold tracking-tight text-black sm:text-6xl">
            Save Intelligently,
            <br />
            Grow Independently
          </h1>

          <p className="max-w-lg text-base leading-relaxed text-black/70">
            Your all-in-one view for comparing PH savings products. Estimate growth, check verified rates,
            and make informed money decisions with clarity.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button size="lg" className="rounded-xl px-7" asChild>
              <Link href="/calculator">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-xl px-7" asChild>
              <Link href="#how-it-works">See Details</Link>
            </Button>
          </div>
        </div>

        <HeroVisual />
      </div>
    </section>
  )
}
