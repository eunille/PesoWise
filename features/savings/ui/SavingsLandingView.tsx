import { CalculatorShowcaseSection } from "@/features/savings/ui/CalculatorShowcaseSection"

import { FAQSection } from "@/features/savings/ui/FAQSection"
import { BuiltBySection } from "@/features/savings/ui/BuiltBySection"
import { HeroSection } from "@/features/savings/ui/HeroSection"
import { HowItWorksStepperSection } from "@/features/savings/ui/HowItWorksStepperSection"
import { MainNav } from "@/features/savings/ui/MainNav"
import { PartnerStrip } from "@/features/savings/ui/PartnerStrip"

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
      <BuiltBySection />
    </main>
  )
}
