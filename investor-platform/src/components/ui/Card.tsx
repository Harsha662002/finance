import { ReactNode, CSSProperties } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  gold?: boolean;
  onClick?: () => void;
  hover?: boolean;
}

export function Card({ children, className = '', style, gold, onClick, hover }: CardProps) {
  const baseStyle: CSSProperties = {
    background: 'rgba(13, 22, 40, 0.85)',
    border: `1px solid ${gold ? 'rgba(201,145,74,0.22)' : 'rgba(148,163,184,0.08)'}`,
    borderRadius: 12,
    transition: hover ? 'all 0.2s ease' : undefined,
    cursor: onClick ? 'pointer' : undefined,
    ...style,
  };

  return (
    <div
      className={`${className} ${hover ? 'hover:border-gold/30 hover:shadow-card-hover' : ''}`}
      style={baseStyle}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`px-5 py-4 border-b ${className}`} style={{ borderColor: 'rgba(148,163,184,0.07)' }}>
      {children}
    </div>
  );
}

export function CardBody({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`px-5 py-4 ${className}`}>{children}</div>;
}

export function SectionTitle({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`font-display text-lg font-semibold text-slate-100 ${className}`}>{children}</h2>
  );
}

export function MetricValue({ value, prefix = '', suffix = '', className = '', size = 'md' }: {
  value: number | string | null | undefined;
  prefix?: string;
  suffix?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}) {
  const sizeClasses = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  if (value == null) {
    return <span className={`font-mono text-slate-600 ${sizeClasses[size]} ${className}`}>—</span>;
  }

  return (
    <span className={`font-mono font-semibold text-slate-100 ${sizeClasses[size]} ${className}`}>
      {prefix}{typeof value === 'number' ? value.toLocaleString('en-IN') : value}{suffix}
    </span>
  );
}

export function Divider() {
  return <div className="border-t" style={{ borderColor: 'rgba(148,163,184,0.07)' }} />;
}
