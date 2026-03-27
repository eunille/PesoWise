import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

export function BuiltBySection() {
  return (
    <section className="mx-auto w-full bg-white px-4 py-12 sm:py-16 md:py-20 lg:py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 sm:gap-12">
          {/* Left: Text Content */}
          <div className="flex-1">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-gray-600">Developed by</p>
            <h3 className="mt-3 text-lg sm:text-xl font-bold text-black">Catalyx Solutions</h3>
            <p className="mt-3 text-sm sm:text-base text-black/70 leading-relaxed">
              Dedicated to creating innovative financial tools that empower Filipinos to make smarter savings and investment decisions.
            </p>
          </div>

          {/* Right: Logo */}
          <div className="flex-shrink-0">
            <Image 
              src="/images/ctx.svg" 
              alt="Catalyx Solutions" 
              width={300}
              height={300}
              className="opacity-100 w-24 h-24 sm:w-28 sm:h-28 md:w-72 md:h-72"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
