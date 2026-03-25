/**
 * Investment Recommendation Engine
 *
 * Generates educational, scenario-based guidance from current
 * investing inputs and projection outputs.
 */

import type { AllInvestmentProjections } from '@/domain/investmentTypes';
import type { ScenarioType } from '@/domain/investmentRates';

export interface InvestmentRecommendation {
  title: string;
  summary: string;
  actionPoints: string[];
}

const SHORT_HORIZON_YEARS = 3;
const MEDIUM_HORIZON_YEARS = 7;
const HIGH_MONTHLY_CONTRIBUTION_RATIO = 0.08;

const SCENARIO_LABEL: Record<ScenarioType, string> = {
  conservative: 'Conservative',
  moderate: 'Moderate',
  growth: 'Growth',
};

const formatPeso = (value: number): string => {
  return `PHP ${value.toLocaleString('en-PH', { maximumFractionDigits: 0 })}`;
};

export function generateInvestmentRecommendation(params: {
  initialAmount: number;
  monthlyContribution: number;
  durationMonths: number;
  selectedScenario: ScenarioType;
  allProjections: AllInvestmentProjections | null;
}): InvestmentRecommendation | null {
  const {
    initialAmount,
    monthlyContribution,
    durationMonths,
    selectedScenario,
    allProjections,
  } = params;

  if (!allProjections) {
    return null;
  }

  const years = durationMonths / 12;
  const selectedProjection = allProjections[selectedScenario];
  const conservativeProjection = allProjections.conservative;
  const growthProjection = allProjections.growth;
  const totalContributed = selectedProjection.totalContributed;

  const effectiveBase = Math.max(initialAmount, monthlyContribution * 12, 1);
  const monthlyContributionRatio = monthlyContribution / effectiveBase;

  if (years <= SHORT_HORIZON_YEARS) {
    return {
      title: 'Short-Term Priority: Capital Stability',
      summary:
        'Your timeline is relatively short, so preserving capital and using realistic return assumptions should come first.',
      actionPoints: [
        `Use the conservative scenario as your planning baseline (projected value ${formatPeso(conservativeProjection.finalBalance)}).`,
        'Keep emergency funds outside market investments to avoid forced withdrawals during volatility.',
        'If this goal is fixed-date, consider adding more monthly contribution instead of relying on higher return assumptions.',
      ],
    };
  }

  if (years <= MEDIUM_HORIZON_YEARS) {
    return {
      title: 'Balanced Path: Growth With Control',
      summary:
        'Your timeline supports moderate growth while still needing a manageable risk profile.',
      actionPoints: [
        `${SCENARIO_LABEL[selectedScenario]} projection reaches about ${formatPeso(selectedProjection.finalBalance)} over ${years.toFixed(1)} years.`,
        `Growth scenario may add upside (about ${formatPeso(growthProjection.finalBalance)}), but expect larger swings.`,
        'Stay consistent with monthly investing and review progress every 6 to 12 months.',
      ],
    };
  }

  if (monthlyContributionRatio >= HIGH_MONTHLY_CONTRIBUTION_RATIO) {
    return {
      title: 'Long-Term Compound Strategy',
      summary:
        'You are combining a long horizon with strong recurring contributions, which is ideal for compounding.',
      actionPoints: [
        `Your current path projects about ${formatPeso(selectedProjection.finalBalance)} with total contributions of ${formatPeso(totalContributed)}.`,
        'Keep monthly contributions automated to reduce timing decisions and emotional investing.',
        'As your income grows, gradually increase contributions to accelerate compounding.',
      ],
    };
  }

  return {
    title: 'Long-Term Opportunity: Increase Contributions',
    summary:
      'Your long timeline is an advantage. Increasing recurring contributions can significantly improve outcomes.',
    actionPoints: [
      `Current projection is around ${formatPeso(selectedProjection.finalBalance)} from total contributions of ${formatPeso(totalContributed)}.`,
      'Consider stepping up monthly contributions annually to capture stronger long-term growth.',
      'Use conservative-to-moderate assumptions for planning, and treat higher-return scenarios as upside only.',
    ],
  };
}
