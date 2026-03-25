/**
 * TypeScript types for investment projections
 *
 * Mirrors savings projection types for consistency and code reuse.
 * Structured for future Supabase integration (stored calculations, analytics).
 */

import type { ScenarioType } from './investmentRates';

/**
 * Monthly projection data point
 */
export interface InvestmentMonthData {
  month: number;
  year: number;
  balance: number;
  contributions: number;
  earnings: number;
  totalContributed: number;
}

/**
 * Complete projection result for a single scenario
 */
export interface InvestmentProjection {
  scenario: ScenarioType;
  annualReturnRate: number;
  monthlyData: InvestmentMonthData[];
  finalBalance: number;
  totalContributed: number;
  estimatedGain: number;
  estimatedRealGain: number; // Adjusted for ~3% inflation (Phase 2B)
}

/**
 * Input parameters for investment simulation
 */
export interface InvestmentInput {
  initialAmount: number;
  monthlyContribution: number;
  durationMonths: number;
  selectedScenario: ScenarioType;
}

/**
 * All three scenario projections at once
 */
export interface AllInvestmentProjections {
  conservative: InvestmentProjection;
  moderate: InvestmentProjection;
  growth: InvestmentProjection;
}

/**
 * State shape for investing calculator
 */
export interface InvestmentCalculatorState {
  // Inputs
  initialAmount: number;
  monthlyContribution: number;
  durationMonths: number;
  selectedScenario: ScenarioType;

  // Computed outputs
  allProjections: AllInvestmentProjections | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setInitialAmount: (amount: number) => void;
  setMonthlyContribution: (amount: number) => void;
  setDurationMonths: (months: number) => void;
  selectScenario: (scenario: ScenarioType) => void;
  runProjection: (
    initialAmount: number,
    monthlyContribution: number,
    durationMonths: number
  ) => Promise<void>;
  reset: () => void;
}

/**
 * Validation errors
 */
export interface ValidationError {
  field: 'initialAmount' | 'monthlyContribution' | 'durationMonths';
  message: string;
}
