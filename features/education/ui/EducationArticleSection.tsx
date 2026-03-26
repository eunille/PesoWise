'use client';

/**
 * Education Article Section
 * 
 * Reusable component for blog-style alternating layout.
 * Alternates between text-left/illustration-right and text-right/illustration-left.
 * 
 * @param index - Section index (0 = text left, 1 = text right, etc.)
 */

import { ReactNode } from 'react';
import { ImageIcon } from 'lucide-react';

interface EducationArticleSectionProps {
  index: number;
  title: string;
  description: string;
  keyPoints: string[];
  accentColor: 'blue' | 'green' | 'amber' | 'purple';
  children?: ReactNode;
}

const accentColors = {
  blue: {
    dot: 'bg-blue-500',
    title: 'text-blue-900',
    accent: 'text-blue-600',
  },
  green: {
    dot: 'bg-green-500',
    title: 'text-green-900',
    accent: 'text-green-600',
  },
  amber: {
    dot: 'bg-amber-500',
    title: 'text-amber-900',
    accent: 'text-amber-600',
  },
  purple: {
    dot: 'bg-purple-500',
    title: 'text-purple-900',
    accent: 'text-purple-600',
  },
};

export function EducationArticleSection({
  index,
  title,
  description,
  keyPoints,
  accentColor,
  children,
}: EducationArticleSectionProps) {
  const isEven = index % 2 === 0;
  const colors = accentColors[accentColor];

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className={`grid gap-8 lg:gap-12 lg:grid-cols-2 items-center ${
          isEven ? 'lg:grid-flow-row' : 'lg:grid-flow-row-dense'
        }`}>
          {/* Text Content */}
          <div className={isEven ? 'lg:col-span-1' : 'lg:col-span-1 lg:col-start-2'}>
            {/* Accent Dot + Title */}
            <div className="flex items-start gap-3 mb-4">
              <div className={`${colors.dot} w-3 h-3 rounded-full mt-2 flex-shrink-0`} />
              <h2 className={`text-3xl font-bold tracking-tight ${colors.title}`}>
                {title}
              </h2>
            </div>

            {/* Description */}
            <p className="text-base text-gray-600 mb-6 leading-relaxed">
              {description}
            </p>

            {/* Key Points */}
            {keyPoints.length > 0 && (
              <div className="space-y-3">
                {keyPoints.map((point, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className={`${colors.accent} text-lg font-bold flex-shrink-0`}>
                      •
                    </div>
                    <p className="text-sm text-gray-700">{point}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Illustration / Image Placeholder */}
          <div className={isEven ? 'lg:col-span-1 lg:col-start-2' : 'lg:col-span-1'}>
            {children ? (
              children
            ) : (
              <div className="flex items-center justify-center h-80 bg-gray-100 rounded-lg border-2 border-gray-200">
                <div className="text-center">
                  <ImageIcon 
                    size={48} 
                    className="mx-auto text-gray-400 mb-2" 
                  />
                  <p className="text-sm text-gray-500">Illustration placeholder</p>
                  <p className="text-xs text-gray-400 mt-1">Add your image here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
