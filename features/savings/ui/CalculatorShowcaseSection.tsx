import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, Dot } from "lucide-react"
import Link from "next/link"

const SECTION_ONE_POINTS = [
  "Real-time projection tracking",
  "Compare providers in one place",
  "Transparent assumptions every time",
] as const

const SECTION_TWO_POINTS = [
  "Quick monthly contribution simulation",
  "Rate confidence and freshness labels",
  "Designed for first-time Filipino savers",
] as const

function FeaturePoint({ text }: { readonly text: string }) {
  return (
    <li className="flex items-center gap-2 text-black">
      <ChevronRight className="size-4 text-blue-600" aria-hidden="true" />
      <span>{text}</span>
    </li>
  )
}

function MockCardOne() {
  return (
    <div className="rounded-4xl bg-black/10 p-6" aria-hidden="true">
      <div className="rounded-3xl border border-black/10 bg-white p-4 shadow-sm">
        <div className="mb-8 flex items-center justify-between text-sm text-black/70">
          <span>Projected Savings</span>
          <span className="font-semibold">PesoWise</span>
        </div>
        <p className="text-sm text-black/60">12-month estimate</p>
        <p className="text-5xl font-semibold tracking-tight text-black">16,058.94</p>
      </div>

      <p className="py-4 text-center text-sm text-black/70">
        Better savings visibility
      </p>

      <div className="grid grid-cols-5 gap-3">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div
            key={`mini-${idx}`}
            className="flex h-11 items-center justify-center rounded-xl border border-black/10 bg-white text-black/70"
          >
            <Dot className="size-5" />
          </div>
        ))}
      </div>
    </div>
  )
}

function MockCardTwo() {
  return (
    <div className="relative h-full min-h-[320px]" aria-hidden="true">
      <Card className="absolute left-4 top-8 w-[58%] border border-black/10 bg-white py-0 shadow-lg">
        <CardContent className="space-y-2 p-4">
          <p className="text-xs text-black/60">Platforms compared</p>
          <p className="text-3xl font-semibold text-black">5 options</p>
          <div className="grid h-16 grid-cols-8 items-end gap-1">
            {[45, 72, 60, 88, 70, 75, 50, 82].map((height, idx) => (
              <div key={`bar-${idx}`} className="rounded-sm bg-blue-600" style={{ height: `${height}%` }} />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="absolute right-0 top-0 w-[64%] border border-blue-200 bg-white py-0 shadow-xl">
        <CardContent className="p-4">
          <p className="text-xs text-black/60">Interest earned</p>
          <p className="mt-4 text-center text-4xl font-semibold text-blue-700">₱8,240</p>
          <div className="mx-auto mt-5 h-28 w-28 rounded-full border-8 border-blue-100 border-t-blue-600" />
        </CardContent>
      </Card>

      <Card className="absolute bottom-0 left-12 w-[52%] border border-black/10 bg-white py-0 shadow-lg">
        <CardContent className="space-y-1 p-4">
          <p className="text-xs text-black/60">Rate freshness</p>
          <p className="text-4xl font-semibold text-black">Updated</p>
          <p className="text-xs text-emerald-600">Today</p>
        </CardContent>
      </Card>
    </div>
  )
}

export function CalculatorShowcaseSection() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <MockCardOne />

        <div className="space-y-6">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">The Problem</p>
            <p className="text-black/70">
              Filipino savers struggle to compare multiple platforms and understand which offers the best returns.
            </p>
          </div>

          <h2 className="font-heading text-5xl font-semibold leading-tight text-black">
            Streamline Savings With
            <br />
            Seamless Projections
          </h2>

          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600">Our Solution</p>
            <p className="max-w-lg text-xl leading-relaxed text-black/70 mb-4">
              Get instant, transparent projections across all platforms with clear assumptions—right in your browser.
            </p>
          </div>

          <ul className="space-y-3 text-lg">
            {SECTION_ONE_POINTS.map((point) => (
              <FeaturePoint key={point} text={point} />
            ))}
          </ul>

          <Button size="lg" className="rounded-xl px-8" asChild>
            <Link href="/calculator">Create Calculation</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">The Challenge</p>
            <p className="text-black/70">
              With constantly changing rates and multiple products, outdated information leads to poor savings decisions.
            </p>
          </div>

          <h2 className="font-heading text-5xl font-semibold leading-tight text-black">
            Plan Smarter With Fast,
            <br />
            Clear Savings Signals
          </h2>

          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600">What We Deliver</p>
            <p className="max-w-lg text-xl leading-relaxed text-black/70 mb-4">
              Real-time rate tracking with confidence labels, so every peso is allocated to the option that works best for you.
            </p>
          </div>

          <ul className="space-y-3 text-lg">
            {SECTION_TWO_POINTS.map((point) => (
              <FeaturePoint key={point} text={point} />
            ))}
          </ul>

          <Button size="lg" className="rounded-xl px-8" asChild>
            <Link href="/calculator">Open Calculator</Link>
          </Button>
        </div>

        <MockCardTwo />
      </div>
    </section>
  )
}
