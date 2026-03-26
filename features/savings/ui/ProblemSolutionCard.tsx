'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ReactNode } from "react"

interface ProblemSolutionCardProps {
  badge: string
  badgeColor?: 'blue' | 'purple' | 'amber'
  headline: string
  description: string
  benefits: string[]
  ctaText: string
  ctaHref: string
  visual: ReactNode
  isReversed?: boolean
}

const BADGE_COLORS = {
  blue: 'bg-blue-100 text-blue-600',
  purple: 'bg-purple-100 text-purple-600',
  amber: 'bg-amber-100 text-amber-600',
}

export function ProblemSolutionCard({
  badge,
  badgeColor = 'blue',
  headline,
  description,
  benefits,
  ctaText,
  ctaHref,
  visual,
  isReversed = false,
}: ProblemSolutionCardProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div
        className={`grid gap-8 lg:grid-cols-2 lg:items-center ${
          isReversed ? 'lg:[direction:rtl]' : ''
        }`}
      >
        {/* Left: Visual (illustration or mockup) */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 p-4">
            {visual}
          </div>
        </div>

        {/* Right: Content */}
        <div className="space-y-6">
          {/* Badge */}
          <div className="inline-block">
            <span
              className={`${BADGE_COLORS[badgeColor]} inline-block rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider`}
            >
              {badge}
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl lg:text-5xl">
            {headline}
          </h2>

          {/* Description */}
          <p className="text-base leading-relaxed text-black/70 sm:text-lg">
            {description}
          </p>

          {/* Benefits List */}
          <ul className="space-y-3">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="mt-1 flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-black/80">{benefit}</span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <div className="pt-4">
            <Button size="lg" className="rounded-xl px-8" asChild>
              <Link href={ctaHref}>{ctaText}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
