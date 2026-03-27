'use client';

/**
 * Investing Calculator Form Component
 *
 * Input form for investment simulation parameters:
 * - Initial investment amount
 * - Time horizon (1-20 years with slider)
 * - Monthly contribution (optional, in "More Options")
 * - Scenario selector (optional, in "More Options")
 *
 * Matches CalculatorShell styling and UI patterns for consistency.
 */

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { useInvestmentState } from '@/hooks/useInvestmentState';
import {
  TIME_HORIZON_OPTIONS,
} from '@/domain/investmentRates';

export function InvestingCalculator() {
  const {
    initialAmount,
    monthlyContribution,
    durationMonths,
    selectedScenario,
    setInitialAmount,
    setMonthlyContribution,
    setDurationMonths,
    runProjection,
    reset,
    isLoading,
  } = useInvestmentState();

  const [showMoreOptions, setShowMoreOptions] = useState(false);

  const handleRunProjection = async () => {
    await runProjection(initialAmount, monthlyContribution, durationMonths);
  };

  const handleReset = () => {
    reset();
  };

  // Find the label for the current duration in months
  const durationLabel = TIME_HORIZON_OPTIONS.find(
    (opt) => opt.months === durationMonths
  )?.label || `${durationMonths} months`;

  return (
    <Card className="border-border/70 shadow-sm">
      <CardHeader>
        <CardTitle>Investment Projection</CardTitle>
        <CardDescription>
          Enter your values to calculate investment growth across scenarios.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Primary inputs: Always visible */}
        <div className="space-y-4">
          {/* Initial Investment */}
          <div className="space-y-2">
            <label htmlFor="initial-amount" className="text-sm font-medium text-foreground">
              Initial Investment (PHP)
            </label>
            <Input
              id="initial-amount"
              type="number"
              inputMode="numeric"
              placeholder="Enter amount (e.g., 10000)"
              value={initialAmount || ''}
              onChange={(e) => setInitialAmount(Number(e.target.value) || 0)}
              min="0"
              step="1"
              max="9999999999"
            />
          </div>

          {/* Time Horizon Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="time-horizon" className="text-sm font-medium text-foreground">
                Time Horizon
              </label>
              <span className="text-sm font-medium text-blue-600">{durationLabel}</span>
            </div>
            <Slider
              id="time-horizon"
              min={1}
              max={20}
              step={1}
              value={[durationMonths / 12]}
              onValueChange={(value) => setDurationMonths(value[0] * 12)}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1 year</span>
              <span>20 years</span>
            </div>
          </div>
        </div>

        {/* More Options Section: Collapsible */}
        <div className="border-t border-border/50 pt-4">
          <button
            onClick={() => setShowMoreOptions(!showMoreOptions)}
            className="flex w-full items-center justify-between gap-2 text-left transition-colors hover:text-blue-600"
          >
            <span className="text-sm font-medium text-foreground">More Options</span>
            <ChevronDown
              className={`size-4 transition-transform duration-300 ${
                showMoreOptions ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            />
          </button>

          {showMoreOptions && (
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="monthly-contribution"
                  className="text-sm font-medium text-foreground"
                >
                  Monthly Contribution (Optional)
                </label>
                <Input
                  id="monthly-contribution"
                  type="number"
                  inputMode="numeric"
                  placeholder="Enter amount (optional, e.g., 5000)"
                  value={monthlyContribution || ''}
                  onChange={(e) =>
                    setMonthlyContribution(Number(e.target.value) || 0)
                  }
                  min="0"
                  step="1"
                  max="9999999999"
                />
              </div>

            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            onClick={handleRunProjection}
            disabled={
              isLoading ||
              (initialAmount === 0 && monthlyContribution === 0)
            }
            className="flex-1 rounded-xl"
          >
            {isLoading ? 'Calculating...' : 'Project Growth'}
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="rounded-xl"
          >
            Reset
          </Button>
        </div>

        {/* Error message */}
        {initialAmount === 0 && monthlyContribution === 0 && (
          <p className="text-sm text-amber-600">
            Please enter at least an initial amount or monthly contribution
          </p>
        )}
      </CardContent>
    </Card>
  );
}

