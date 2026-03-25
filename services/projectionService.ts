/**
 * Savings projection calculation service
 * Calculates compound interest projections for specified time period
 */

export interface MonthlyProjection {
  month: number
  monthLabel: string
  balance: number
  interestEarned: number
  cumulativeInterest: number
}

export interface ProjectionResult {
  monthlyData: MonthlyProjection[]
  finalBalance: number
  totalInterestEarned: number
  initialAmount: number
  totalDeposited: number
  monthsHorizon: number
  apy: number
}

/**
 * Calculate savings growth projection over specified months
 * @param initialAmount - Starting amount in PHP
 * @param monthsHorizon - Number of months to project (1-12)
 * @param baseAPY - Annual Percentage Yield as decimal (e.g., 0.05 = 5%)
 * @param monthlyTopup - Optional monthly deposit amount (default: 0)
 * @returns Projection data with monthly breakdown and summary
 */
export const calculateProjection = (
  initialAmount: number,
  monthsHorizon: number,
  baseAPY: number,
  monthlyTopup: number = 0
): ProjectionResult => {
  // Validate inputs
  if (initialAmount <= 0) {
    throw new Error('Initial amount must be greater than 0')
  }
  if (monthsHorizon < 1 || monthsHorizon > 12) {
    throw new Error('Months horizon must be between 1 and 12')
  }
  if (baseAPY < 0) {
    throw new Error('APY cannot be negative')
  }

  const monthlyRate = baseAPY / 12
  const monthlyData: MonthlyProjection[] = []
  let currentBalance = initialAmount
  let cumulativeInterest = 0

  // Calculate month-by-month projection
  for (let month = 1; month <= monthsHorizon; month++) {
    // Add monthly topup at the beginning of the month (if any)
    currentBalance += monthlyTopup

    // Calculate interest for the month
    const monthlyInterest = currentBalance * monthlyRate
    currentBalance += monthlyInterest
    cumulativeInterest += monthlyInterest

    const monthLabel = month === 1 ? '1 month' : `Month ${month}`

    monthlyData.push({
      month,
      monthLabel,
      balance: Math.round(currentBalance * 100) / 100, // Round to 2 decimals
      interestEarned: Math.round(monthlyInterest * 100) / 100,
      cumulativeInterest: Math.round(cumulativeInterest * 100) / 100,
    })
  }

  const totalDeposited = initialAmount + monthlyTopup * monthsHorizon
  const finalBalance = monthlyData[monthlyData.length - 1].balance
  const totalInterestEarned = monthlyData[monthlyData.length - 1].cumulativeInterest

  return {
    monthlyData,
    finalBalance,
    totalInterestEarned,
    initialAmount,
    totalDeposited,
    monthsHorizon,
    apy: baseAPY,
  }
}

/**
 * Format currency for Philippine Peso display
 * @param amount - Amount to format
 * @param withDecimal - Whether to include decimal places (default: true)
 * @returns Formatted string (e.g., "₱1,234.56")
 */
export const formatPHP = (amount: number, withDecimal: boolean = true): string => {
  const formatter = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: withDecimal ? 2 : 0,
    maximumFractionDigits: withDecimal ? 2 : 0,
  })
  return formatter.format(amount)
}

/**
 * Format APY as percentage string
 * @param apy - APY as decimal (e.g., 0.05)
 * @returns Formatted string (e.g., "5.0%")
 */
export const formatAPY = (apy: number): string => {
  return `${(apy * 100).toFixed(1)}%`
}

/**
 * Calculate interest percentage added to original amount
 * @param totalInterest - Total interest earned
 * @param initialAmount - Initial deposit amount
 * @returns Percentage as decimal (e.g., 0.15 = 15%)
 */
export const getInterestPercentage = (totalInterest: number, initialAmount: number): number => {
  if (initialAmount === 0) return 0
  return (totalInterest / initialAmount) * 100
}
