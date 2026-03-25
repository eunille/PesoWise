'use client';

import { useEffect, useState } from 'react';
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { CalculatorShell } from "@/features/savings/ui/CalculatorShell"
import { ComparisonShell } from "@/features/savings/ui/ComparisonShell"
import { GrowthChart } from "@/features/savings/ui/GrowthChart"
import { CalculatorProvider } from "@/hooks/useCalculatorState.tsx"
import { InvestmentProvider } from "@/hooks/useInvestmentState"
import { InvestingCalculator } from "@/features/investing/ui/InvestingCalculator"
import { GoalBasedCalculator, type GoalBasedCalculationResult } from "@/features/investing/ui/GoalBasedCalculator"
import { GoalBasedResults } from "@/features/investing/ui/GoalBasedResults"
import { InvestingGrowthChart } from "@/features/investing/ui/InvestingGrowthChart"
import { InvestmentScenarioComparison } from "@/features/investing/ui/InvestmentScenarioComparison"
import { SavingsVsInvestingComparison } from "@/features/investing/ui/SavingsVsInvestingComparison"
import { InvestmentRecommendation } from "@/features/investing/ui/InvestmentRecommendation"
import { EducationalCards } from "@/features/investing/ui/EducationalCards"
import { getSavingsLandingContent } from "@/features/savings/application/getSavingsLandingContent"

type TabType = 'savings' | 'investing' | 'education';
type CalculatorMode = 'projection' | 'goalBased';

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
        <main className="min-h-svh bg-white px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-7xl">
            {/* Header */}
            <div className="mb-10 flex items-start justify-between gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium uppercase tracking-wide text-black/70">PesoWise Calculator</p>
                <h1 className="text-4xl font-semibold tracking-tight text-black">
                  {activeTab === 'savings'
                    ? 'Savings Projection'
                    : activeTab === 'investing'
                      ? 'Investment Growth'
                      : 'Investment Education'} Simulator
                </h1>
                <p className="text-base text-black/70">
                  {activeTab === 'savings'
                    ? 'Enter your values and compare estimated outcomes across supported platforms.'
                    : activeTab === 'investing'
                      ? 'Project your investment growth across different scenarios.'
                      : 'Learn key investing concepts before making financial decisions.'}
                </p>
              </div>

              <Button variant="outline" asChild>
                <Link href="/">Back Home</Link>
              </Button>
            </div>

            {/* Tab Navigation */}
            <div className="mb-8 flex gap-4 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('savings')}
                className={`px-4 py-3 font-medium transition-colors ${
                  activeTab === 'savings'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Savings
              </button>
              <button
                onClick={() => setActiveTab('investing')}
                className={`px-4 py-3 font-medium transition-colors ${
                  activeTab === 'investing'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Investing
              </button>
              <button
                onClick={() => setActiveTab('education')}
                className={`px-4 py-3 font-medium transition-colors ${
                  activeTab === 'education'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Education
              </button>
            </div>

            {/* Savings Tab */}
            {activeTab === 'savings' && (
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
            )}

            {/* Investing Tab */}
            {activeTab === 'investing' && (
              <div className="grid gap-8 lg:grid-cols-3">
                {/* Left column: Mode selector + Calculator forms + Disclaimer */}
                <div className="lg:col-span-1 space-y-4">
                  {/* Mode Selector */}
                  <div className="flex gap-4 border-b border-gray-200">
                    <button
                      onClick={() => setCalculatorMode('projection')}
                      className={`px-4 py-3 font-medium transition-colors ${
                        calculatorMode === 'projection'
                          ? 'border-b-2 border-blue-600 text-blue-600'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Investment Projection
                    </button>
                    <button
                      onClick={() => setCalculatorMode('goalBased')}
                      className={`px-4 py-3 font-medium transition-colors ${
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
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-black/70">Disclaimer</h3>
                    <p className="text-xs text-black/60 leading-relaxed">
                      Projections are estimates based on historical assumptions and are not 
                      guaranteed. Actual investment returns may vary. This tool is for educational 
                      and planning purposes only. Consult a financial advisor before investing.
                    </p>
                  </div>
                </div>

                {/* Right column: Results based on mode */}
                <div className="lg:col-span-2 space-y-8">
                  {calculatorMode === 'projection' && (
                    <>
                      <InvestingGrowthChart />
                      <InvestmentScenarioComparison />
                      <SavingsVsInvestingComparison />
                      <InvestmentRecommendation />
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
              </div>
            )}

            {/* Education Tab */}
            {activeTab === 'education' && (
              <div className="mx-auto max-w-4xl">
                <EducationalCards />
              </div>
            )}
          </div>
        </main>
      </InvestmentProvider>
    </CalculatorProvider>
  )
}
