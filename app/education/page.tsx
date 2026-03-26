'use client';

import { MainNav } from "@/features/savings/ui/MainNav"
import { EducationHeroSection } from "@/features/education/ui/EducationHeroSection"
import { EducationArticleSection } from "@/features/education/ui/EducationArticleSection"
import { BuiltBySection } from "@/features/savings/ui/BuiltBySection"
import { EDUCATIONAL_CARDS } from "@/domain/educationalContent"

/**
 * Education Page
 *
 * Blog-style education page featuring investment concepts.
 * Each concept is displayed with alternating text/illustration layout.
 * Spaces for custom illustrations on the right (for even indices) and left (for odd indices).
 */

const ACCENT_COLORS = ['blue', 'green', 'amber', 'purple'] as const;
type AccentColor = typeof ACCENT_COLORS[number];

export default function EducationPage() {
  return (
    <main className="relative min-h-svh bg-white">
      <MainNav />
      
      {/* Hero Section */}
      <EducationHeroSection />

      {/* Divider */}
      <div className="border-t border-border/80 bg-white" />

      {/* Blog-Style Article Sections */}
      <div className="bg-white">
        {EDUCATIONAL_CARDS.map((card, index) => {
          // Rotate through accent colors: blue, green, amber, purple
          const accentColor = ACCENT_COLORS[index % ACCENT_COLORS.length] as AccentColor;

          return (
            <div key={card.id}>
              <EducationArticleSection
                index={index}
                title={card.title}
                description={card.fullDescription}
                keyPoints={card.keyPoints}
                accentColor={accentColor}
              >
                {/* Illustration Placeholder */}
                {index === 0 ? (
                  <img
                    src="/images/undraw_wallet_diag.svg"
                    alt={card.title}
                    className="w-full h-auto rounded-xl hover:shadow-md transition-shadow duration-300"
                  />
                ) : index === 1 ? (
                  <img
                    src="/images/undraw_investing_uzcu.svg"
                    alt={card.title}
                    className="w-full h-auto rounded-xl hover:shadow-md transition-shadow duration-300"
                  />
                ) : index === 2 ? (
                  <img
                    src="/images/undraw_goals_dwgr.svg"
                    alt={card.title}
                    className="w-full h-auto rounded-xl hover:shadow-md transition-shadow duration-300"
                  />
                ) : index === 3 ? (
                  <img
                    src="/images/undraw_savings_d97f.svg"
                    alt={card.title}
                    className="w-full h-auto rounded-xl hover:shadow-md transition-shadow duration-300"
                  />
                ) : index === 4 ? (
                  <img
                    src="/images/undraw_inflation_ht0o.svg"
                    alt={card.title}
                    className="w-full h-auto rounded-xl hover:shadow-md transition-shadow duration-300"
                  />
                ) : index === 5 ? (
                  <img
                    src="/images/undraw_time-change_lyxp.svg"
                    alt={card.title}
                    className="w-full h-auto rounded-xl hover:shadow-md transition-shadow duration-300"
                  />
                ) : (
                  <div className="flex items-center justify-center h-80 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200 hover:border-blue-200 transition-colors">
                    <div className="text-center px-4">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-3">
                        <svg
                          className="w-8 h-8 text-blue-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <p className="text-sm font-semibold text-gray-600">Illustration Space</p>
                      <p className="text-xs text-gray-500 mt-1">Your custom artwork here</p>
                    </div>
                  </div>
                )}
              </EducationArticleSection>

              {/* Divider between sections (except last) */}
              {index < EDUCATIONAL_CARDS.length - 1 && (
                <div className="px-4 sm:px-6 lg:px-8 py-4">
                  <div className="mx-auto max-w-6xl">
                    <div className="h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent rounded-full" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* CTA Section before Footer */}
      <section className="border-t border-border/80 bg-gradient-to-b from-white to-blue-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-black">
            Ready to Start Investing?
          </h2>
          <p className="mt-4 text-base text-black/70">
            Use our calculators to project your investment growth and find the right strategy for your goals.
          </p>
          <div className="mt-8">
            <a
              href="/calculator?tab=investing"
              className="inline-flex items-center justify-center px-6 py-3 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Open Investment Calculator
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <BuiltBySection />
    </main>
  )
}
