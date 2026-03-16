# 04 — Pages

All pages use `DashboardLayout` as wrapper (Sidebar + TopBar + content area).

---

## 1. Dashboard (`/`)
**File:** `src/pages/Dashboard.tsx`

**Purpose:** Landing page. Quick overview of top investment opportunities.

**Layout:**
- Stats strip (4 cards across top): Stocks Tracked · Strong Buys · In Buy Zone · Sectors Covered
- Left 2/3 column:
  - Strong Buy Recommendations → `RecommendationCard` grid
  - Stocks Currently In Buy Zone → table with ticker, price, zone, upside, rec badge
- Right 1/3 column:
  - Top Upside Opportunities → ranked list with upside %, target price
  - Sector Summary Cards → IT + Renewable Energy with stage + company count

**Key data:**
- `getStrongBuys()` — for recommendation cards
- `getInZoneStocks()` — for in-zone table
- `getSortedByUpside().slice(0,5)` — for top upside list
- `sectors` — for sector summary

---

## 2. Sector Overview (`/sector/:sectorId`)
**File:** `src/pages/SectorOverview.tsx`

**Purpose:** Macro investment context for each sector.

**URL params:** `:sectorId` → matches `sector.id` (`'it'` or `'renewable'`)

**Layout:**
- Hero: Sector name + stage badge + stage detail
- Sector Snapshot → `SectorMetricsPanel` (metric cards grid)
- Two-column:
  - Left: Segment Breakdown (Recharts PieChart or BarChart)
  - Right: Tailwinds vs Risks panels
- Company cards for stocks in this sector

**Key data:** `sectors.find(s => s.id === sectorId)`

---

## 3. Stock Detail (`/stock/:stockId`)
**File:** `src/pages/StockDetail.tsx`

**Purpose:** Full deep-dive on a single stock. Most important page.

**URL params:** `:stockId` → matches `company.id`

**Layout:**
- **Hero section:** Name + ticker + exchange + `RecBadge` + conviction + current price
- **Three-column stats:** Buy Zone · Target Price Range · Upside to Avg Target
- **Entry Opportunity Visualizer** → `EntryZoneVisualizer` (visual price bar)
- **Two-column grid:**
  - Left: `KeyMetricsGrid` (PE, PB, ROE, Yield, D/E, Op Margin, 52w Hi/Lo, MCap)
  - Right: `ScreeningScoreRadar` (radar chart — 5 dimensions)
- **Analyst Targets** → `PriceTargetPanel` (table of brokerage targets)
- **Investment Thesis** → `InvestmentThesisPanel` (core biz, moat, growth drivers, risks)

**Key data:** `allCompanies.find(c => c.id === stockId)`

---

## 4. Upside Potential (`/upside`)
**File:** `src/pages/UpsidePotential.tsx`

**Purpose:** Rank all stocks by upside % to help identify highest return opportunities.

**Layout:**
- Sortable table with columns:
  - Rank · Stock (name + ticker) · Recommendation · Current Price · Buy Zone · Avg Target · Upside %
- Column headers are clickable to sort
- Upside % shown as colored badge (green = high, amber = medium, slate = low/negative)
- Clicking a row navigates to `/stock/:stockId`

**Key data:** `getSortedByUpside()` — sorted by `upside_to_avg_pct` desc

---

## 5. Entry Opportunity (`/entry`)
**File:** `src/pages/EntryOpportunity.tsx`

**Purpose:** Highlight stocks currently in or near their buy zones. Helps with entry timing.

**Layout:**
- Filter tabs: All · In Zone · Near Zone · Above Zone
- Table columns: Stock · Current Price · Buy Zone · Zone Status · Conviction · Horizon
- Zone Status shown as colored badge (`ZoneBadge`)
- Stocks in buy zone prioritized at top
- Clicking a row navigates to `/stock/:stockId`

**Key data:** `allCompanies` filtered by `entry.zone_status`

---

## 6. Valuation Comparison (`/valuation`)
**File:** `src/pages/ValuationComparison.tsx`

**Purpose:** Compare stocks across key valuation and quality metrics side by side.

**Layout:**
- Metric selector tabs: PE Ratio · PB Ratio · ROE · Dividend Yield
- Recharts `BarChart` comparing all stocks for selected metric
- Bars colored by recommendation type
- Summary ranking table below chart:
  - Columns: Stock · PE · PB · ROE · Yield · Rec
  - Sortable by clicking column headers
- Stocks with missing data shown as "—"

**Key data:** `allCompanies` with `financials` data
