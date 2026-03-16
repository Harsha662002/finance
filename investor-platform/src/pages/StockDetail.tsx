import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Clock, Target } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import EntryZoneVisualizer from '../components/EntryZoneVisualizer';
import KeyMetricsGrid from '../components/KeyMetricsGrid';
import ScreeningScoreRadar from '../components/ScreeningScoreRadar';
import InvestmentThesisPanel from '../components/InvestmentThesisPanel';
import PriceTargetPanel from '../components/PriceTargetPanel';
import { RecBadge, ZoneBadge, ConvictionBadge } from '../components/ui/Badge';
import { Card, CardHeader, CardBody, SectionTitle } from '../components/ui/Card';
import { getCompanyById } from '../data/mockData';
import { getRecColor, REC_COLORS } from '../types';

export default function StockDetail() {
  const { stockId } = useParams<{ stockId: string }>();
  const navigate = useNavigate();
  const c = getCompanyById(stockId ?? '');

  if (!c) {
    return (
      <DashboardLayout title="Stock Not Found">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gold font-mono text-sm">
          <ArrowLeft size={14} /> Go back
        </button>
        <p className="text-slate-500 mt-4">Stock "{stockId}" not found.</p>
      </DashboardLayout>
    );
  }

  const rc = getRecColor(c.recommendation);
  const colors = REC_COLORS[rc];
  const price = c.price_data.current_price;
  const avgTarget = c.price_data.consensus_target_avg;
  const upside = c.price_data.upside_to_avg_pct;

  return (
    <DashboardLayout title={c.name} subtitle={`${c.ticker} · NSE · ${c.sector}`}>

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-300 font-mono text-xs mb-6 transition-colors"
      >
        <ArrowLeft size={13} /> Back
      </button>

      {/* Hero Section */}
      <div className="p-6 rounded-2xl mb-6 animate-slide-up"
        style={{ background: 'rgba(13,22,40,0.9)', border: `1px solid ${colors.border}`, boxShadow: `0 0 40px ${colors.bg}` }}>
        <div className="flex flex-wrap items-start gap-6">

          {/* Left: name + badges */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <RecBadge recommendation={c.recommendation} size="lg" />
              <ConvictionBadge conviction={c.entry.conviction} />
              <ZoneBadge zoneStatus={c.entry.zone_status} />
            </div>
            <h1 className="font-display text-2xl font-bold text-slate-100 leading-tight">{c.name}</h1>
            <p className="text-sm text-slate-500 font-mono mt-1">{c.ticker} · {c.exchange} · {c.category}</p>
            {c.market_cap_cr && (
              <p className="text-xs text-slate-600 font-mono mt-1">
                Mkt Cap: ₹{(c.market_cap_cr / 100).toFixed(0)}B
              </p>
            )}
          </div>

          {/* Right: price data */}
          <div className="flex items-end gap-8">
            <div className="text-center">
              <p className="text-[10px] font-mono uppercase tracking-widest text-slate-600 mb-1">Current Price</p>
              <p className="font-mono font-bold text-3xl text-slate-100">
                {price ? `₹${price.toLocaleString('en-IN')}` : '—'}
              </p>
              {c.price_data.price_date && (
                <p className="text-[10px] font-mono text-slate-600 mt-1 flex items-center justify-center gap-1">
                  <Clock size={9} /> {c.price_data.price_date}
                </p>
              )}
            </div>

            <div className="text-center">
              <p className="text-[10px] font-mono uppercase tracking-widest text-slate-600 mb-1">Buy Zone</p>
              <p className="font-mono text-sm text-slate-300">
                {c.entry.buy_zone_low
                  ? `₹${c.entry.buy_zone_low.toLocaleString('en-IN')} – ₹${(c.entry.buy_zone_high ?? 0).toLocaleString('en-IN')}`
                  : '—'}
              </p>
            </div>

            <div className="text-center">
              <p className="text-[10px] font-mono uppercase tracking-widest text-slate-600 mb-1">Avg Target</p>
              <p className="font-mono font-bold text-xl text-gold">
                {avgTarget ? `₹${avgTarget.toLocaleString('en-IN')}` : '—'}
              </p>
            </div>

            {upside != null && (
              <div className="text-center">
                <p className="text-[10px] font-mono uppercase tracking-widest text-slate-600 mb-1">Upside</p>
                <p className="font-mono font-bold text-2xl" style={{ color: upside > 0 ? '#00E676' : '#EF4444' }}>
                  {upside > 0 ? '+' : ''}{upside}%
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Entry details row */}
        <div className="mt-5 pt-4 flex items-center gap-6 flex-wrap"
          style={{ borderTop: '1px solid rgba(148,163,184,0.07)' }}>
          <div className="flex items-center gap-2">
            <Target size={13} className="text-gold" />
            <span className="text-xs font-mono text-slate-400">
              <span className="text-gold">Entry Call:</span> {c.entry.call}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={13} className="text-slate-500" />
            <span className="text-xs font-mono text-slate-400">
              <span className="text-slate-300">Horizon:</span> {c.entry.horizon}
            </span>
          </div>
          <div className="flex-1">
            <span className="text-xs text-slate-500 italic">{c.entry.rationale}</span>
          </div>
        </div>
      </div>

      {/* Body grid */}
      <div className="grid grid-cols-3 gap-6">

        {/* Left 2/3 */}
        <div className="col-span-2 space-y-5">

          {/* Entry Zone Visualizer */}
          <Card>
            <CardHeader>
              <SectionTitle>Entry Opportunity</SectionTitle>
              <p className="text-xs text-slate-500 mt-0.5">Price positioning relative to buy zone and analyst targets</p>
            </CardHeader>
            <CardBody>
              <EntryZoneVisualizer company={c} />
            </CardBody>
          </Card>

          {/* Key Metrics */}
          <Card>
            <CardHeader>
              <SectionTitle>Key Financial Metrics</SectionTitle>
            </CardHeader>
            <CardBody>
              <KeyMetricsGrid financials={c.financials} currentPrice={price} />
            </CardBody>
          </Card>

          {/* Investment Thesis */}
          <Card>
            <CardHeader>
              <SectionTitle>Investment Thesis</SectionTitle>
              <p className="text-xs text-slate-500 mt-0.5">Structured equity research breakdown</p>
            </CardHeader>
            <CardBody>
              <InvestmentThesisPanel thesis={c.thesis} />
            </CardBody>
          </Card>
        </div>

        {/* Right 1/3 */}
        <div className="space-y-5">

          {/* Screening Score Radar */}
          <Card>
            <CardHeader>
              <SectionTitle>Screening Score</SectionTitle>
              <p className="text-xs text-slate-500 mt-0.5">5-dimension quality framework</p>
            </CardHeader>
            <CardBody>
              <ScreeningScoreRadar scores={c.screening_scores} />
            </CardBody>
          </Card>

          {/* Analyst Price Targets */}
          <Card>
            <CardHeader>
              <SectionTitle>Analyst Targets</SectionTitle>
              <p className="text-xs text-slate-500 mt-0.5">12-month consensus estimates</p>
            </CardHeader>
            <CardBody>
              <PriceTargetPanel
                targets={c.price_data.analyst_targets}
                currentPrice={price}
                avgTarget={avgTarget}
              />
              {c.price_data.note && (
                <p className="text-xs text-slate-600 italic mt-3 pt-3"
                  style={{ borderTop: '1px solid rgba(148,163,184,0.06)' }}>
                  {c.price_data.note}
                </p>
              )}
            </CardBody>
          </Card>
        </div>
      </div>

      <p className="text-[11px] text-slate-700 mt-8 font-mono border-t pt-4" style={{ borderColor: 'rgba(148,163,184,0.06)' }}>
        ⚠ Prices sourced from NSE/BSE ({c.price_data.price_date ?? 'Mar 2026'}). Analyst targets are 12-month estimates from named brokerages and are not guaranteed. This is not investment advice — consult a SEBI-registered advisor before investing.
      </p>
    </DashboardLayout>
  );
}
