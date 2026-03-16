import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { RecBadge, ZoneBadge } from '../components/ui/Badge';
import { allCompanies } from '../data/mockData';
import { ZoneStatus, ZONE_LABELS, getRecColor, REC_COLORS } from '../types';

const ZONE_FILTER_OPTIONS: { id: ZoneStatus | 'all'; label: string }[] = [
  { id: 'all',        label: 'All' },
  { id: 'in_zone',    label: 'In Buy Zone' },
  { id: 'near_zone',  label: 'Near Buy Zone' },
  { id: 'above_zone', label: 'Above Buy Zone' },
  { id: 'watchlist',  label: 'Watchlist' },
];

function MiniPriceBar({ c }: { c: (typeof allCompanies)[0] }) {
  const price = c.price_data.current_price;
  const low = c.entry.buy_zone_low;
  const high = c.entry.buy_zone_high;
  const target = c.price_data.consensus_target_avg;

  if (!price || !low || !high) return null;

  const rangeMin = Math.min(low * 0.95, price * 0.95);
  const rangeMax = Math.max((target ?? high * 1.3) * 1.05, price * 1.05);
  const range = rangeMax - rangeMin;

  const toLoc = (v: number) => `${((v - rangeMin) / range) * 100}%`;

  const isInZone = price >= low && price <= high;

  return (
    <div className="relative h-5">
      <div className="absolute inset-y-1/2 left-0 right-0 h-1.5 -translate-y-1/2 rounded-full" style={{ background: 'rgba(148,163,184,0.08)' }} />
      {/* Zone */}
      <div className="absolute inset-y-1/2 h-1.5 -translate-y-1/2 rounded-full"
        style={{
          left: toLoc(low), width: `calc(${toLoc(high)} - ${toLoc(low)})`,
          background: 'rgba(0,230,118,0.3)', border: '1px solid rgba(0,230,118,0.4)',
        }} />
      {/* Current price */}
      <div className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border"
        style={{
          left: `calc(${toLoc(price)} - 5px)`,
          background: isInZone ? '#00E676' : '#F59E0B',
          borderColor: '#05080F',
          boxShadow: `0 0 6px ${isInZone ? 'rgba(0,230,118,0.6)' : 'rgba(245,158,11,0.6)'}`,
        }} />
    </div>
  );
}

