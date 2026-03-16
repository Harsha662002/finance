import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, TrendingUp, Target, BarChart2,
  Cpu, Zap, ChevronRight, Activity
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard',         path: '/' },
  { icon: TrendingUp,      label: 'Upside Potential',  path: '/upside' },
  { icon: Target,          label: 'Entry Opportunities',path: '/entry' },
  { icon: BarChart2,       label: 'Valuation Compare', path: '/valuation' },
];

const sectorItems = [
  { icon: Cpu,  label: 'IT Sector',       path: '/sector/it',        color: '#7F77DD' },
  { icon: Zap,  label: 'Renewable Energy',path: '/sector/renewable', color: '#EF9F27' },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside
      className="fixed left-0 top-0 h-screen w-60 flex flex-col z-40"
      style={{ background: 'linear-gradient(180deg, #070C18 0%, #050810 100%)', borderRight: '1px solid rgba(148,163,184,0.07)' }}
    >
      {/* Logo */}
      <div className="px-6 py-6 border-b" style={{ borderColor: 'rgba(148,163,184,0.07)' }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #C9914A, #E8AC65)', boxShadow: '0 0 16px rgba(201,145,74,0.4)' }}>
            <Activity size={16} className="text-white" strokeWidth={2.5} />
          </div>
          <div>
            <p className="font-display text-sm font-semibold text-slate-100 leading-none">Investor</p>
            <p className="text-[10px] text-slate-500 mt-0.5 font-mono uppercase tracking-widest">Research Platform</p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
        <p className="text-[10px] font-mono uppercase tracking-widest text-slate-600 px-3 mb-3">Dashboards</p>

        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          return (
            <NavLink
              key={path}
              to={path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 group ${
                isActive
                  ? 'text-gold font-medium'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-bg-elevated'
              }`}
              style={isActive ? { background: 'rgba(201,145,74,0.1)', border: '1px solid rgba(201,145,74,0.2)' } : {}}
            >
              <Icon size={16} className={isActive ? 'text-gold' : 'text-slate-500 group-hover:text-slate-300'} />
              <span className="flex-1">{label}</span>
              {isActive && <ChevronRight size={12} className="text-gold opacity-60" />}
            </NavLink>
          );
        })}

        <div className="pt-5">
          <p className="text-[10px] font-mono uppercase tracking-widest text-slate-600 px-3 mb-3">Sectors</p>
          {sectorItems.map(({ icon: Icon, label, path, color }) => {
            const isActive = location.pathname.startsWith(path);
            return (
              <NavLink
                key={path}
                to={path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 group ${
                  isActive ? 'text-slate-100' : 'text-slate-400 hover:text-slate-200 hover:bg-bg-elevated'
                }`}
                style={isActive ? { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(148,163,184,0.1)' } : {}}
              >
                <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}22` }}>
                  <Icon size={12} style={{ color }} />
                </div>
                <span className="flex-1">{label}</span>
                {isActive && <ChevronRight size={12} className="text-slate-500" />}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t" style={{ borderColor: 'rgba(148,163,184,0.07)' }}>
        <p className="text-[10px] text-slate-600 font-mono leading-relaxed">
          Data: NSE/BSE · Mar 2026<br />
          Not investment advice
        </p>
      </div>
    </aside>
  );
}
