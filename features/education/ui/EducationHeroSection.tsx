'use client';

/**
 * Education Hero Section
 * 
 * Page header with compelling title, subtitle, and intro text.
 * Sets the tone for investment education content.
 */

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function EducationHeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 px-4 py-16 sm:px-6 lg:px-8">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-500 opacity-10 blur-3xl" />
        <div className="absolute -bottom-32 -left-40 h-80 w-80 rounded-full bg-slate-500 opacity-10 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-4xl">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-wide text-blue-200 mb-2">
            Investment Education
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Learn to Invest Smart
          </h1>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Master the fundamentals of investing with bite-sized lessons. 
            From understanding index funds to navigating market volatility, 
            we&apos;ll guide you through the concepts that matter.
          </p>
        </div>
      </div>
    </section>
  );
}
