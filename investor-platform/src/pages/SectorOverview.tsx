import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import SectorMetricsPanel from '../components/SectorMetricsPanel';
import RecommendationCard from '../components/RecommendationCard';
import { RecBadge, ZoneBadge } from '../components/ui/Badge';
import { getSectorById } from '../data/mockData';
import { getRecColor, REC_COLORS } from '../types';

export default function SectorOverview() {
  const { sectorId } = useParams<{ sectorId: string }>();
  const navigate = useNavigate();
  const sector = getSectorById(sectorId ?? '');

  if (!sector) {
    return (
      <DashboardLayout title="Sector Not Found">
        <p className="text-slate-500">Sector "{sectorId}" not found.</p>
      </DashboardLayout>
    );
  }

  const strongBuys = sector.companies.filter(c => c.recommendation === 'Strong Buy');
  const inZone = sector.companies.filter(c => c.entry.zone_status === 'in_zone');

  return (
    <DashboardLayout
      title={sector.name}
      subtitle={`${sector.stage} · ${sector.companies.length} companies tracked · NSE/BSE`}
    >
      <div className="grid grid-cols-3 gap-6">

        {/* Sidebar: sector metrics */}
        <div className="col-span-1">
          <div className="sticky top-20 rounded-xl p-5 animate-fade-in"
            style={{ background: 'rgba(13,22,40,0.85)', border: '1px solid rgba(148,163,184,0.08)' }}>
            <div className="mb-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg mb-3"
                style={{ background: 'rgba(201,145,74,0.1)', border: '1px solid rgba(201,145,74,0.2)' }}>
                <span className="text-xs font-mono text-gold font-medium">{sector.stage}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{sector.stage_detail}</p>
            </div>
            <SectorMetricsPanel sector={sector} />
          </div>
        </div>

        {/* Main: company list */}
        <div className="col-span-2 space-y-8">

          {/* Stage banner */}
          <div className="p-5 rounded-xl animate-slide-up"
            style={{ background: 'rgba(17,32,56,0.6)', border: '1px solid rgba(201,145,74,0.15)' }}>
            <p className="text-xs font-mono uppercase tracking-widest text-gold mb-2">Analyst Commentary</p>
            <p className="text-sm text-slate-400 leading-relaxed">{sector.stage_detail}</p>
          </div>

          {/* Strong Buys */}
          {strongBuys.length > 0 && (
            <section>
              <h2 className="font-display text-xl font-semibold text-slate-100 mb-4">Strong Buy Picks</h2>
              <div className="grid grid-cols-2 gap-4">
                {strongBuys.map((c, i) => (
                  <RecommendationCard key={c.id} company={c} animDelay={i * 60} />
                ))}
              </div>
            </section>
          )}

          {/* All companies table */}
          <section>
            <h2 className="font-display text-xl font-semibold text-slate-100 mb-4">All Companies</h2>
            <div className="rounded-xl overflow-hidden animate-slide-up delay-200"
              style={{ border: '1px solid rgba(148,163,184,0.08)' }}>
              <table className="w-full">
                <thead>
                  <tr style={{ background: 'rgba(17,32,56,0.8)', borderBottom: '1px solid rgba(148,163,184,0.07)' }}>
                    {['Company', 'Price', 'Recommendation', 'Zone', 'Score', 'Upside'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-[10px] font-mono uppercase tracking-wider text-slate-600">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sector.companies.map((c, i) => {
                    const rc = getRecColor(c.recommendation);
                    const colors = REC_COLORS[rc];
                    const upside = c.price_data.upside_to_avg_pct;
                    const isInZone = c.entry.zone_status === 'in_zone';

                    return (
                      <tr
                        key={c.id}
                        className="table-row-hover cursor-pointer"
                        style={{
                          borderBottom: i < sector.companies.length - 1 ? '1px solid rgba(148,163,184,0.04)' : 'none',
                          background: isInZone ? 'rgba(0,230,118,0.02)' : 'transparent',
                        }}
                        onClick={() => navigate(`/stock/${c.id}`)}
                      >
                        <td className="px-4 py-3">
                          <p className="text-sm font-medium text-slate-200">{c.name}</p>
                          <p className="text-[11px] text-slate-600 font-mono">{c.ticker}</p>
                        </td>
                        <td className="px-4 py-3 font-mono font-semibold text-slate-100 text-sm">
                          {c.price_data.current_price ? `₹${c.price_data.current_price.toLocaleString('en-IN')}` : '—'}
                        </td>
                        <td className="px-4 py-3">
                          <RecBadge recommendation={c.recommendation} size="sm" />
                        </td>
                        <td className="px-4 py-3">
                          <ZoneBadge zoneStatus={c.entry.zone_status} size="sm" />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(148,163,184,0.1)' }}>
                              <div className="h-full rounded-full" style={{
                                width: `${(c.screening_scores.total / c.screening_scores.max) * 100}%`,
                                background: '#C9914A',
                              }} />
                            </div>
                            <span className="font-mono text-xs text-slate-400">{c.screening_scores.total}/{c.screening_scores.max}</span>
                          </div>
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
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}
