import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine,
} from 'recharts';
import DashboardLayout from '../components/layout/DashboardLayout';
import { RecBadge } from '../components/ui/Badge';
import { allCompanies } from '../data/mockData';
import { getRecColor, REC_COLORS } from '../types';

type Metric = 'pe_ratio' | 'pb_ratio' | 'roe_pct' | 'dividend_yield_pct';

const METRIC_OPTIONS: { id: Metric; label: string; unit: string; description: string; positive: 'high' | 'low' }[] = [
  { id: 'pe_ratio',            label: 'P/E Ratio',        unit: 'x',  description: 'Price-to-Earnings. Lower = cheaper.', positive: 'low' },
  { id: 'pb_ratio',            label: 'P/B Ratio',        unit: 'x',  description: 'Price-to-Book. Lower = more asset coverage.', positive: 'low' },
  { id: 'roe_pct',             label: 'ROE',              unit: '%',  description: 'Return on Equity. Higher = more profitable.', positive: 'high' },
  { id: 'dividend_yield_pct',  label: 'Dividend Yield',   unit: '%',  description: 'Annual dividend ÷ price × 100. Higher = more income.', positive: 'high' },
];

function ChartTooltip({ active, payload, label, unit }: any) {
  if (active && payload?.length) {
    return (
      <div className="px-4 py-3 rounded-lg shadow-xl"
        style={{ background: '#1A2D4A', border: '1px solid rgba(201,145,74,0.2)' }}>
        <p className="text-sm text-slate-200 font-medium mb-1">{label}</p>
        <p className="font-mono font-bold text-gold text-lg">{payload[0].value?.toFixed(1)}{unit}</p>
      </div>
    );
  }
  return null;
}

