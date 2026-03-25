/**
 * Investment Projection Service
 *
 * Core calculation logic for index fund investing simulations.
 * Implements monthly compounding with contributions.
 *
 * Formula:
 * - Monthly rate = Annual rate / 12
 * - Each month: balance = (balance + contribution) * (1 + monthly_rate)
 * - Contributions added at END of month (standard approach)
 */

import type {
  InvestmentMonthData,
  InvestmentProjection,
  AllInvestmentProjections,
} from '@/domain/investmentTypes';
import {
  INVESTMENT_SCENARIOS,
  INFLATION_RATE,
  type ScenarioType,
} from '@/domain/investmentRates';

/**
 * Calculate projection for a single scenario
 *
 * @param initialAmount - Starting amount in peso
 * @param monthlyContribution - Monthly addition (e.g., 5000)
 * @param durationMonths - Investment horizon in months
 * @param scenario - 'conservative' | 'moderate' | 'growth'
 * @returns Projection with month-by-month breakdown
 */
export function calculateInvestmentProjection(
  initialAmount: number,
  monthlyContribution: number,
  durationMonths: number,
  scenario: ScenarioType
): InvestmentProjection {
  const scenarioData = INVESTMENT_SCENARIOS[scenario];
  const annualRate = scenarioData.annualReturnRate;
  const monthlyRate = annualRate / 12;

  let balance = initialAmount;
  let totalContributed = initialAmount;
  const monthlyData: InvestmentMonthData[] = [];

  // Month 0 data
  monthlyData.push({
    month: 0,
    year: 0,
    balance: balance,
    contributions: initialAmount,
    earnings: 0,
    totalContributed: totalContributed,
  });

  // Generate month-by-month projections
  for (let month = 1; month <= durationMonths; month++) {
    // Add contribution at end of month, then apply growth
    balance += monthlyContribution;
    totalContributed += monthlyContribution;

    // Apply monthly compound interest
    balance = balance * (1 + monthlyRate);

    const year = Math.floor(month / 12);
    const earnings = balance - totalContributed;

    monthlyData.push({
      month,
      year,
      balance,
      contributions: monthlyContribution,
      earnings,
      totalContributed,
    });
  }

  const finalBalance = balance;
  const estimatedGain = finalBalance - totalContributed;

  // Real gain adjusted for inflation (Phase 2B prep)
  const realGain = estimatedGain - totalContributed * INFLATION_RATE * (durationMonths / 12);

  return {
    scenario,
    annualReturnRate: annualRate,
    monthlyData,
    finalBalance: Math.round(finalBalance * 100) / 100,
    totalContributed: Math.round(totalContributed * 100) / 100,
    estimatedGain: Math.round(estimatedGain * 100) / 100,
    estimatedRealGain: Math.round(Math.max(0, realGain) * 100) / 100,
  };
}

/**
 * Calculate all three scenarios at once
 *
 * @param initialAmount - Starting amount
 * @param monthlyContribution - Monthly addition
 * @param durationMonths - Investment horizon
 * @returns All three scenario projections
 */
export function calculateAllInvestmentProjections(
  initialAmount: number,
  monthlyContribution: number,
  durationMonths: number
): AllInvestmentProjections {
  return {
    conservative: calculateInvestmentProjection(
      initialAmount,
      monthlyContribution,
      durationMonths,
      'conservative'
    ),
    moderate: calculateInvestmentProjection(
      initialAmount,
      monthlyContribution,
      durationMonths,
      'moderate'
    ),
    growth: calculateInvestmentProjection(
      initialAmount,
      monthlyContribution,
      durationMonths,
      'growth'
    ),
  };
}

/**
 * Validation helper
 */
export function validateInvestmentInputs(
  initialAmount: number,
  monthlyContribution: number,
  durationMonths: number
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (initialAmount < 0) {
    errors.push('Initial amount must be non-negative');
  }
  if (monthlyContribution < 0) {
    errors.push('Monthly contribution must be non-negative');
  }
  if (durationMonths < 1 || durationMonths > 240) {
    errors.push('Duration must be between 1 and 240 months');
  }
  if (initialAmount === 0 && monthlyContribution === 0) {
    errors.push('Either initial amount or monthly contribution must be > 0');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Format currency for display
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
