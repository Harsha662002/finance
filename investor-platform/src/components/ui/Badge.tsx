import { getRecColor, REC_COLORS, ZONE_LABELS, Recommendation, ZoneStatus } from '../../types';

interface RecBadgeProps {
  recommendation: Recommendation | string;
  size?: 'sm' | 'md' | 'lg';
}

export function RecBadge({ recommendation, size = 'md' }: RecBadgeProps) {
  const rc = getRecColor(recommendation);
  const colors = REC_COLORS[rc];

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2',
  };

  return (
    <span
      className={`inline-flex items-center font-mono font-semibold uppercase tracking-wider rounded-full ${sizeClasses[size]}`}
      style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
    >
      <span
        className="rounded-full flex-shrink-0"
        style={{
          width: size === 'sm' ? 5 : size === 'lg' ? 7 : 6,
          height: size === 'sm' ? 5 : size === 'lg' ? 7 : 6,
          background: colors.dot,
          boxShadow: `0 0 6px ${colors.dot}`,
        }}
      />
      {recommendation}
    </span>
  );
}

interface ZoneBadgeProps {
  zoneStatus: ZoneStatus;
  size?: 'sm' | 'md';
}

export function ZoneBadge({ zoneStatus, size = 'md' }: ZoneBadgeProps) {
  const info = ZONE_LABELS[zoneStatus];
  const sizeClasses = size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono font-medium uppercase tracking-wider rounded-full ${sizeClasses}`}
      style={{ background: info.bg, color: info.color, border: `1px solid ${info.color}33` }}
    >
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: info.color }} />
      {info.label}
    </span>
  );
}

interface ConvictionBadgeProps {
  conviction: string;
  size?: 'sm' | 'md';
}

export function ConvictionBadge({ conviction, size = 'sm' }: ConvictionBadgeProps) {
  const colorMap: Record<string, { text: string; bg: string }> = {
    'High':        { text: '#00E676', bg: 'rgba(0,230,118,0.08)' },
    'Medium-High': { text: '#F59E0B', bg: 'rgba(245,158,11,0.08)' },
    'Medium':      { text: '#94A3B8', bg: 'rgba(148,163,184,0.08)' },
    'Low-Medium':  { text: '#F97316', bg: 'rgba(249,115,22,0.08)' },
    'Low':         { text: '#EF4444', bg: 'rgba(239,68,68,0.08)' },
  };
  const c = colorMap[conviction] ?? colorMap['Medium'];
  const sizeClasses = size === 'sm' ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2 py-1';

  return (
    <span
      className={`inline-flex items-center font-mono uppercase tracking-wider rounded ${sizeClasses}`}
      style={{ color: c.text, background: c.bg }}
    >
      {conviction} conviction
    </span>
  );
}
