# Reviewer Guide

This guide gives reviewers a quick path through PortfolioLens Community.

## Three-Minute Review

1. Open the README and confirm the project boundary: this is a mock-data community edition with no private backend, no provider API calls, and no proprietary prediction logic.
2. Run the local app:

   ```bash
   npm install
   npm run dev
   ```

3. Visit the local Vite URL and review the dashboard, portfolio, watchlist, and stock research sections.
4. Run the Python mock analytics flow:

   ```bash
   python3 tools/mock_analytics.py
   ```

5. Check CI coverage in `.github/workflows/ci.yml`.

## What To Look For

- Clear separation between mock data and production-style integrations.
- A useful frontend structure for a fintech dashboard.
- Python usage that demonstrates analytics workflow shape without exposing private model logic.
- Documentation that explains setup, architecture, security boundaries, and future roadmap.

## Safety Notes

- The repository intentionally contains no `.env` file.
- `.env.example` uses placeholders only.
- All sample portfolio values are fictional.
- The Python analytics script uses simple transparent calculations for demonstration, not predictive scoring.

