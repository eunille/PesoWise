'use client';

/**
 * Savings vs Investing Comparison
 *
 * Compares the same investment inputs under two strategies:
 * 1. Savings: Using a bank's savings rate (GoTyme 3.5%)
 * 2. Investing: Using the selected investment scenario
 *
 * Shows side-by-side final balances and concise insights with minimal information overload.
 */

import { useState } from 'react'
import { TrendingUp, ChevronDown } from 'lucide-react'
import { useInvestmentState } from '@/hooks/useInvestmentState'
import { INVESTMENT_SCENARIOS } from '@/domain/investmentRates'
import { getPlatformById } from '@/domain/platformRates'

function calculateSavingsBaseline(
  initialAmount: number,
  durationMonths: number,
  baseAPY: number,
  monthlyTopup: number
): { finalBalance: number; totalInterestEarned: number } {
  const monthlyRate = baseAPY / 12
  let balance = Math.max(0, initialAmount)
  let interestEarned = 0

  for (let month = 1; month <= durationMonths; month++) {
    balance += Math.max(0, monthlyTopup)
    const monthlyInterest = balance * monthlyRate
    balance += monthlyInterest
    interestEarned += monthlyInterest
  }

  return {
    finalBalance: balance,
    totalInterestEarned: interestEarned,
  }
}

