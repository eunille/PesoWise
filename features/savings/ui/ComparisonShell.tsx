'use client'

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { BarChart3 } from "lucide-react"
import { useCalculatorState } from '@/hooks/useCalculatorState.tsx'
import { formatPHP, formatAPY } from '@/services/projectionService'
import { PLATFORM_IDS, getPlatformById } from '@/domain/platformRates'

type ComparisonShellProps = {
  readonly platformNames?: readonly string[]
}

export function ComparisonShell({ platformNames = [] }: ComparisonShellProps) {
  const { state } = useCalculatorState()
  const { allPlatformProjections, isLoading, selectedBanks } = state

  // Filter platforms to show only selected ones
  const platformIds = selectedBanks.length > 0 ? selectedBanks : PLATFORM_IDS
  const hasCalculations = Object.keys(allPlatformProjections).length > 0

  if (!hasCalculations) {
    return (
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold tracking-tight">Platform Comparison</h2>
          <Badge variant="outline">
            Run Estimate to compare
          </Badge>
        </div>

        <div className="rounded-lg border border-border/70 bg-white p-12">
          <div className="flex flex-col items-center justify-center text-center">
            <BarChart3 className="mb-4 h-12 w-12 text-gray-300" />
            <p className="text-base font-medium text-black/80">Find your best platform</p>
            <p className="mt-1 text-sm text-black/60">Run an estimate to compare all platforms!</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold tracking-tight">Platform Comparison</h2>
        <Badge variant="outline">
          {isLoading ? 'Calculating...' : 'All platforms'}
        </Badge>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {platformIds.map((platformId) => {
          const platform = getPlatformById(platformId)
          if (!platform) return null

          const projection = allPlatformProjections[platformId]

          return (
            <Card key={platformId} className="border-border/70 shadow-sm h-full">
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <CardTitle className="text-lg">{platform.name}</CardTitle>
                  <Badge variant="secondary">{formatAPY(platform.baseAPY)}</Badge>
                </div>
                <Separator />
              </CardHeader>
              <CardContent className="space-y-4">
                {!projection ? null : (
                  <>
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-black/70">Final Balance</p>
                      <p className="text-2xl font-bold text-black">{formatPHP(projection.finalBalance, false)}</p>
                    </div>
                    <Separator />
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-black/70">Total Interest</p>
                      <p className="text-lg font-semibold text-green-600">{formatPHP(projection.totalInterestEarned, false)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-black/70">Initial + Deposits</p>
                      <p className="text-sm text-black/60">{formatPHP(projection.totalDeposited, false)}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
