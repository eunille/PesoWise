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
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8 lg:py-24">
      <div
        className={`grid gap-6 sm:gap-8 lg:grid-cols-2 lg:items-center ${
          isReversed ? 'lg:[direction:rtl]' : ''
        }`}
      >
        {/* Left: Visual (illustration or mockup) - hidden on mobile */}
        <div className="hidden sm:flex items-center justify-center">
          {visual}
        </div>

        {/* Right: Content */}
        <div className="space-y-5 sm:space-y-6">
          {/* Badge */}
          <div className="inline-block">
            <span
              className={`${BADGE_COLORS[badgeColor]} inline-block rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-semibold uppercase tracking-wider`}
            >
              {badge}
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-2xl font-bold leading-tight tracking-tight text-black sm:text-3xl md:text-4xl lg:text-5xl">
            {headline}
          </h2>

          {/* Description */}
          <p className="text-sm leading-relaxed text-black/70 sm:text-base lg:text-lg">
            {description}
          </p>

          {/* Benefits List */}
          <ul className="space-y-2 sm:space-y-3">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2 sm:gap-3">
                <div className="mt-0.5 flex-shrink-0 sm:mt-1">
                  <svg
                    className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600"
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
                <span className="text-xs font-medium text-black/80 sm:text-sm">{benefit}</span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <div className="pt-2 sm:pt-4">
            <Button size="lg" className="rounded-xl px-6 py-3 h-12 text-base w-full sm:w-auto sm:px-8" asChild>
              <Link href={ctaHref}>{ctaText}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