export function SavingsVsInvestingComparison() {
  const { initialAmount, monthlyContribution, durationMonths, selectedScenario, allProjections } =
    useInvestmentState()
  const [showDetails, setShowDetails] = useState(false)

  // Don't show if no calculations yet
  if (!allProjections) {
    return null
  }

  // Get investing projection
  const investingProj = allProjections[selectedScenario]
  const investingScenario = INVESTMENT_SCENARIOS[selectedScenario]

  // Calculate savings projection using GoTyme baseline APY
  const savingsPlatform = getPlatformById('gotyme')
  if (!savingsPlatform) return null

  const savingsProj = calculateSavingsBaseline(
    initialAmount,
    durationMonths,
    savingsPlatform.baseAPY,
    monthlyContribution
  )

  // Calculate differences
  const balanceDiff = investingProj.finalBalance - savingsProj.finalBalance
  const percentageAdvantage = savingsProj.finalBalance > 0
    ? ((balanceDiff / savingsProj.finalBalance) * 100)
    : 0

  // Generate insight based on time horizon
  const yearsHorizon = durationMonths / 12
  let insight = ''
  if (yearsHorizon < 2) {
    insight = 'Short timeframe — savings offers more stability.'
  } else if (yearsHorizon < 5) {
    insight = 'Moderate timeframe — investing can start to show an advantage.'
  } else if (yearsHorizon < 10) {
    insight = 'Long timeframe — compound growth significantly favors investing.'
  } else {
    insight = 'Very long timeframe — investing historically outperforms and can weather volatility.'
  }

  const isInvestingBetter = investingProj.finalBalance > savingsProj.finalBalance

  return (
    <div className="space-y-3">
      {/* SIMPLIFIED: Side-by-side comparison cards - minimal info */}
      <div className="grid gap-3 md:grid-cols-2">
        {/* Savings Card */}
        <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-200">
              <span className="text-xs font-bold text-blue-700">S</span>
            </div>
            <h4 className="font-semibold text-gray-900">SAVINGS</h4>
          </div>

          <p className="text-xs text-gray-600">
            {savingsPlatform.name} ({(savingsPlatform.baseAPY * 100).toFixed(1)}% APY)
          </p>

          <div className="mt-3 space-y-2 border-t border-blue-100 pt-3">
            <div>
              <p className="text-xs font-medium text-gray-600">Final Balance</p>
              <p className="mt-1 text-lg font-bold text-gray-900">
                ₱{savingsProj.finalBalance.toLocaleString('en-PH', { maximumFractionDigits: 0 })}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-600">Interest Earned</p>
              <p className="mt-1 text-sm font-semibold text-green-600">
                ₱{savingsProj.totalInterestEarned.toLocaleString('en-PH', { maximumFractionDigits: 0 })}
              </p>
            </div>
          </div>
        </div>

        {/* Investing Card */}
        <div className={`rounded-lg border p-4 ${
          isInvestingBetter 
            ? 'border-green-100 bg-green-50' 
            : 'border-amber-100 bg-amber-50'
        }`}>
          <div className="mb-3 flex items-center gap-2">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
              isInvestingBetter ? 'bg-green-200' : 'bg-amber-200'
            }`}>
              <span className={`text-xs font-bold ${
                isInvestingBetter ? 'text-green-700' : 'text-amber-700'
              }`}>I</span>
            </div>
            <h4 className={`font-semibold ${
              isInvestingBetter ? 'text-gray-900' : 'text-gray-800'
            }`}>INVESTING</h4>
          </div>

          <p className="text-xs text-gray-600">
            {investingScenario.name} ({(investingScenario.annualReturnRate * 100).toFixed(0)}% APY)
          </p>

          <div className="mt-3 space-y-2 border-t border-current border-opacity-10 pt-3">
            <div>
              <p className="text-xs font-medium text-gray-600">Projected Balance</p>
              <p className="mt-1 text-lg font-bold text-gray-900">
                ₱{investingProj.finalBalance.toLocaleString('en-PH', { maximumFractionDigits: 0 })}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-600">Estimated Gain</p>
              <p className={`mt-1 text-sm font-semibold ${
                isInvestingBetter ? 'text-green-600' : 'text-amber-600'
              }`}>
                ₱{investingProj.estimatedGain.toLocaleString('en-PH', { maximumFractionDigits: 0 })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* COMBINED: Advantage + Insight in one concise card */}
      <div className={`rounded-lg border p-3 ${
        isInvestingBetter
          ? 'border-green-200 bg-green-50'
          : 'border-amber-200 bg-amber-50'
      }`}>
        <p className={`text-xs font-semibold ${
          isInvestingBetter ? 'text-green-900' : 'text-amber-900'
        }`}>
          {isInvestingBetter ? `📈 Investing leads by ₱${balanceDiff.toLocaleString('en-PH', { maximumFractionDigits: 0 })} (+${percentageAdvantage.toFixed(1)}%)` : '📊 Savings is more stable'}
        </p>
        <p className={`mt-1 text-xs leading-relaxed ${
          isInvestingBetter ? 'text-green-800' : 'text-amber-800'
        }`}>
          {insight}
        </p>
      </div>

      {/* COLLAPSIBLE: Details & Explanations */}
      <div className="border border-gray-200 rounded-lg">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full flex items-center gap-2 p-3 hover:bg-gray-50 transition-colors"
        >
          <ChevronDown
            size={16}
            className={`text-gray-600 transition-transform ${showDetails ? 'rotate-180' : ''}`}
          />
          <span className="text-xs font-medium text-gray-700">Why the difference? Why each strategy?</span>
        </button>

        {showDetails && (
          <div className="border-t border-gray-200 p-3 space-y-3 bg-gray-50 text-xs text-gray-700">
            <div>
              <p className="font-medium text-gray-900 mb-1">Savings Approach</p>
              <p>• Safe, guaranteed interest from {savingsPlatform.name}</p>
              <p>• No volatility or market risk</p>
              <p>• Good for funds you'd need in the short term</p>
            </div>
            <div>
              <p className="font-medium text-gray-900 mb-1">Investing Approach</p>
              <p>• Higher long-term growth potential</p>
              <p>• Assumes {(investingScenario.annualReturnRate * 100).toFixed(0)}% annual return (subject to market volatility)</p>
              <p>• Ideal for long-term goals where you can weather short-term fluctuations</p>
            </div>
          </div>
        )}
      </div>

      {/* MINIMIZED DISCLAIMER */}
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-2.5">
        <p className="text-xs text-gray-700">
          <strong>Note:</strong> Savings rates are guaranteed. Investment returns are projections and may vary. For educational purposes only.
        </p>
      </div>
    </div>
  );
}
