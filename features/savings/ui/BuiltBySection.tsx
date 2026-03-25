import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function BuiltBySection() {
  return (
    <section className="mx-auto w-full bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center space-y-6">
          <h2 className="text-4xl font-semibold text-white">Start your financial journey <span className="italic">today</span></h2>
          <p className="mx-auto max-w-2xl text-lg text-blue-100">
            Join thousands of users already mastering their finances. Get started with a free account—no credit card required.
          </p>
          <Button size="lg" className="rounded-xl px-8 bg-blue-600 text-white hover:bg-blue-700" asChild>
            <Link href="/calculator">Create my free account</Link>
          </Button>
        </div>

        <div className="mt-16 border-t border-blue-700 pt-12">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-300">Built by</p>
            <p className="mt-3 text-xl font-bold text-white">Cataláyx Solutions</p>
            <p className="mt-2 text-base text-blue-100">
              Cataláyx Solutions is dedicated to creating innovative financial tools that empower Filipinos to make smarter savings decisions.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
