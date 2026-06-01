import { holdings } from '../src/data/mockData'
import { buildAnalyticsSnapshot, type AnalyticsSnapshot } from '../src/utils/mockAnalytics'

const snapshot: AnalyticsSnapshot = buildAnalyticsSnapshot(holdings)

if (!snapshot.sectorExposure[0]) {
  throw new Error('Expected at least one sector exposure row')
}

