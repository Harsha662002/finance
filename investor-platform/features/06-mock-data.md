# 06 — Mock Data

**File:** `src/data/mockData.ts`

All data is static mock data (no live API). Prices are as of March 2026.

---

## Sectors Covered

| Sector ID | Sector Name | # Stocks |
|---|---|---|
| `it` | Information Technology | 4+ |
| `renewable` | Renewable Energy | 4+ |

---

## IT Sector Stocks

| Stock | Ticker | Recommendation | Zone Status | Upside to Avg |
|---|---|---|---|---|
| Tata Consultancy Services | TCS | Strong Buy | In Buy Zone | ~29% |
| Infosys | INFY | Strong Buy | In Buy Zone | ~22% |
| HCL Technologies | HCLTECH | Strong Buy | In Buy Zone | ~15% |
| Persistent Systems | PERSISTENT | Buy on Dip | Near Zone | ~28% |

---

## Renewable Energy Sector Stocks

*(See mockData.ts for full company objects)*

Companies in the sector include solar, wind, and green energy players on NSE.

---

## Data Fields Per Stock

Every `Company` object contains:

```
id, name, ticker, exchange, sector, sectorId, category, market_cap_cr

recommendation              → e.g. 'Strong Buy'

screening_scores
  business_quality          → 0–10
  financial_strength        → 0–10
  growth_potential          → 0–10
  management_quality        → 0–10
  valuation_attractiveness  → 0–10
  total, max                → e.g. 40/50

financials
  pe_ratio, pb_ratio, roe_pct, dividend_yield_pct
  debt_to_equity, operating_margin_pct, ev_ebitda
  week_52_high, week_52_low, market_cap_cr

price_data
  current_price, price_date
  analyst_targets[]         → [{ brokerage, target, rating, note? }]
  consensus_target_low/high/avg
  upside_to_low/high/avg_pct

entry
  call                      → 'Buy Now' | 'Wait'
  buy_zone_low, buy_zone_high
  in_zone                   → boolean
  zone_status               → 'in_zone' | 'near_zone' | 'above_zone' | ...
  rationale                 → text explaining entry timing
  horizon                   → '5–10 years'
  conviction                → 'High' | 'Medium'

thesis
  core_business             → text
  competitive_advantage     → text
  growth_drivers            → string[]
  risks                     → string[]
  valuation_status          → 'Fairly Valued' | 'Undervalued' | ...
```

---

## Exported Data Access Functions

```ts
// Flat array of ALL companies across all sectors
export const allCompanies: Company[]

// All sectors
export const sectors: Sector[]

// Helper: all Strong Buy stocks
export function getStrongBuys(): Company[]

// Helper: all stocks currently in their buy zone
export function getInZoneStocks(): Company[]

// Helper: all stocks sorted by upside_to_avg_pct descending
export function getSortedByUpside(): Company[]
```

---

## How to Add a New Stock

1. Create a `Company` object in `mockData.ts` following the interface in `src/types/index.ts`
2. Add it to the relevant sector's `companies` array
3. It will automatically appear in:
   - Dashboard (if Strong Buy or in-zone)
   - Upside Potential table
   - Entry Opportunity table
   - Valuation Comparison table
4. Access via `/stock/:id` where `id` matches the `id` field

---

## How to Add a New Sector

1. Create a `Sector` object in `mockData.ts`
2. Add sector to `sectors` array
3. Add a nav link in `src/components/layout/Sidebar.tsx` → `sectorItems` array
4. Access via `/sector/:sectorId` where `sectorId` matches `sector.id`

---

## Data Source

All data is manually researched from:
- Analyst reports (ICICI Securities, JM Financial, Choice Broking, Jefferies, Emkay Global)
- NSE/BSE public data
- Company annual reports and investor presentations
- Price dates are noted per company in `price_data.price_date`

**Not financial advice. Research purposes only.**
