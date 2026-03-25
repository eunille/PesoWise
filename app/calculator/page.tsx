import Link from "next/link"

import { Button } from "@/components/ui/button"
import { CalculatorShell } from "@/features/savings/ui/CalculatorShell"
import { ComparisonShell } from "@/features/savings/ui/ComparisonShell"
import { GrowthChart } from "@/features/savings/ui/GrowthChart"
import { CalculatorProvider } from "@/hooks/useCalculatorState.tsx"
import { getSavingsLandingContent } from "@/features/savings/application/getSavingsLandingContent"

export default function CalculatorPage() {
  const content = getSavingsLandingContent()

  return (
    <CalculatorProvider>
      <main className="min-h-svh bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        {/* Header spanning full width */}
        <div className="mb-10 flex items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium uppercase tracking-wide text-black/70">PesoWise Calculator</p>
            <h1 className="text-4xl font-semibold tracking-tight text-black">Savings Projection Calculator</h1>
            <p className="text-base text-black/70">
              Enter your values and compare estimated outcomes across supported platforms.
            </p>
          </div>

          <Button variant="outline" asChild>
            <Link href="/">Back Home</Link>
          </Button>
        </div>

        {/* Grid layout: Left (form) and Right (results) */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left column: Calculator form + Disclaimer */}
          <div className="lg:col-span-1 space-y-4">
            <CalculatorShell />
            
            {/* Disclaimer */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-black/70">Disclaimer</h3>
              <p className="text-xs text-black/60 leading-relaxed">
                This calculator is for informational purposes only and not financial advice. 
                Rates and terms may vary by institution. Please verify directly with the 
                financial institution before making investment decisions.
              </p>
            </div>
          </div>

          {/* Right column: Comparison results */}
          <div className="lg:col-span-2 space-y-8">
            <GrowthChart />
            <ComparisonShell platformNames={content.platformPlaceholders} />
          </div>
        </div>
      </div>
    </main>
    </CalculatorProvider>
  )
}
