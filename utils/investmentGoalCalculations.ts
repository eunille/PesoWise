/**
 * Reverse Investment Calculations
 *
 * Given a target amount and timeline, calculate required contributions.
 * Uses the same monthly compounding logic as forward projections.
 *
 * Formula source: FV = PV(1+r)^n + PMT * [((1+r)^n - 1) / r]
 * Where: FV = future value, PV = present value (initial), PMT = periodic payment
 *
 * For finding PMT (monthly contribution):
 * PMT = (FV - PV(1+r)^n) / [((1+r)^n - 1) / r]
 *
 * For finding PV (initial lump sum):
 * PV = (FV - PMT * [((1+r)^n - 1) / r]) / (1+r)^n
 */

/**
 * Calculate required monthly contribution to reach a target amount
 * @param targetAmount - Desired final balance
 * @param durationMonths - Investment timeline in months
 * @param annualRate - Annual return rate as decimal (e.g., 0.08 for 8%)
 * @param initialAmount - Starting lump sum (default: 0)
 * @returns Required monthly contribution
 */
export function calculateRequiredMonthlyContribution(
  targetAmount: number,
  durationMonths: number,
  annualRate: number,
  initialAmount: number = 0
): number {
  if (durationMonths <= 0 || annualRate < 0 || targetAmount <= 0) {
    return 0;
  }

  const monthlyRate = annualRate / 12;

  // Avoid division by zero
  if (monthlyRate === 0) {
    return Math.max(0, (targetAmount - initialAmount) / durationMonths);
  }

  // Future value of initial amount
  const fvInitial = initialAmount * Math.pow(1 + monthlyRate, durationMonths);

  // Remaining amount needed from monthly contributions
  const remainingForMonthly = targetAmount - fvInitial;

  // Future value of annuity factor
  const fvAnnuityFactor = (Math.pow(1 + monthlyRate, durationMonths) - 1) / monthlyRate;

  // Required monthly contribution
  const monthlyContribution = remainingForMonthly / fvAnnuityFactor;

  return Math.max(0, monthlyContribution);
}

/**
 * Calculate required initial lump sum to reach a target amount
 * @param targetAmount - Desired final balance
 * @param durationMonths - Investment timeline in months
 * @param annualRate - Annual return rate as decimal
 * @param monthlyContribution - Regular monthly addition (default: 0)
 * @returns Required initial lump sum
 */
export function calculateRequiredInitialAmount(
  targetAmount: number,
  durationMonths: number,
  annualRate: number,
  monthlyContribution: number = 0
): number {
  if (durationMonths <= 0 || annualRate < 0 || targetAmount <= 0) {
    return 0;
  }

  const monthlyRate = annualRate / 12;

  // Avoid division by zero
  if (monthlyRate === 0) {
    return Math.max(0, targetAmount - monthlyContribution * durationMonths);
  }

  // Future value of monthly contributions
  const fvMonthly =
    monthlyContribution *
    ((Math.pow(1 + monthlyRate, durationMonths) - 1) / monthlyRate);

  // Remaining amount needed from initial investment
  const remainingForInitial = targetAmount - fvMonthly;

  // Discount back to present value
  const initialAmount = remainingForInitial / Math.pow(1 + monthlyRate, durationMonths);

  return Math.max(0, initialAmount);
}

/**
 * Calculate three goal-achievement options
 */
export interface GoalOption {
  option: 'monthlyOnly' | 'lumpSumOnly' | 'balanced';
  initialAmount: number;
  monthlyContribution: number;
  description: string;
  recommended: boolean;
  pros: string[];
  cons: string[];
}

export function calculateGoalOptions(
  targetAmount: number,
  durationMonths: number,
  annualRate: number
): GoalOption[] {
  // Option A: Monthly contributions only
  const monthlyOnly = calculateRequiredMonthlyContribution(
    targetAmount,
    durationMonths,
    annualRate,
    0
  );

  // Option B: Lump sum only
  const lumpSumOnly = calculateRequiredInitialAmount(
    targetAmount,
    durationMonths,
    annualRate,
    0
  );

  // Option C: Balanced (20% lump sum, 80% monthly)
  const balancedInitial = lumpSumOnly * 0.2;
  const balancedMonthly = calculateRequiredMonthlyContribution(
    targetAmount,
    durationMonths,
    annualRate,
    balancedInitial
  );

  const options: GoalOption[] = [
    {
      option: 'monthlyOnly',
      initialAmount: 0,
      monthlyContribution: monthlyOnly,
      description: 'Monthly contributions only',
      recommended: false,
      pros: [
        'Build gradually over time',
        'Flexible—can adjust monthly amount',
        'Benefit from peso-cost averaging',
      ],
      cons: ['Requires consistent monthly discipline', 'High monthly requirement if short timeframe'],
    },
    {
      option: 'lumpSumOnly',
      initialAmount: lumpSumOnly,
      monthlyContribution: 0,
      description: 'Lump sum upfront',
      recommended: false,
      pros: [
        'All money working from day one',
        'Maximum compound growth period',
        'No monthly obligation',
      ],
      cons: ['Requires large upfront capital', 'Miss out on averaging benefit'],
    },
    {
      option: 'balanced',
      initialAmount: balancedInitial,
      monthlyContribution: balancedMonthly,
      description: 'Balanced approach (20% upfront + 80% monthly)',
      recommended: true,
      pros: [
        'Lower upfront cost than lump sum',
        'Regular contributions reinforce discipline',
        'Good balance of both strategies',
      ],
      cons: ['Requires both upfront capital and monthly commitment'],
    },
  ];

  return options;
}

/**
 * Validate goal inputs
 */
export function validateGoalInputs(
  targetAmount: number,
  durationMonths: number
): { valid: boolean; error?: string } {
  if (targetAmount <= 0) {
    return { valid: false, error: 'Target amount must be positive' };
  }
  if (durationMonths < 1 || durationMonths > 240) {
    return { valid: false, error: 'Timeline must be 1-240 months' };
  }
  return { valid: true };
}
