'use client';

import { useEffect, useState } from 'react';
import Link from "next/link"
import { ChevronDown } from 'lucide-react';

import { Button } from "@/components/ui/button"
import { CalculatorShell } from "@/features/savings/ui/CalculatorShell"
import { ComparisonShell } from "@/features/savings/ui/ComparisonShell"
import { BankSelector } from "@/features/savings/ui/BankSelector"
import { GrowthChart } from "@/features/savings/ui/GrowthChart"
import { CalculatorProvider } from "@/hooks/useCalculatorState.tsx"
import { InvestmentProvider, useInvestmentState } from "@/hooks/useInvestmentState"
import { InvestingCalculator } from "@/features/investing/ui/InvestingCalculator"
import { GoalBasedCalculator, type GoalBasedCalculationResult } from "@/features/investing/ui/GoalBasedCalculator"
import { GoalBasedResults } from "@/features/investing/ui/GoalBasedResults"
import { InvestingGrowthChart } from "@/features/investing/ui/InvestingGrowthChart"
import { InvestmentScenarioComparison } from "@/features/investing/ui/InvestmentScenarioComparison"
import { SavingsVsInvestingComparison } from "@/features/investing/ui/SavingsVsInvestingComparison"
import { InvestmentRecommendation } from "@/features/investing/ui/InvestmentRecommendation"
import { getSavingsLandingContent } from "@/features/savings/application/getSavingsLandingContent"

type TabType = 'savings' | 'investing';
type CalculatorMode = 'projection' | 'goalBased';

/**
 * Inner component to access investment context state
 */
function InvestmentResultsSection({
  calculatorMode,
  goalBasedResult,
}: {
  calculatorMode: CalculatorMode;
  goalBasedResult: GoalBasedCalculationResult | null;
}) {
  const { allProjections } = useInvestmentState();
  const [openSections, setOpenSections] = useState({
    strategy: false,
    recommendation: false,
  });

  const hasProjections = allProjections !== null;

  const toggleSection = (section: 'strategy' | 'recommendation') => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="lg:col-span-2 space-y-8">
      {calculatorMode === 'projection' && (
        <>
          <InvestingGrowthChart />
          <InvestmentScenarioComparison />

          {/* Collapsible sections - only show when data exists */}
          {hasProjections && (
            <>
              {/* Strategy Comparison - Minimalist Trigger */}
              <div className="space-y-3">
                <button
                  onClick={() => toggleSection('strategy')}
                  className="flex w-full items-center gap-2 py-2 text-left hover:text-blue-600 transition-colors group"
                >
                  <ChevronDown
                    size={18}
                    className={`text-gray-600 transition-transform duration-200 ${
                      openSections.strategy ? 'rotate-180' : ''
                    }`}
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600">
                      Strategy Comparison
                    </h3>
                    <p className="text-xs text-gray-600">
                      Compare savings vs investing growth
                    </p>
                  </div>
                </button>
                {openSections.strategy && (
                  <div className="pt-2">
                    <SavingsVsInvestingComparison />
                  </div>
                )}
              </div>

              {/* Investment Recommendation - Minimalist Trigger */}
              <div className="space-y-3">
                <button
                  onClick={() => toggleSection('recommendation')}
                  className="flex w-full items-center gap-2 py-2 text-left hover:text-blue-600 transition-colors group"
                >
                  <ChevronDown
                    size={18}
                    className={`text-gray-600 transition-transform duration-200 ${
                      openSections.recommendation ? 'rotate-180' : ''
                    }`}
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600">
                      Investment Recommendation
                    </h3>
                    <p className="text-xs text-gray-600">
                      Personalized insights based on your inputs
                    </p>
                  </div>
                </button>
                {openSections.recommendation && (
                  <div className="pt-2">
                    <InvestmentRecommendation />
                  </div>
                )}
              </div>
            </>
          )}
        </>
      )}

      {calculatorMode === 'goalBased' && goalBasedResult && (
        <GoalBasedResults
          targetAmount={goalBasedResult.targetAmount}
          durationMonths={goalBasedResult.durationMonths}
          annualReturnRate={goalBasedResult.annualReturnRate}
          options={goalBasedResult.options}
        />
      )}
    </div>
  );
}

