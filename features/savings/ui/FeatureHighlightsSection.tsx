'use client'

import { useEffect, useRef, useState } from 'react'
import { PiggyBank, TrendingUp, BookOpen } from "lucide-react"
import { FeatureHighlightCard } from "@/features/shared/ui/FeatureHighlightCard"

export function FeatureHighlightsSection() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  const features = [
    {
      icon: <PiggyBank className="size-10" />,
      title: "Smart Savings",
      description:
        "Compare verified rates across PH platforms, track growth with precision, get transparent savings estimates.",
      benefits: ["Compare rates across platforms", "Track growth with precision", "Get verified data"],
      cta: {
        label: "Compare Now",
        href: "/calculator",
      },
      accentColor: "blue" as const,
    },
    {
      icon: <TrendingUp className="size-10" />,
      title: "Investment Planning",
      description:
        "Build personalized investment strategies tailored to your goals, see growth projections, and understand the power of compound returns.",
      benefits: ["Build personalized strategies", "See growth projections", "Learn compound effects"],
      cta: {
        label: "Explore Investing",
        href: "/calculator?tab=investing",
      },
      accentColor: "green" as const,
    },
    {
      icon: <BookOpen className="size-10" />,
      title: "Financial Learning",
      description:
        "Understand investment fundamentals, learn risk management, and build financial confidence through curated articles and guides.",
      benefits: ["Understand investment basics", "Learn risk management", "Build financial confidence"],
      cta: {
        label: "Read Articles",
        href: "/education",
      },
      accentColor: "purple" as const,
    },
  ]

  // Set up Intersection Observer for scroll-triggered card reveals
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardIndex = parseInt(entry.target.getAttribute('data-card') || '0')
            setVisibleCards((prev) => {
              if (!prev.includes(cardIndex)) {
                return [...prev, cardIndex]
              }
              return prev
            })
          }
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    )

    const cardElements = sectionRef.current?.querySelectorAll('[data-card]')
    cardElements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="border-b border-border/80 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">Powerful Tools</p>
          <h2 className="text-3xl font-semibold tracking-tight text-black sm:text-4xl">
            Everything you need to make smarter money decisions
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              data-card={index}
              className="opacity-100"
            >
              <FeatureHighlightCard {...feature} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
