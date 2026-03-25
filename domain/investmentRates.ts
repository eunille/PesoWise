/**
 * Investment Product Definitions & Return Scenarios
 *
 * Data-backed assumptions for Philippine index fund investing:
 * - Conservative: 5% APY (savings/bond blend, historical safety)
 * - Moderate: 8% APY (PSEi total return with dividends, realistic recovery)
 * - Growth: 12% APY (optimistic bull case, 2005-2015 era performance)
 *
 * All returns are dividend-adjusted (total return), not price-only.
 * Returns are nominal; real return = nominal - inflation (~3% historical).
 *
 * Sources: PSE historical data, Philippine inflation (BSP), market analysis.
 */

export type ScenarioType = 'conservative' | 'moderate' | 'growth';

export interface InvestmentScenario {
  id: ScenarioType;
  name: string;
  description: string;
  annualReturnRate: number; // As decimal, e.g., 0.08 for 8%
  riskLabel: string;
  color: string; // Tailwind color for charts/cards
}

export const INVESTMENT_SCENARIOS: Record<ScenarioType, InvestmentScenario> = {
  conservative: {
    id: 'conservative',
    name: 'Conservative',
    description: 'Savings + bond blend. Historically stable returns.',
    annualReturnRate: 0.05,
    riskLabel: 'Low Risk',
    color: 'blue-300', // Light blue for charts
  },
  moderate: {
    id: 'moderate',
    name: 'Moderate',
    description: 'Philippine Stock Exchange (PSEi) index. Balanced approach.',
    annualReturnRate: 0.08,
    riskLabel: 'Medium Risk',
    color: 'blue-600', // Medium blue for charts
  },
  growth: {
    id: 'growth',
    name: 'Growth',
    description: 'Full PSEi exposure. Higher potential returns, higher volatility.',
    annualReturnRate: 0.12,
    riskLabel: 'Higher Risk',
    color: 'blue-900', // Dark blue for charts
  },
};

export interface TimeHorizonOption {
  label: string;
  months: number;
  recommended: boolean;
}

export const TIME_HORIZON_OPTIONS: TimeHorizonOption[] = [
  { label: '1 year', months: 12, recommended: false },
  { label: '5 years', months: 60, recommended: false },
  { label: '10 years', months: 120, recommended: true }, // Default
  { label: '20 years', months: 240, recommended: false },
];

export const DEFAULT_TIME_HORIZON_MONTHS = 120; // 10 years

/**
 * Investment product metadata (future-proof for Supabase migration)
 */
export interface InvestmentProduct {
  id: string;
  slug: string;
  name: string;
  category: 'index_fund' | 'savings' | 'bonds';
  description: string;
  isActive: boolean;
  displayOrder: number;
  scenarios: ScenarioType[];
}

export const INVESTMENT_PRODUCTS: InvestmentProduct[] = [
  {
    id: 'pse-index-fund',
    slug: 'pse-index-fund',
    name: 'Philippine Stock Exchange Index Fund',
    category: 'index_fund',
    description: 'A diversified fund tracking the PSEi. Phase 2 starting point.',
    isActive: true,
    displayOrder: 1,
    scenarios: ['conservative', 'moderate', 'growth'],
  },
];

/**
 * Inflation assumptions (for Phase 2B: real return calculations)
 */
export const INFLATION_RATE = 0.03; // 3% long-run average (BSP target midpoint)

/**
 * Helper: Get scenario by ID
 */
export function getScenario(id: ScenarioType): InvestmentScenario {
  return INVESTMENT_SCENARIOS[id];
}

/**
 * Helper: Get all scenarios for a product
 */
export function getProductScenarios(productId: string): InvestmentScenario[] {
  const product = INVESTMENT_PRODUCTS.find((p) => p.id === productId);
  if (!product) return [];
  return product.scenarios.map((id) => INVESTMENT_SCENARIOS[id]);
}
