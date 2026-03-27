'use client';

/**
 * Investment Growth Chart
 *
 * Displays projected growth curve for the selected investment scenario.
 * Adapted from GrowthChart but tailored for investing module.
 *
 * Shows:
 * - Empty state when no calculations
 * - Line chart of projected balance over time
 * - Principal vs. earnings breakdown via color
 */

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { useInvestmentState } from '@/hooks/useInvestmentState';
import { INVESTMENT_SCENARIOS } from '@/domain/investmentRates';

export function InvestingGrowthChart() {
  const { allProjections, selectedScenario } = useInvestmentState();

  // Empty state
  if (!allProjections) {
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-black">Investment Projection</h3>
        </div>
        <div className="rounded-lg border border-border/70 bg-white p-12">
          <div className="flex flex-col items-center justify-center text-center">
            <TrendingUp className="mb-4 h-12 w-12 text-gray-300" />
            <p className="text-base font-medium text-black/80">Ready to grow your investments?</p>
            <p className="mt-1 text-sm text-black/60">Run a projection to see your growth chart</p>
          </div>
        </div>
      </div>
    );
  }

  // Get selected projection
  const projection = allProjections[selectedScenario];
  const scenarioDef = INVESTMENT_SCENARIOS[selectedScenario];

  // Chart data: show every 12 months for clarity
  const chartData = projection.monthlyData
    .filter((d) => d.month % 12 === 0 || d.month === 0)
    .map((d) => ({
      ...d,
      yearLabel: `Year ${d.year}`,
    }));

  return (
    <div className="w-full space-y-4 rounded-lg border border-gray-200 bg-white p-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            {scenarioDef.name} Scenario
          </h3>
          <p className="mt-1 text-xs text-gray-600">
            {scenarioDef.annualReturnRate * 100}% APY growth projection
          </p>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={250} minHeight={250} className="sm:h-[300px] lg:h-[400px]">
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 15, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="yearLabel"
            tick={{ fontSize: 12, fill: '#6b7280' }}
            stroke="#d1d5db"
          />
          <YAxis
            tickFormatter={(value) => {
              if (value < 1000) return `₱${value}`;
              return `₱${(value / 1000).toFixed(0)}k`;
            }}
            tick={{ fontSize: 12, fill: '#6b7280' }}
            stroke="#d1d5db"
            domain={[
              (dataMin: number) =>
                dataMin - (dataMin * 0.1),
              (dataMax: number) =>
                dataMax + (dataMax * 0.1),
            ]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
            }}
            formatter={(value) => [
              `₱${(value as number).toLocaleString('en-PH', {
                maximumFractionDigits: 0,
              })}`,
              'Balance',
            ]}
            labelStyle={{ color: '#1f2937' }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="balance"
            stroke={scenarioDef.color === 'blue-300' ? '#60a5fa' : 
                   scenarioDef.color === 'blue-600' ? '#2563eb' :
                   '#1e40af'}
            strokeWidth={2}
            dot={false}
            name="Total Balance"
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="totalContributed"
            stroke="#9ca3af"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            name="Total Invested"
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3 border-t border-gray-100 pt-4">
        <div>
          <p className="text-xs font-medium text-gray-600">Final Balance</p>
          <p className="mt-1 text-base font-bold text-gray-900">
            ₱{projection.finalBalance.toLocaleString('en-PH', {
              maximumFractionDigits: 0,
            })}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-600">Total Invested</p>
          <p className="mt-1 text-base font-bold text-gray-900">
            ₱{projection.totalContributed.toLocaleString('en-PH', {
              maximumFractionDigits: 0,
            })}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-600">Estimated Gain</p>
          <p className="mt-1 text-base font-bold text-green-600">
            ₱{projection.estimatedGain.toLocaleString('en-PH', {
              maximumFractionDigits: 0,
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
