type SparklineProps = {
  values: number[]
  label: string
}

export default function Sparkline({ values, label }: SparklineProps) {
  const points = values
    .map((value, index) => `${index * 24},${96 - value}`)
    .join(' ')

  return (
    <svg className="sparkline" viewBox="0 0 360 120" role="img" aria-label={label}>
      <defs>
        <linearGradient id="lineGlow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#55d6be" />
          <stop offset="100%" stopColor="#8aa7ff" />
        </linearGradient>
      </defs>
      <polyline className="sparkline-grid" points="0,88 360,88" />
      <polyline className="sparkline-grid" points="0,52 360,52" />
      <polyline className="sparkline-line" points={points} />
      {values.map((value, index) => (
        <circle key={`${value}-${index}`} cx={index * 24} cy={96 - value} r="3.5" />
      ))}
    </svg>
  )
}
