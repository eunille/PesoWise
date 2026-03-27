'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { BarChart3, TrendingUp } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCalculatorState } from '@/hooks/useCalculatorState.tsx'
import { formatPHP, getInterestPercentage } from '@/services/projectionService'
import { PLATFORM_IDS, getPlatformById } from '@/domain/platformRates'

export function GrowthChart() {
  const { state, selectPlatform } = useCalculatorState()
  const { allPlatformProjections, selectedPlatform } = state

  const hasCalculations = Object.keys(allPlatformProjections).length > 0
  const projection = selectedPlatform ? allPlatformProjections[selectedPlatform] : null
  const platform = selectedPlatform ? getPlatformById(selectedPlatform) : null

  // Empty state: No calculations yet
  if (!hasCalculations) {
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-black">Projected Growth</h3>
        </div>
        <div className="rounded-lg border border-border/70 bg-white p-12">
          <div className="flex flex-col items-center justify-center text-center">
            <BarChart3 className="mb-4 h-12 w-12 text-gray-300" />
            <p className="text-base font-medium text-black/80">Ready to grow your savings?</p>
            <p className="mt-1 text-sm text-black/60">Fill in your details and click &quot;Run Estimate&quot;</p>
          </div>
        </div>
      </div>
    )
  }

  // Empty state: Calculations exist but no platform selected
  if (!selectedPlatform || !projection || !platform) {
    return (
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-black">Projected Growth</h3>
          </div>
          <Select value={selectedPlatform || ''} onValueChange={selectPlatform}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent>
              {PLATFORM_IDS.map((platformId) => {
                const p = getPlatformById(platformId)
                return p ? (
                  <SelectItem key={platformId} value={platformId}>
                    {p.name}
                  </SelectItem>
                ) : null
              })}
            </SelectContent>
          </Select>
        </div>
        <div className="rounded-lg border border-border/70 bg-white p-12">
          <div className="flex flex-col items-center justify-center text-center">
            <TrendingUp className="mb-4 h-12 w-12 text-gray-300" />
            <p className="text-base font-medium text-black/80">Exciting results are ready!</p>
            <p className="mt-1 text-sm text-black/60">Pick a platform to see your personalized chart</p>
          </div>
        </div>
      </div>
    )
  }

  // Full chart state: Platform selected and data available
  const { monthlyData, finalBalance, totalInterestEarned, monthsHorizon, apy } = projection
  const interestPercentage = getInterestPercentage(totalInterestEarned, state.initialAmount)
  const horizonLabel = monthsHorizon === 1 ? '1 month' : `${monthsHorizon} months`

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-black">Projected Growth</h3>
          <p className="mt-1 text-sm text-black/70">
            Estimated savings at {platform.name} ({(apy * 100).toFixed(1)}% APY) over {horizonLabel}
          </p>
        </div>
        <Select value={selectedPlatform} onValueChange={selectPlatform}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select platform" />
          </SelectTrigger>
          <SelectContent>
            {PLATFORM_IDS.map((platformId) => {
              const p = getPlatformById(platformId)
              return p ? (
                <SelectItem key={platformId} value={platformId}>
                  {p.name}
                </SelectItem>
              ) : null
            })}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border border-border/70 bg-white p-3 sm:p-4">
        <ResponsiveContainer width="100%" height={250} minHeight={250} className="sm:h-[300px] lg:h-[400px]">
          <LineChart data={monthlyData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="0" stroke="#e5e7eb" />
            <XAxis
              dataKey="monthLabel"
              stroke="#6b7280"
              tick={{ fontSize: 12 }}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis
              stroke="#6b7280"
              tick={{ fontSize: 12 }}
              domain={['dataMin - (dataMax - dataMin) * 0.1', 'dataMax + (dataMax - dataMin) * 0.1']}
              tickFormatter={(value) => {
                if (value < 1000) {
                  return `₱${value.toFixed(0)}`
                }
                return `₱${(value / 1000).toFixed(0)}k`
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
              }}
              formatter={(value) => [`${formatPHP(value as number)}`, 'Balance']}
              labelStyle={{ color: '#1f2937' }}
            />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#2563eb"
              strokeWidth={3}
              dot={false}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-blue-50 p-4">
          <p className="text-xs font-medium uppercase text-blue-600">Total Balance</p>
          <p className="mt-2 text-2xl font-bold text-blue-900">{formatPHP(finalBalance, false)}</p>
          <p className="mt-1 text-xs text-blue-700">After {horizonLabel}</p>
        </div>
        <div className="rounded-lg bg-green-50 p-4">
          <p className="text-xs font-medium uppercase text-green-600">Total Interest</p>
          <p className="mt-2 text-2xl font-bold text-green-900">{formatPHP(totalInterestEarned, false)}</p>
          <p className="mt-1 text-xs text-green-700">+{interestPercentage.toFixed(1)}% growth</p>
        </div>
      </div>
    </div>
  )
}
