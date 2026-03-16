import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import { Sector } from '../types';

interface Props { sector: Sector }

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload?.length) {
    return (
      <div className="px-3 py-2 rounded-lg text-xs font-mono"
        style={{ background: '#1A2D4A', border: '1px solid rgba(201,145,74,0.2)', boxShadow: '0 8px 20px rgba(0,0,0,0.4)' }}>
        <p className="text-slate-300">{payload[0].name}</p>
        <p className="font-bold mt-0.5" style={{ color: payload[0].payload.color }}>{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

export default function SectorMetricsPanel({ sector }: Props) {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div>
        <p className="text-xs font-mono uppercase tracking-widest text-slate-600 mb-3">Key Metrics</p>
        <div className="grid grid-cols-2 gap-2">
          {sector.metrics.map((m, i) => {
            const val = typeof m.value === 'number' ? m.value : m.value;
            const isNeg = typeof val === 'number' && val < 0;
            return (
              <div
                key={i}
                className="p-3 rounded-xl animate-fade-in"
                style={{ animationDelay: `${i * 50}ms`, background: 'rgba(17,32,56,0.5)', border: '1px solid rgba(148,163,184,0.07)' }}
              >
                <p className="text-[10px] font-mono uppercase tracking-wider text-slate-600 mb-1.5 leading-tight">{m.label}</p>
                <p className={`font-mono font-bold text-lg leading-none ${isNeg ? 'text-red-400' : 'text-slate-100'}`}>
                  {typeof val === 'number' && isNeg ? '' : ''}{val}{m.unit.startsWith('%') ? '' : ' '}{m.unit}
                </p>
                {m.note && <p className="text-[9px] text-slate-600 mt-1 leading-tight">{m.note}</p>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Sector Breakdown Chart */}
      <div>
        <p className="text-xs font-mono uppercase tracking-widest text-slate-600 mb-3">Sector Breakdown</p>
        <div className="flex items-center gap-4">
          <div style={{ width: 140, height: 140 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sector.breakdown}
                  dataKey="share_pct"
                  nameKey="segment"
                  cx="50%" cy="50%"
                  innerRadius={42}
                  outerRadius={65}
                  paddingAngle={2}
                  strokeWidth={0}
                >
                  {sector.breakdown.map((entry, i) => (
                    <Cell key={i} fill={entry.color} opacity={0.9} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 space-y-2">
            {sector.breakdown.map((seg, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: seg.color }} />
                <span className="text-xs text-slate-400 flex-1 truncate">{seg.segment}</span>
                <span className="text-xs font-mono font-semibold text-slate-200">{seg.share_pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tailwinds */}
      <div>
        <p className="text-xs font-mono uppercase tracking-widest text-slate-600 mb-3">Tailwinds</p>
        <ul className="space-y-2">
          {sector.tailwinds.map((t, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle2 size={12} className="text-green-400 flex-shrink-0 mt-0.5" />
              <span className="text-xs text-slate-400 leading-relaxed">{t}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Risks */}
      <div>
        <p className="text-xs font-mono uppercase tracking-widest text-slate-600 mb-3">Risks</p>
        <ul className="space-y-2">
          {sector.risks.map((r, i) => (
            <li key={i} className="flex items-start gap-2">
              <AlertTriangle size={12} className="text-yellow-500 flex-shrink-0 mt-0.5" />
              <span className="text-xs text-slate-400 leading-relaxed">{r}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
