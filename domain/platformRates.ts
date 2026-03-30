/**
 * Platform savings rates for Philippines
 * Base APY (Annual Percentage Yield) for each platform
 * These are the baseline rates used for projection calculations
 */

export interface Platform {
  id: string
  name: string
  baseAPY: number // Annual Percentage Yield (decimal, e.g., 0.05 = 5%)
  description: string
}

export const PLATFORMS: Record<string, Platform> = {
  GOTYME: {
    id: 'gotyme',
    name: 'GoTyme',
    baseAPY: 0.035, // 3.5% APY (verified 3%-4% range)
    description: 'Digital banking platform',
  },
  MAYA: {
    id: 'maya',
    name: 'Maya',
    baseAPY: 0.035, // 3.5% APY (base rate)
    description: 'Digital fintech savings platform',
  },
  GSAVE: {
    id: 'gsave',
    name: 'GSave',
    baseAPY: 0.025, // 2.5% APY (CIMB partnership)
    description: 'CIMB Bank savings account via GCash',
  },
  MARIBANK: {
    id: 'maribank',
    name: 'MariBank',
    baseAPY: 0.0325, // 3.25% APY (tier-based rate)
    description: 'Digital banking with tiered savings rates',
  },
  UNIONDIGITAL: {
    id: 'uniondigital',
    name: 'UnionDigital',
    baseAPY: 0.0325, // 3.25% APY (mid-range of 3.0% - 3.5%)
    description: 'Union Bank digital savings account',
  },
  TONIK: {
    id: 'tonik',
    name: 'Tonik',
    baseAPY: 0.025, // 2.5% APY (conservative estimate)
    description: 'Digital bank with flexible savings options',
  },
}

export const PLATFORM_IDS = Object.keys(PLATFORMS).map(key => PLATFORMS[key].id)

export const getPlatformById = (id: string): Platform | undefined => {
  return Object.values(PLATFORMS).find(platform => platform.id === id)
}

export const getPlatformByName = (name: string): Platform | undefined => {
  return Object.values(PLATFORMS).find(platform => platform.name === name)
}
