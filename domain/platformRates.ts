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
    baseAPY: 0.045, // 4.5% APY
    description: 'Digital banking with competitive savings rates',
  },
  MAYA: {
    id: 'maya',
    name: 'Maya',
    baseAPY: 0.04, // 4.0% APY
    description: 'Mobile-first banking platform',
  },
  GSAVE: {
    id: 'gsave',
    name: 'GSave',
    baseAPY: 0.055, // 5.5% APY
    description: 'CIMB high-yield savings account',
  },
  MARIBANK: {
    id: 'maribank',
    name: 'MariBank',
    baseAPY: 0.06, // 6.0% APY
    description: 'Maritime-focused banking with savings products',
  },
  PDIC: {
    id: 'pdic',
    name: 'PDIC',
    baseAPY: 0.005, // 0.5% APY
    description: 'Philippine Deposit Insurance Corporation',
  },
}

export const PLATFORM_IDS = Object.keys(PLATFORMS).map(key => PLATFORMS[key].id)

export const getPlatformById = (id: string): Platform | undefined => {
  return Object.values(PLATFORMS).find(platform => platform.id === id)
}

export const getPlatformByName = (name: string): Platform | undefined => {
  return Object.values(PLATFORMS).find(platform => platform.name === name)
}
