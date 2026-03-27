import { FAQSection } from "@/features/savings/ui/FAQSection"
import { BuiltBySection } from "@/features/savings/ui/BuiltBySection"
import { IllustrationStrip } from "@/features/savings/ui/IllustrationStrip"
import { HeroSection } from "@/features/savings/ui/HeroSection"
import { WhatWeDeliverSection } from "@/features/savings/ui/WhatWeDeliverSection"
import { HowItWorksStepperSection } from "@/features/savings/ui/HowItWorksStepperSection"
import { MainNav } from "@/features/savings/ui/MainNav"
import { PartnerStrip } from "@/features/savings/ui/PartnerStrip"
import { EmailSignup } from "@/components/EmailSignup"
import { ProblemSolutionCard } from "@/features/savings/ui/ProblemSolutionCard"
import {
  CalculatorMockup,
  ConfidenceMockup,
  ProblemIllustrationPlaceholder,
} from "@/features/savings/ui/ProblemoSolutionMockups"

export function SavingsLandingView() {
  return (
    <main className="relative min-h-svh bg-white">
      <MainNav />
      <div className="border-b border-border/80 bg-white">
        <HeroSection />
      </div>

      {/* Problem & Solution Section 1 */}
      <ProblemSolutionCard
        badge="THE PROBLEM"
        badgeColor="blue"
        headline="People Don't Know Where To Save Or Invest"
        description="Most people and students aren't sure where their money should go. They don't understand the real advantages of saving versus investing. With so many banks and financial products available, choosing the right one feels overwhelming."
        benefits={[
          "Confused about saving vs. investing — what's the difference?",
          "Too many banks and products to compare easily",
          "No clear way to see which choice actually works best for you",
        ]}
        ctaText="Create Calculation"
        ctaHref="/calculator?tab=savings"
        visual={<CalculatorMockup />}
      />

      {/* Section Divider */}
      <div className="bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </div>
      </div>

      {/* Problem & Solution Section 2 */}
      <ProblemSolutionCard
        badge="THE CHALLENGE"
        badgeColor="amber"
        headline="Without Clear Comparisons, You Make Worse Financial Decisions"
        description="When you can't easily compare your options side-by-side, you either give up and stick with whatever your bank suggests, or make decisions based on incomplete information. Interest rates change constantly, and outdated data means you're losing money without realizing it."
        benefits={[
          "It's easy to accidentally choose the worst option for YOUR situation",
          "You might miss better savings growth from another bank or product",
          "Rate changes leave you with stale information that costs you real money",
        ]}
        ctaText="Compare & Calculate"
        ctaHref="/calculator?tab=savings"
        visual={<ConfidenceMockup />}
        isReversed={true}
      />

      <WhatWeDeliverSection />
      <PartnerStrip />
      <HowItWorksStepperSection />
      <FAQSection />

      {/* Newsletter Signup Section */}
      <section className="border-t border-blue-100 bg-gradient-to-br from-blue-50 via-white to-blue-50 px-4 py-12 sm:py-16 md:py-20 lg:py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-blue-200 bg-white/80 backdrop-blur p-6 sm:p-8 md:p-12 lg:p-16">
            <div className="grid gap-8 sm:gap-10 md:gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Left: Text Content */}
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-black">Stay Updated</h2>
                <p className="mt-3 sm:mt-4 text-base sm:text-lg text-black/70">
                  Get notified when interest rates change and receive helpful savings tips delivered straight to your inbox.
                </p>
                
                {/* Benefits List */}
                <ul className="mt-6 sm:mt-8 space-y-2 sm:space-y-3">
                  <li className="flex items-center gap-2 sm:gap-3">
                    <span className="flex h-5 sm:h-6 w-5 sm:w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs sm:text-sm font-semibold text-blue-600">✓</span>
                    <span className="text-xs sm:text-sm text-black/80">Daily rate updates from verified sources</span>
                  </li>
                  <li className="flex items-center gap-2 sm:gap-3">
                    <span className="flex h-5 sm:h-6 w-5 sm:w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs sm:text-sm font-semibold text-blue-600">✓</span>
                    <span className="text-xs sm:text-sm text-black/80">Personalized savings recommendations</span>
                  </li>
                  <li className="flex items-center gap-2 sm:gap-3">
                    <span className="flex h-5 sm:h-6 w-5 sm:w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs sm:text-sm font-semibold text-blue-600">✓</span>
                    <span className="text-xs sm:text-sm text-black/80">Expert tips to grow your money smarter</span>
                  </li>
                </ul>
              </div>

              {/* Right: Email Signup Form */}
              <div className="flex flex-col justify-center">
                <div className="space-y-4">
                  <p className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-blue-600">Subscribe now</p>
                  <div className="mt-4 sm:mt-6">
                    <EmailSignup />
                  </div>
                  <p className="text-xs text-black/60">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BuiltBySection />
      <IllustrationStrip />
    </main>
  )
}
