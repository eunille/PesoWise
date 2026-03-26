import { Badge } from "@/components/ui/badge"
import { BookOpen, PiggyBank, TrendingUp } from "lucide-react"

interface FeatureIndicatorsProps {
  variant?: 'default' | 'minimal'
  align?: 'left' | 'center'
  gap?: 'sm' | 'md'
}

const features = [
  {
    icon: PiggyBank,
    label: 'Savings',
  },
  {
    icon: TrendingUp,
    label: 'Investing',
  },
  {
    icon: BookOpen,
    label: 'Learning',
  },
]

export function HeroFeatureIndicators({
  variant = 'default',
  align = 'left',
  gap = 'md',
}: FeatureIndicatorsProps) {
  const gapClass = gap === 'sm' ? 'gap-2' : 'gap-3'
  const alignClass = align === 'center' ? 'justify-center' : 'justify-start'

  return (
    <div className={`flex flex-wrap items-center ${gapClass} ${alignClass}`}>
      {features.map((feature) => {
        const Icon = feature.icon
        
        if (variant === 'minimal') {
          return (
            <Badge key={feature.label} variant="secondary" className="rounded-lg px-2 py-1">
              <Icon className="h-3 w-3" aria-label={feature.label} />
            </Badge>
          )
        }

        return (
          <Badge key={feature.label} variant="secondary" className="rounded-lg px-3 py-1.5">
            <Icon className="mr-1.5 h-3.5 w-3.5" />
            <span className="text-xs font-semibold uppercase tracking-wide">{feature.label}</span>
          </Badge>
        )
      })}
    </div>
  )
}
