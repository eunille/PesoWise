import { FAQSection } from "@/features/savings/ui/FAQSection"
import { BuiltBySection } from "@/features/savings/ui/BuiltBySection"
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
        headline="Streamline Savings With Seamless Projections"
        description="Get instant, transparent projections across all platforms with clear assumptions—right in your browser."
        benefits={[
          "Real-time projection tracking",
          "Compare providers in one place",
          "Transparent assumptions every time",
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
        headline="Plan Smarter With Ease"
        description="With constantly changing rates and multiple products, outdated information leads to poor savings decisions. Always get verified, up-to-date data."
        benefits={[
          "Daily rate updates from verified sources",
          "Clear confidence scoring and transparency",
          "Know exactly when information was verified",
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
      <section className="border-t border-border/80 bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-black">Stay Updated</h2>
          <p className="mt-2 text-base text-black/70">
            Get notified when interest rates change and receive helpful savings tips.
          </p>
          <div className="mt-8 max-w-md mx-auto">
            <EmailSignup />
          </div>
        </div>
      </section>

      <BuiltBySection />
    </main>
  )
}
