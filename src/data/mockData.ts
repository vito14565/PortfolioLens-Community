export type Holding = {
  symbol: string
  name: string
  allocation: number
  value: number
  returnPct: number
  dayPct: number
}

export type WatchItem = {
  symbol: string
  name: string
  price: number
  changePct: number
  signal: string
  rsi: number
}

export type Indicator = {
  label: string
  value: string
  tone: 'good' | 'neutral' | 'watch'
}

export const holdings: Holding[] = [
  { symbol: 'MSFT', name: 'Microsoft', allocation: 34, value: 18420, returnPct: 12.4, dayPct: 0.8 },
  { symbol: 'AAPL', name: 'Apple', allocation: 24, value: 12980, returnPct: 6.7, dayPct: -0.3 },
  { symbol: 'NVDA', name: 'NVIDIA', allocation: 18, value: 9740, returnPct: 21.8, dayPct: 1.9 },
  { symbol: 'CASH', name: 'Cash reserve', allocation: 24, value: 13120, returnPct: 0, dayPct: 0 },
]

export const watchlist: WatchItem[] = [
  { symbol: 'MSFT', name: 'Microsoft', price: 442.18, changePct: 0.8, signal: 'Quality compounder', rsi: 58 },
  { symbol: 'AAPL', name: 'Apple', price: 211.07, changePct: -0.3, signal: 'Pullback watch', rsi: 49 },
  { symbol: 'NVDA', name: 'NVIDIA', price: 139.42, changePct: 1.9, signal: 'Momentum leader', rsi: 66 },
  { symbol: 'TSM', name: 'Taiwan Semiconductor', price: 172.31, changePct: 0.6, signal: 'Semiconductor core', rsi: 61 },
]

export const indicators: Indicator[] = [
  { label: 'RSI 14', value: '58.4', tone: 'neutral' },
  { label: 'MACD', value: '+1.72', tone: 'good' },
  { label: '20D MA', value: '$207.35', tone: 'good' },
  { label: '50D MA', value: '$201.82', tone: 'good' },
  { label: 'Volume ratio', value: '1.42x', tone: 'watch' },
  { label: 'Price z-score', value: '+1.14', tone: 'neutral' },
]

export const pricePath = [42, 46, 44, 49, 51, 48, 53, 58, 56, 61, 64, 62, 68, 72, 70, 76]

export const activity = [
  'Added MSFT to long-term watchlist',
  'Reviewed sample portfolio allocation',
  'Updated mock cash reserve',
  'Compared NVDA momentum indicators',
]
