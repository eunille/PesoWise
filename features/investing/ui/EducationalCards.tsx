'use client';

/**
 * Educational Cards Component
 *
 * Displays expandable educational content about investing concepts
 * Helps users understand key principles before investing
 */

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EDUCATIONAL_CARDS } from '@/domain/educationalContent';

export function EducationalCards() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggleCard = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  return (
    <Card className="border-border/70 shadow-sm">
      <CardHeader>
        <CardTitle>Investment Education</CardTitle>
        <CardDescription>
          Learn key investing concepts to make informed decisions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {EDUCATIONAL_CARDS.map((card) => {
            const isExpanded = expandedCard === card.id;

            return (
              <button
                key={card.id}
                onClick={() => toggleCard(card.id)}
                className="w-full text-left transition-all"
              >
                <div className="rounded-lg border border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm">
                  {/* Card Header / Trigger */}
                  <div className="flex items-center justify-between gap-3 p-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{card.title}</h3>
                      <p className="mt-1 text-sm text-gray-600">{card.shortDescription}</p>
                    </div>
                    <ChevronDown
                      size={20}
                      className={`flex-shrink-0 text-gray-400 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="border-t border-gray-100">
                      <div className="space-y-4 p-4">
                        {/* Full Description */}
                        <div>
                          <p className="text-sm leading-relaxed text-gray-700">
                            {card.fullDescription}
                          </p>
                        </div>

                        {/* Key Points */}
                        <div>
                          <h4 className="mb-2 text-sm font-semibold text-gray-900">Key Points</h4>
                          <ul className="space-y-2">
                            {card.keyPoints.map((point, idx) => (
                              <li key={idx} className="flex gap-3 text-sm text-gray-700">
                                <span className="mt-0.5 flex-shrink-0 inline-block w-1.5 h-1.5 rounded-full bg-blue-500" />
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
