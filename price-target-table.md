# Price & Target Table — Output Instruction

After completing any stock or sector analysis, always produce a **Price & Target Table** as a separate Visualizer widget.

---

## Columns

| Column | Content |
|--------|---------|
| **Company** | Name + NSE ticker + price source date |
| **Current price** | Latest NSE/BSE price — always search before rendering, never use stale or estimated prices |
| **Analyst target** | 12-month target from 1–3 brokerages, with brokerage name cited |
| **Upside to target** | % upside in green text + a small horizontal progress bar |
| **Buy zone (ideal entry)** | Specific ₹ range + one-line rationale (see derivation rules below) |
| **Entry call** | Badge: Buy Now / Buy on Dip / Buy on Correction / Wait / Watchlist Only |

---

## Buy Zone Derivation Rules

| Entry Call | Buy Zone Logic |
|---|---|
| **Buy Now** | Current price ±5–10% — stock is already in range, reflect accumulation band |
| **Buy on Dip** | 8–15% below current price, at a meaningful valuation support level |
| **Buy on Correction** | 15–25% below current price, where valuation becomes clearly attractive |
| **Watchlist / High Risk** | Only if a resolution condition exists (e.g. governance clarity, de-rating); otherwise note "Only on specific catalyst" |

Always include a one-line rationale inside the buy zone cell, e.g.:
- "Currently inside zone — accumulate in tranches"
- "Wait for 10% pullback to earnings support level"
- "Wait for ALCM policy clarity post Jun-26"

---

## Row Highlighting Rules

| Row colour | Meaning |
|---|---|
| Green background | Stock is currently trading inside its buy zone |
| Amber background | Stock is near the buy zone — small pullback needed |
| No background | Stock is above buy zone — wait for correction |

---

## Target Price Explainer

Include this block **above** the table whenever the table is shown for the first time in a conversation:

> A **target price** is a brokerage analyst's 12-month estimate of fair value, based on their earnings forecasts and valuation model. It is not a guaranteed price — it is a professional opinion. Different brokerages set different targets; the range shown reflects recent estimates. Always treat targets as one input among many, not a buy signal on their own.

---

## Disclaimer

Always include this note **below** the table:

> ⚠ Prices sourced from NSE/BSE ([date]). Analyst targets are 12-month estimates from named brokerages and are not guaranteed. Buy zones are derived from the analysis framework's entry timing assessment. This is not investment advice — consult a SEBI-registered advisor before investing.

---

## Follow-up Interaction Rules

- If the user asks to **add or modify a column** — re-render only this table widget, do not rerun the full analysis
- If the user asks **"what does target mean?"** or similar — explain in 2–3 sentences with a concrete example from the stocks already shown, do not re-render the table
- If the user asks for **updated prices** — run a fresh web search first, then re-render the table with the new data
