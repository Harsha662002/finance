import { Financials } from '../types';
import { Info } from 'lucide-react';
import { useState } from 'react';

interface MetricDef {
  key: keyof Financials;
  label: string;
  format: (v: number) => string;
  tooltip: string;
  positive?: 'high' | 'low';
}

const METRICS: MetricDef[] = [
  { key: 'pe_ratio',           label: 'P/E Ratio',       format: v => `${v}x`,   tooltip: 'Price-to-Earnings: share price ÷ earnings per share. Lower = cheaper.', positive: 'low' },
  { key: 'pb_ratio',           label: 'P/B Ratio',       format: v => `${v}x`,   tooltip: 'Price-to-Book: market cap ÷ book value. Lower = more asset coverage.',  positive: 'low' },
  { key: 'roe_pct',            label: 'ROE',              format: v => `${v}%`,   tooltip: 'Return on Equity: net profit ÷ shareholders\' equity. Higher = better.', positive: 'high' },
  { key: 'dividend_yield_pct', label: 'Div. Yield',      format: v => `${v}%`,   tooltip: 'Annual dividend ÷ current share price × 100.',                           positive: 'high' },
  { key: 'debt_to_equity',     label: 'Debt / Equity',   format: v => `${v}x`,   tooltip: 'Total debt ÷ shareholder equity. Lower = stronger balance sheet.',       positive: 'low' },
  { key: 'operating_margin_pct',label: 'Op. Margin',     format: v => `${v}%`,   tooltip: 'Operating income ÷ revenue. Measures operational efficiency.',           positive: 'high' },
  { key: 'ev_ebitda',          label: 'EV/EBITDA',       format: v => `${v}x`,   tooltip: 'Enterprise value ÷ EBITDA. Sector-specific valuation metric.',           positive: 'low' },
  { key: 'week_52_high',       label: '52W High',         format: v => `₹${v.toLocaleString('en-IN')}`, tooltip: 'Highest traded price in the last 52 weeks.' },
  { key: 'week_52_low',        label: '52W Low',          format: v => `₹${v.toLocaleString('en-IN')}`, tooltip: 'Lowest traded price in the last 52 weeks.' },
];

interface Props {
  financials: Financials;
  currentPrice?: number | null;
}

export default function KeyMetricsGrid({ financials, currentPrice }: Props) {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Calculate % from 52W high/low
  const from52High = currentPrice && financials.week_52_high
    ? (((currentPrice - financials.week_52_high) / financials.week_52_high) * 100).toFixed(1)
    : null;

  const validMetrics = METRICS.filter(m => financials[m.key] != null);

  return (
    <div className="space-y-3">
      {/* 52W range visualization */}
      {financials.week_52_low != null && financials.week_52_high != null && currentPrice && (
        <div className="p-4 rounded-xl mb-4" style={{ background: 'rgba(17,32,56,0.5)', border: '1px solid rgba(148,163,184,0.08)' }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-500 font-mono uppercase tracking-wider">52-Week Range</span>
            {from52High && (
              <span className="text-xs font-mono" style={{ color: parseFloat(from52High) < -20 ? '#00E676' : '#94A3B8' }}>
                {from52High}% from 52W high
              </span>
            )}
          </div>
          <div className="relative h-2 rounded-full" style={{ background: 'rgba(148,163,184,0.1)' }}>
            {(() => {
              const low = financials.week_52_low!;
              const high = financials.week_52_high!;
              const pct = ((currentPrice - low) / (high - low)) * 100;
              return (
                <>
                  <div className="absolute h-full rounded-full" style={{ width: `${pct}%`, background: 'linear-gradient(90deg, rgba(0,230,118,0.4), rgba(0,230,118,0.8))' }} />
                  <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2"
                    style={{ left: `${pct}%`, transform: `translateX(-50%) translateY(-50%)`, background: '#00E676', borderColor: '#05080F', boxShadow: '0 0 8px rgba(0,230,118,0.6)' }} />
                </>
              );
            })()}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs font-mono text-slate-500">₹{financials.week_52_low.toLocaleString('en-IN')}</span>
            <span className="text-xs font-mono text-slate-200 font-medium">₹{currentPrice.toLocaleString('en-IN')}</span>
            <span className="text-xs font-mono text-slate-500">₹{financials.week_52_high.toLocaleString('en-IN')}</span>
          </div>
        </div>
      )}

      {/* Metrics grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {validMetrics.filter(m => m.key !== 'week_52_high' && m.key !== 'week_52_low').map(metric => {
          const value = financials[metric.key] as number;
          const isHigh = metric.positive === 'high';
          const isLow = metric.positive === 'low';
          const isGood = isHigh ? value > 20 : isLow ? value < 20 : false;

          return (
            <div
              key={metric.key}
              className="p-3 rounded-xl relative group"
              style={{ background: 'rgba(17,32,56,0.5)', border: '1px solid rgba(148,163,184,0.07)' }}
              onMouseEnter={() => setActiveTooltip(metric.key)}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">{metric.label}</span>
                <Info size={10} className="text-slate-700 group-hover:text-slate-500 transition-colors" />
              </div>
              <p className="font-mono font-bold text-lg text-slate-100">{metric.format(value)}</p>

              {/* Tooltip */}
              {activeTooltip === metric.key && (
                <div
                  className="absolute bottom-full left-0 mb-2 w-52 p-2.5 rounded-lg text-xs text-slate-300 z-50 leading-relaxed"
                  style={{ background: '#1A2D4A', border: '1px solid rgba(201,145,74,0.2)', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}
                >
                  {metric.tooltip}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
