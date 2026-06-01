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

CI
  -> .github/workflows/ci.yml

GitHub Pages
  -> .github/workflows/pages.yml
  -> dist static artifact
```

## Design

The app is intentionally small:

- `src/App.tsx` composes the dashboard, portfolio, watchlist, and stock research sections.
- `src/data/mockData.ts` stores fictional sample values.
- `src/styles.css` contains the visual system and responsive layout.
- `tools/mock_analytics.py` demonstrates a dependency-free Python workflow for generating a sample markdown report from fictional portfolio JSON.
- `.github/workflows/ci.yml` runs the frontend build, dependency audit, Python tests, and mock analytics generation on pushes and pull requests.
- `.github/workflows/pages.yml` builds the static Vite app for GitHub Pages when Pages is enabled in repository settings.

## Deployment

The app is deployable as a static site. The Vite build uses `/PortfolioLens-Community/` as the production base path so assets resolve correctly on GitHub Pages. Local development still runs at `/`.

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
