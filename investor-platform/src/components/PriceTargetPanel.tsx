import { AnalystTarget } from '../types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface Props {
  targets: AnalystTarget[];
  currentPrice?: number | null;
  avgTarget?: number | null;
}

function ratingColor(rating: string): { text: string; bg: string } {
  const r = rating.toLowerCase();
  if (r === 'buy' || r === 'strong buy') return { text: '#00E676', bg: 'rgba(0,230,118,0.1)' };
  if (r === 'add') return { text: '#4ADE80', bg: 'rgba(74,222,128,0.1)' };
  if (r === 'hold' || r === 'neutral') return { text: '#F59E0B', bg: 'rgba(245,158,11,0.1)' };
  if (r === 'reduce' || r === 'underperform' || r === 'sell') return { text: '#EF4444', bg: 'rgba(239,68,68,0.1)' };
  return { text: '#94A3B8', bg: 'rgba(148,163,184,0.1)' };
}

export default function PriceTargetPanel({ targets, currentPrice, avgTarget }: Props) {
  if (targets.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-sm text-slate-600">No analyst targets available</p>
        <p className="text-xs text-slate-700 mt-1">Limited brokerage coverage</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Summary row */}
      {currentPrice && avgTarget && (
        <div className="p-3 rounded-lg flex items-center justify-between mb-2"
          style={{ background: 'rgba(201,145,74,0.06)', border: '1px solid rgba(201,145,74,0.15)' }}>
          <div>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Avg. Analyst Target</p>
            <p className="font-mono font-bold text-xl text-gold mt-0.5">₹{avgTarget.toLocaleString('en-IN')}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Implied Upside</p>
            {(() => {
              const up = (((avgTarget - currentPrice) / currentPrice) * 100).toFixed(1);
              const isPos = parseFloat(up) >= 0;
              return (
                <div className="flex items-center gap-1 justify-end mt-0.5">
                  {isPos ? <TrendingUp size={14} className="text-green-400" /> : <TrendingDown size={14} className="text-red-400" />}
                  <p className={`font-mono font-bold text-xl ${isPos ? 'text-green-400' : 'text-red-400'}`}>
                    {isPos ? '+' : ''}{up}%
                  </p>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* Target table */}
      <div className="overflow-hidden rounded-lg" style={{ border: '1px solid rgba(148,163,184,0.08)' }}>
        <table className="w-full">
          <thead>
            <tr style={{ background: 'rgba(17,32,56,0.6)', borderBottom: '1px solid rgba(148,163,184,0.07)' }}>
              {['Brokerage', 'Target', 'Rating', 'Upside'].map(h => (
                <th key={h} className="px-4 py-2.5 text-left text-[10px] font-mono uppercase tracking-wider text-slate-600">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...targets].sort((a, b) => b.target - a.target).map((t, i) => {
              const upsidePct = currentPrice ? (((t.target - currentPrice) / currentPrice) * 100).toFixed(1) : null;
              const isPos = upsidePct ? parseFloat(upsidePct) >= 0 : null;
              const rc = ratingColor(t.rating);
              return (
                <tr
                  key={i}
                  className="table-row-hover"
                  style={{ borderBottom: i < targets.length - 1 ? '1px solid rgba(148,163,184,0.04)' : 'none' }}
                >
                  <td className="px-4 py-3 text-sm text-slate-300">{t.brokerage}</td>
                  <td className="px-4 py-3 font-mono font-semibold text-slate-100">
                    ₹{t.target.toLocaleString('en-IN')}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ color: rc.text, background: rc.bg }}>
                      {t.rating}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {upsidePct && (
                      <div className="flex items-center gap-1">
                        {isPos
                          ? <TrendingUp size={11} className="text-green-400" />
                          : isPos === false
                          ? <TrendingDown size={11} className="text-red-400" />
                          : <Minus size={11} className="text-slate-600" />
                        }
                        <span className={`font-mono text-sm font-medium ${isPos ? 'text-green-400' : 'text-red-400'}`}>
                          {isPos ? '+' : ''}{upsidePct}%
                        </span>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {targets[0]?.note && (
        <p className="text-xs text-slate-600 italic px-1">{targets[0].note}</p>
      )}
    </div>
  );
}
