import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { allCompanies } from '../../data/mockData';
import { getRecColor, REC_COLORS } from '../../types';

export default function TopBar({ title, subtitle }: { title: string; subtitle?: string }) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();

  const results = query.trim().length > 1
    ? allCompanies.filter(c =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.ticker.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : [];

  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between px-8 py-4"
      style={{ background: 'rgba(5,8,15,0.9)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(148,163,184,0.06)' }}
    >
      {/* Title */}
      <div>
        <h1 className="font-display text-xl font-semibold text-slate-100">{title}</h1>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>

      {/* Search */}
      <div className="relative w-72">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg"
          style={{ background: 'rgba(17,32,56,0.8)', border: `1px solid ${focused ? 'rgba(201,145,74,0.35)' : 'rgba(148,163,184,0.1)'}`, transition: 'border-color 0.15s' }}>
          <Search size={14} className="text-slate-500 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search stocks or tickers…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 200)}
            className="flex-1 bg-transparent text-sm text-slate-200 placeholder-slate-600 outline-none font-mono"
          />
          {query && (
            <button onClick={() => setQuery('')}>
              <X size={12} className="text-slate-500 hover:text-slate-300" />
            </button>
          )}
        </div>

        {/* Results dropdown */}
        {focused && results.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 rounded-lg overflow-hidden z-50"
            style={{ background: '#0D1628', border: '1px solid rgba(201,145,74,0.2)', boxShadow: '0 16px 40px rgba(0,0,0,0.5)' }}>
            {results.map(c => {
              const rc = getRecColor(c.recommendation);
              const colors = REC_COLORS[rc];
              return (
                <button
                  key={c.id}
                  onMouseDown={() => { navigate(`/stock/${c.id}`); setQuery(''); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-bg-elevated transition-colors text-left"
                >
                  <div className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
                    style={{ background: colors.bg, border: `1px solid ${colors.border}` }}>
                    <span className="text-xs font-mono font-bold" style={{ color: colors.text }}>
                      {c.ticker.slice(0, 3)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-200 truncate">{c.name}</p>
                    <p className="text-xs text-slate-500 font-mono">{c.ticker} · {c.sector}</p>
                  </div>
                  {c.price_data.current_price && (
                    <span className="text-sm font-mono text-slate-300">
                      ₹{c.price_data.current_price.toLocaleString('en-IN')}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}
