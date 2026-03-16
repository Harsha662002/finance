import { Company, ZONE_LABELS } from '../types';

interface Props { company: Company }

export default function EntryZoneVisualizer({ company: c }: Props) {
  const price = c.price_data.current_price;
  const zoneLow = c.entry.buy_zone_low;
  const zoneHigh = c.entry.buy_zone_high;
  const targetLow = c.price_data.consensus_target_low;
  const targetHigh = c.price_data.consensus_target_high;
  const targetAvg = c.price_data.consensus_target_avg;

  if (!price || !zoneLow || !zoneHigh) return null;

  const allValues = [zoneLow * 0.9, zoneHigh, price, targetLow, targetHigh, targetAvg].filter(Boolean) as number[];
  const scaleMin = Math.min(...allValues) * 0.95;
  const scaleMax = Math.max(...allValues) * 1.05;
  const range = scaleMax - scaleMin;

  const toPercent = (v: number) => Math.max(0, Math.min(100, ((v - scaleMin) / range) * 100));

  const zoneLowPct  = toPercent(zoneLow);
  const zoneHighPct = toPercent(zoneHigh);
  const pricePct    = toPercent(price);
  const avgPct      = targetAvg ? toPercent(targetAvg) : null;

  const zoneInfo = ZONE_LABELS[c.entry.zone_status];
  const zoneWidth = zoneHighPct - zoneLowPct;
  const isInZone = price >= zoneLow && price <= zoneHigh;

  const fmt = (v: number) => `₹${v.toLocaleString('en-IN')}`;

  return (
    <div className="space-y-4">
      {/* Legend */}
      <div className="flex items-center gap-6 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-4 h-2 rounded" style={{ background: 'rgba(0,230,118,0.35)' }} />
          <span className="text-xs text-slate-400 font-mono">Buy Zone</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ background: '#F59E0B', boxShadow: '0 0 8px rgba(245,158,11,0.6)' }} />
          <span className="text-xs text-slate-400 font-mono">Current Price</span>
        </div>
        {avgPct !== null && (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ background: '#7F77DD', boxShadow: '0 0 8px rgba(127,119,221,0.6)' }} />
            <span className="text-xs text-slate-400 font-mono">Avg Analyst Target</span>
          </div>
        )}
      </div>

      {/* Track */}
      <div className="relative h-14 select-none">
        {/* Base track */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2 rounded-full" style={{ background: 'rgba(148,163,184,0.08)', border: '1px solid rgba(148,163,184,0.05)' }} />

        {/* Zone fill */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-2 rounded-full"
          style={{
            left: `${zoneLowPct}%`,
            width: `${zoneWidth}%`,
            background: 'rgba(0,230,118,0.3)',
            border: '1px solid rgba(0,230,118,0.5)',
          }}
        />

        {/* Target range bar (if different from avg) */}
        {targetLow && targetHigh && (
          <div
            className="absolute top-1/2 -translate-y-1/2 h-1 rounded-full opacity-50"
            style={{
              left: `${toPercent(targetLow)}%`,
              width: `${toPercent(targetHigh) - toPercent(targetLow)}%`,
              background: '#7F77DD',
            }}
          />
        )}

        {/* Current price dot */}
        <div
          className="absolute top-1/2 -translate-y-1/2 z-10"
          style={{ left: `${pricePct}%`, transform: 'translateX(-50%) translateY(-50%)' }}
        >
          <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
            style={{
              background: isInZone ? '#00E676' : '#F59E0B',
              borderColor: 'rgba(5,8,15,0.8)',
              boxShadow: `0 0 12px ${isInZone ? 'rgba(0,230,118,0.7)' : 'rgba(245,158,11,0.7)'}`,
            }}
          />
        </div>

        {/* Avg target dot */}
        {avgPct !== null && targetAvg && (
          <div
            className="absolute top-1/2 -translate-y-1/2 z-10"
            style={{ left: `${avgPct}%`, transform: 'translateX(-50%) translateY(-50%)' }}
          >
            <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center text-[8px]"
              style={{ background: '#7F77DD', borderColor: 'rgba(5,8,15,0.8)', boxShadow: '0 0 10px rgba(127,119,221,0.6)', color: 'white', fontWeight: 700 }}>
              ★
            </div>
          </div>
        )}

        {/* Price labels below track */}
        <div className="absolute top-full mt-2 w-full">
          {/* Zone labels */}
          <div className="absolute text-center" style={{ left: `${zoneLowPct}%`, transform: 'translateX(-50%)' }}>
            <p className="text-[9px] font-mono text-green-400 whitespace-nowrap">{fmt(zoneLow)}</p>
          </div>
          <div className="absolute text-center" style={{ left: `${zoneHighPct}%`, transform: 'translateX(-50%)' }}>
            <p className="text-[9px] font-mono text-green-400 whitespace-nowrap">{fmt(zoneHigh)}</p>
          </div>
          {/* Current price label */}
          <div className="absolute text-center" style={{ left: `${pricePct}%`, transform: 'translateX(-50%)' }}>
            <p className="text-[9px] font-mono font-bold whitespace-nowrap" style={{ color: isInZone ? '#00E676' : '#F59E0B' }}>
              {fmt(price)}
            </p>
          </div>
          {/* Avg target label */}
          {avgPct !== null && targetAvg && (
            <div className="absolute text-center" style={{ left: `${avgPct}%`, transform: 'translateX(-50%)' }}>
              <p className="text-[9px] font-mono text-purple-400 whitespace-nowrap">{fmt(targetAvg)}</p>
            </div>
          )}
        </div>
      </div>

      {/* Zone status label */}
      <div className="mt-6 p-3 rounded-lg flex items-start gap-3" style={{ background: `${zoneInfo.bg}`, border: `1px solid ${zoneInfo.color}33` }}>
        <div className="w-2 h-2 rounded-full mt-0.5 flex-shrink-0" style={{ background: zoneInfo.color, boxShadow: `0 0 6px ${zoneInfo.color}` }} />
        <div>
          <p className="text-xs font-mono font-semibold mb-1" style={{ color: zoneInfo.color }}>{zoneInfo.label}</p>
          <p className="text-xs text-slate-400 leading-relaxed">{c.entry.rationale}</p>
        </div>
      </div>
    </div>
  );
}
