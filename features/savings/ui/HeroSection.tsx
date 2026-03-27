import { Button } from "@/components/ui/button"
import Link from "next/link"
import { HeroVisual } from "@/features/savings/ui/HeroVisual"
import { HeroFeatureIndicators } from "@/features/savings/ui/HeroFeatureIndicators"

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-8 lg:py-16">
        <div className="space-y-6 sm:space-y-8">
          {/* Feature Indicators */}
          <div>
            <HeroFeatureIndicators />
          </div>

          {/* Headline */}
          <h1 className="font-heading text-3xl font-semibold leading-tight tracking-tight text-black sm:text-4xl md:text-5xl lg:text-6xl">
            Save Intelligently,
            <br />
            Invest Wisely,
            <br />
            Learn Continuously
          </h1>

          {/* Paragraphs */}
          <div className="space-y-3 sm:space-y-4">
            <p className="max-w-lg text-base leading-relaxed text-black/70 sm:text-base">
              Your all-in-one view for comparing PH savings products. Estimate growth, check verified rates,
              and make informed money decisions with clarity.
            </p>
            <p className="max-w-lg text-base leading-relaxed text-black/70 sm:text-base">
              Explore investment strategies personalized to your goals. Learn investment fundamentals from our education center.
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:gap-3">
            <Button size="lg" className="rounded-xl px-6 py-3 h-12 text-base sm:px-7 w-full sm:w-auto" asChild>
              <Link href="/calculator">Compare & Calculate</Link>
            </Button>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="mt-8 sm:mt-10 lg:mt-0">
          <HeroVisual />
        </div>
      </div>
    </section>
  )
}
