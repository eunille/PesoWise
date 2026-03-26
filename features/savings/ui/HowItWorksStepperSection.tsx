'use client'

import { useEffect, useRef, useState } from 'react'

interface Step {
  number: number
  title: string
  description: string
}

const SAVINGS_STEPS: Step[] = [
  {
    number: 1,
    title: 'Enter your plan',
    description: 'Add starting amount, monthly top-up, and your target duration.',
  },
  {
    number: 2,
    title: 'Compare estimates',
    description: 'See side-by-side projected balances using transparent assumptions.',
  },
  {
    number: 3,
    title: 'Review confidence',
    description: 'Check verification dates, source context, and confidence labels before deciding.',
  },
]

const INVESTING_STEPS: Step[] = [
  {
    number: 1,
    title: 'Choose your index funds',
    description: 'Select from recommended index funds aligned with your risk tolerance and investment horizon.',
  },
  {
    number: 2,
    title: 'Review projected growth',
    description: 'See potential returns based on historical performance and your contribution plan.',
  },
  {
    number: 3,
    title: 'Confirm your strategy',
    description: 'Review asset allocation and start investing with confidence.',
  },
]

export function HowItWorksStepperSection() {
  const [activeTab, setActiveTab] = useState<'savings' | 'investing'>('savings')
  const [visibleSteps, setVisibleSteps] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  const steps = activeTab === 'savings' ? SAVINGS_STEPS : INVESTING_STEPS

  useEffect(() => {
    setVisibleSteps([])

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepIndex = parseInt(entry.target.getAttribute('data-step') || '0')
            setVisibleSteps((prev) => {
              if (!prev.includes(stepIndex)) {
                return [...prev, stepIndex]
              }
              return prev
            })
          }
        })
      },
      { threshold: 0.3 }
    )

    const stepElements = sectionRef.current?.querySelectorAll('[data-step]')
    stepElements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [activeTab])

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative mx-auto w-full max-w-4xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="mb-16 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">How it works</p>
        <h2 className="mb-8 text-5xl font-semibold tracking-tight text-black">Three simple steps</h2>

        {/* Tab buttons */}
        <div className="flex justify-center gap-8">
          <button
            onClick={() => setActiveTab('savings')}
            className={`pb-3 font-semibold transition-colors duration-200 ${
              activeTab === 'savings'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'border-b-2 border-transparent text-black/50 hover:text-black'
            }`}
          >
            Savings
          </button>
          <button
            onClick={() => setActiveTab('investing')}
            className={`pb-3 font-semibold transition-colors duration-200 ${
              activeTab === 'investing'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'border-b-2 border-transparent text-black/50 hover:text-black'
            }`}
          >
            Index Investing
          </button>
        </div>
      </div>

      <div className="relative space-y-20">
        {/* Vertical line background */}
        <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-blue-200 via-blue-100 to-transparent" />

        {steps.map((step) => {
          const isVisible = visibleSteps.includes(step.number)
          const isLeft = step.number % 2 === 1

          return (
            <div
              key={step.number}
              data-step={step.number}
              className={`min-h-96 transition-all duration-700 flex items-center ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <div className={`grid gap-8 lg:grid-cols-2 lg:items-center ${isLeft ? '' : 'lg:[direction:rtl]'}`}>
                {/* Content */}
                <div className="space-y-4">
                  <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                    Step {step.number}
                  </p>
                  <h3 className="text-3xl font-semibold text-black">{step.title}</h3>
                  <p className="text-lg leading-relaxed text-black/70">{step.description}</p>
                </div>

                {/* Step circle */}
                <div className="flex justify-center lg:block">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-100 to-blue-50" />
                    </div>
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-blue-600 shadow-lg">
                      <span className="text-xl font-bold text-white">{step.number}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
