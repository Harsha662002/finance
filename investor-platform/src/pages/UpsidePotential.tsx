import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpDown, TrendingUp, ChevronUp, ChevronDown } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { RecBadge, ZoneBadge } from '../components/ui/Badge';
import { getSortedByUpside, allCompanies } from '../data/mockData';
import { Company, getRecColor, REC_COLORS } from '../types';

type SortKey = 'upside' | 'name' | 'price' | 'target';
type SortDir = 'asc' | 'desc';

function UpsideBar({ pct }: { pct: number }) {
  const capped = Math.min(pct, 80);
  const color = pct >= 40 ? '#00E676' : pct >= 20 ? '#F59E0B' : '#94A3B8';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(148,163,184,0.1)', minWidth: 60 }}>
        <div
          className="h-full rounded-full animated-bar"
          style={{ width: `${(capped / 80) * 100}%`, background: color }}
        />
      </div>
      <span className="font-mono font-bold text-sm whitespace-nowrap" style={{ color }}>
        +{pct}%
      </span>
    </div>
  );
}

export default function UpsidePotential() {
  const navigate = useNavigate();
  const [sortKey, setSortKey] = useState<SortKey>('upside');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [sectorFilter, setSectorFilter] = useState<string>('all');

  const companies = allCompanies.filter(c =>
    c.price_data.upside_to_avg_pct != null &&
    c.price_data.current_price != null &&
    (sectorFilter === 'all' || c.sectorId === sectorFilter)
  );

  const sorted = [...companies].sort((a, b) => {
    let va: number | string = 0, vb: number | string = 0;
    if (sortKey === 'upside')  { va = a.price_data.upside_to_avg_pct!; vb = b.price_data.upside_to_avg_pct!; }
    if (sortKey === 'price')   { va = a.price_data.current_price!;     vb = b.price_data.current_price!; }
    if (sortKey === 'target')  { va = a.price_data.consensus_target_avg ?? 0; vb = b.price_data.consensus_target_avg ?? 0; }
    if (sortKey === 'name')    { va = a.name; vb = b.name; }
    if (typeof va === 'string') return sortDir === 'asc' ? va.localeCompare(vb as string) : (vb as string).localeCompare(va);
    return sortDir === 'asc' ? (va as number) - (vb as number) : (vb as number) - (va as number);
  });

  function handleSort(key: SortKey) {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
  }

  function SortIcon({ k }: { k: SortKey }) {
    if (sortKey !== k) return <ArrowUpDown size={11} className="text-slate-700" />;
    return sortDir === 'desc' ? <ChevronDown size={11} className="text-gold" /> : <ChevronUp size={11} className="text-gold" />;
  }

  const maxUpside = Math.max(...sorted.map(c => c.price_data.upside_to_avg_pct ?? 0));

  return (
    <DashboardLayout
      title="Upside Potential"
      subtitle="Stocks ranked by implied upside to average analyst target"
    >
      {/* Filters */}
      <div className="flex items-center gap-3 mb-6">
        <p className="text-xs font-mono text-slate-500">Filter:</p>
        {[
          { id: 'all', label: 'All Sectors' },
          { id: 'it', label: 'IT Sector' },
          { id: 'renewable', label: 'Renewable Energy' },
        ].map(f => (
          <button
            key={f.id}
            onClick={() => setSectorFilter(f.id)}
            className="px-3 py-1.5 rounded-lg text-xs font-mono transition-all"
            style={{
              background: sectorFilter === f.id ? 'rgba(201,145,74,0.15)' : 'rgba(17,32,56,0.6)',
              border: `1px solid ${sectorFilter === f.id ? 'rgba(201,145,74,0.35)' : 'rgba(148,163,184,0.08)'}`,
              color: sectorFilter === f.id ? '#C9914A' : '#8B9EC0',
            }}
          >
            {f.label}
          </button>
        ))}
        <span className="text-xs text-slate-600 font-mono ml-2">{sorted.length} stocks</span>
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden animate-slide-up" style={{ border: '1px solid rgba(148,163,184,0.08)' }}>
        <table className="w-full">
          <thead>
            <tr style={{ background: 'rgba(17,32,56,0.9)', borderBottom: '1px solid rgba(148,163,184,0.08)' }}>
              <th className="px-4 py-3 text-left text-[10px] font-mono uppercase tracking-wider text-slate-600 w-8">#</th>
              <th className="px-4 py-3 text-left cursor-pointer" onClick={() => handleSort('name')}>
                <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-600">
                  Company <SortIcon k="name" />
                </div>
              </th>
              <th className="px-4 py-3 text-left cursor-pointer" onClick={() => handleSort('price')}>
                <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-600">
                  Current Price <SortIcon k="price" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-[10px] font-mono uppercase tracking-wider text-slate-600">Target Range</th>
              <th className="px-4 py-3 text-left cursor-pointer" onClick={() => handleSort('target')}>
                <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-600">
                  Avg Target <SortIcon k="target" />
                </div>
              </th>
              <th className="px-4 py-3 text-left cursor-pointer" onClick={() => handleSort('upside')}>
                <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-600">
                  Upside % <SortIcon k="upside" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-[10px] font-mono uppercase tracking-wider text-slate-600">Recommendation</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((c, i) => {
              const upside = c.price_data.upside_to_avg_pct!;
              const rc = getRecColor(c.recommendation);
              const colors = REC_COLORS[rc];
              const isTop = upside >= 40;

              return (
                <tr
                  key={c.id}
                  className="table-row-hover cursor-pointer animate-fade-in"
                  style={{
                    animationDelay: `${i * 30}ms`,
                    borderBottom: i < sorted.length - 1 ? '1px solid rgba(148,163,184,0.04)' : 'none',
                    background: isTop ? 'rgba(0,230,118,0.02)' : 'transparent',
                  }}
                  onClick={() => navigate(`/stock/${c.id}`)}
                >
                  <td className="px-4 py-3 font-mono text-sm text-slate-600">{i + 1}</td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-slate-200">{c.name}</p>
                      <p className="text-[11px] text-slate-600 font-mono">{c.ticker} · {c.sector}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono font-semibold text-slate-100 text-sm">
                    ₹{c.price_data.current_price!.toLocaleString('en-IN')}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">
                    {c.price_data.consensus_target_low && c.price_data.consensus_target_high
                      ? `₹${c.price_data.consensus_target_low.toLocaleString('en-IN')} – ₹${c.price_data.consensus_target_high.toLocaleString('en-IN')}`
                      : '—'}
                  </td>
                  <td className="px-4 py-3 font-mono font-semibold text-gold text-sm">
                    {c.price_data.consensus_target_avg ? `₹${c.price_data.consensus_target_avg.toLocaleString('en-IN')}` : '—'}
                  </td>
                  <td className="px-4 py-3" style={{ minWidth: 160 }}>
                    <UpsideBar pct={upside} />
                  </td>
                  <td className="px-4 py-3">
                    <RecBadge recommendation={c.recommendation} size="sm" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="text-[11px] text-slate-700 mt-6 font-mono">
        ⚠ Analyst targets are 12-month estimates. Not investment advice — consult a SEBI-registered advisor.
      </p>
    </DashboardLayout>
  );
}