export default function ValuationComparison() {
  const navigate = useNavigate();
  const [activeMetric, setActiveMetric] = useState<Metric>('pe_ratio');
  const [sectorFilter, setSectorFilter] = useState('all');

  const metricInfo = METRIC_OPTIONS.find(m => m.id === activeMetric)!;

  const companies = allCompanies.filter(c =>
    c.price_data.current_price != null &&
    c.financials[activeMetric] != null &&
    (sectorFilter === 'all' || c.sectorId === sectorFilter)
  );

  const chartData = [...companies]
    .sort((a, b) => {
      const va = a.financials[activeMetric] as number;
      const vb = b.financials[activeMetric] as number;
      return metricInfo.positive === 'high' ? vb - va : va - vb;
    })
    .map(c => ({
      name: c.ticker,
      value: c.financials[activeMetric] as number,
      company: c,
    }));

  const avg = chartData.length > 0
    ? chartData.reduce((s, d) => s + d.value, 0) / chartData.length
    : 0;

  const getBestColor = (val: number): string => {
    if (metricInfo.positive === 'high') {
      return val >= avg * 1.2 ? '#00E676' : val >= avg * 0.8 ? '#F59E0B' : '#64748B';
    } else {
      return val <= avg * 0.8 ? '#00E676' : val <= avg * 1.2 ? '#F59E0B' : '#64748B';
    }
  };

  return (
    <DashboardLayout
      title="Valuation Comparison"
      subtitle="Side-by-side comparison of key valuation metrics across stocks"
    >
      {/* Metric selector */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <p className="text-xs font-mono text-slate-500">Metric:</p>
        {METRIC_OPTIONS.map(m => (
          <button
            key={m.id}
            onClick={() => setActiveMetric(m.id)}
            className="px-4 py-2 rounded-lg text-sm font-mono transition-all"
            style={{
              background: activeMetric === m.id ? 'rgba(201,145,74,0.15)' : 'rgba(17,32,56,0.6)',
              border: `1px solid ${activeMetric === m.id ? 'rgba(201,145,74,0.35)' : 'rgba(148,163,184,0.08)'}`,
              color: activeMetric === m.id ? '#C9914A' : '#8B9EC0',
            }}
          >
            {m.label}
          </button>
        ))}
        <div className="w-px h-5 bg-slate-800 mx-2" />
        <p className="text-xs font-mono text-slate-500">Sector:</p>
        {[{ id: 'all', label: 'All' }, { id: 'it', label: 'IT' }, { id: 'renewable', label: 'RE' }].map(f => (
          <button
            key={f.id}
            onClick={() => setSectorFilter(f.id)}
            className="px-3 py-1.5 rounded-lg text-xs font-mono transition-all"
            style={{
              background: sectorFilter === f.id ? 'rgba(127,119,221,0.15)' : 'rgba(17,32,56,0.6)',
              border: `1px solid ${sectorFilter === f.id ? 'rgba(127,119,221,0.35)' : 'rgba(148,163,184,0.08)'}`,
              color: sectorFilter === f.id ? '#7F77DD' : '#8B9EC0',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Metric info banner */}
      <div className="p-4 rounded-xl mb-6 animate-slide-up flex items-center gap-4"
        style={{ background: 'rgba(17,32,56,0.5)', border: '1px solid rgba(201,145,74,0.12)' }}>
        <div className="flex-1">
          <p className="text-sm text-slate-300">{metricInfo.description}</p>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Sector avg: <span className="text-gold font-bold">{avg.toFixed(1)}{metricInfo.unit}</span>
            &nbsp;·&nbsp;{metricInfo.positive === 'high' ? '↑ Higher is better' : '↓ Lower is better'}
            &nbsp;·&nbsp;{chartData.length} stocks
          </p>
        </div>
        <div className="flex items-center gap-4">
          {[
            { color: '#00E676', label: metricInfo.positive === 'high' ? 'Above avg' : 'Below avg' },
            { color: '#F59E0B', label: 'Near avg' },
            { color: '#64748B', label: metricInfo.positive === 'high' ? 'Below avg' : 'Above avg' },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: l.color }} />
              <span className="text-xs font-mono text-slate-500">{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Chart */}
        <div className="col-span-2">
          <div className="p-5 rounded-xl animate-slide-up" style={{ background: 'rgba(13,22,40,0.85)', border: '1px solid rgba(148,163,184,0.08)' }}>
            <h2 className="font-display text-lg font-semibold text-slate-100 mb-5">
              {metricInfo.label} Comparison
            </h2>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 30 }}>
                  <CartesianGrid strokeDasharray="2 2" stroke="rgba(148,163,184,0.06)" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 10, fontFamily: 'IBM Plex Mono', fill: '#4A5880' }}
                    tickLine={false}
                    axisLine={{ stroke: 'rgba(148,163,184,0.08)' }}
                    angle={-30}
                    textAnchor="end"
                    interval={0}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fontFamily: 'IBM Plex Mono', fill: '#4A5880' }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={v => `${v}${metricInfo.unit}`}
                  />
                  <Tooltip
                    content={(props) => <ChartTooltip {...props} unit={metricInfo.unit} />}
                    cursor={{ fill: 'rgba(201,145,74,0.05)' }}
                  />
                  <ReferenceLine
                    y={avg}
                    stroke="#C9914A"
                    strokeDasharray="4 4"
                    strokeWidth={1.5}
                    label={{ value: `Avg ${avg.toFixed(1)}${metricInfo.unit}`, position: 'insideTopRight', fontSize: 9, fontFamily: 'IBM Plex Mono', fill: '#C9914A' }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={48}>
                    {chartData.map((entry, i) => (
                      <Cell key={i} fill={getBestColor(entry.value)} opacity={0.85} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="py-16 text-center">
                <p className="text-slate-600">No data available for this metric in selected sector.</p>
              </div>
            )}
          </div>
        </div>

        {/* Ranking table */}
        <div className="col-span-1">
          <div className="p-5 rounded-xl animate-slide-up" style={{ background: 'rgba(13,22,40,0.85)', border: '1px solid rgba(148,163,184,0.08)' }}>
            <h2 className="font-display text-base font-semibold text-slate-100 mb-4">
              Ranking — {metricInfo.label}
            </h2>
            <div className="space-y-2">
              {chartData.map((d, i) => {
                const color = getBestColor(d.value);
                const rc = getRecColor(d.company.recommendation);
                const recColors = REC_COLORS[rc];
                return (
                  <div
                    key={d.company.id}
                    className="flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-all duration-150 animate-fade-in"
                    style={{ animationDelay: `${i * 30}ms`, border: '1px solid rgba(148,163,184,0.05)' }}
                    onClick={() => navigate(`/stock/${d.company.id}`)}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(22,40,70,0.6)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                  >
                    <div className="w-6 h-6 rounded flex items-center justify-center text-[11px] font-mono font-bold flex-shrink-0"
                      style={{ background: `${color}18`, color }}>
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-slate-300 truncate">{d.company.name}</p>
                      <p className="text-[10px] font-mono text-slate-600">{d.company.ticker}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-mono font-bold text-sm" style={{ color }}>
                        {d.value.toFixed(1)}{metricInfo.unit}
                      </p>
                      <div className="flex justify-end mt-0.5">
                        <RecBadge recommendation={d.company.recommendation} size="sm" />
                      </div>
                    </div>
                  </div>
                );
              })}
              {chartData.length === 0 && (
                <p className="text-center text-slate-600 text-xs py-8">No data for this metric in selected sector.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <p className="text-[11px] text-slate-700 mt-6 font-mono">
        ⚠ Financial metrics sourced from analyst research. Not investment advice — consult a SEBI-registered advisor before investing.
      </p>
    </DashboardLayout>
  );
}
