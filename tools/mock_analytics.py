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
    top_value = float(top_holding.get("value", 0)) if top_holding else 0.0
    top_weight = top_value / total_value * 100 if total_value else 0.0

    return {
        "name": portfolio.get("portfolio_name", "Sample Portfolio"),
        "currency": portfolio.get("currency", "USD"),
        "holding_count": len(holdings),
        "total_value": total_value,
        "weighted_return_pct": weighted_return,
        "top_holding": top_holding.get("symbol", "N/A"),
        "top_holding_weight": top_weight,
        "sector_values": sector_values,
    }


def sector_exposure(summary: dict[str, Any]) -> list[dict[str, Any]]:
    total_value = float(summary["total_value"])
    rows = []

    for sector, value in sorted(summary["sector_values"].items(), key=lambda item: item[1], reverse=True):
        weight = value / total_value * 100 if total_value else 0.0
        rows.append({
            "sector": sector,
            "value": round(value, 2),
            "weight_pct": round(weight, 1),
        })

    return rows


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
        (
            "- Concentration note: "
            f"{summary['top_holding']} is the largest sample holding at "
            f"{summary['top_holding_weight']:.1f}%"
        ),
        "",
        "## Sector Exposure",
        "",
    ]

    for row in sector_exposure(summary):
        lines.append(f"- {row['sector']}: {row['weight_pct']:.1f}%")

    lines.extend([
        "",
        "## Safety Boundary",
        "",
        "No real portfolio data, provider credentials, model logic, or investment advice is included.",
        "",
    ])
    return "\n".join(lines)


def render_json(summary: dict[str, Any]) -> str:
    payload = {
        "portfolio_name": summary["name"],
        "currency": summary["currency"],
        "holding_count": summary["holding_count"],
        "total_value": round(float(summary["total_value"]), 2),
        "weighted_return_pct": round(float(summary["weighted_return_pct"]), 1),
        "largest_holding": {
            "symbol": summary["top_holding"],
            "weight_pct": round(float(summary["top_holding_weight"]), 1),
        },
        "sector_exposure": sector_exposure(summary),
        "disclaimer": "Generated from mock data only. Not investment advice.",
    }
    return json.dumps(payload, indent=2, sort_keys=True)


def render_report(summary: dict[str, Any], output_format: str) -> str:
    if output_format == "json":
        return render_json(summary)
    return render_markdown(summary)


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate mock portfolio analytics markdown.")
    parser.add_argument("--input", default="data/sample_portfolio.json", help="Path to mock portfolio JSON.")
    parser.add_argument("--output", default="docs/mock-analytics.md", help="Path for generated report.")
    parser.add_argument("--format", choices=["markdown", "json"], default="markdown", help="Report output format.")
    args = parser.parse_args()

    portfolio = load_portfolio(Path(args.input))
    report = render_report(summarize(portfolio), args.format)
    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(report, encoding="utf-8")
    print(f"Wrote {output_path}")


if __name__ == "__main__":
    main()
