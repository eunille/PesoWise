'use client'

/**
 * MockupCard: Professional mockup UI component for ProblemSolution sections
 * Shows sample projections and financial data
 */

export function CalculatorMockup() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Projected Savings</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-black">₱16,058.94</span>
            <span className="text-xs text-gray-500">12-month estimate</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold text-blue-600">PesoWise</p>
        </div>
      </div>

      {/* Chart mockup */}
      <div className="rounded-lg bg-white p-4">
        <p className="mb-3 text-xs text-gray-500 uppercase tracking-wide">Better savings visibility</p>
        <div className="flex h-20 items-end justify-around gap-2">
          {[40, 50, 65, 75, 60].map((height, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-lg bg-gradient-to-t from-blue-500 to-blue-400"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 p-3">
        <p className="text-xs text-center font-semibold text-blue-700">
          Clear assumptions, verified rates
        </p>
      </div>
    </div>
  )
}

export function ConfidenceMockup() {
  return (
    <div className="space-y-4">
      {/* Top card */}
      <div className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4">
        <div className="space-y-1 flex-1">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Platforms compared</p>
          <p className="text-xl font-bold text-black">5 options</p>
        </div>
        <div className="flex items-center justify-center h-16 w-16 bg-gray-100 rounded-lg">
          <div className="flex gap-1">
            {[40, 60, 50, 70, 55].map((height, i) => (
              <div
                key={i}
                className="w-1.5 rounded-full bg-blue-600"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom card */}
      <div className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4">
        <div className="space-y-1 flex-1">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Interest earned</p>
          <p className="text-2xl font-bold text-blue-600">₱8,240</p>
        </div>
        <div className="flex items-center justify-center h-16 w-16 bg-blue-50 rounded-lg">
          <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7h8m0 0v8m0-8L7 17"
            />
          </svg>
        </div>
      </div>

      {/* Status badge */}
      <div className="rounded-lg bg-green-50 p-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-green-700">✓ Updated Today</p>
          <p className="text-xs text-green-600 font-medium">High Confidence</p>
        </div>
      </div>
    </div>
  )
}

export function ProblemIllustrationPlaceholder() {
  return (
    <div className="aspect-square flex items-center justify-center rounded-lg bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="text-center">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <p className="mt-2 text-sm font-medium text-gray-600">Illustration space</p>
        <p className="mt-1 text-xs text-gray-500">(Your image here)</p>
      </div>
    </div>
  )
}
