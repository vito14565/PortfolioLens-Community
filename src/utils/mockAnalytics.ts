import type { Holding } from '../data/mockData'

export type SectorExposure = {
  sector: string
  value: number
  weightPct: number
}

export type AnalyticsSnapshot = {
  totalValue: number
  weightedReturnPct: number
  largestHolding: string
  largestHoldingWeightPct: number
  riskLabel: 'Balanced mock risk' | 'Concentrated mock risk'
  sectorExposure: SectorExposure[]
}

export function buildAnalyticsSnapshot(holdings: Holding[]): AnalyticsSnapshot {
  const totalValue = holdings.reduce((total, item) => total + item.value, 0)
  const sectorValues = holdings.reduce<Record<string, number>>((acc, item) => {
    acc[item.sector] = (acc[item.sector] ?? 0) + item.value
    return acc
  }, {})

  const weightedReturnPct = holdings.reduce((total, item) => {
    if (!totalValue) return total
    return total + (item.value / totalValue) * item.returnPct
  }, 0)

  const largestHolding = holdings.reduce<Holding | undefined>((largest, item) => {
    if (!largest || item.value > largest.value) return item
    return largest
  }, undefined)

  const largestHoldingWeightPct = largestHolding && totalValue
    ? (largestHolding.value / totalValue) * 100
    : 0

  const sectorExposure = Object.entries(sectorValues)
    .map(([sector, value]) => ({
      sector,
      value,
      weightPct: totalValue ? (value / totalValue) * 100 : 0,
    }))
    .sort((left, right) => right.value - left.value)

  return {
    totalValue,
    weightedReturnPct,
    largestHolding: largestHolding?.symbol ?? 'N/A',
    largestHoldingWeightPct,
    riskLabel: largestHoldingWeightPct > 40 ? 'Concentrated mock risk' : 'Balanced mock risk',
    sectorExposure,
  }
}

