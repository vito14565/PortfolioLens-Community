import unittest

from tools.mock_analytics import render_markdown, summarize


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


if __name__ == "__main__":
    unittest.main()
