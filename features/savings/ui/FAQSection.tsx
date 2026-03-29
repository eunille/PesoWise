'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

const FAQ_ITEMS = [
  {
    id: 1,
    question: 'How does PesoWise compare savings platforms?',
    answer:
      'PesoWise fetches real-time rates from supported platforms and shows you side-by-side projections based on your inputs. We use transparent assumptions and update rates daily, so you always see current data.',
  },
  {
    id: 2,
    question: 'How accurate are the projections?',
    answer:
      'Projections are based on publicly available rates and assumptions (interest calculation method, compound frequency, tax withholding). Actual returns may differ due to platform updates, market conditions, taxes, and account features. We clearly label confidence dates so you know how fresh the data is.',
  },
  {
    id: 3,
    question: 'Which platforms does PesoWise support?',
    answer:
      'Currently, we compare GoTyme, Maya, GSave (CIMB), MariBank, UnionDigital, and Tonik—leading digital banks offering competitive savings rates in the Philippines. We are actively adding more platforms to expand your options.',
  },
  {
    id: 4,
    question: 'Do you store my personal or financial data?',
    answer:
      'No. PesoWise runs entirely in your browser. Your inputs (amount, duration, etc.) are never sent to our servers. We only fetch public rate data and show you local calculations. Your financial information stays private.',
  },
  {
    id: 5,
    question: 'How often are rates updated?',
    answer: "We check platform rates daily and mark them with a \"freshness\" label so you know how current they are. Rate changes can happen at any time, so we recommend checking before you make a final decision.",
  },
  {
    id: 6,
    question: 'Can I save my calculations or compare multiple scenarios?',
    answer: "Today, you can run multiple calculations by adjusting inputs and comparing results side-by-side. Saving and exporting results is coming in a future update.",
  },
] as const

function FAQItem({
  question,
  answer,
  isOpen,
  toggle,
}: {
  readonly question: string
  readonly answer: string
  readonly isOpen: boolean
  readonly toggle: () => void
}) {
  return (
    <div className="border-b border-border/50 py-3 sm:py-4">
      <button
        onClick={toggle}
        className="flex w-full items-start justify-between gap-3 sm:gap-4 text-left transition-colors hover:text-blue-600"
      >
        <span className="text-sm sm:text-base lg:text-lg font-medium text-black leading-snug">{question}</span>
        <ChevronDown
          className={`mt-0.5 sm:mt-1 size-4 sm:size-5 flex-shrink-0 transition-transform duration-300 text-blue-600 ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>
      {isOpen && (
        <div className="mt-2 sm:mt-3 text-xs sm:text-sm lg:text-base leading-relaxed text-black/70">
          {answer}
        </div>
      )}
    </div>
  )
}

export function FAQSection() {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:py-16 md:py-20 lg:py-24 sm:px-6 lg:px-8">
      <div className="mb-8 sm:mb-10 md:mb-12 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-black">Frequently Asked Questions</h2>
        <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-black/70">These are the questions we hear more often.</p>
      </div>

      <div className="grid gap-8 sm:gap-10 md:gap-12 lg:grid-cols-2">
        {/* FAQ List */}
        <div className="space-y-0">
          {FAQ_ITEMS.map((item) => (
            <FAQItem
              key={item.id}
              question={item.question}
              answer={item.answer}
              isOpen={expandedId === item.id}
              toggle={() => setExpandedId(expandedId === item.id ? null : item.id)}
            />
          ))}
        </div>

        {/* CTA Section */}
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-8 text-center lg:p-8 lg:h-auto flex items-center justify-center">
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-black">Don&apos;t see the answer you need?</h3>
              <p className="mt-2 text-xs sm:text-sm lg:text-base text-black/70">That&apos;s ok. Just drop a message and we will get back to you ASAP.</p>
            </div>
            <Button size="lg" className="rounded-xl px-6 sm:px-8 py-3 h-12 text-base w-full sm:w-auto" asChild>
              <a href="mailto:hello@pesowise.ph">Contact us</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
