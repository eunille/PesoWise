'use client';

/**
 * Investment Calculator State Hook
 *
 * Manages all state for the investing simulator.
 * Mirrors useCalculatorState pattern for consistency.
 * Provides InvestmentProvider for context wrapping.
 */

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import type {
  InvestmentCalculatorState,
  AllInvestmentProjections,
} from '@/domain/investmentTypes';
import {
  calculateAllInvestmentProjections,
  validateInvestmentInputs,
} from '@/services/investmentProjectionService';
import { DEFAULT_TIME_HORIZON_MONTHS, type ScenarioType } from '@/domain/investmentRates';

/**
 * Create context
 */
const InvestmentContext = createContext<InvestmentCalculatorState | null>(null);

/**
 * Provider component
 */
export function InvestmentProvider({ children }: { children: ReactNode }) {
  const [initialAmount, setInitialAmount] = useState<number>(0);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(0);
  const [durationMonths, setDurationMonths] = useState<number>(
    DEFAULT_TIME_HORIZON_MONTHS
  );
  const [selectedScenario, setSelectedScenario] = useState<ScenarioType>('moderate');
  const [allProjections, setAllProjections] = useState<AllInvestmentProjections | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Run projection for all three scenarios
   */
  const runProjection = useCallback(
    async (
      amount: number,
      monthly: number,
      months: number
    ): Promise<void> => {
      setIsLoading(true);
      setError(null);

      try {
        // Validate inputs
        const validation = validateInvestmentInputs(
          amount,
          monthly,
          months
        );
        if (!validation.valid) {
          setError(validation.errors[0]);
          setIsLoading(false);
          return;
        }

        // Calculate all scenarios
        const projections = calculateAllInvestmentProjections(
          amount,
          monthly,
          months
        );

        setAllProjections(projections);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to calculate projection'
        );
        setAllProjections(null);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  /**
   * Reset all state
   */
  const reset = useCallback(() => {
    setInitialAmount(0);
    setMonthlyContribution(0);
    setDurationMonths(DEFAULT_TIME_HORIZON_MONTHS);
    setSelectedScenario('moderate');
    setAllProjections(null);
    setIsLoading(false);
    setError(null);
  }, []);

  /**
   * Select scenario (for chart/card display)
   */
  const selectScenario = useCallback((scenario: ScenarioType) => {
    setSelectedScenario(scenario);
  }, []);

  const value: InvestmentCalculatorState = {
    // Inputs
    initialAmount,
    monthlyContribution,
    durationMonths,
    selectedScenario,

    // Computed
    allProjections,
    isLoading,
    error,

    // Actions
    setInitialAmount,
    setMonthlyContribution,
    setDurationMonths,
    selectScenario,
    runProjection,
    reset,
  };

  return (
    <InvestmentContext.Provider value={value}>
      {children}
    </InvestmentContext.Provider>
  );
}

/**
 * Hook to use investment state
 */
export function useInvestmentState(): InvestmentCalculatorState {
  const context = useContext(InvestmentContext);
  if (!context) {
    throw new Error(
      'useInvestmentState must be used within InvestmentProvider'
    );
  }
  return context;
}
