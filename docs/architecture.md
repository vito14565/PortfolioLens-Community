# Architecture

PortfolioLens Community is a static frontend showcase.

```text
React app
  -> src/App.tsx
  -> src/data/mockData.ts
  -> src/styles.css

Python mock analytics
  -> data/sample_portfolio.json
  -> tools/mock_analytics.py
  -> docs/mock-analytics.md
```

## Design

The app is intentionally small:

- `src/App.tsx` composes the dashboard, portfolio, watchlist, and stock research sections.
- `src/data/mockData.ts` stores fictional sample values.
- `src/styles.css` contains the visual system and responsive layout.
- `tools/mock_analytics.py` demonstrates a dependency-free Python workflow for generating a sample markdown report from fictional portfolio JSON.

## Data Boundary

All displayed data is local mock data. The project does not call a backend, market data API, AI provider, or database.

## Security Boundary

The community edition excludes:

- Private backend code
- API keys and secrets
- Proprietary scoring or prediction logic
- Internal prompts
- User data
- Paid provider integrations
