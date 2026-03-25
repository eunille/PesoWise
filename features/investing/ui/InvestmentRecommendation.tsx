'use client';

/**
 * Investment Recommendation Callout
 *
 * Displays educational guidance derived from user inputs
 * and the selected projection scenario.
 */

import { Lightbulb } from 'lucide-react';
import { useInvestmentState } from '@/hooks/useInvestmentState';
import { generateInvestmentRecommendation } from '@/utils/investmentRecommendations';

export function InvestmentRecommendation() {
  const {
    initialAmount,
    monthlyContribution,
    durationMonths,
    selectedScenario,
    allProjections,
  } = useInvestmentState();

  const recommendation = generateInvestmentRecommendation({
    initialAmount,
    monthlyContribution,
    durationMonths,
    selectedScenario,
    allProjections,
  });

  if (!recommendation) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <p className="text-sm font-semibold text-gray-900">Recommendation</p>
        <p className="mt-1 text-xs text-gray-600">
          Run an investment projection to see personalized guidance.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
      <div className="flex items-start gap-2">
        <Lightbulb size={18} className="mt-0.5 text-amber-700" />
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-amber-900">{recommendation.title}</h3>
          <p className="mt-1 text-xs leading-relaxed text-amber-800">
            {recommendation.summary}
          </p>

          <ul className="mt-3 space-y-1.5">
            {recommendation.actionPoints.map((point) => (
              <li key={point} className="text-xs text-amber-900">
                • {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
