'use client'

import { Calendar, TrendingUp, PiggyBank } from 'lucide-react'
import { ReactNode } from 'react'

interface DeliverableCard {
  title: string
  subtitle: string
  description: string
  icon: ReactNode
}

export function WhatWeDeliverSection() {
  const deliverables: DeliverableCard[] = [
    {
      title: 'Real-time Rate Tracking',
      subtitle: 'Updated daily from verified sources',
      description:
        'Know exactly when information was last updated, with confidence labels so you can trust your decisions.',
      icon: <Calendar className="size-10 text-blue-600" />,
    },
    {
      title: 'Smart Comparison Engine',
      subtitle: '5 platforms compared instantly',
      description:
        'See all your options side-by-side with transparent assumptions and clear interest breakdowns.',
      icon: <TrendingUp className="size-10 text-blue-600" />,
    },
    {
      title: 'Transparent Projections',
      subtitle: 'Browse confident savings estimates',
      description:
        'Understand exactly how your money grows with clear, adjustable assumptions you control.',
      icon: <PiggyBank className="size-10 text-blue-600" />,
    },
  ]

  return (
    <section className="border-b border-border/80 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-block">
            <span className="rounded-full bg-blue-100 px-4 py-2 text-xs font-semibold uppercase text-blue-600">
              What We Deliver
            </span>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-black sm:text-4xl lg:text-5xl">
            Your Savings Simplified
          </h2>
          <p className="text-base text-black/70 sm:text-lg">
            Everything you need to make confident financial decisions
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {deliverables.map((card) => (
            <div
              key={card.title}
              className="rounded-lg border border-border bg-white p-8"
            >
              {card.icon}
              <h3 className="mb-2 mt-6 text-xl font-bold text-black">
                {card.title}
              </h3>
              <p className="mb-4 text-sm font-semibold text-blue-600">
                {card.subtitle}
              </p>
              <p className="text-base text-black/70">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
