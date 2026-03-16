import { useNavigate } from 'react-router-dom';
import { TrendingUp, Target, BarChart2, Layers, ArrowRight, Zap, Cpu } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import RecommendationCard from '../components/RecommendationCard';
import { ZoneBadge, RecBadge } from '../components/ui/Badge';
import { allCompanies, getStrongBuys, getInZoneStocks, sectors, getSortedByUpside } from '../data/mockData';
import { getRecColor, REC_COLORS, ZONE_LABELS } from '../types';

function StatCard({ icon: Icon, label, value, sub, color }: {
  icon: React.ElementType; label: string; value: string | number; sub?: string; color: string;
}) {
  return (
    <div className="p-5 rounded-xl animate-slide-up"
      style={{ background: 'rgba(13,22,40,0.85)', border: '1px solid rgba(148,163,184,0.08)' }}>
      <div className="flex items-center justify-between mb-3">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
          <Icon size={17} style={{ color }} />
        </div>
      </div>
      <p className="font-mono font-bold text-3xl text-slate-100 leading-none">{value}</p>
      <p className="text-sm text-slate-500 mt-1.5">{label}</p>
      {sub && <p className="text-[11px] text-slate-600 mt-0.5 font-mono">{sub}</p>}
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const strongBuys = getStrongBuys();
  const inZone = getInZoneStocks();
  const topUpside = getSortedByUpside().slice(0, 5);
  const totalCompanies = allCompanies.filter(c => c.price_data.current_price != null).length;

  return (
    <DashboardLayout
      title="Investor Dashboard"
      subtitle="Equity research & stock analysis · NSE/BSE · Mar 2026"
    >
      {/* Stats strip */}
      <div className="grid grid-cols-4 gap-4 mb-8 animate-slide-up">
        <StatCard icon={Layers}     label="Stocks Tracked"       value={totalCompanies}      color="#7F77DD" />
        <StatCard icon={TrendingUp} label="Strong Buy"           value={strongBuys.length}   sub="High conviction picks" color="#00E676" />
        <StatCard icon={Target}     label="In Buy Zone"          value={inZone.length}        sub="Actionable entry now"  color="#F59E0B" />
        <StatCard icon={BarChart2}  label="Sectors Covered"      value={sectors.length}       sub="IT + Renewable Energy" color="#C9914A" />
      </div>

      <div className="grid grid-cols-3 gap-6">

        {/* Left 2/3: Strong Buy cards + In-Zone table */}
        <div className="col-span-2 space-y-6">

          {/* Strong Buy Picks */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-display text-xl font-semibold text-slate-100">Strong Buy Recommendations</h2>
                <p className="text-xs text-slate-500 mt-0.5">High-conviction picks trading near or within buy zones</p>
              </div>
              <button
                onClick={() => navigate('/upside')}
                className="flex items-center gap-1.5 text-xs text-gold hover:text-gold-light transition-colors font-mono"
              >View all <ArrowRight size={12} /></button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {strongBuys.map((c, i) => (
                <RecommendationCard key={c.id} company={c} animDelay={i * 60} />
              ))}
            </div>
          </section>

          {/* Stocks in Buy Zone table */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-display text-xl font-semibold text-slate-100">Currently In Buy Zone</h2>
                <p className="text-xs text-slate-500 mt-0.5">Actionable entries — stocks trading within their ideal accumulation range</p>
              </div>
              <button
                onClick={() => navigate('/entry')}
                className="flex items-center gap-1.5 text-xs text-gold hover:text-gold-light transition-colors font-mono"
              >Entry dashboard <ArrowRight size={12} /></button>
            </div>
            <div className="rounded-xl overflow-hidden animate-slide-up delay-200"
              style={{ border: '1px solid rgba(148,163,184,0.08)' }}>
              <table className="w-full">
                <thead>
                  <tr style={{ background: 'rgba(17,32,56,0.8)', borderBottom: '1px solid rgba(148,163,184,0.07)' }}>
                    {['Company', 'Price', 'Buy Zone', 'Recommendation', 'Upside'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-[10px] font-mono uppercase tracking-wider text-slate-600">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {inZone.map((c, i) => {
                    const rc = getRecColor(c.recommendation);
                    const colors = REC_COLORS[rc];
                    const upside = c.price_data.upside_to_avg_pct;
                    return (
                      <tr
                        key={c.id}
                        className="table-row-hover cursor-pointer"
                        style={{
                          borderBottom: i < inZone.length - 1 ? '1px solid rgba(148,163,184,0.04)' : 'none',
                          background: 'rgba(0,230,118,0.025)',
                        }}
                        onClick={() => navigate(`/stock/${c.id}`)}
                      >
                        <td className="px-4 py-3">
                          <div>
                            <p className="text-sm font-medium text-slate-200">{c.name}</p>
                            <p className="text-[11px] text-slate-600 font-mono">{c.ticker}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 font-mono font-semibold text-slate-100">
                          {c.price_data.current_price ? `₹${c.price_data.current_price.toLocaleString('en-IN')}` : '—'}
                        </td>
                        <td className="px-4 py-3 font-mono text-xs text-slate-400">
                          {c.entry.buy_zone_low && c.entry.buy_zone_high
                            ? `₹${c.entry.buy_zone_low.toLocaleString('en-IN')} – ₹${c.entry.buy_zone_high.toLocaleString('en-IN')}`
                            : '—'}
                        </td>
                        <td className="px-4 py-3">
                          <RecBadge recommendation={c.recommendation} size="sm" />
                        </td>
                        <td className="px-4 py-3">
                          {upside != null && (
                            <span className="font-mono font-bold text-sm" style={{ color: upside > 0 ? '#00E676' : '#EF4444' }}>
                              {upside > 0 ? '+' : ''}{upside}%
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Right 1/3: Sector cards + Top Upside */}
        <div className="space-y-6">

          {/* Sector cards */}
          <section>
            <h2 className="font-display text-lg font-semibold text-slate-100 mb-4">Sectors</h2>
            <div className="space-y-3">
              {sectors.map(s => {
                const inZoneCount = s.companies.filter(c => c.entry.zone_status === 'in_zone').length;
                const strongBuyCount = s.companies.filter(c => c.recommendation === 'Strong Buy').length;
                const iconEl = s.id === 'it'
                  ? <Cpu size={16} style={{ color: '#7F77DD' }} />
                  : <Zap size={16} style={{ color: '#EF9F27' }} />;
                const accentColor = s.id === 'it' ? '#7F77DD' : '#EF9F27';

                return (
                  <div
                    key={s.id}
                    className="p-4 rounded-xl cursor-pointer transition-all duration-200 animate-slide-up"
                    style={{ background: 'rgba(13,22,40,0.85)', border: `1px solid rgba(148,163,184,0.08)` }}
                    onClick={() => navigate(`/sector/${s.id}`)}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${accentColor}40`; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(148,163,184,0.08)'; }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: `${accentColor}18`, border: `1px solid ${accentColor}30` }}>
                        {iconEl}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-200">{s.shortName}</p>
                        <p className="text-[10px] font-mono text-slate-600">{s.companies.length} companies</p>
                      </div>
                      <ArrowRight size={13} className="ml-auto text-slate-600" />
                    </div>
                    <div className="flex gap-4">
                      <div>
                        <p className="text-[10px] font-mono text-slate-600">Strong Buy</p>
                        <p className="font-mono font-bold text-green-400 text-lg">{strongBuyCount}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-mono text-slate-600">In Zone</p>
                        <p className="font-mono font-bold text-yellow-400 text-lg">{inZoneCount}</p>
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-mono text-slate-600">Stage</p>
                        <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">{s.stage.split('→')[0].trim()}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Top Upside */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-semibold text-slate-100">Top Upside</h2>
              <button onClick={() => navigate('/upside')} className="text-xs text-gold font-mono">See all</button>
            </div>
            <div className="space-y-2">
              {topUpside.map((c, i) => {
                const upside = c.price_data.upside_to_avg_pct!;
                const rc = getRecColor(c.recommendation);
                const colors = REC_COLORS[rc];
                return (
                  <div
                    key={c.id}
                    className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-150 animate-slide-up"
                    style={{ animationDelay: `${i * 60}ms`, background: 'rgba(13,22,40,0.85)', border: '1px solid rgba(148,163,184,0.06)' }}
                    onClick={() => navigate(`/stock/${c.id}`)}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(22,40,70,0.8)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(13,22,40,0.85)'; }}
                  >
                    <div className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0 font-mono font-bold text-xs text-slate-500"
                      style={{ background: 'rgba(148,163,184,0.06)' }}>
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-slate-200 truncate">{c.name}</p>
                      <p className="text-[10px] font-mono text-slate-600">{c.ticker}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono font-bold text-sm text-green-400">+{upside}%</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-[11px] text-slate-700 mt-8 font-mono border-t pt-4" style={{ borderColor: 'rgba(148,163,184,0.06)' }}>
        ⚠ Prices sourced from NSE/BSE (Mar 2026). Analyst targets are 12-month estimates from named brokerages and are not guaranteed. This is not investment advice — consult a SEBI-registered advisor before investing.
      </p>
    </DashboardLayout>
  );
}
