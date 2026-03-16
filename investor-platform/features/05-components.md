# 05 — Components

---

## Layout Components

### `DashboardLayout`
**File:** `src/components/layout/DashboardLayout.tsx`
**Props:** `{ title, subtitle, children }`
**What it does:** Wraps every page. Renders `<Sidebar>` + `<TopBar>` + scrollable content area.
The content area has `ml-60 pt-16 p-8` padding to account for fixed sidebar and topbar.

---

### `Sidebar`
**File:** `src/components/layout/Sidebar.tsx`
**Props:** none (reads route from `useLocation`)
**What it does:**
- Fixed left column (240px wide)
- Logo area: Activity icon + "Investor / Research Platform"
- Main nav: Dashboard, Upside Potential, Entry Opportunities, Valuation Compare
- Sector nav: IT Sector (`/sector/it`), Renewable Energy (`/sector/renewable`)
- Active state: gold background + gold text + ChevronRight icon
- Footer: data source disclaimer

**To add a new sector:** Add an entry to `sectorItems` array in this file.

---

### `TopBar`
**File:** `src/components/layout/TopBar.tsx`
**Props:** `{ title, subtitle }`
**What it does:** Fixed top bar showing current page title and subtitle. Currently display-only.

---

## UI Primitives

### `RecBadge`
**File:** `src/components/ui/Badge.tsx`
**Props:** `{ recommendation: Recommendation, size?: 'sm' | 'md' | 'lg' }`
**What it does:** Renders a colored badge pill for the recommendation type.
Uses `getRecColor()` to map recommendation → `REC_COLORS` entry.

### `ZoneBadge`
**File:** `src/components/ui/Badge.tsx`
**Props:** `{ status: ZoneStatus }`
**What it does:** Renders a colored badge for zone status (In Buy Zone / Near / Above etc).
Uses `ZONE_LABELS` map for colors and labels.

### `Card`
**File:** `src/components/ui/Card.tsx`
**Props:** `{ children, className?, style? }`
**What it does:** Base dark card wrapper with consistent border + background styling.

---

## Feature Components

### `RecommendationCard`
**File:** `src/components/RecommendationCard.tsx`
**Props:** `{ company: Company }`
**What it does:**
- Large stock card used on Dashboard's Strong Buy section
- Shows: RecBadge + ticker + name + sector
- Current price (large, monospace)
- Buy zone range
- Target price range
- Upside % (colored)
- ZoneBadge
- "View Analysis →" link to `/stock/:id`

---

### `EntryZoneVisualizer`
**File:** `src/components/EntryZoneVisualizer.tsx`
**Props:** `{ company: Company }`
**What it does:**
- Horizontal price bar visualization
- Renders buy zone as a green highlighted region on the track
- Current price as a glowing dot (green if in zone, amber if not)
- Analyst avg target as a purple dot with ★
- Target range as a thin purple bar
- Price labels below the track for zone low/high, current, avg target
- Zone status panel below (with rationale text)

**Scale logic:** Automatically calculates min/max from all relevant prices, scales to percentage positions.

---

### `KeyMetricsGrid`
**File:** `src/components/KeyMetricsGrid.tsx`
**Props:** `{ company: Company }`
**What it does:**
- Grid of metric cards (2-column or 4-column)
- Metrics: PE Ratio, PB Ratio, ROE %, Dividend Yield, Debt/Equity, Operating Margin, 52W High, 52W Low, Market Cap
- Each card: label + value (monospace) + optional context color
- Missing values shown as "—"

---

### `ScreeningScoreRadar`
**File:** `src/components/ScreeningScoreRadar.tsx`
**Props:** `{ company: Company }`
**What it does:**
- Recharts `RadarChart` with 5 axes:
  - Business Quality
  - Financial Strength
  - Growth Potential
  - Management Quality
  - Valuation Attractiveness
- Each axis scored 0–10
- Total score shown below chart (e.g. 40/50)
- Score bar at bottom as a horizontal progress bar

---

### `InvestmentThesisPanel`
**File:** `src/components/InvestmentThesisPanel.tsx`
**Props:** `{ company: Company }`
**What it does:**
- 4-section structured research panel:
  1. **Core Business** — what the company does
  2. **Competitive Advantage** — moat / differentiation
  3. **Growth Drivers** — bulleted list
  4. **Key Risks** — bulleted list
- Expandable sections (click to expand/collapse)
- Valuation status shown as a badge at the bottom

---

### `PriceTargetPanel`
**File:** `src/components/PriceTargetPanel.tsx`
**Props:** `{ company: Company }`
**What it does:**
- Table of analyst brokerage targets (brokerage name, target price, rating)
- Consensus summary row: Low Target · Avg Target · High Target
- Upside % for each consensus point
- Color-coded rating badges (Buy=green, Hold=amber, Sell=red)

---

### `SectorMetricsPanel`
**File:** `src/components/SectorMetricsPanel.tsx`
**Props:** `{ sector: Sector }`
**What it does:**
- Grid of metric cards for the sector snapshot
- Each card shows: label + value + unit + optional note
- Used at top of `SectorOverview` page

---

## Component Relationships

```
DashboardLayout
├── Sidebar
└── TopBar
    └── [page content]
        ├── Dashboard
        │   └── RecommendationCard (×N)
        ├── StockDetail
        │   ├── EntryZoneVisualizer
        │   ├── KeyMetricsGrid
        │   ├── ScreeningScoreRadar
        │   ├── PriceTargetPanel
        │   └── InvestmentThesisPanel
        └── SectorOverview
            └── SectorMetricsPanel
```
