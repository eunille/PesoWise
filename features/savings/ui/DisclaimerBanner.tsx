import { AlertCircle } from "lucide-react"

export function DisclaimerBanner() {
  return (
    <aside className="rounded-2xl border border-amber-300/50 bg-amber-50/70 p-4 text-sm text-amber-900 dark:border-amber-500/30 dark:bg-amber-950/30 dark:text-amber-100">
      <div className="flex items-start gap-3">
        <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        <p>
          Projections are estimates based on publicly available rates and rules. Actual returns may differ
          due to provider updates, conditions, taxes, and account limits.
        </p>
      </div>
    </aside>
  )
}
