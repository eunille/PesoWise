'use client';

/**
 * Goal-Based Results Panel
 *
 * Renders computed goal-achievement options on the right side
 * of the Investing layout when Goal-Based mode is active.
 */

import { CheckCircle2 } from 'lucide-react';
import type { GoalOption } from '@/utils/investmentGoalCalculations';

interface GoalBasedResultsProps {
  targetAmount: number;
  durationMonths: number;
  annualReturnRate: number;
  options: GoalOption[];
}

export function GoalBasedResults({
  targetAmount,
  durationMonths,
  annualReturnRate,
  options,
}: GoalBasedResultsProps) {
  const yearsDisplay = (durationMonths / 12).toFixed(1);

  return (
    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4">
      <div className="rounded-lg bg-blue-50 p-3">
        <p className="text-xs font-semibold text-blue-900">
          To reach PHP {targetAmount.toLocaleString()} in {yearsDisplay} years at {(annualReturnRate * 100).toFixed(0)}% growth
        </p>
      </div>

      <div className="space-y-3">
        {options.map((option) => (
          <div
            key={option.option}
            className={`rounded-lg border-2 p-3 ${
              option.recommended
                ? 'border-green-200 bg-green-50'
                : 'border-gray-200 bg-white'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-gray-900">
                    {option.option === 'monthlyOnly'
                      ? 'Option A: Monthly'
                      : option.option === 'lumpSumOnly'
                        ? 'Option B: Lump Sum'
                        : 'Option C: Balanced'}
                  </h4>
                  {option.recommended && (
                    <span className="inline-block rounded-full bg-green-200 px-2 py-0.5 text-xs font-bold text-green-700">
                      Recommended
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-gray-600">{option.description}</p>
              </div>
              {option.recommended && (
                <CheckCircle2 size={20} className="mt-0.5 flex-shrink-0 text-green-600" />
              )}
            </div>

            <div className="mt-3 grid gap-2 rounded-lg bg-white p-2 sm:grid-cols-2">
              {option.initialAmount > 0 && (
                <div>
                  <p className="text-xs font-medium text-gray-600">Initial</p>
                  <p className="mt-0.5 text-sm font-bold text-gray-900">
                    PHP {option.initialAmount.toLocaleString('en-PH', { maximumFractionDigits: 0 })}
                  </p>
                </div>
              )}
              {option.monthlyContribution > 0 && (
                <div>
                  <p className="text-xs font-medium text-gray-600">Monthly</p>
                  <p className="mt-0.5 text-sm font-bold text-gray-900">
                    PHP {option.monthlyContribution.toLocaleString('en-PH', { maximumFractionDigits: 0 })}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium text-green-700">Pros</p>
                <ul className="mt-1 space-y-0.5">
                  {option.pros.map((pro) => (
                    <li key={pro} className="text-xs text-gray-700">
                      - {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-medium text-amber-700">Cons</p>
                <ul className="mt-1 space-y-0.5">
                  {option.cons.map((con) => (
                    <li key={con} className="text-xs text-gray-700">
                      - {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-2">
        <p className="text-xs text-amber-800">
          <strong>Note:</strong> These are estimates based on your chosen scenario. Actual returns
          will vary. Start today and adjust as needed.
        </p>
      </div>
    </div>
  );
}
