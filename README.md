# PortfolioLens Community

PortfolioLens Community is a public, mock-data showcase for a modern portfolio and stock research dashboard. It is designed for open-source review, product demonstration, and safe experimentation without exposing private backend code or proprietary investment logic.

## What This Is

- A React + TypeScript + Vite frontend demo
- A small dependency-free Python mock analytics script
- A polished fintech dashboard UI
- Portfolio tracking screens using sample data
- Watchlist and stock analysis layouts
- Technical indicator display components
- Documentation for setup, architecture, and contribution

## What This Is Not

- No private backend
- No API keys or `.env` secrets
- No paid market data provider integrations
- No AI prompts or model calls
- No model training code or proprietary prediction logic
- No real user, portfolio, watchlist, or account data

All data in this repository is static mock data for UI demonstration only.

## Features

- Overview dashboard with sample portfolio health, market pulse, and watchlist signals
- Portfolio page with holdings, allocation, performance cards, and activity timeline
- Watchlist page with sortable sample securities
- Stock research page with chart-like price history, signal summary, and technical indicators
- Responsive layout for desktop and mobile
- Local Python utility that turns fictional sample holdings into a markdown analytics report
- Safe local development with no private services required

## Tech Stack

- React
- TypeScript
- Vite
- Python standard library
- CSS custom properties
- Static mock data

## Screenshots

Screenshots can be added under `docs/screenshots/`. See [docs/screenshots.md](docs/screenshots.md) for the recommended capture list.

## Getting Started

```bash
npm install
npm run dev
```

Build check:

```bash
npm run build
```

Generate the mock analytics report:

```bash
python3 tools/mock_analytics.py
```

## Environment Variables

No environment variables are required. Optional placeholders are listed in [.env.example](.env.example).

## Community Edition Disclaimer

PortfolioLens Community is for demonstration, education, and UI review only. It does not provide investment advice. The sample scores, indicators, and portfolio values are fictional and should not be used for trading decisions.

## Documentation

- [Architecture](docs/architecture.md)
- [Screenshots](docs/screenshots.md)
- [Roadmap](ROADMAP.md)
- [Contributing](CONTRIBUTING.md)
- [Security](SECURITY.md)

## License

MIT. See [LICENSE](LICENSE).
