import unittest
import json

from tools.mock_analytics import render_json, render_markdown, summarize


class MockAnalyticsTest(unittest.TestCase):
    def test_render_markdown_includes_concentration_note(self):
        portfolio = {
            "portfolio_name": "Test Portfolio",
            "currency": "USD",
            "holdings": [
                {"symbol": "AAA", "sector": "Software", "value": 60, "return_pct": 10},
                {"symbol": "BBB", "sector": "Cash", "value": 40, "return_pct": 0},
            ],
        }

        markdown = render_markdown(summarize(portfolio))

        self.assertIn("Concentration note", markdown)
        self.assertIn("AAA is the largest sample holding at 60.0%", markdown)

    def test_render_json_includes_sorted_sector_exposure(self):
        portfolio = {
            "portfolio_name": "Test Portfolio",
            "currency": "USD",
            "holdings": [
                {"symbol": "AAA", "sector": "Software", "value": 30, "return_pct": 12},
                {"symbol": "BBB", "sector": "Cash", "value": 70, "return_pct": 0},
            ],
        }

        payload = json.loads(render_json(summarize(portfolio)))

        self.assertEqual(payload["portfolio_name"], "Test Portfolio")
        self.assertEqual(payload["largest_holding"]["symbol"], "BBB")
        self.assertEqual(payload["sector_exposure"][0]["sector"], "Cash")
        self.assertEqual(payload["sector_exposure"][0]["weight_pct"], 70.0)
        self.assertIn("mock data", payload["disclaimer"])


if __name__ == "__main__":
    unittest.main()
