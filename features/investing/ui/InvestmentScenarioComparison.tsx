'use client';

/**
 * Investment Scenario Comparison Cards
 *
 * Displays all three scenarios (Conservative/Moderate/Growth) side-by-side.
 * Shows final balance, total invested, and estimated gain for each.
 *
 * Reuses styling from ComparisonShell (platform cards) for consistency.
 */

import { useState } from 'react';
import { TrendingUp, AlertCircle, HelpCircle } from 'lucide-react';
import { useInvestmentState } from '@/hooks/useInvestmentState';
import {
  INVESTMENT_SCENARIOS,
  type ScenarioType,
} from '@/domain/investmentRates';
import { CalculationMethodologyDialog } from './CalculationMethodologyDialog';

export function InvestmentScenarioComparison() {
  const { allProjections } = useInvestmentState();
  const [dialogOpen, setDialogOpen] = useState(false);

  // Show empty state if no calculations yet
  if (!allProjections) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-black">Scenario Comparison</h3>
          <button
            onClick={() => setDialogOpen(true)}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Learn how calculations are made"
          >
            <HelpCircle size={14} />
            How It's Calculated?
          </button>
        </div>
        <div className="rounded-lg border border-border/70 bg-white p-12">
          <div className="flex flex-col items-center justify-center text-center">
            <TrendingUp className="mb-4 h-12 w-12 text-gray-300" />
            <p className="text-base font-medium text-black/80">Pick a scenario to see results</p>
            <p className="mt-1 text-sm text-black/60">Run a projection above to compare growth across scenarios</p>
          </div>
        </div>
        <CalculationMethodologyDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      </div>
    );
  }

  const scenarios: ScenarioType[] = ['conservative', 'moderate', 'growth'];

  return (
    <div className="space-y-4">
      {/* Header with Help Button */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">
          Scenario Comparison
        </h3>
        <button
          onClick={() => setDialogOpen(true)}
          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          title="Learn how calculations are made"
        >
          <HelpCircle size={14} />
          How It's Calculated?
        </button>
      </div>

      {/* Three Scenario Cards */}
      <div className="grid gap-3 md:grid-cols-3">
        {scenarios.map((scenarioId) => {
          const projection = allProjections[scenarioId];
          const scenarioDef = INVESTMENT_SCENARIOS[scenarioId];

          return (
            <div
              key={scenarioId}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Header */}
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {scenarioDef.name}
                  </h4>
                  <p className="text-xs text-gray-600">
                    {scenarioDef.annualReturnRate * 100}% APY
                  </p>
                </div>
              </div>

              {/* Risk badge */}
              <div className="mb-4 inline-block rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
                {scenarioDef.riskLabel}
              </div>

              {/* Metrics */}
              <div className="space-y-3">
                {/* Final Balance */}
                <div>
                  <p className="text-xs font-medium text-gray-600">
                    Final Balance
                  </p>
                  <p className="mt-1 text-lg font-bold text-gray-900">
                    {formatCurrency(projection.finalBalance)}
                  </p>
                </div>

                {/* Total Invested */}
                <div className="border-t border-gray-100 pt-3">
                  <p className="text-xs font-medium text-gray-600">
                    Total Invested
                  </p>
                  <p className="mt-1 text-sm text-gray-700">
                    {formatCurrency(projection.totalContributed)}
                  </p>
                </div>

                {/* Estimated Gain */}
                <div className="border-t border-gray-100 pt-3">
                  <p className="text-xs font-medium text-gray-600">
                    Estimated Gain
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-sm font-semibold text-green-600">
                    <TrendingUp size={14} />
                    {formatCurrency(projection.estimatedGain)}
                  </p>
                </div>

                {/* Return % */}
                <div className="border-t border-gray-100 pt-3">
                  <p className="text-xs font-medium text-gray-600">
                    Return %
                  </p>
                  <p className="mt-1 text-sm font-semibold text-blue-600">
                    {(
                      (projection.estimatedGain /
                        projection.totalContributed) *
                      100
                    ).toFixed(1)}
                    %
                  </p>
                </div>
              </div>

              {/* Disclaimer note */}
              <div className="mt-4 flex gap-2 rounded-lg bg-yellow-50 p-2">
                <AlertCircle size={14} className="mt-0.5 flex-shrink-0 text-yellow-600" />
                <p className="text-xs text-yellow-700">
                  Estimates are simulated. Not guaranteed returns.
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom disclaimer */}
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
        <p className="text-xs text-amber-900">
          <strong>Important:</strong> These projections are educational simulations based
          on historical assumptions. Actual returns may vary significantly. This tool is
          for planning purposes only, not investment advice.
        </p>
      </div>

      {/* Calculation Methodology Dialog */}
      <CalculationMethodologyDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}

/**
 * Format currency
 */
function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
