# 07 — Routing & Navigation

**File:** `src/App.tsx` (route definitions)
**File:** `src/components/layout/Sidebar.tsx` (nav links)

---

## Route Table

| Path | Component | Description |
|---|---|---|
| `/` | `Dashboard` | Main landing — overview + strong buys + in-zone stocks |
| `/upside` | `UpsidePotential` | All stocks ranked by upside % |
| `/entry` | `EntryOpportunity` | Stocks filtered by buy zone status |
| `/valuation` | `ValuationComparison` | Side-by-side valuation metrics comparison |
| `/sector/:sectorId` | `SectorOverview` | Sector macro view (IT, Renewable, etc.) |
| `/stock/:stockId` | `StockDetail` | Full stock deep-dive page |

---

## URL Parameters

### `/sector/:sectorId`
- `sectorId` must match a `Sector.id` in `mockData.ts`
- Current valid values: `'it'`, `'renewable'`
- If not found → shows "Sector not found" message

### `/stock/:stockId`
- `stockId` must match a `Company.id` in `mockData.ts`
- Examples: `'tcs'`, `'infosys'`, `'hcltech'`, `'persistent'`
- If not found → shows "Stock not found" message

---

## Navigation Links

### Sidebar (primary nav)
```
Dashboards group:
  → /                    Dashboard
  → /upside              Upside Potential
  → /entry               Entry Opportunities
  → /valuation           Valuation Compare

Sectors group:
  → /sector/it           IT Sector
  → /sector/renewable    Renewable Energy
```

### In-page navigation
- `RecommendationCard` → "View Analysis →" links to `/stock/:id`
- In-Zone table rows (Dashboard) → navigate to `/stock/:id`
- Upside Potential table rows → navigate to `/stock/:id`
- Entry Opportunity table rows → navigate to `/stock/:id`
- Sector company cards → navigate to `/stock/:id`

---

## Router Setup

```tsx
// src/App.tsx
<BrowserRouter>
  <Routes>
    <Route path="/"                 element={<Dashboard />} />
    <Route path="/upside"           element={<UpsidePotential />} />
    <Route path="/entry"            element={<EntryOpportunity />} />
    <Route path="/valuation"        element={<ValuationComparison />} />
    <Route path="/sector/:sectorId" element={<SectorOverview />} />
    <Route path="/stock/:stockId"   element={<StockDetail />} />
  </Routes>
</BrowserRouter>
```

Uses **React Router v6** with `useNavigate()` for programmatic nav and `NavLink` for sidebar links.

---

## Active State Logic

In `Sidebar.tsx`:
- Dashboard/Upside/Entry/Valuation: `location.pathname === path` (exact match)
- Sector links: `location.pathname.startsWith(path)` (prefix match, so `/sector/it/...` also highlights)

Active items get:
- Gold text color (`text-gold`)
- Gold background tint (`rgba(201,145,74,0.1)`)
- Gold border (`rgba(201,145,74,0.2)`)
- ChevronRight indicator icon
