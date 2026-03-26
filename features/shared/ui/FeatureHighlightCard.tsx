import { Button } from "@/components/ui/button"
import { Check, ArrowRight } from "lucide-react"
import Link from "next/link"

export interface FeatureHighlightCardProps {
  icon: React.ReactNode
  title: string
  description: string
  benefits: string[]
  cta: {
    label: string
    href: string
    variant?: "default" | "outline"
  }
  accentColor?: "blue" | "green" | "purple"
  preview?: React.ReactNode
}

const accentColorMap = {
  blue: "bg-blue-50/30 hover:bg-blue-50/60",
  green: "bg-emerald-50/30 hover:bg-emerald-50/60",
  purple: "bg-purple-50/30 hover:bg-purple-50/60",
}

export function FeatureHighlightCard({
  icon,
  title,
  description,
  benefits,
  cta,
  accentColor = "blue",
  preview,
}: FeatureHighlightCardProps) {
  const bgClass = accentColorMap[accentColor]

  return (
    <div
      className={`card-hover-lift flex flex-col gap-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm ${bgClass}`}
    >
      {/* Icon Area: Subtle rotate on hover */}
      <div className="flex justify-center" aria-hidden="true">
        <div className="flex h-12 w-12 items-center justify-center text-gray-700 transition-transform duration-300 ease-out group-hover:rotate-12">
          {icon}
        </div>
      </div>

      {/* Title: Smooth color transition on hover */}
      <h3 className="text-center text-xl font-semibold text-black transition-colors duration-300 ease-out">
        {title}
      </h3>

      {/* Description: Smooth color transition */}
      <p className="text-center text-base text-black/70 transition-colors duration-300 ease-out">
        {description}
      </p>

      {/* Benefits List: Smooth transitions */}
      <ul className="space-y-2">
        {benefits.map((benefit, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <Check className="mt-0.5 size-4 flex-shrink-0 text-emerald-600 transition-colors duration-300 ease-out" aria-hidden="true" />
            <span className="text-sm text-black/60 transition-colors duration-300 ease-out">
              {benefit}
            </span>
          </li>
        ))}
      </ul>

      {/* Optional Preview */}
      {preview && <div className="my-2">{preview}</div>}

      {/* CTA Button: Smooth transitions and button-specific hover effects */}
      <div className="mt-auto pt-2">
        <Button
          size="lg"
          variant={cta.variant || "default"}
          className="button-transition w-full rounded-xl"
          asChild
        >
          <Link href={cta.href} className="inline-flex items-center justify-center gap-2">
            {cta.label}
            <ArrowRight className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