export default function CalculatorPage() {
  const content = getSavingsLandingContent()
  const [activeTab, setActiveTab] = useState<TabType>('savings')
  const [calculatorMode, setCalculatorMode] = useState<CalculatorMode>('projection')
  const [goalBasedResult, setGoalBasedResult] = useState<GoalBasedCalculationResult | null>(null)

  useEffect(() => {
    if (activeTab !== 'investing' || calculatorMode !== 'goalBased') {
      setGoalBasedResult(null)
    }
  }, [activeTab, calculatorMode])

  return (
    <CalculatorProvider>
      <InvestmentProvider>
        <main className="min-h-svh bg-white px-4 py-6 sm:py-8 md:py-10 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-7xl">
            {/* Header */}
            <div className="mb-6 sm:mb-8 md:mb-10 flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4">
              <div className="space-y-1 sm:space-y-2">
                <p className="text-xs sm:text-sm font-medium uppercase tracking-wide text-black/70">PesoWise Calculator</p>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-black">
                  {activeTab === 'savings'
                    ? 'Platform Comparison'
                    : 'Investment Projection'}
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-black/70">
                  {activeTab === 'savings'
                    ? 'Enter your values and compare estimated outcomes across supported platforms.'
                    : 'Project your investment growth across different scenarios.'}
                </p>
              </div>

              <Button variant="ghost" asChild className="h-10 sm:h-12 text-sm sm:text-base w-full sm:w-auto hover:bg-transparent">
                <Link href="/">Back Home</Link>
              </Button>
            </div>

            {/* Tab Navigation */}
            <div className="mb-6 sm:mb-8 flex gap-2 sm:gap-4 border-b border-gray-200 overflow-x-auto">
              <button
                onClick={() => setActiveTab('savings')}
                className={`px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-medium transition-colors whitespace-nowrap ${
                  activeTab === 'savings'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Savings
              </button>
              <button
                onClick={() => setActiveTab('investing')}
                className={`px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-medium transition-colors whitespace-nowrap ${
                  activeTab === 'investing'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Investing
              </button>
            </div>

            {/* Savings Tab */}
            {activeTab === 'savings' && (
              <div className="grid gap-6 sm:gap-8 md:gap-8 lg:grid-cols-3">
                {/* Left column: Calculator form + Disclaimer */}
                <div className="lg:col-span-1 space-y-3 sm:space-y-4">
                  <CalculatorShell />
                  
                  {/* Disclaimer */}
                  <div className="space-y-2 px-3 sm:px-4 py-3 sm:py-4 rounded-lg bg-gray-50">
                    <h3 className="text-xs sm:text-sm font-semibold text-black/70">Disclaimer</h3>
                    <p className="text-xs text-black/60 leading-relaxed">
                      This calculator is for informational purposes only and not financial advice. 
                      Rates and terms may vary by institution. Please verify directly with the 
                      financial institution before making investment decisions.
                    </p>
                  </div>
                </div>

                {/* Right column: Comparison results */}
                <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                  <GrowthChart />
                  <div className="space-y-4 sm:space-y-6">
                    <BankSelector />
                    <ComparisonShell platformNames={content.platformPlaceholders} />
                  </div>
                </div>
              </div>
            )}

            {/* Investing Tab */}
            {activeTab === 'investing' && (
              <div className="grid gap-6 sm:gap-8 md:gap-8 lg:grid-cols-3">
                {/* Left column: Mode selector + Calculator forms + Disclaimer */}
                <div className="lg:col-span-1 space-y-3 sm:space-y-4">
                  {/* Mode Selector */}
                  <div className="flex gap-2 sm:gap-4 border-b border-gray-200 overflow-x-auto">
                    <button
                      onClick={() => setCalculatorMode('projection')}
                      className={`px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                        calculatorMode === 'projection'
                          ? 'border-b-2 border-blue-600 text-blue-600'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Investment Projection
                    </button>
                    <button
                      onClick={() => setCalculatorMode('goalBased')}
                      className={`px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                        calculatorMode === 'goalBased'
                          ? 'border-b-2 border-blue-600 text-blue-600'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Goal-Based
                    </button>
                  </div>

                  {/* Calculator Forms */}
                  {calculatorMode === 'projection' && <InvestingCalculator />}
                  {calculatorMode === 'goalBased' && (
                    <GoalBasedCalculator onCalculated={setGoalBasedResult} />
                  )}
                  
                  {/* Disclaimer */}
                  <div className="space-y-2 px-3 sm:px-4 py-3 sm:py-4 rounded-lg bg-gray-50">
                    <h3 className="text-xs sm:text-sm font-semibold text-black/70">Disclaimer</h3>
                    <p className="text-xs text-black/60 leading-relaxed">
                      Projections are estimates based on historical assumptions and are not 
                      guaranteed. Actual investment returns may vary. This tool is for educational 
                      and planning purposes only. Consult a financial advisor before investing.
                    </p>
                  </div>
                </div>

                {/* Right column: Results based on mode */}
                <InvestmentResultsSection
                  calculatorMode={calculatorMode}
                  goalBasedResult={goalBasedResult}
                />
              </div>
            )}

          </div>
        </main>
      </InvestmentProvider>
    </CalculatorProvider>
  )
}
