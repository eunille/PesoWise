'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import { calculateProjection, ProjectionResult } from '@/services/projectionService'
import { PLATFORM_IDS, getPlatformById } from '@/domain/platformRates'

export interface CalculatorState {
  initialAmount: number
  monthlyTopup: number
  monthsHorizon: number
  selectedPlatform: string | null
  selectedBanks: string[] // New: track which banks to display
  allPlatformProjections: Record<string, ProjectionResult>
  isLoading: boolean
  error: string | null
}

interface CalculatorContextType {
  state: CalculatorState
  setInitialAmount: (amount: number) => void
  setMonthlyTopup: (amount: number) => void
  setMonthsHorizon: (months: number) => void
  selectPlatform: (platformId: string | null) => void
  setSelectedBanks: (bankIds: string[]) => void // New: set banks to compare
  toggleBank: (bankId: string) => void // New: toggle individual bank
  reset: () => void
  runEstimate: (amount: number, monthlyTopup: number, months: number) => void
}

const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined)

export const CalculatorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Recommended banks for default display: GoTyme, Maya, MariBank (highest rates)
  const DEFAULT_RECOMMENDED_BANKS = ['gotyme', 'maya', 'maribank']

  const [state, setState] = useState<CalculatorState>({
    initialAmount: 5000,
    monthlyTopup: 0,
    monthsHorizon: 6,
    selectedPlatform: null,
    selectedBanks: DEFAULT_RECOMMENDED_BANKS,
    allPlatformProjections: {},
    isLoading: false,
    error: null,
  })

  const setInitialAmount = useCallback((amount: number) => {
    setState(prev => ({ ...prev, initialAmount: Math.max(0, amount) }))
  }, [])

  const setMonthlyTopup = useCallback((amount: number) => {
    setState(prev => ({ ...prev, monthlyTopup: Math.max(0, amount) }))
  }, [])

  const setMonthsHorizon = useCallback((months: number) => {
    setState(prev => ({ ...prev, monthsHorizon: Math.max(1, Math.min(12, months)) }))
  }, [])

  const selectPlatform = useCallback((platformId: string | null) => {
    setState(prev => ({
      ...prev,
      selectedPlatform: platformId,
      error: null,
    }))
  }, [])

  const setSelectedBanks = useCallback((bankIds: string[]) => {
    setState(prev => ({
      ...prev,
      selectedBanks: bankIds,
      error: null,
    }))
  }, [])

  const toggleBank = useCallback((bankId: string) => {
    setState(prev => {
      const isSelected = prev.selectedBanks.includes(bankId)
      const newSelectedBanks = isSelected
        ? prev.selectedBanks.filter(id => id !== bankId)
        : [...prev.selectedBanks, bankId]
      return {
        ...prev,
        selectedBanks: newSelectedBanks,
        error: null,
      }
    })
  }, [])

  const runEstimate = useCallback((amount: number, monthlyTopup: number, months: number) => {
    if (amount <= 0) {
      setState(prev => ({
        ...prev,
        error: 'Please enter a valid initial amount',
      }))
      return
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const projections: Record<string, ProjectionResult> = {}
      
      // Calculate for all platforms
      PLATFORM_IDS.forEach(platformId => {
        const platform = getPlatformById(platformId)
        if (platform) {
          const projection = calculateProjection(
            amount,
            months,
            platform.baseAPY,
            monthlyTopup
          )
          projections[platformId] = projection
        }
      })

      setState(prev => ({
        ...prev,
        initialAmount: amount,
        monthlyTopup: monthlyTopup,
        monthsHorizon: months,
        allPlatformProjections: projections,
        isLoading: false,
        error: null,
      }))
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Calculation failed'
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMsg,
      }))
    }
  }, [])

  const reset = useCallback(() => {
    setState({
      initialAmount: 5000,
      monthlyTopup: 0,
      monthsHorizon: 6,
      selectedPlatform: null,
      selectedBanks: DEFAULT_RECOMMENDED_BANKS,
      allPlatformProjections: {},
      isLoading: false,
      error: null,
    })
  }, [])

  const value: CalculatorContextType = {
    state,
    setInitialAmount,
    setMonthlyTopup,
    setMonthsHorizon,
    selectPlatform,
    setSelectedBanks,
    toggleBank,
    runEstimate,
    reset,
  }

  return (
    <CalculatorContext.Provider value={value}>
      {children}
    </CalculatorContext.Provider>
  )
}

export const useCalculatorState = () => {
  const context = useContext(CalculatorContext)
  if (context === undefined) {
    throw new Error('useCalculatorState must be used within CalculatorProvider')
  }
  return context
}
