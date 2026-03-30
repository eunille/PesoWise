import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="mx-auto h-[520px] w-[270px] rounded-[2.7rem] border-[6px] border-black bg-white p-3 shadow-2xl shadow-black/15">
        <div className="relative h-full rounded-[2.2rem] border border-blue-200 bg-white p-4">
          <div className="mx-auto mb-6 h-6 w-24 rounded-full bg-foreground/90" />

          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-black/55">Example: After 12 months</p>
              <p className="text-3xl font-semibold tracking-tight text-black">₱10,659</p>
            </div>

            <div className="grid grid-cols-2 gap-2 rounded-xl bg-blue-50/60 p-2 shadow-sm">
              <Badge className="justify-center" variant="secondary">
                Sample
              </Badge>
              <Badge className="justify-center" variant="outline">
                 Digital Bank
              </Badge>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-black/55">Interest Earned</p>
              <p className="text-2xl font-semibold text-black">₱659</p>
            </div>

            <div className="space-y-2 rounded-xl border border-black/15 bg-black p-3 text-white">
              <p className="text-xs text-white/70">Based on</p>
              <p className="text-sm font-medium text-white">3.25% APY rate</p>
              <p className="text-xs text-white/80">₱10,000 initial investment</p>
            </div>
          </div>
        </div>
      </div>

      <Card className="absolute right-0 top-20 w-52 rounded-2xl border border-blue-300 bg-white py-0 shadow-lg shadow-blue-100 sm:right-2">
        <CardContent className="space-y-1 px-4 py-3">
          <p className="text-xs text-black/55">Initial Amount</p>
          <p className="text-3xl font-semibold tracking-tight text-black">₱10,000</p>
        </CardContent>
      </Card>

      <Card className="absolute -bottom-4 left-0 w-64 rounded-2xl border border-blue-300 bg-white py-0 shadow-lg shadow-blue-100 sm:-left-6">
        <CardContent className="grid grid-cols-2 gap-3 px-4 py-3">
          <div className="space-y-1">
            <p className="text-xs text-black/55">Growth Rate</p>
            <p className="text-2xl font-semibold tracking-tight text-black">6.59%</p>
            <p className="text-xs text-emerald-600">Return on investment</p>
          </div>
          <div className="space-y-1 border-l border-blue-200 pl-3">
            <p className="text-xs text-black/55">Final Amount</p>
            <p className="text-2xl font-semibold tracking-tight text-black">₱10,659</p>
            <p className="text-xs text-blue-600">After 12 months</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