export default function EntryOpportunity() {
  const navigate = useNavigate();
  const [zoneFilter, setZoneFilter] = useState<ZoneStatus | 'all'>('all');
  const [sectorFilter, setSectorFilter] = useState('all');

  const filtered = allCompanies
    .filter(c => c.price_data.current_price != null)
    .filter(c => zoneFilter === 'all' || c.entry.zone_status === zoneFilter)
    .filter(c => sectorFilter === 'all' || c.sectorId === sectorFilter);

  const grouped = {
    in_zone:    filtered.filter(c => c.entry.zone_status === 'in_zone'),
    near_zone:  filtered.filter(c => c.entry.zone_status === 'near_zone'),
    above_zone: filtered.filter(c => c.entry.zone_status === 'above_zone'),
    watchlist:  filtered.filter(c => c.entry.zone_status === 'watchlist'),
    speculative: filtered.filter(c => c.entry.zone_status === 'speculative'),
  };

  const inZoneCount   = allCompanies.filter(c => c.entry.zone_status === 'in_zone').length;
  const nearZoneCount = allCompanies.filter(c => c.entry.zone_status === 'near_zone').length;
  const aboveCount    = allCompanies.filter(c => c.entry.zone_status === 'above_zone').length;

  return (
    <DashboardLayout
      title="Entry Opportunities"
      subtitle="Identify optimal stock entry timing based on buy zone positioning"
    >
      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'In Buy Zone',    count: inZoneCount,   color: '#00E676', desc: 'Immediate entry actionable' },
          { label: 'Near Buy Zone',  count: nearZoneCount, color: '#F59E0B', desc: 'Small pullback needed' },
          { label: 'Above Buy Zone', count: aboveCount,    color: '#64748B', desc: 'Await correction' },
        ].map(item => (
          <div key={item.label} className="p-4 rounded-xl animate-slide-up"
            style={{ background: 'rgba(13,22,40,0.85)', border: `1px solid ${item.color}25` }}>
            <p className="font-mono font-bold text-3xl" style={{ color: item.color }}>{item.count}</p>
            <p className="text-sm text-slate-300 mt-1">{item.label}</p>
            <p className="text-xs text-slate-600 mt-0.5">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <p className="text-xs font-mono text-slate-500">Zone:</p>
        {ZONE_FILTER_OPTIONS.map(opt => {
          const info = opt.id !== 'all' ? ZONE_LABELS[opt.id] : null;
          const isActive = zoneFilter === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => setZoneFilter(opt.id as ZoneStatus | 'all')}
              className="px-3 py-1.5 rounded-lg text-xs font-mono transition-all"
              style={{
                background: isActive ? `${info?.color ?? '#C9914A'}18` : 'rgba(17,32,56,0.6)',
                border: `1px solid ${isActive ? `${info?.color ?? '#C9914A'}40` : 'rgba(148,163,184,0.08)'}`,
                color: isActive ? (info?.color ?? '#C9914A') : '#8B9EC0',
              }}
            >
              {opt.label}
            </button>
          );
        })}
        <div className="w-px h-5 bg-slate-800 mx-1" />
        <p className="text-xs font-mono text-slate-500">Sector:</p>
        {[{ id: 'all', label: 'All' }, { id: 'it', label: 'IT' }, { id: 'renewable', label: 'RE' }].map(f => (
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
        <span className="text-xs text-slate-600 font-mono ml-1">{filtered.length} stocks</span>
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden animate-slide-up" style={{ border: '1px solid rgba(148,163,184,0.08)' }}>
        <table className="w-full">
          <thead>
            <tr style={{ background: 'rgba(17,32,56,0.9)', borderBottom: '1px solid rgba(148,163,184,0.08)' }}>
              {['Company', 'Current Price', 'Buy Zone', 'Zone Status', 'Entry Bar', 'Recommendation', 'Upside'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-[10px] font-mono uppercase tracking-wider text-slate-600">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => {
              const zoneInfo = ZONE_LABELS[c.entry.zone_status];
              const upside = c.price_data.upside_to_avg_pct;

              return (
                <tr
                  key={c.id}
                  className="table-row-hover cursor-pointer animate-fade-in"
                  style={{
                    animationDelay: `${i * 25}ms`,
                    borderBottom: i < filtered.length - 1 ? '1px solid rgba(148,163,184,0.04)' : 'none',
                    background:
                      c.entry.zone_status === 'in_zone'   ? 'rgba(0,230,118,0.025)' :
                      c.entry.zone_status === 'near_zone' ? 'rgba(245,158,11,0.015)' :
                      'transparent',
                  }}
                  onClick={() => navigate(`/stock/${c.id}`)}
                >
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-slate-200">{c.name}</p>
                    <p className="text-[11px] font-mono text-slate-600">{c.ticker}</p>
                  </td>
                  <td className="px-4 py-3 font-mono font-semibold text-slate-100 text-sm">
                    {c.price_data.current_price ? `₹${c.price_data.current_price.toLocaleString('en-IN')}` : '—'}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-400">
                    {c.entry.buy_zone_low && c.entry.buy_zone_high
                      ? `₹${c.entry.buy_zone_low.toLocaleString('en-IN')} – ₹${c.entry.buy_zone_high.toLocaleString('en-IN')}`
                      : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <ZoneBadge zoneStatus={c.entry.zone_status} size="sm" />
                  </td>
                  <td className="px-4 py-3" style={{ minWidth: 120 }}>
                    <MiniPriceBar c={c} />
                  </td>
                  <td className="px-4 py-3">
                    <RecBadge recommendation={c.recommendation} size="sm" />
                  </td>
                  <td className="px-4 py-3">
                    {upside != null ? (
                      <span className="font-mono font-bold text-sm" style={{ color: upside > 0 ? '#00E676' : '#EF4444' }}>
                        {upside > 0 ? '+' : ''}{upside}%
                      </span>
                    ) : <span className="text-slate-700">—</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-slate-600 text-sm">No stocks match the selected filters.</p>
          </div>
        )}
      </div>

      <p className="text-[11px] text-slate-700 mt-6 font-mono">
        ⚠ Buy zones are derived from the analysis framework's entry timing assessment. Not investment advice.
      </p>
    </DashboardLayout>
  );
}
