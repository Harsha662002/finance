export type Recommendation =
  | 'Strong Buy'
  | 'Buy'
  | 'Buy on Dip'
  | 'Buy on Correction'
  | 'Watchlist'
  | 'Watchlist — Wait'
  | 'Speculative'
  | 'Avoid';

export type ZoneStatus = 'in_zone' | 'near_zone' | 'above_zone' | 'watchlist' | 'speculative';
export type ConvictionLevel = 'High' | 'Medium-High' | 'Medium' | 'Low-Medium' | 'Low';
export type RecColor = 'strong-buy' | 'buy' | 'dip' | 'correction' | 'watchlist' | 'speculative';

export interface AnalystTarget {
  brokerage: string;
  target: number;
  rating: string;
  note?: string;
}

export interface ScreeningScores {
  business_quality: number;
  financial_strength: number;
  growth_potential: number;
  management_quality: number;
  valuation_attractiveness: number;
  total: number;
  max: number;
}

export interface Financials {
  pe_ratio?: number | null;
  pb_ratio?: number | null;
  roe_pct?: number | null;
  dividend_yield_pct?: number | null;
  debt_to_equity?: number | null;
  operating_margin_pct?: number | null;
  ev_ebitda?: number | null;
  week_52_high?: number | null;
  week_52_low?: number | null;
  market_cap_cr?: number | null;
}

export interface PriceData {
  current_price?: number | null;
  price_date?: string;
  analyst_targets: AnalystTarget[];
  consensus_target_low?: number | null;
  consensus_target_high?: number | null;
  consensus_target_avg?: number | null;
  upside_to_low_pct?: number | null;
  upside_to_high_pct?: number | null;
  upside_to_avg_pct?: number | null;
  note?: string;
}

export interface EntryData {
  call: string;
  buy_zone_low?: number | null;
  buy_zone_high?: number | null;
  in_zone: boolean;
  zone_status: ZoneStatus;
  rationale: string;
  horizon: string;
  conviction: string;
}

export interface Thesis {
  core_business: string;
  competitive_advantage: string;
  growth_drivers: string[];
  risks: string[];
  valuation_status: string;
}

export interface Company {
  id: string;
  name: string;
  ticker: string;
  exchange: string;
  sector: string;
  sectorId: string;
  category: string;
  market_cap_cr?: number | null;
  recommendation: Recommendation;
  screening_scores: ScreeningScores;
  financials: Financials;
  price_data: PriceData;
  entry: EntryData;
  thesis: Thesis;
}

export interface SectorMetric {
  label: string;
  value: number | string;
  unit: string;
  note?: string;
}

export interface SegmentBreakdown {
  segment: string;
  share_pct: number;
  value_gw?: number;
  color: string;
}

export interface Sector {
  id: string;
  name: string;
  shortName: string;
  stage: string;
  stage_detail: string;
  metrics: SectorMetric[];
  breakdown: SegmentBreakdown[];
  tailwinds: string[];
  risks: string[];
  companies: Company[];
  icon: string;
}

export function getRecColor(rec: Recommendation | string): RecColor {
  if (rec === 'Strong Buy') return 'strong-buy';
  if (rec === 'Buy') return 'buy';
  if (rec.includes('Dip')) return 'dip';
  if (rec.includes('Correction')) return 'correction';
  if (rec === 'Speculative') return 'speculative';
  return 'watchlist';
}

export function getRecLabel(rec: Recommendation | string): string {
  return rec;
}

export const REC_COLORS: Record<RecColor, { bg: string; text: string; border: string; dot: string }> = {
  'strong-buy':  { bg: 'rgba(0,230,118,0.12)',  text: '#00E676', border: 'rgba(0,230,118,0.35)',  dot: '#00E676' },
  'buy':         { bg: 'rgba(74,222,128,0.10)',  text: '#4ADE80', border: 'rgba(74,222,128,0.30)',  dot: '#4ADE80' },
  'dip':         { bg: 'rgba(245,158,11,0.12)',  text: '#F59E0B', border: 'rgba(245,158,11,0.35)',  dot: '#F59E0B' },
  'correction':  { bg: 'rgba(249,115,22,0.12)',  text: '#F97316', border: 'rgba(249,115,22,0.35)',  dot: '#F97316' },
  'watchlist':   { bg: 'rgba(148,163,184,0.08)', text: '#94A3B8', border: 'rgba(148,163,184,0.2)',  dot: '#94A3B8' },
  'speculative': { bg: 'rgba(239,68,68,0.10)',   text: '#EF4444', border: 'rgba(239,68,68,0.3)',    dot: '#EF4444' },
};

export const ZONE_LABELS: Record<ZoneStatus, { label: string; color: string; bg: string }> = {
  in_zone:     { label: 'In Buy Zone',    color: '#00E676', bg: 'rgba(0,230,118,0.1)'  },
  near_zone:   { label: 'Near Buy Zone',  color: '#F59E0B', bg: 'rgba(245,158,11,0.1)' },
  above_zone:  { label: 'Above Buy Zone', color: '#64748B', bg: 'rgba(100,116,139,0.1)'},
  watchlist:   { label: 'Watchlist',      color: '#94A3B8', bg: 'rgba(148,163,184,0.08)'},
  speculative: { label: 'Speculative',    color: '#EF4444', bg: 'rgba(239,68,68,0.1)'  },
};
