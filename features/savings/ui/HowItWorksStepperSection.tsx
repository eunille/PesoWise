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
  const [scrollProgress, setScrollProgress] = useState(0)
  const [stepsProgress, setStepsProgress] = useState<Record<number, number>>({})
  const sectionRef = useRef<HTMLElement>(null)
  const stepsRefsMap = useRef<Record<number, HTMLDivElement | null>>({})

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

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const sectionTop = rect.top
      const sectionHeight = rect.height
      const windowHeight = window.innerHeight

      // Calculate overall section progress
      const visibleStart = Math.max(0, -sectionTop)
      const visibleEnd = Math.min(sectionHeight, windowHeight - sectionTop)
      const visibleHeight = Math.max(0, visibleEnd - visibleStart)

      let progress = 0
      if (sectionTop + sectionHeight < 0) {
        progress = 100
      } else if (sectionTop > windowHeight) {
        progress = 0
      } else {
        progress = (visibleStart / sectionHeight) * 100
      }

      setScrollProgress(Math.min(100, Math.max(0, progress)))

      // Calculate per-step progress for scroll-linked animations
      const stepProgressMap: Record<number, number> = {}
      
      Object.entries(stepsRefsMap.current).forEach(([stepNumStr, stepEl]) => {
        if (!stepEl) return
        
        const stepNum = parseInt(stepNumStr)
        const stepRect = stepEl.getBoundingClientRect()
        const stepTop = stepRect.top
        const stepHeight = stepRect.height
        
        // Calculate how far down the screen this step is
        // 0 = just entering bottom of viewport
        // 1 = at center of viewport
        // 2 = leaving top of viewport
        const stepProgress = 1 - (stepTop + stepHeight / 2) / (windowHeight / 2)
        const clampedProgress = Math.max(0, Math.min(1, stepProgress))
        
        stepProgressMap[stepNum] = clampedProgress
      })
      
      setStepsProgress(stepProgressMap)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Call once on mount

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
        {/* Vertical line background track */}
        <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-blue-200 via-blue-100 to-transparent" />

        {/* Animated progress line */}
        <div
          className="absolute left-1/2 top-0 w-0.5 -translate-x-1/2 transition-all duration-75"
          style={{
            height: `${scrollProgress}%`,
            background:
              scrollProgress > 66
                ? 'linear-gradient(to bottom, #1059e0, #ef4444, #eab308)'
                : scrollProgress > 33
                  ? 'linear-gradient(to bottom, #1059e0, #ef4444)'
                  : 'linear-gradient(to bottom, #1059e0, #1059e0)',
          }}
        />

        {steps.map((step) => {
          const isVisible = visibleSteps.includes(step.number)
          const isLeft = step.number % 2 === 1

          // Determine circle color based on step
          const circleColors = {
            1: 'bg-blue-600',
            2: 'bg-red-600',
            3: 'bg-yellow-500',
          } as const

          return (
            <div
              key={step.number}
              ref={(el) => {
                if (el) stepsRefsMap.current[step.number] = el
              }}
              data-step={step.number}
              className="relative min-h-96 transition-all duration-100 flex items-center"
              style={{
                transform: `translateY(${(1 - (stepsProgress[step.number] || 0)) * 20}px)`,
              }}
            >
              {/* Content wrapper - positioned left or right */}
              <div
                className={`w-full lg:w-2/5 ${isLeft ? 'pr-12' : 'ml-auto pl-12'}`}
              >
                <div className="space-y-4">
                  <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                    Step {step.number}
                  </p>
                  <h3 className="text-3xl font-semibold text-black">{step.title}</h3>
                  <p className="text-lg leading-relaxed text-black/70">{step.description}</p>
                </div>
              </div>

              {/* Step circle - centered on vertical line */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="h-16 w-16 rounded-full bg-gradient-to-br"
                      style={{
                        backgroundImage:
                          step.number === 1
                            ? 'linear-gradient(135deg, rgb(16, 89, 224, 0.1), rgb(16, 89, 224, 0.05))'
                            : step.number === 2
                              ? 'linear-gradient(135deg, rgb(220, 38, 38, 0.1), rgb(220, 38, 38, 0.05))'
                              : 'linear-gradient(135deg, rgb(234, 179, 8, 0.1), rgb(234, 179, 8, 0.05))',
                      }}
                    />
                  </div>
                  <div className={`relative flex h-16 w-16 items-center justify-center rounded-full border-4 border-white ${circleColors[step.number as keyof typeof circleColors]} shadow-lg`}>
                    <span className="text-xl font-bold text-white">{step.number}</span>
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
