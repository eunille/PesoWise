'use client';

/**
 * Goal-Based Investing Calculator
 *
 * Reverse mode: User specifies target amount and timeline.
 * System calculates required contributions across three strategies.
 * 
 * Matches CalculatorShell styling and UI patterns for consistency.
 */

import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import {
  calculateGoalOptions,
  validateGoalInputs,
  type GoalOption,
} from '@/utils/investmentGoalCalculations';
import { INVESTMENT_SCENARIOS, DEFAULT_TIME_HORIZON_MONTHS, type ScenarioType } from '@/domain/investmentRates';
import { TIME_HORIZON_OPTIONS } from '@/domain/investmentRates';

export interface GoalBasedCalculationResult {
  targetAmount: number;
  durationMonths: number;
  annualReturnRate: number;
  options: GoalOption[];
}

interface GoalBasedCalculatorProps {
  onCalculated: (result: GoalBasedCalculationResult | null) => void;
}

export function GoalBasedCalculator({ onCalculated }: GoalBasedCalculatorProps) {
  const [targetAmount, setTargetAmount] = useState<number>(0);
  const [durationMonths, setDurationMonths] = useState<number>(DEFAULT_TIME_HORIZON_MONTHS);
  const [selectedScenario, setSelectedScenario] = useState<ScenarioType>('moderate');
  const [error, setError] = useState<string | null>(null);

  const scenarioData = INVESTMENT_SCENARIOS[selectedScenario];
  const durationLabel = TIME_HORIZON_OPTIONS.find(
    (opt) => opt.months === durationMonths
  )?.label || `${durationMonths} months`;

  const handleCalculate = () => {
    const validation = validateGoalInputs(targetAmount, durationMonths);
    if (!validation.valid) {
      setError(validation.error || 'Invalid inputs');
      onCalculated(null);
      return;
    }

    setError(null);
    const calculated = calculateGoalOptions(targetAmount, durationMonths, scenarioData.annualReturnRate);
    onCalculated({
      targetAmount,
      durationMonths,
      annualReturnRate: scenarioData.annualReturnRate,
      options: calculated,
    });
  };

  const handleReset = () => {
    setTargetAmount(0);
    setDurationMonths(DEFAULT_TIME_HORIZON_MONTHS);
    setSelectedScenario('moderate');
    setError(null);
    onCalculated(null);
  };

  return (
    <Card className="border-border/70 shadow-sm">
      <CardHeader>
        <CardTitle>Goal-Based Calculator</CardTitle>
        <CardDescription>
          Reverse mode: Specify your target and we&apos;ll calculate what you need to invest.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Primary inputs */}
        <div className="space-y-4">
          {/* Target Amount */}
          <div className="space-y-2">
            <label htmlFor="target-amount" className="text-sm font-medium text-foreground">
              Target Amount (PHP)
            </label>
            <Input
              id="target-amount"
              type="number"
              inputMode="numeric"
              placeholder="Enter target amount (e.g., 500000)"
              value={targetAmount || ''}
              onChange={(e) => setTargetAmount(Number(e.target.value) || 0)}
              min="0"
              step="1"
              max="9999999999"
            />
          </div>

          {/* Timeline Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="timeline" className="text-sm font-medium text-foreground">
                Timeline
              </label>
              <span className="text-sm font-medium text-blue-600">{durationLabel}</span>
            </div>
            <Slider
              id="timeline"
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

          {/* Growth Scenario */}
          <div className="space-y-2">
            <label htmlFor="growth-scenario" className="text-sm font-medium text-foreground">
              Growth Scenario
            </label>
            <select
              id="growth-scenario"
              value={selectedScenario}
              onChange={(e) => setSelectedScenario(e.target.value as ScenarioType)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              {Object.values(INVESTMENT_SCENARIOS).map((scenario) => (
                <option key={scenario.id} value={scenario.id}>
                  {scenario.name} ({(scenario.annualReturnRate * 100).toFixed(0)}%)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Calculate Button */}
        <div className="flex gap-2 pt-2">
          <Button
            onClick={handleCalculate}
            disabled={targetAmount <= 0}
            className="flex-1 rounded-xl"
          >
            Calculate Required Investment
          </Button>
          <Button onClick={handleReset} variant="outline" className="rounded-xl">
            Reset
          </Button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex gap-2 rounded-lg bg-red-50 p-3">
            <AlertCircle size={16} className="mt-0.5 flex-shrink-0 text-red-600" />
            <p className="text-xs text-red-700">{error}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

