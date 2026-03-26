'use client';

import { ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface CollapsibleSectionProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: ReactNode;
}

export function CollapsibleSection({
  title,
  isExpanded,
  onToggle,
  children,
}: CollapsibleSectionProps) {
  return (
    <Card>
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 p-6 text-left cursor-pointer hover:bg-muted/50 transition-colors rounded-xl -m-6 p-6"
        aria-expanded={isExpanded}
      >
        <h3 className="text-base font-semibold text-gray-700">{title}</h3>
        <ChevronDown
          className={`flex-shrink-0 text-gray-700 transition-transform duration-300 ${
            isExpanded ? 'rotate-180' : ''
          }`}
          size={20}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="px-6 pb-6 text-gray-700">{children}</div>
      </div>
    </Card>
  );
}
