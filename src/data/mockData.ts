export type Holding = {
  symbol: string
  name: string
  sector: string
  allocation: number
  value: number
  returnPct: number
  dayPct: number
  thesis: string
}

export type WatchItem = {
  symbol: string
  name: string
  category: 'Momentum' | 'Pullback' | 'Core'
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
  { symbol: 'MSFT', name: 'Microsoft', sector: 'Cloud software', allocation: 34, value: 18420, returnPct: 12.4, dayPct: 0.8, thesis: 'Quality compounder with resilient cash flow and durable enterprise demand.' },
  { symbol: 'AAPL', name: 'Apple', sector: 'Consumer technology', allocation: 24, value: 12980, returnPct: 6.7, dayPct: -0.3, thesis: 'Large-cap anchor with strong ecosystem retention and balanced volatility.' },
  { symbol: 'NVDA', name: 'NVIDIA', sector: 'AI infrastructure', allocation: 18, value: 9740, returnPct: 21.8, dayPct: 1.9, thesis: 'Higher-growth satellite position used to demonstrate momentum monitoring.' },
  { symbol: 'CASH', name: 'Cash reserve', sector: 'Liquidity', allocation: 24, value: 13120, returnPct: 0, dayPct: 0, thesis: 'Dry powder for staged entries and risk management in the sample portfolio.' },
]

export const watchlist: WatchItem[] = [
  { symbol: 'MSFT', name: 'Microsoft', category: 'Core', price: 442.18, changePct: 0.8, signal: 'Quality compounder', rsi: 58 },
  { symbol: 'AAPL', name: 'Apple', category: 'Pullback', price: 211.07, changePct: -0.3, signal: 'Pullback watch', rsi: 49 },
  { symbol: 'NVDA', name: 'NVIDIA', category: 'Momentum', price: 139.42, changePct: 1.9, signal: 'Momentum leader', rsi: 66 },
  { symbol: 'TSM', name: 'Taiwan Semiconductor', category: 'Core', price: 172.31, changePct: 0.6, signal: 'Semiconductor core', rsi: 61 },
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
