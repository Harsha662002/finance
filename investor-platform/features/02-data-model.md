# 02 — Data Model

**File:** `src/types/index.ts`
**File:** `src/data/mockData.ts`

---

## Core Types

### `Recommendation` (union string type)
```ts
'Strong Buy' | 'Buy' | 'Buy on Dip' | 'Buy on Correction' | 'Watchlist' | 'Watchlist — Wait' | 'Speculative' | 'Avoid'
```

### `ZoneStatus` (union string type)
```ts
'in_zone' | 'near_zone' | 'above_zone' | 'watchlist' | 'speculative'
```

### `ConvictionLevel`
```ts
'High' | 'Medium-High' | 'Medium' | 'Low-Medium' | 'Low'
```

---

## `Company` Interface (main entity)

```ts
interface Company {
  id: string                  // unique slug (e.g. 'tcs', 'infosys')
  name: string                // full name
  ticker: string              // NSE ticker (e.g. 'TCS')
  exchange: string            // 'NSE' | 'BSE'
  sector: string              // display name
  sectorId: string            // slug for routing (e.g. 'it', 'renewable')
  category: string            // descriptive category label
  market_cap_cr?: number      // market cap in crores
  recommendation: Recommendation
  screening_scores: ScreeningScores
  financials: Financials
  price_data: PriceData
  entry: EntryData
  thesis: Thesis
}
```

---

## `ScreeningScores` Interface

5-dimensional score system (each 0–10, max total 50):
```ts
interface ScreeningScores {
  business_quality: number        // moat, brand, pricing power
  financial_strength: number      // balance sheet, cash flow, debt
  growth_potential: number        // revenue/earnings growth outlook
  management_quality: number      // capital allocation, track record
  valuation_attractiveness: number // PE/PB vs history, margin of safety
  total: number                   // sum of above
  max: number                     // always 50
}
```
Used in: `ScreeningScoreRadar` (radar chart on StockDetail page)

---

## `Financials` Interface

```ts
interface Financials {
  pe_ratio?: number | null
  pb_ratio?: number | null
  roe_pct?: number | null
  dividend_yield_pct?: number | null
  debt_to_equity?: number | null
  operating_margin_pct?: number | null
  ev_ebitda?: number | null
  week_52_high?: number | null
  week_52_low?: number | null
  market_cap_cr?: number | null
}
```
Used in: `KeyMetricsGrid`, `ValuationComparison` page

---

## `PriceData` Interface

```ts
interface PriceData {
  current_price?: number | null
  price_date?: string                  // 'YYYY-MM-DD'
  analyst_targets: AnalystTarget[]     // array of brokerage targets
  consensus_target_low?: number | null
  consensus_target_high?: number | null
  consensus_target_avg?: number | null
  upside_to_low_pct?: number | null
  upside_to_high_pct?: number | null
  upside_to_avg_pct?: number | null
  note?: string
}

interface AnalystTarget {
  brokerage: string
  target: number
  rating: string      // 'Buy' | 'Hold' | 'Add' | 'Sell'
  note?: string
}
```
Used in: `PriceTargetPanel`, `UpsidePotential` page, `EntryZoneVisualizer`

---

## `EntryData` Interface

```ts
interface EntryData {
  call: string              // 'Buy Now' | 'Wait' | 'Accumulate'
  buy_zone_low?: number | null
  buy_zone_high?: number | null
  in_zone: boolean          // true if current_price is within zone
  zone_status: ZoneStatus
  rationale: string         // text explanation of entry timing
  horizon: string           // '5–10 years', '7–15 years' etc
  conviction: string        // 'High' | 'Medium' etc
}
```
Used in: `EntryZoneVisualizer`, `EntryOpportunity` page, `RecommendationCard`

---

## `Thesis` Interface

```ts
interface Thesis {
  core_business: string
  competitive_advantage: string
  growth_drivers: string[]       // array of bullet points
  risks: string[]                // array of bullet points
  valuation_status: string       // 'Fairly Valued', 'Undervalued', etc.
}
```
Used in: `InvestmentThesisPanel`

---

## `Sector` Interface

```ts
interface Sector {
  id: string              // slug for routing
  name: string
  shortName: string
  stage: string           // 'Accelerating Growth', 'Mature', etc.
  stage_detail: string
  metrics: SectorMetric[]
  breakdown: SegmentBreakdown[]
  tailwinds: string[]
  risks: string[]
  companies: Company[]    // stocks in this sector
  icon: string            // lucide icon name
}
```

---

## Helper Functions (in `types/index.ts`)

```ts
getRecColor(rec) → RecColor        // maps recommendation string to color key
getRecLabel(rec) → string          // returns rec string as-is

REC_COLORS: Record<RecColor, { bg, text, border, dot }>   // color values for each rec type
ZONE_LABELS: Record<ZoneStatus, { label, color, bg }>      // display info for zone status
```

---

## Data Access Functions (in `mockData.ts`)

```ts
allCompanies        // flat array of all Company objects across all sectors
sectors             // array of all Sector objects

getStrongBuys()           // Company[] where recommendation === 'Strong Buy'
getInZoneStocks()         // Company[] where entry.in_zone === true
getSortedByUpside()       // Company[] sorted by upside_to_avg_pct descending
```
