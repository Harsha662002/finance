# 03 — Design System

**File:** `src/index.css` (CSS variables)
**File:** `tailwind.config.js` (Tailwind tokens)

---

## Aesthetic Direction

**"Bloomberg Terminal meets Luxury Finance"**

- Dark primary theme — deep navy/obsidian
- Gold accents for premium feel
- Elegant serif display font paired with monospace data font
- Glassmorphism-style cards with subtle borders
- Minimal but intentional animations

---

## Color Palette (CSS Variables)

| Variable | Value | Usage |
|---|---|---|
| `--bg-primary` | `#04070F` | Page background |
| `--bg-secondary` | `#080D1A` | Sidebar, secondary areas |
| `--bg-card` | `#0C1222` | Card backgrounds |
| `--bg-elevated` | `#101828` | Hover states, elevated cards |
| `--gold` | `#C9914A` | Primary accent, logo, active nav |
| `--gold-light` | `#E8AC65` | Lighter gold for gradients |
| `--text-primary` | `#EEF2FF` | Main text |
| `--text-secondary` | `#8896B3` | Subtitles, labels |
| `--text-muted` | `#4B5568` | Captions, disclaimers |

### Recommendation Colors

| Rec Type | Key | Background | Text | Border |
|---|---|---|---|---|
| Strong Buy | `strong-buy` | `rgba(0,230,118,0.12)` | `#00E676` | `rgba(0,230,118,0.35)` |
| Buy | `buy` | `rgba(74,222,128,0.10)` | `#4ADE80` | `rgba(74,222,128,0.30)` |
| Buy on Dip | `dip` | `rgba(245,158,11,0.12)` | `#F59E0B` | `rgba(245,158,11,0.35)` |
| Buy on Correction | `correction` | `rgba(249,115,22,0.12)` | `#F97316` | `rgba(249,115,22,0.35)` |
| Watchlist | `watchlist` | `rgba(148,163,184,0.08)` | `#94A3B8` | `rgba(148,163,184,0.2)` |
| Speculative | `speculative` | `rgba(239,68,68,0.10)` | `#EF4444` | `rgba(239,68,68,0.3)` |

### Zone Status Colors

| Status | Label | Color |
|---|---|---|
| `in_zone` | In Buy Zone | `#00E676` (green) |
| `near_zone` | Near Buy Zone | `#F59E0B` (amber) |
| `above_zone` | Above Buy Zone | `#64748B` (slate) |
| `watchlist` | Watchlist | `#94A3B8` (grey) |
| `speculative` | Speculative | `#EF4444` (red) |

---

## Typography

| Font | Usage | Tailwind Class |
|---|---|---|
| Cormorant Garamond | Display headings, page titles | `font-display` |
| IBM Plex Mono | Numbers, tickers, financial data, prices | `font-mono` |
| Outfit | Body text, labels, descriptions | `font-sans` (default) |

Loaded via Google Fonts in `index.html`.

---

## Tailwind Custom Tokens (tailwind.config.js)

```js
colors: {
  gold: '#C9914A',
  'gold-light': '#E8AC65',
  'bg-primary': '#04070F',
  'bg-secondary': '#080D1A',
  'bg-card': '#0C1222',
  'bg-elevated': '#101828',
}

fontFamily: {
  display: ['Cormorant Garamond', 'serif'],
  mono: ['IBM Plex Mono', 'monospace'],
  sans: ['Outfit', 'sans-serif'],
}
```

---

## Animations (defined in index.css)

| Class | Effect |
|---|---|
| `animate-slide-up` | Slides + fades in from below (page load) |
| `animate-fade-in` | Simple fade in |
| `animate-pulse-gold` | Subtle gold pulse for glowing accents |

---

## Layout Structure

```
┌──────────────────────────────────────────────────────────┐
│  Sidebar (240px fixed)  │  TopBar (full width, fixed top) │
│  - Logo                 │  - Page title + subtitle        │
│  - Nav items            │  - (future: search/profile)     │
│  - Sector links         ├─────────────────────────────────┤
│  - Footer disclaimer    │  Page Content (scrollable)      │
│                         │  - Padding: p-8                 │
│                         │  - Max width: unconstrained     │
└─────────────────────────┴─────────────────────────────────┘
```

Left sidebar: `w-60` (240px), fixed, full height
Content area: `ml-60` offset, `pt-16` for TopBar

---

## Card Style Pattern

All cards follow this consistent pattern:
```jsx
<div
  className="p-5 rounded-xl"
  style={{
    background: 'rgba(13,22,40,0.85)',
    border: '1px solid rgba(148,163,184,0.08)'
  }}
>
```

Hover state adds: `border-color: rgba(201,145,74,0.2)` (gold tint)

---

## Recharts Styling Convention

All charts use:
- Background: transparent
- Grid lines: `stroke="rgba(148,163,184,0.06)"`
- Tooltips: dark glass style with gold border
- Fonts: IBM Plex Mono for labels
