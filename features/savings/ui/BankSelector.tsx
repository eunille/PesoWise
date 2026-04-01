'use client'

/**
 * Bank Selector Component
 *
 * Allows users to select which banks to display in comparison.
 * Shows "Recommended Banks" by default (top 3 highest-rate banks).
 * Users can expand to "Compare All Banks" or use "Custom Select".
 */

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCalculatorState } from '@/hooks/useCalculatorState.tsx'
import { PLATFORMS, PLATFORM_IDS, getPlatformById } from '@/domain/platformRates'
import { formatAPY } from '@/services/projectionService'

type ViewMode = 'recommended' | 'all' | 'custom'

const RECOMMENDED_BANKS = ['gotyme', 'maya', 'maribank']

// Helper to format boost display
const formatBoostDisplay = (baseAPY: number, boostedAPY: number): string => {
  if (boostedAPY <= baseAPY) return formatAPY(baseAPY)
  return `${formatAPY(baseAPY)} • up to ${formatAPY(boostedAPY)}`
}

export function BankSelector() {
  const { state, setSelectedBanks, toggleBank } = useCalculatorState()
  const { selectedBanks } = state
  const [viewMode, setViewMode] = useState<ViewMode>('recommended')
  const [showDropdown, setShowDropdown] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 })

  // Calculate dropdown position when it opens
  useEffect(() => {
    if (showDropdown && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8,
        right: window.innerWidth - rect.right
      })
    }
  }, [showDropdown])

  // Handle preset selection
  const handleRecommended = () => {
    setSelectedBanks(RECOMMENDED_BANKS)
    setViewMode('recommended')
    setShowDropdown(false)
  }

  const handleAll = () => {
    setSelectedBanks(PLATFORM_IDS)
    setViewMode('all')
    setShowDropdown(false)
  }

  const handleToggleBank = (bankId: string) => {
    toggleBank(bankId)
    setViewMode('custom')
  }

  const bankDisplayLabel = () => {
    if (viewMode === 'recommended') return `Recommended Banks (${selectedBanks.length})`
    if (viewMode === 'all') return `All Banks (${selectedBanks.length})`
    return `Custom Select (${selectedBanks.length})`
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2 justify-between">
        <p className="text-sm font-medium text-gray-700">Compare Banks</p>
        <div className="relative">
          <button
            ref={buttonRef}
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
          >
            <span>{bankDisplayLabel()}</span>
            <ChevronDown
              size={16}
              className={`transition-transform ${showDropdown ? 'rotate-180' : ''}`}
            />
          </button>

          {showDropdown && (
            <div 
              ref={dropdownRef}
              className="fixed z-50 w-64 max-h-96 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg"
              style={{
                top: `${dropdownPosition.top}px`,
                right: `${dropdownPosition.right}px`
              }}
            >
              {/* Quick Presets */}
              <div className="sticky top-0 border-b border-gray-100 p-3 space-y-2 bg-white">
                <button
                  onClick={handleRecommended}
                  className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                    viewMode === 'recommended'
                      ? 'bg-blue-100 text-blue-900 font-medium'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  Recommended Banks (Top 3)
                </button>
                <button
                  onClick={handleAll}
                  className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                    viewMode === 'all'
                      ? 'bg-blue-100 text-blue-900 font-medium'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  Compare All 6 Banks
                </button>
              </div>

              {/* Custom Select */}
              <div className="p-3 space-y-2">
                <p className="text-xs font-medium text-gray-600 px-2">Custom Select</p>
                {PLATFORM_IDS.map((bankId: string) => {
                  const bank = getPlatformById(bankId)
                  if (!bank) return null

                  const isSelected = selectedBanks.includes(bankId)
                  return (
                    <button
                      key={bankId}
                      onClick={() => handleToggleBank(bankId)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm transition-colors ${
                        isSelected
                          ? 'bg-blue-50 hover:bg-blue-100'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                          isSelected
                            ? 'border-blue-600 bg-blue-600'
                            : 'border-gray-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check size={12} className="text-white" />}
                      </div>
                      <span className="flex-1 text-left">{bank.name}</span>
                      <span className="text-xs font-medium text-gray-500">
                        {formatBoostDisplay(bank.baseAPY, bank.boostedAPY)}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Selected Banks Display */}
      <div className="flex flex-wrap gap-2">
        {selectedBanks.map((bankId: string) => {
          const bank = getPlatformById(bankId)
          if (!bank) return null
          return (
            <div
              key={bankId}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-100 text-xs font-medium text-blue-900"
            >
              {bank.name}
              <span className="text-blue-600">•</span>
              <span className="font-semibold">{formatBoostDisplay(bank.baseAPY, bank.boostedAPY)}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
