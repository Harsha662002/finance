import { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2, AlertTriangle, Building2, Shield, TrendingUp, DollarSign } from 'lucide-react';
import { Thesis } from '../types';

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  accentColor?: string;
}

function Section({ title, icon, children, defaultOpen = false, accentColor = '#C9914A' }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(148,163,184,0.07)' }}>
      <button
        className="w-full flex items-center justify-between px-5 py-3.5 text-left transition-colors"
        style={{ background: open ? 'rgba(17,32,56,0.8)' : 'rgba(13,22,40,0.6)' }}
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0" style={{ background: `${accentColor}18`, color: accentColor }}>
            {icon}
          </div>
          <span className="text-sm font-medium text-slate-200">{title}</span>
        </div>
        {open
          ? <ChevronUp size={14} className="text-slate-500" />
          : <ChevronDown size={14} className="text-slate-500" />
        }
      </button>
      {open && (
        <div className="px-5 pb-4 pt-3 animate-fade-in" style={{ background: 'rgba(13,22,40,0.4)', borderTop: '1px solid rgba(148,163,184,0.05)' }}>
          {children}
        </div>
      )}
    </div>
  );
}

interface Props { thesis: Thesis }

export default function InvestmentThesisPanel({ thesis }: Props) {
  return (
    <div className="space-y-2">
      <Section title="Core Business" icon={<Building2 size={12} />} defaultOpen accentColor="#7F77DD">
        <p className="text-sm text-slate-400 leading-relaxed">{thesis.core_business}</p>
      </Section>

      <Section title="Competitive Advantage" icon={<Shield size={12} />} defaultOpen={false} accentColor="#C9914A">
        <p className="text-sm text-slate-400 leading-relaxed">{thesis.competitive_advantage}</p>
      </Section>

      <Section title="Growth Drivers" icon={<TrendingUp size={12} />} defaultOpen={false} accentColor="#00E676">
        <ul className="space-y-2">
          {thesis.growth_drivers.map((d, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <CheckCircle2 size={13} className="text-green-400 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-slate-400 leading-relaxed">{d}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Key Risks" icon={<AlertTriangle size={12} />} defaultOpen={false} accentColor="#F59E0B">
        <ul className="space-y-2">
          {thesis.risks.map((r, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <AlertTriangle size={13} className="text-yellow-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-slate-400 leading-relaxed">{r}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Valuation Status" icon={<DollarSign size={12} />} defaultOpen accentColor="#C9914A">
        <p className="text-sm font-mono font-medium text-gold">{thesis.valuation_status}</p>
      </Section>
    </div>
  );
}
