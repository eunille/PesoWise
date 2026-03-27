'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { ChevronDown } from 'lucide-react'
import { useCalculatorState } from '@/hooks/useCalculatorState.tsx'

export function CalculatorShell() {
  const { state, setMonthsHorizon, runEstimate, reset } = useCalculatorState()
  const [showMoreOptions, setShowMoreOptions] = useState(false)
  const [initialAmountInput, setInitialAmountInput] = useState('')
  const [monthlyTopupInput, setMonthlyTopupInput] = useState('')

  const monthsLabel = state.monthsHorizon === 1 ? '1 month' : `${state.monthsHorizon} months`

  const handleRunEstimate = () => {
    const amount = parseFloat(initialAmountInput) || 0
    const topup = parseFloat(monthlyTopupInput) || 0

    if (amount <= 0) {
      alert('Please enter a valid initial amount')
      return
    }

    runEstimate(amount, topup, state.monthsHorizon)
  }

  const handleReset = () => {
    setInitialAmountInput('')
    setMonthlyTopupInput('')
    reset()
  }

  return (
    <Card className="border-border/70 shadow-sm">
      <CardHeader>
        <CardTitle>Projection Calculator</CardTitle>
        <CardDescription>Enter your values to estimate possible savings growth across platforms.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Primary inputs: Always visible */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="initial-amount" className="text-sm font-medium text-foreground">
              Initial Amount (PHP)
            </label>
            <Input
              id="initial-amount"
              type="number"
              inputMode="numeric"
              placeholder="Enter amount (e.g., 5000)"
              value={initialAmountInput}
              onChange={(e) => setInitialAmountInput(e.target.value)}
              min="0"
              step="1"
              max="9999999999"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="months" className="text-sm font-medium text-foreground">
                Time Horizon
              </label>
              <span className="text-sm font-medium text-blue-600">{monthsLabel}</span>
            </div>
            <Slider
              id="months"
              min={1}
              max={12}
              step={1}
              value={[state.monthsHorizon]}
              onValueChange={(value) => setMonthsHorizon(value[0])}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1</span>
              <span>12</span>
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
                <label htmlFor="monthly-topup" className="text-sm font-medium text-foreground">
                  Monthly Top-up (Optional)
                </label>
                <Input
                  id="monthly-topup"
                  type="number"
                  inputMode="numeric"
                  placeholder="Enter amount (optional, e.g., 1000)"
                  value={monthlyTopupInput}
                  onChange={(e) => setMonthlyTopupInput(e.target.value)}
                  min="0"
                  step="1"
                  max="9999999999"
                />
              </div>
            </div>
          )}
        </div>

        {/* Run Estimate button */}
        <div className="flex gap-2">
          <Button
            onClick={handleRunEstimate}
            disabled={state.isLoading}
            className="flex-1 rounded-xl"
          >
            {state.isLoading ? 'Calculating...' : 'Run Estimate'}
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
        {state.error && (
          <p className="text-sm text-red-600">{state.error}</p>
        )}
      </CardContent>
    </Card>
  )
}
