import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, TrendingUp } from 'lucide-react';
import { Company, getRecColor, REC_COLORS, ZONE_LABELS } from '../types';
import { RecBadge, ZoneBadge } from './ui/Badge';

interface Props {
  company: Company;
  animDelay?: number;
}

export default function RecommendationCard({ company: c, animDelay = 0 }: Props) {
  const navigate = useNavigate();
  const rc = getRecColor(c.recommendation);
  const colors = REC_COLORS[rc];
  const zoneInfo = ZONE_LABELS[c.entry.zone_status];
  const upside = c.price_data.upside_to_avg_pct;
  const price = c.price_data.current_price;
  const avgTarget = c.price_data.consensus_target_avg;

  // progress bar: how far current price is from buy zone to avg target
  let progressPct = 0;
  if (price && c.entry.buy_zone_low && avgTarget && avgTarget > c.entry.buy_zone_low) {
    progressPct = Math.min(100, Math.max(0, ((price - c.entry.buy_zone_low) / (avgTarget - c.entry.buy_zone_low)) * 100));
  }

  return (
    <div
      className="rounded-xl cursor-pointer animate-slide-up overflow-hidden group transition-all duration-200"
      style={{
        animationDelay: `${animDelay}ms`,
        background: 'rgba(11, 18, 32, 0.9)',
        border: `1px solid ${colors.border}`,
        boxShadow: `0 2px 12px rgba(0,0,0,0.3)`,
      }}
      onClick={() => navigate(`/stock/${c.id}`)}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 30px rgba(0,0,0,0.5), 0 0 0 1px ${colors.border}`;
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 2px 12px rgba(0,0,0,0.3)`;
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
      }}
    >
      {/* Top accent bar */}
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${colors.dot}, transparent)` }} />

      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2 mb-4">
          <div className="flex-1 min-w-0">
            <RecBadge recommendation={c.recommendation} size="sm" />
            <h3 className="font-display text-base font-semibold text-slate-100 mt-2 leading-tight truncate">{c.name}</h3>
            <p className="text-xs text-slate-500 font-mono mt-0.5">{c.ticker} · NSE · {c.sector}</p>
          </div>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ background: colors.bg, border: `1px solid ${colors.border}` }}>
            <ArrowUpRight size={14} style={{ color: colors.text }} />
          </div>
        </div>

        {/* Price data grid */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-wider text-slate-600 mb-1">Current</p>
            <p className="font-mono font-semibold text-slate-100 text-sm">
              {price ? `₹${price.toLocaleString('en-IN')}` : '—'}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-wider text-slate-600 mb-1">Buy Zone</p>
            <p className="font-mono text-slate-300 text-xs leading-tight">
              {c.entry.buy_zone_low ? `₹${c.entry.buy_zone_low.toLocaleString('en-IN')}` : '—'}
              {c.entry.buy_zone_high ? `–${c.entry.buy_zone_high.toLocaleString('en-IN')}` : ''}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-wider text-slate-600 mb-1">Avg Target</p>
            <p className="font-mono text-slate-300 text-sm">
              {avgTarget ? `₹${avgTarget.toLocaleString('en-IN')}` : '—'}
            </p>
          </div>
        </div>

        {/* Upside + Zone status */}
        <div className="flex items-center justify-between mb-4">
          <ZoneBadge zoneStatus={c.entry.zone_status} size="sm" />
          {upside != null && (
            <div className="flex items-center gap-1.5">
              <TrendingUp size={12} style={{ color: upside > 0 ? '#00E676' : '#EF4444' }} />
              <span className="font-mono font-bold text-sm" style={{ color: upside > 0 ? '#00E676' : '#EF4444' }}>
                {upside > 0 ? '+' : ''}{upside}%
              </span>
              <span className="text-[10px] text-slate-600">upside</span>
            </div>
          )}
        </div>

        {/* Progress bar: buy zone → current → target */}
        {progressPct > 0 && (
          <div>
            <div className="flex justify-between text-[10px] text-slate-600 font-mono mb-1">
              <span>Buy Zone</span>
              <span>Avg Target</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(148,163,184,0.1)' }}>
              <div
                className="h-full rounded-full animated-bar"
                style={{
                  width: `${progressPct}%`,
                  background: `linear-gradient(90deg, ${zoneInfo.color}, ${colors.text})`,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
