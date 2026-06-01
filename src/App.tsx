import { useMemo, useState } from 'react'
import MetricCard from './components/MetricCard'
import SectionHeader from './components/SectionHeader'
import Sparkline from './components/Sparkline'
import { activity, holdings, indicators, pricePath, watchlist, type WatchItem } from './data/mockData'
import { money, signedPercent } from './utils/format'
import { buildAnalyticsSnapshot } from './utils/mockAnalytics'

type WatchFilter = 'All' | WatchItem['category']

const watchFilters: WatchFilter[] = ['All', 'Core', 'Momentum', 'Pullback']

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
        <Sparkline values={pricePath} label="Mock stock price path" />
      </div>
    </section>
  )
}

function Portfolio() {
  const [selectedSymbol, setSelectedSymbol] = useState(holdings[0].symbol)
  const selected = holdings.find(item => item.symbol === selectedSymbol) ?? holdings[0]

  return (
    <section className="section-grid" id="portfolio">
      <SectionHeader eyebrow="Portfolio" title="Holdings without private data">
        This view demonstrates allocation, performance, and activity patterns with local mock data only.
      </SectionHeader>
      <div className="portfolio-workspace">
        <div className="panel table-panel">
          {holdings.map(item => (
            <button
              className={`holding-row ${item.symbol === selectedSymbol ? 'selected' : ''}`}
              key={item.symbol}
              onClick={() => setSelectedSymbol(item.symbol)}
              type="button"
            >
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
                {signedPercent(item.returnPct)}
              </span>
            </button>
          ))}
        </div>
        <aside className="panel holding-detail" aria-live="polite">
          <span>Selected holding</span>
          <h3>{selected.symbol}</h3>
          <p>{selected.thesis}</p>
          <dl>
            <div><dt>Sector</dt><dd>{selected.sector}</dd></div>
            <div><dt>Day move</dt><dd className={selected.dayPct >= 0 ? 'up' : 'down'}>{signedPercent(selected.dayPct)}</dd></div>
            <div><dt>Value</dt><dd>{money.format(selected.value)}</dd></div>
          </dl>
        </aside>
      </div>
    </section>
  )
}

function Watchlist() {
  const [filter, setFilter] = useState<WatchFilter>('All')
  const filtered = useMemo(
    () => filter === 'All' ? watchlist : watchlist.filter(item => item.category === filter),
    [filter],
  )

  return (
    <section className="section-grid" id="watchlist">
      <SectionHeader eyebrow="Watchlist" title="Sample securities radar">
        Watchlist rows show how price, signal labels, and technical context can be presented without
        connecting to a market data provider.
      </SectionHeader>
      <div>
        <div className="filter-row" aria-label="Watchlist filters">
          {watchFilters.map(item => (
            <button
              className={item === filter ? 'active' : ''}
              key={item}
              onClick={() => setFilter(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
        <div className="panel watchlist-panel">
          {filtered.map(item => (
            <article className="watch-card" key={item.symbol}>
              <div>
                <strong>{item.symbol}</strong>
                <span>{item.name}</span>
              </div>
              <p>{item.signal}</p>
              <div className="watch-meta">
                <span>{money.format(item.price)}</span>
                <span className={item.changePct >= 0 ? 'up' : 'down'}>
                  {signedPercent(item.changePct)}
                </span>
                <span>RSI {item.rsi}</span>
              </div>
            </article>
          ))}
        </div>
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
        <Sparkline values={pricePath} label="Mock technical research price path" />
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

function AnalyticsLab() {
  const analytics = useMemo(() => buildAnalyticsSnapshot(holdings), [])

  return (
    <section className="analytics-lab" id="analytics">
      <SectionHeader eyebrow="Python-inspired analytics" title="Mock analytics lab">
        A frontend view of the same safe sample analytics shape produced by the Python utility.
      </SectionHeader>
      <div className="analytics-grid">
        <div className="panel analytics-summary">
          <MetricCard label="Mock risk" value={analytics.riskLabel} detail="Transparent sample calculation" />
          <MetricCard label="Largest holding" value={analytics.largestHolding} detail={`${analytics.largestHoldingWeightPct.toFixed(1)}% of sample value`} />
          <MetricCard label="Weighted return" value={signedPercent(analytics.weightedReturnPct)} detail="Calculated from fictional holdings" />
        </div>
        <div className="panel sector-panel">
          <p className="section-label">Sector exposure</p>
          {analytics.sectorExposure.map(item => (
            <div className="sector-row" key={item.sector}>
              <div>
                <strong>{item.sector}</strong>
                <span>{money.format(item.value)}</span>
              </div>
              <div className="bar-track">
                <i style={{ width: `${item.weightPct}%` }} />
              </div>
              <span>{item.weightPct.toFixed(1)}%</span>
            </div>
          ))}
        </div>
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
          <a href="#analytics">Analytics</a>
        </div>
      </nav>
      <Dashboard />
      <Portfolio />
      <Watchlist />
      <Research />
      <AnalyticsLab />
      <Activity />
      <footer>
        PortfolioLens Community is a mock-data showcase. It is not investment advice.
      </footer>
    </main>
  )
}
