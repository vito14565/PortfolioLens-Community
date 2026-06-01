# Screenshots

These screenshots are captured from the local PortfolioLens Community demo using fictional mock data only.

## Included

- `dashboard-overview.jpg` - first-screen dashboard and portfolio summary.
- `portfolio-holdings.jpg` - holdings table with a selected sample holding.
- `watchlist-filtered.jpg` - watchlist filtered to the Momentum category.
- `stock-research.jpg` - stock research layout and technical indicators.
- `mobile-overview.jpg` - mobile viewport overview after responsive QA.

## Capture Commands

Start the app:

```bash
npm run dev -- --host 127.0.0.1
```

The desktop screenshots were captured from the local browser session. The mobile screenshot was captured with headless Chrome:

```bash
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --headless --disable-gpu --hide-scrollbars --window-size=390,844 --screenshot=docs/screenshots/mobile-overview.jpg http://127.0.0.1:5173/
```

Do not capture browser UI containing private URLs, logged-in accounts, tokens, or real portfolio data.
