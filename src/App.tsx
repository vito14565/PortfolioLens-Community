import { activity, holdings, indicators, pricePath, watchlist } from './data/mockData'

const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

function Sparkline() {
  const points = pricePath
    .map((value, index) => `${index * 24},${96 - value}`)
    .join(' ')

  return (
    <svg className="sparkline" viewBox="0 0 360 120" role="img" aria-label="Mock stock price path">
      <defs>
        <linearGradient id="lineGlow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#55d6be" />
          <stop offset="100%" stopColor="#8aa7ff" />
        </linearGradient>
      </defs>
      <polyline className="sparkline-grid" points="0,88 360,88" />
      <polyline className="sparkline-grid" points="0,52 360,52" />
      <polyline className="sparkline-line" points={points} />
      {pricePath.map((value, index) => (
        <circle key={`${value}-${index}`} cx={index * 24} cy={96 - value} r="3.5" />
      ))}
    </svg>
  )
}

function MetricCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <article className="metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{detail}</p>
    </article>
  )
}

function Dashboard() {
  return (
    <section className="panel hero-panel">
      <div className="hero-copy">
        <p className="section-label">Mock portfolio dashboard</p>
        <h1>PortfolioLens Community</h1>
        <p>
          A safe open-source showcase for portfolio tracking, watchlists, stock research layouts,
          and technical indicator UI. All figures are fictional sample data.
        </p>
        <div className="hero-actions">
          <a href="#portfolio">View portfolio</a>
          <a className="secondary" href="#research">Stock research</a>
        </div>
      </div>
      <div className="hero-visual" aria-label="Portfolio summary">
        <div className="portfolio-total">
          <span>Total assets</span>
          <strong>{money.format(54260)}</strong>
          <em>+9.8% sample return</em>
        </div>
        <Sparkline />
      </div>
    </section>
  )
}

function Portfolio() {
  return (
    <section className="section-grid" id="portfolio">
      <div>
        <p className="section-label">Portfolio</p>
        <h2>Holdings without private data</h2>
        <p className="section-copy">
          This view demonstrates allocation, performance, and activity patterns with local mock data only.
        </p>
      </div>
      <div className="panel table-panel">
        {holdings.map(item => (
          <div className="holding-row" key={item.symbol}>
            <div>
              <strong>{item.symbol}</strong>
              <span>{item.name}</span>
            </div>
            <div className="bar-track">
              <i style={{ width: `${item.allocation}%` }} />
            </div>
            <span>{item.allocation}%</span>
            <span>{money.format(item.value)}</span>
            <span className={item.returnPct >= 0 ? 'up' : 'down'}>
              {item.returnPct > 0 ? '+' : ''}{item.returnPct}%
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

function Watchlist() {
  return (
    <section className="section-grid" id="watchlist">
      <div>
        <p className="section-label">Watchlist</p>
        <h2>Sample securities radar</h2>
        <p className="section-copy">
          Watchlist rows show how price, signal labels, and technical context can be presented without
          connecting to a market data provider.
        </p>
      </div>
      <div className="panel watchlist-panel">
        {watchlist.map(item => (
          <article className="watch-card" key={item.symbol}>
            <div>
              <strong>{item.symbol}</strong>
              <span>{item.name}</span>
            </div>
            <p>{item.signal}</p>
            <div className="watch-meta">
              <span>{money.format(item.price)}</span>
              <span className={item.changePct >= 0 ? 'up' : 'down'}>
                {item.changePct > 0 ? '+' : ''}{item.changePct}%
              </span>
              <span>RSI {item.rsi}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Research() {
  return (
    <section className="research-layout" id="research">
      <div className="panel research-card">
        <p className="section-label">Stock analysis layout</p>
        <h2>Technical indicator display</h2>
        <p>
          The community edition keeps the research-page structure while replacing prediction and scoring
          engines with static sample values.
        </p>
        <Sparkline />
      </div>
      <div className="indicator-grid">
        {indicators.map(item => (
          <article className={`indicator ${item.tone}`} key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </article>
        ))}
      </div>
    </section>
  )
}

function Activity() {
  return (
    <section className="panel activity-panel">
      <div>
        <p className="section-label">Project safety</p>
        <h2>Mock-only by design</h2>
      </div>
      <ul>
        {activity.map(item => <li key={item}>{item}</li>)}
      </ul>
      <div className="safety-grid">
        <MetricCard label="Secrets" value="0" detail="No keys or tokens required" />
        <MetricCard label="Backend" value="None" detail="Runs as a static frontend" />
        <MetricCard label="Data" value="Mock" detail="Fictional demo values only" />
      </div>
    </section>
  )
}

export default function App() {
  return (
    <main>
      <nav className="top-nav" aria-label="Primary navigation">
        <a className="brand" href="#">
          <span>PL</span>
          PortfolioLens
        </a>
        <div>
          <a href="#portfolio">Portfolio</a>
          <a href="#watchlist">Watchlist</a>
          <a href="#research">Research</a>
        </div>
      </nav>
      <Dashboard />
      <Portfolio />
      <Watchlist />
      <Research />
      <Activity />
      <footer>
        PortfolioLens Community is a mock-data showcase. It is not investment advice.
      </footer>
    </main>
  )
}
