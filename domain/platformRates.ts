/**
 * Platform savings rates for Philippines
 * Base APY (Annual Percentage Yield) for each platform
 * These are the baseline rates used for projection calculations
 */

export interface Platform {
  id: string
  name: string
  baseAPY: number // Annual Percentage Yield (decimal, e.g., 0.05 = 5%)
  boostedAPY: number // Maximum boosted rate (with conditions)
  boostType: 'behavior' | 'product' | 'promo' // How boost is achieved
  description: string
}

export const PLATFORMS: Record<string, Platform> = {
  GOTYME: {
    id: 'gotyme',
    name: 'GoTyme',
    baseAPY: 0.03, // 3.0% base APY
    boostedAPY: 0.035, // 3.5% max with promos
    boostType: 'promo',
    description: 'Digital banking with occasional promotional boosts',
  },
  MAYA: {
    id: 'maya',
    name: 'Maya',
    baseAPY: 0.035, // 3.5% base APY
    boostedAPY: 0.15, // Up to 15% with missions & spending
    boostType: 'behavior',
    description: 'Digital fintech with behavior-based earning boosts',
  },
  GSAVE: {
    id: 'gsave',
    name: 'GSave',
    baseAPY: 0.025, // 2.5% base APY
    boostedAPY: 0.07, // Up to 7% with promo tiers
    boostType: 'promo',
    description: 'CIMB Bank savings account via GCash with tier-based boosts',
  },
  MARIBANK: {
    id: 'maribank',
    name: 'MariBank',
    baseAPY: 0.0325, // 3.25% base APY
    boostedAPY: 0.035, // 3.5% with minor promos
    boostType: 'promo',
    description: 'Digital banking with stable rates and minor promos',
  },
  UNIONDIGITAL: {
    id: 'uniondigital',
    name: 'UnionDigital',
    baseAPY: 0.03, // 3.0% base APY
    boostedAPY: 0.035, // Up to 3.5%+ with tiers
    boostType: 'product',
    description: 'Union Bank digital savings with tier-based boosts',
  },
  TONIK: {
    id: 'tonik',
    name: 'Tonik',
    baseAPY: 0.04, // 4.0% base APY (Solo Stash)
    boostedAPY: 0.08, // Up to 8% with Time Deposit
    boostType: 'product',
    description: 'Digital bank with Solo Stash and Time Deposit options',
  },
}

export const PLATFORM_IDS = Object.keys(PLATFORMS).map(key => PLATFORMS[key].id)

export const getPlatformById = (id: string): Platform | undefined => {
  return Object.values(PLATFORMS).find(platform => platform.id === id)
}

export const getPlatformByName = (name: string): Platform | undefined => {
  return Object.values(PLATFORMS).find(platform => platform.name === name)
}
