export const DURATION_OPTIONS = [
  { value: "1", label: "1 month" },
  { value: "6", label: "6 months" },
  { value: "12", label: "12 months" },
  { value: "24", label: "24 months" },
] as const

export const COMPARISON_MODE_OPTIONS = [
  { value: "base-only", label: "Base rates only" },
  { value: "include-promos", label: "Include promo rates" },
] as const

export const PLATFORM_PLACEHOLDERS = ["GoTyme", "Maya", "GSave", "MariBank"] as const
