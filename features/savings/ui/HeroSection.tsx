import { Button } from "@/components/ui/button"
import Link from "next/link"
import { HeroVisual } from "@/features/savings/ui/HeroVisual"
import { HeroFeatureIndicators } from "@/features/savings/ui/HeroFeatureIndicators"

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-10 pt-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-8 lg:px-8">
        <div className="space-y-6">
          {/* Feature Indicators */}
          <div>
            <HeroFeatureIndicators />
          </div>

          {/* Headline */}
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-black sm:text-6xl">
            Save Intelligently,
            <br />
            Invest Wisely,
            <br />
            Learn Continuously
          </h1>

          {/* Paragraphs */}
          <div className="space-y-3">
            <p className="max-w-lg text-base leading-relaxed text-black/70">
              Your all-in-one view for comparing PH savings products. Estimate growth, check verified rates,
              and make informed money decisions with clarity.
            </p>
            <p className="max-w-lg text-base leading-relaxed text-black/70">
              Explore investment strategies personalized to your goals. Learn investment fundamentals from our education center.
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button size="lg" className="rounded-xl px-7" asChild>
              <Link href="/calculator">Compare & Calculate</Link>
            </Button>
          </div>
        </div>

        {/* Hero Visual */}
        <div>
          <HeroVisual />
        </div>
      </div>
    </section>
  )
}
