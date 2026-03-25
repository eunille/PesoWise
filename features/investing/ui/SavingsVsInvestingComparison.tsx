'use client';

/**
 * Savings vs Investing Comparison
 *
 * Compares the same investment inputs under two strategies:
 * 1. Savings: Using a bank's savings rate (GoTyme 5.5%)
 * 2. Investing: Using the selected investment scenario
 *
 * Shows side-by-side final balances, gains, and insights.
 */

import { TrendingUp } from 'lucide-react';
import { useInvestmentState } from '@/hooks/useInvestmentState';
import { INVESTMENT_SCENARIOS } from '@/domain/investmentRates';
import { getPlatformById } from '@/domain/platformRates';

function calculateSavingsBaseline(
  initialAmount: number,
  durationMonths: number,
  baseAPY: number,
  monthlyTopup: number
): { finalBalance: number; totalInterestEarned: number } {
  const monthlyRate = baseAPY / 12;
  let balance = Math.max(0, initialAmount);
  let interestEarned = 0;

  for (let month = 1; month <= durationMonths; month++) {
    balance += Math.max(0, monthlyTopup);
    const monthlyInterest = balance * monthlyRate;
    balance += monthlyInterest;
    interestEarned += monthlyInterest;
  }

  return {
    finalBalance: balance,
    totalInterestEarned: interestEarned,
  };
}

export function SavingsVsInvestingComparison() {
  const { initialAmount, monthlyContribution, durationMonths, selectedScenario, allProjections } =
    useInvestmentState();

  // Don't show if no calculations yet
  if (!allProjections) {
    return null;
  }

  // Get investing projection
  const investingProj = allProjections[selectedScenario];
  const investingScenario = INVESTMENT_SCENARIOS[selectedScenario];

  // Calculate savings projection using GoTyme baseline APY
  const savingsPlatform = getPlatformById('gotyme');
  if (!savingsPlatform) return null;

  const savingsProj = calculateSavingsBaseline(
    initialAmount,
    durationMonths,
    savingsPlatform.baseAPY,
    monthlyContribution
  );

  // Calculate differences
  const balanceDiff = investingProj.finalBalance - savingsProj.finalBalance;
  const percentageAdvantage = savingsProj.finalBalance > 0
    ? ((balanceDiff / savingsProj.finalBalance) * 100)
    : 0;

  // Generate insight based on time horizon
  const yearsHorizon = durationMonths / 12;
  let insight = '';
  if (yearsHorizon < 2) {
    insight = 'Short timeframe—both strategies are conservative. Savings offers more stability.';
  } else if (yearsHorizon < 5) {
    insight = 'Moderate timeframe—investing can start to show an advantage as compound growth kicks in.';
  } else if (yearsHorizon < 10) {
    insight = 'Long timeframe—compound growth significantly favors investing. Monthly contributions amplify this effect.';
  } else {
    insight = 'Very long timeframe—investing can weather short-term volatility and historically outperforms. This is the sweet spot for index fund investing.';
  }

  const isInvestingBetter = investingProj.finalBalance > savingsProj.finalBalance;

  return (
    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4">
      {/* Header */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900">Strategy Comparison</h3>
        <p className="mt-1 text-xs text-gray-600">
          Same ₱{initialAmount.toLocaleString()} initial + ₱{monthlyContribution.toLocaleString()}/month
          over {yearsHorizon.toFixed(1)} years
        </p>
      </div>

      {/* Side-by-side comparison cards */}
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

          <div className="mt-3 rounded-lg bg-blue-100 px-2 py-1">
            <p className="text-xs font-medium text-blue-900">Pros: Safe, guaranteed interest</p>
            <p className="text-xs text-blue-800">Cons: Limited growth potential</p>
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

          <div className={`mt-3 rounded-lg px-2 py-1 ${
            isInvestingBetter ? 'bg-green-100' : 'bg-amber-100'
          }`}>
            <p className={`text-xs font-medium ${
              isInvestingBetter ? 'text-green-900' : 'text-amber-900'
            }`}>
              Pros: Higher long-term growth potential
            </p>
            <p className={`text-xs ${
              isInvestingBetter ? 'text-green-800' : 'text-amber-800'
            }`}>
              Cons: Subject to market volatility
            </p>
          </div>
        </div>
      </div>

      {/* Difference/Advantage Section */}
      {isInvestingBetter && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4">
          <div className="flex items-center gap-2">
            <TrendingUp size={18} className="text-green-600" />
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Investing Advantage: ₱{balanceDiff.toLocaleString('en-PH', { maximumFractionDigits: 0 })}
              </p>
              <p className="mt-1 text-xs text-gray-600">
                That&apos;s a {percentageAdvantage.toFixed(1)}% higher final balance with the {investingScenario.name} scenario.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Insight */}
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
        <p className="text-xs font-semibold text-amber-900">Insight for Your Timeline:</p>
        <p className="mt-1 text-xs text-amber-800 leading-relaxed">{insight}</p>
      </div>

      {/* Important Note */}
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
        <p className="text-xs text-gray-700">
          <strong>Note:</strong> Savings rates are guaranteed; investment returns are projections based on
          historical averages. Actual results will vary. This comparison is for educational purposes only.
        </p>
      </div>
    </div>
  );
}
