import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';
import { ScreeningScores } from '../types';

const COLORS = {
  stroke: '#C9914A',
  fill:   'rgba(201,145,74,0.15)',
  grid:   'rgba(148,163,184,0.1)',
  axis:   '#4A5880',
};

interface Props {
  scores: ScreeningScores;
  showScore?: boolean;
}

export default function ScreeningScoreRadar({ scores, showScore = true }: Props) {
  const data = [
    { axis: 'Business Quality',       value: scores.business_quality,       max: 10 },
    { axis: 'Financial Strength',     value: scores.financial_strength,     max: 10 },
    { axis: 'Growth Potential',       value: scores.growth_potential,       max: 10 },
    { axis: 'Management Quality',     value: scores.management_quality,     max: 10 },
    { axis: 'Valuation',              value: scores.valuation_attractiveness,max: 10},
  ];

  const pct = Math.round((scores.total / scores.max) * 100);
  const grade = pct >= 80 ? 'A' : pct >= 70 ? 'B+' : pct >= 60 ? 'B' : 'C+';
  const gradeColor = pct >= 80 ? '#00E676' : pct >= 70 ? '#F59E0B' : '#94A3B8';

  const CustomLabel = ({ x, y, payload }: any) => {
    return (
      <text x={x} y={y} textAnchor="middle" dominantBaseline="middle"
        style={{ fontSize: 10, fontFamily: 'IBM Plex Mono', fill: '#8B9EC0', fontWeight: 500 }}>
        {payload.value}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="px-3 py-2 rounded-lg text-xs font-mono"
          style={{ background: '#1A2D4A', border: '1px solid rgba(201,145,74,0.2)', boxShadow: '0 8px 20px rgba(0,0,0,0.4)' }}>
          <p className="text-slate-300 mb-0.5">{d.axis}</p>
          <p className="text-gold font-bold">{d.value} / {d.max}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      {showScore && (
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-mono uppercase tracking-wider">Composite Score</p>
            <p className="font-mono font-bold text-2xl text-slate-100 mt-1">{scores.total}<span className="text-slate-500 text-sm">/{scores.max}</span></p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: `${gradeColor}15`, border: `2px solid ${gradeColor}40` }}>
              <span className="font-display font-bold text-xl" style={{ color: gradeColor }}>{grade}</span>
            </div>
            <p className="text-[10px] text-slate-600 font-mono mt-1">{pct}%</p>
          </div>
        </div>
      )}

      <div style={{ height: 240 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} outerRadius="70%">
            <PolarGrid stroke={COLORS.grid} strokeDasharray="0" />
            <PolarAngleAxis dataKey="axis" tick={<CustomLabel />} tickLine={false} axisLine={{ stroke: COLORS.grid }} />
            <Radar
              dataKey="value"
              stroke={COLORS.stroke}
              strokeWidth={2}
              fill={COLORS.fill}
              dot={{ fill: COLORS.stroke, strokeWidth: 0, r: 4 }}
            />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Score breakdown bars */}
      <div className="space-y-2">
        {data.map(d => (
          <div key={d.axis} className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-slate-500 w-32 flex-shrink-0 truncate">{d.axis}</span>
            <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(148,163,184,0.1)' }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(d.value / d.max) * 100}%`,
                  background: d.value >= 8 ? '#00E676' : d.value >= 6 ? '#F59E0B' : '#94A3B8',
                  transition: 'width 0.8s cubic-bezier(0.16,1,0.3,1)',
                }}
              />
            </div>
            <span className="text-xs font-mono font-semibold text-slate-300 w-6 text-right">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
