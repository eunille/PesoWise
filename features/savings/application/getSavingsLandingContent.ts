import {
  COMPARISON_MODE_OPTIONS,
  DURATION_OPTIONS,
  PLATFORM_PLACEHOLDERS,
} from "@/features/savings/domain/constants"

export type SavingsLandingContent = {
  readonly durationOptions: typeof DURATION_OPTIONS
  readonly comparisonModeOptions: typeof COMPARISON_MODE_OPTIONS
  readonly platformPlaceholders: typeof PLATFORM_PLACEHOLDERS
}

export function getSavingsLandingContent(): SavingsLandingContent {
  return {
    durationOptions: DURATION_OPTIONS,
    comparisonModeOptions: COMPARISON_MODE_OPTIONS,
    platformPlaceholders: PLATFORM_PLACEHOLDERS,
  }
}
