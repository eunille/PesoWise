'use client'

/**
 * MockupCard: Professional mockup UI component for ProblemSolution sections
 * Shows sample projections and financial data
 */

import Image from 'next/image'

export function CalculatorMockup() {
  return (
    <Image
      src="/images/undraw_invest_t695.svg"
      alt="Investment illustration showing financial growth and strategy"
      width={600}
      height={600}
      className="w-full h-auto"
      priority
    />
  )
}

export function ConfidenceMockup() {
  return (
    <Image
      src="/images/undraw_too-many-options_lpt0.svg"
      alt="Illustration of someone overwhelmed by too many financial options"
      width={600}
      height={600}
      className="w-full h-auto"
      priority
    />
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
