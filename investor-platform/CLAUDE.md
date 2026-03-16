# Investor Research Platform — CLAUDE.md

## What Is This?

A **premium equity research and stock analysis web app** for Indian markets (NSE/BSE).
Built in React + TypeScript + TailwindCSS + Recharts.
Dev server: `npm run dev` → runs on `http://localhost:5173`

---

## Goal

Help individual investors make **clear, fast investment decisions** by presenting:
- Buy/Sell recommendations with conviction levels
- Entry price zones (buy zone ranges)
- Analyst target prices and upside %
- Key financial metrics and valuation data
- Structured investment thesis per stock
- Sector-level tailwinds and risks

---

## Project Location

```
/Users/coschool/Documents/finance/investor-platform/
```

---

## Source Structure

```
src/
├── App.tsx                         # Route definitions
├── main.tsx                        # React entry point
├── index.css                       # Global styles + CSS variables
├── types/
│   └── index.ts                    # All TypeScript types + helper functions + color maps
├── data/
│   └── mockData.ts                 # All stock + sector data (NSE/BSE stocks)
├── components/
│   ├── layout/
│   │   ├── DashboardLayout.tsx     # Wrapper: Sidebar + TopBar + page content
│   │   ├── Sidebar.tsx             # Left nav (Dashboard, Upside, Entry, Valuation, Sectors)
│   │   └── TopBar.tsx              # Top header bar
│   ├── ui/
│   │   ├── Badge.tsx               # RecBadge, ZoneBadge reusable components
│   │   └── Card.tsx                # Base card wrapper
│   ├── RecommendationCard.tsx      # Stock card with rec badge + price + zone + upside
│   ├── EntryZoneVisualizer.tsx     # Visual price bar (zone / current / target)
│   ├── KeyMetricsGrid.tsx          # PE, PB, ROE, Yield, MarketCap grid
│   ├── ScreeningScoreRadar.tsx     # Radar chart for 5 screening dimensions
│   ├── InvestmentThesisPanel.tsx   # Core business, moat, growth drivers, risks
│   ├── PriceTargetPanel.tsx        # Analyst targets table + consensus
│   └── SectorMetricsPanel.tsx      # Sector snapshot metrics cards
└── pages/
    ├── Dashboard.tsx               # Main landing — stats + strong buys + in-zone + upside
    ├── SectorOverview.tsx          # Macro view — sector metrics, breakdown chart, tailwinds/risks
    ├── StockDetail.tsx             # Full stock deep-dive page
    ├── UpsidePotential.tsx         # Ranked table by upside %
    ├── EntryOpportunity.tsx        # Stocks in/near buy zones
    └── ValuationComparison.tsx     # Bar charts + table comparing PE/PB/ROE/Yield
```

---

## Features Docs

See `features/` folder for detailed breakdowns:

| File | What It Covers |
|------|----------------|
| `01-project-overview.md` | Goals, design principles, audience |
| `02-data-model.md` | TypeScript types — Company, Sector, PriceData, EntryData, etc. |
| `03-design-system.md` | Colors, fonts, CSS variables, recommendation color system |
| `04-pages.md` | All 6 pages — purpose, layout, key widgets |
| `05-components.md` | Every component — what it does + props |
| `06-mock-data.md` | Stocks covered, sectors, data fields |
| `07-routing.md` | All routes and navigation logic |

---

## Current Data Coverage

- **Sectors**: IT (Information Technology), Renewable Energy
- **Stocks**: TCS, Infosys, HCL Tech, Persistent Systems + renewable energy companies
- Data is mock/static — no live API yet

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 + TypeScript | UI framework |
| Vite | Build tool / dev server |
| TailwindCSS | Styling |
| Recharts | Charts (radar, bar, pie) |
| React Router v6 | Client-side routing |
| Lucide React | Icons |
