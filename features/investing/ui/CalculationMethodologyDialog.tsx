'use client'

/**
 * Calculation Methodology Dialog
 *
 * Educational dialog explaining how investment projections are calculated.
 * Shows 5 screens with information about rates, formulas, strategies, and disclaimers.
 * Accessed via "How It's Calculated?" button for transparency.
 */

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

interface CalculationMethodologyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const SCREENS = [
  {
    id: 'intro',
    title: 'How This Calculator Works',
    content: (
      <div className="space-y-4">
        <p className="text-gray-700">
          This investment projection tool helps you understand how your savings can grow over time through different investment strategies.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
          <p className="font-semibold text-blue-900">What You Input:</p>
          <ul className="text-sm text-blue-800 space-y-1 ml-4">
            <li>• Initial investment amount</li>
            <li>• Monthly contributions (optional)</li>
            <li>• Time horizon (1-20 years)</li>
            <li>• Investment scenario (Conservative, Moderate, or Growth)</li>
          </ul>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-2">
          <p className="font-semibold text-green-900">What It Calculates:</p>
          <ul className="text-sm text-green-800 space-y-1 ml-4">
            <li>• Total portfolio value at end of period</li>
            <li>• Gains from investment returns</li>
            <li>• Impact of inflation on purchasing power</li>
            <li>• Comparison across all three scenarios</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 'rates',
    title: 'Investment Rates & Ranges',
    content: (
      <div className="space-y-4">
        <p className="text-gray-700 text-sm">
          Our rates are based on historical Philippine Stock Exchange (PSEi) performance and realistic portfolio allocations. We use ranges to reflect market variability.
        </p>

        <div className="space-y-3">
          {/* Conservative */}
          <div className="border border-gray-200 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900">Conservative</h4>
              <span className="text-sm font-bold text-blue-600">4% APY</span>
            </div>
            <p className="text-xs text-gray-600 mb-1">Historical Range: 3–5%</p>
            <p className="text-xs text-gray-700">
              Bonds + stable dividends. Lower volatility, suitable for capital preservation.
            </p>
          </div>

          {/* Moderate */}
          <div className="border border-gray-200 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900">Moderate</h4>
              <span className="text-sm font-bold text-orange-600">6% APY</span>
            </div>
            <p className="text-xs text-gray-600 mb-1">Historical Range: 5–7%</p>
            <p className="text-xs text-gray-700">
              Diversified mix of stocks + bonds. Balanced growth and stability.
            </p>
          </div>

          {/* Growth */}
          <div className="border border-gray-200 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900">Growth</h4>
              <span className="text-sm font-bold text-red-600">8% APY</span>
            </div>
            <p className="text-xs text-gray-600 mb-1">Historical Range: 7–9%</p>
            <p className="text-xs text-gray-700">
              Equity-focused portfolio. Higher volatility, potential for stronger returns.
            </p>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded p-2">
          <p className="text-xs text-yellow-800">
            <strong>Note:</strong> Ranges represent typical historical performance. Actual returns vary by year and market conditions.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'formula',
    title: 'Calculation Formula',
    content: (
      <div className="space-y-4">
        <p className="text-gray-700 text-sm">
          We use monthly compounding to reflect how investments typically grow throughout the year.
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 space-y-2">
          <p className="font-mono text-xs font-semibold text-gray-900">
            Each Month:
          </p>
          <p className="font-mono text-xs text-gray-700">
            balance = (balance + contribution) × (1 + monthlyRate)
          </p>
          <p className="text-xs text-gray-600 mt-2">
            Where monthlyRate = AnnualRate ÷ 12
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-gray-900">Example (Moderate, 6% APY):</h4>
          <div className="text-xs space-y-1 text-gray-700 ml-3">
            <p>• Monthly rate: 6% ÷ 12 = 0.5%</p>
            <p>• Month 1: (₱100,000 + ₱500 contribution) × 1.005 = ₱100,505</p>
            <p>• Month 2: (₱100,505 + ₱500) × 1.005 = ₱101,015</p>
            <p>• ... repeats for each month in your timeline</p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded p-2">
          <p className="text-xs text-blue-800">
            <strong>Inflation Adjustment:</strong> We subtract estimated inflation (3% annually, BSP target) from gains to show real purchasing power value.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'scenarios',
    title: 'Understanding the Scenarios',
    content: (
      <div className="space-y-4">
        <p className="text-gray-700 text-sm">
          Different investment strategies suit different goals and risk tolerances. This calculator shows all three so you can compare.
        </p>

        <div className="space-y-3">
          {/* Conservative */}
          <div className="border-l-4 border-blue-500 bg-blue-50 p-3 rounded">
            <h4 className="font-semibold text-blue-900">Conservative (Low Risk)</h4>
            <p className="text-xs text-blue-800 mt-1">
              <strong>Who:</strong> Investors nearing retirement or prioritizing safety
            </p>
            <p className="text-xs text-blue-800">
              <strong>Portfolio:</strong> Government bonds, high-dividend stocks, savings accounts
            </p>
            <p className="text-xs text-blue-800">
              <strong>Volatility:</strong> Minimal; steady, predictable growth
            </p>
          </div>

          {/* Moderate */}
          <div className="border-l-4 border-orange-500 bg-orange-50 p-3 rounded">
            <h4 className="font-semibold text-orange-900">Moderate (Medium Risk)</h4>
            <p className="text-xs text-orange-800 mt-1">
              <strong>Who:</strong> Mid-career professionals with 10+ year horizon
            </p>
            <p className="text-xs text-orange-800">
              <strong>Portfolio:</strong> Mix of stocks (50-60%) and bonds (40-50%)
            </p>
            <p className="text-xs text-orange-800">
              <strong>Volatility:</strong> Moderate; balanced growth vs. stability
            </p>
          </div>

          {/* Growth */}
          <div className="border-l-4 border-red-500 bg-red-50 p-3 rounded">
            <h4 className="font-semibold text-red-900">Growth (Higher Risk)</h4>
            <p className="text-xs text-red-800 mt-1">
              <strong>Who:</strong> Young investors with 20+ year timeline
            </p>
            <p className="text-xs text-red-800">
              <strong>Portfolio:</strong> Mostly stocks (70-80%), emerging markets, growth sectors
            </p>
            <p className="text-xs text-red-800">
              <strong>Volatility:</strong> High; significant ups/downs, higher potential returns
            </p>
          </div>
        </div>

        <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
          <strong>Key:</strong> Higher risk = more potential for growth, but also deeper temporary losses. Choose based on your timeline and comfort level.
        </p>
      </div>
    ),
  },
  {
    id: 'disclaimers',
    title: 'Disclaimers & Sources',
    content: (
      <div className="space-y-3">
        <div className="bg-red-50 border border-red-300 rounded-lg p-3">
          <p className="text-xs font-semibold text-red-900 mb-2">⚠ Not Guaranteed</p>
          <p className="text-xs text-red-800">
            Projections are estimates based on historical assumptions. Actual returns may differ significantly. Markets fluctuate; past performance does not guarantee future results.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-300 rounded-lg p-3">
          <p className="text-xs font-semibold text-blue-900 mb-2">📚 Sources</p>
          <ul className="text-xs text-blue-800 space-y-1 ml-3">
            <li>• Philippine Stock Exchange (PSEi) historical data</li>
            <li>• Philippine Central Bank (BSP) inflation target: 3%</li>
            <li>• Bond yields and dividend data from market research</li>
            <li>• Conservative/Moderate/Growth allocations from financial best practices</li>
          </ul>
        </div>

        <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3">
          <p className="text-xs font-semibold text-yellow-900 mb-2">💡 Educational Use Only</p>
          <p className="text-xs text-yellow-800">
            This tool is for planning and education purposes. For investment advice tailored to your situation, consult a licensed financial advisor.
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-300 rounded-lg p-3">
          <p className="text-xs font-semibold text-gray-900 mb-2">🎯 How to Use These Numbers</p>
          <ul className="text-xs text-gray-700 space-y-1 ml-3">
            <li>• Use projections to set realistic saving goals</li>
            <li>• Compare scenarios to understand risk trade-offs</li>
            <li>• Adjust contributions or timeline to see impact</li>
            <li>• Always assume actual results may differ</li>
          </ul>
        </div>
      </div>
    ),
  },
]

export function CalculationMethodologyDialog({
  open,
  onOpenChange,
}: CalculationMethodologyDialogProps) {
  const [currentScreen, setCurrentScreen] = useState(0)

  const screen = SCREENS[currentScreen]
  const isFirst = currentScreen === 0
  const isLast = currentScreen === SCREENS.length - 1

  const handleNext = () => {
    if (!isLast) setCurrentScreen(currentScreen + 1)
  }

  const handlePrevious = () => {
    if (!isFirst) setCurrentScreen(currentScreen - 1)
  }

  return (
    <>
      {/* Backdrop & Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900">
                  {screen.title}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Understanding how your investment projections are calculated
                </p>
              </div>
              <button
                onClick={() => onOpenChange(false)}
                className="ml-4 p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {screen.content}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-4 flex items-center justify-between bg-gray-50">
              <div className="text-sm text-gray-600">
                Screen {currentScreen + 1} of {SCREENS.length}
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevious}
                  disabled={isFirst}
                  className="gap-1"
                >
                  <ChevronLeft size={16} />
                  Previous
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={isLast}
                  size="sm"
                  className="gap-1"
                >
                  Next
                  <ChevronRight size={16} />
                </Button>

               
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
