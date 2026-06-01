"""Generate a small mock portfolio summary for PortfolioLens Community.

This script is intentionally dependency-free and uses fictional sample data.
It does not call market data providers, AI services, or private backends.
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any


def load_portfolio(path: Path) -> dict[str, Any]:
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def summarize(portfolio: dict[str, Any]) -> dict[str, Any]:
    holdings = portfolio.get("holdings", [])
    total_value = sum(float(item.get("value", 0)) for item in holdings)
    weighted_return = 0.0
    sector_values: dict[str, float] = {}

    for item in holdings:
        value = float(item.get("value", 0))
        return_pct = float(item.get("return_pct", 0))
        sector = str(item.get("sector", "Unclassified"))
        if total_value:
            weighted_return += value / total_value * return_pct
        sector_values[sector] = sector_values.get(sector, 0.0) + value

    top_holding = max(holdings, key=lambda item: float(item.get("value", 0)), default={})

    return {
        "name": portfolio.get("portfolio_name", "Sample Portfolio"),
        "currency": portfolio.get("currency", "USD"),
        "holding_count": len(holdings),
        "total_value": total_value,
        "weighted_return_pct": weighted_return,
        "top_holding": top_holding.get("symbol", "N/A"),
        "sector_values": sector_values,
    }


def render_markdown(summary: dict[str, Any]) -> str:
    lines = [
        f"# {summary['name']} Mock Analytics",
        "",
        "This report is generated from fictional sample data for the community showcase.",
        "",
        f"- Holdings: {summary['holding_count']}",
        f"- Total value: {summary['currency']} {summary['total_value']:,.0f}",
        f"- Weighted sample return: {summary['weighted_return_pct']:.1f}%",
        f"- Largest holding: {summary['top_holding']}",
        "",
        "## Sector Exposure",
        "",
    ]

    for sector, value in sorted(summary["sector_values"].items(), key=lambda item: item[1], reverse=True):
        weight = value / summary["total_value"] * 100 if summary["total_value"] else 0
        lines.append(f"- {sector}: {weight:.1f}%")

    lines.extend([
        "",
        "## Safety Boundary",
        "",
        "No real portfolio data, provider credentials, model logic, or investment advice is included.",
        "",
    ])
    return "\n".join(lines)


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate mock portfolio analytics markdown.")
    parser.add_argument("--input", default="data/sample_portfolio.json", help="Path to mock portfolio JSON.")
    parser.add_argument("--output", default="docs/mock-analytics.md", help="Path for generated markdown.")
    args = parser.parse_args()

    portfolio = load_portfolio(Path(args.input))
    markdown = render_markdown(summarize(portfolio))
    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(markdown, encoding="utf-8")
    print(f"Wrote {output_path}")


if __name__ == "__main__":
    main()
