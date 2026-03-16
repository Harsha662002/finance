# 01 — Project Overview

## What We Are Building

A **premium equity research and stock analysis dashboard** for Indian retail investors.
The platform presents structured investment research in a highly visual, decision-oriented format.

**Name:** Investor Research Platform
**Market:** NSE / BSE (Indian stock market)
**Stack:** React + TypeScript + TailwindCSS + Recharts + React Router v6

---

## Core Problem Being Solved

Retail investors struggle with:
1. Too much data, not enough clarity on what action to take
2. No visual way to know if a stock is in a good entry zone
3. Analyst reports are dense — key thesis buried in text
4. No quick way to compare stocks across valuation metrics

---

## Design Principles (Must Be Respected)

### 1. Decision-First Design
The most important info must appear **first and largest**:
- Recommendation badge (Strong Buy / Buy / Buy on Dip / Watchlist)
- Current price
- Buy zone
- Target price range
- Upside percentage

### 2. Strong Visual Signaling (Color System)
| Recommendation | Color | Hex |
|---|---|---|
| Strong Buy | Bright Green | `#00E676` |
| Buy | Light Green | `#4ADE80` |
| Buy on Dip | Amber/Yellow | `#F59E0B` |
| Buy on Correction | Orange | `#F97316` |
| Watchlist | Slate/Grey | `#94A3B8` |
| Speculative | Red | `#EF4444` |

### 3. Dashboard Clarity
- Card-based layout
- Clean spacing
- Strong typography hierarchy
- Minimal text noise
- Scannable and readable at a glance

### 4. Fintech-Quality Design
- Dark theme primary (deep navy/obsidian)
- Gold accent (`#C9914A`) for premium feel
- Cormorant Garamond for display headings
- IBM Plex Mono for numbers and financial data
- Recharts for all visualizations

---

## Target User

An individual investor or analyst who:
- Follows Indian equity markets (NSE/BSE)
- Wants structured research, not raw screener data
- Needs to quickly decide: **should I buy this now, wait, or skip?**
- Values visual clarity over spreadsheet-style data dumps

---

## What "Done" Looks Like

A user opens the dashboard and within 10 seconds knows:
- Which stocks are Strong Buy right now
- Which are inside their buy zone (actionable entry)
- What the upside potential is for each
- One click into any stock for full thesis + metrics + entry visualizer
