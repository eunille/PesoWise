import { CalculatorShowcaseSection } from "@/features/savings/ui/CalculatorShowcaseSection"

import { FAQSection } from "@/features/savings/ui/FAQSection"
import { BuiltBySection } from "@/features/savings/ui/BuiltBySection"
import { HeroSection } from "@/features/savings/ui/HeroSection"
import { HowItWorksStepperSection } from "@/features/savings/ui/HowItWorksStepperSection"
import { MainNav } from "@/features/savings/ui/MainNav"
import { PartnerStrip } from "@/features/savings/ui/PartnerStrip"
import { EmailSignup } from "@/components/EmailSignup"

export function SavingsLandingView() {
  return (
    <main className="relative min-h-svh bg-white">
      <MainNav />
      <div className="border-b border-border/80 bg-white">
        <HeroSection />
      </div>

      <PartnerStrip />
      <CalculatorShowcaseSection />
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
