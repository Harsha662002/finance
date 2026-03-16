import { Company, Sector } from '../types';

// ─── IT SECTOR COMPANIES ────────────────────────────────────────────────────

const itCompanies: Company[] = [
  {
    id: 'tcs', name: 'Tata Consultancy Services', ticker: 'TCS',
    exchange: 'NSE', sector: 'Information Technology', sectorId: 'it',
    category: 'Large-Cap IT Services — Full Stack', market_cap_cr: 935000,
    recommendation: 'Strong Buy',
    screening_scores: { business_quality: 9, financial_strength: 9, growth_potential: 6, management_quality: 9, valuation_attractiveness: 7, total: 40, max: 50 },
    financials: { pe_ratio: 22, pb_ratio: 12.5, roe_pct: 52, dividend_yield_pct: 1.8, debt_to_equity: 0.08, operating_margin_pct: 24.5, ev_ebitda: null, week_52_high: 4585, week_52_low: 2797, market_cap_cr: 935000 },
    price_data: {
      current_price: 2578, price_date: '2026-03-06',
      analyst_targets: [
        { brokerage: 'ICICI Securities', target: 3282, rating: 'Add' },
        { brokerage: 'JM Financial',     target: 2750, rating: 'Hold' },
        { brokerage: 'Choice Broking',   target: 3950, rating: 'Buy' },
      ],
      consensus_target_low: 2750, consensus_target_high: 3950, consensus_target_avg: 3327,
      upside_to_low_pct: 7, upside_to_high_pct: 53, upside_to_avg_pct: 29,
    },
    entry: { call: 'Buy Now', buy_zone_low: 2400, buy_zone_high: 2700, in_zone: true, zone_status: 'in_zone', rationale: 'Currently inside zone — accumulate in tranches; trading near 10-yr avg P/E of 22x', horizon: '7–15 years', conviction: 'High' },
    thesis: { core_business: "India's largest IT services firm. IT services, consulting, and BPO across 50+ countries. Revenue diversified across BFSI, retail, manufacturing, telecom, healthcare.", competitive_advantage: "Unmatched scale, brand, and client stickiness. Tata Group governance credibility. Zero meaningful debt. Consistent dividend payer. 600,000+ employees.", growth_drivers: ['TCS GenAI platform — AI-augmented delivery', 'Large deal ramp-up from BFSI and manufacturing verticals', 'Domestic GCC partnership business expansion', 'AI services revenue expected to accelerate H2 2026'], risks: ['Revenue growth sluggish — CC growth 0.3–0.5% QoQ', 'US macro slowdown suppressing discretionary tech spend', 'AI productivity gains deflationary on managed services billings', 'Premium valuation vs global peers'], valuation_status: 'Fairly Valued' },
  },
  {
    id: 'infosys', name: 'Infosys', ticker: 'INFY',
    exchange: 'NSE', sector: 'Information Technology', sectorId: 'it',
    category: 'Large-Cap IT Services — AI & Digital Transformation', market_cap_cr: 540000,
    recommendation: 'Strong Buy',
    screening_scores: { business_quality: 8, financial_strength: 9, growth_potential: 7, management_quality: 8, valuation_attractiveness: 7, total: 39, max: 50 },
    financials: { pe_ratio: 22, pb_ratio: 7.8, roe_pct: 36, dividend_yield_pct: null, debt_to_equity: 0.05, operating_margin_pct: 21.3, ev_ebitda: null, week_52_high: 2006, week_52_low: 1210, market_cap_cr: 540000 },
    price_data: {
      current_price: 1308, price_date: '2026-03-13',
      analyst_targets: [
        { brokerage: 'ICICI Securities', target: 1590, rating: 'Hold' },
        { brokerage: 'Choice Broking',   target: 1810, rating: 'Buy' },
        { brokerage: 'Jefferies',        target: 1290, rating: 'Hold' },
        { brokerage: 'JM Financial',     target: 1700, rating: 'Buy' },
      ],
      consensus_target_low: 1290, consensus_target_high: 1810, consensus_target_avg: 1598,
      upside_to_low_pct: -1, upside_to_high_pct: 38, upside_to_avg_pct: 22,
    },
    entry: { call: 'Buy Now', buy_zone_low: 1250, buy_zone_high: 1400, in_zone: true, zone_status: 'in_zone', rationale: 'Currently inside zone — trading at 22x FY26E vs 3-yr avg 27x; best large-cap recovery candidate', horizon: '5–10 years', conviction: 'High' },
    thesis: { core_business: "India's second-largest IT company. AI-led digital transformation, cloud migration, and IT consulting. Strong presence in BFSI, manufacturing, energy, and retail across 50+ countries.", competitive_advantage: "Superior management track record. Infosys Cobalt cloud platform. Best-in-class deal pipeline momentum. AI-first delivery model embedded natively across all verticals.", growth_drivers: ['Largest deal pipeline in several years', 'AI transformation mandates from global BFSI clients', 'Infosys Cobalt cloud acceleration', 'Strong operational execution lifting revenue guidance'], risks: ['Jefferies downgrade to Hold — AI disruption to managed services', 'US client budget freeze on discretionary spend', 'High US revenue concentration (~60% of total)', 'Revenue growth guidance conservative for FY26'], valuation_status: 'Fairly Valued — Approaching Undervalued' },
  },
  {
    id: 'hcltech', name: 'HCL Technologies', ticker: 'HCLTECH',
    exchange: 'NSE', sector: 'Information Technology', sectorId: 'it',
    category: 'Large-Cap IT Services + ER&D + Software Products', market_cap_cr: 368000,
    recommendation: 'Strong Buy',
    screening_scores: { business_quality: 8, financial_strength: 8, growth_potential: 7, management_quality: 8, valuation_attractiveness: 8, total: 39, max: 50 },
    financials: { pe_ratio: 19, pb_ratio: 5.9, roe_pct: 24, dividend_yield_pct: 3.5, debt_to_equity: 0.10, operating_margin_pct: null, ev_ebitda: null, week_52_high: 2000, week_52_low: 1350, market_cap_cr: 368000 },
    price_data: {
      current_price: 1357, price_date: '2026-03-13',
      analyst_targets: [
        { brokerage: 'JM Financial',     target: 1570, rating: 'Add' },
        { brokerage: 'ICICI Securities', target: 1580, rating: 'Hold' },
        { brokerage: 'Choice Broking',   target: 1720, rating: 'Buy' },
        { brokerage: 'Jefferies',        target: 1390, rating: 'Hold' },
      ],
      consensus_target_low: 1390, consensus_target_high: 1720, consensus_target_avg: 1565,
      upside_to_low_pct: 2, upside_to_high_pct: 27, upside_to_avg_pct: 15,
    },
    entry: { call: 'Buy Now', buy_zone_low: 1300, buy_zone_high: 1500, in_zone: true, zone_status: 'in_zone', rationale: 'Best risk-adjusted large-cap entry — ER&D + software product mix protects margins; 19x FY26E is undemanding vs quality', horizon: '5–10 years', conviction: 'High' },
    thesis: { core_business: "Third-largest Indian IT firm. Unique business mix: IT services, engineering R&D, and HCLSoftware product portfolio with annuity-like license renewals.", competitive_advantage: "Software product business provides high-margin recurring revenue — a structural differentiator vs pure-play services peers. ER&D exposure to fastest-growing sub-segment.", growth_drivers: ['HCLSoftware auto-renewing license portfolio (high margins)', 'ER&D fastest-growing sub-segment globally at 7% CAGR', 'BFSI and hi-tech vertical momentum', 'AI-enabled productivity gains boosting margins'], risks: ['Auto manufacturing vertical headwinds', 'Software business renewal rate monitoring', 'Jefferies downgrade to Hold citing AI structural risk', 'US macro exposure through BFSI clients'], valuation_status: 'Undervalued to Fairly Valued' },
  },
  {
    id: 'persistent', name: 'Persistent Systems', ticker: 'PERSISTENT',
    exchange: 'NSE', sector: 'Information Technology', sectorId: 'it',
    category: 'Mid-Cap IT — Software Product Engineering & AI-Native', market_cap_cr: 75000,
    recommendation: 'Buy on Dip',
    screening_scores: { business_quality: 8, financial_strength: 8, growth_potential: 9, management_quality: 8, valuation_attractiveness: 6, total: 39, max: 50 },
    financials: { pe_ratio: 30, pb_ratio: 9.2, roe_pct: 28, dividend_yield_pct: null, debt_to_equity: 0.12, operating_margin_pct: null, ev_ebitda: null, week_52_high: 6700, week_52_low: 4200, market_cap_cr: 75000 },
    price_data: {
      current_price: 4642, price_date: '2026-03-06',
      analyst_targets: [
        { brokerage: 'JM Financial',   target: 5955, rating: 'Add' },
        { brokerage: 'Choice Broking', target: 6050, rating: 'Add' },
        { brokerage: 'Emkay Global',   target: 5800, rating: 'Add' },
      ],
      consensus_target_low: 5800, consensus_target_high: 6050, consensus_target_avg: 5935,
      upside_to_low_pct: 25, upside_to_high_pct: 30, upside_to_avg_pct: 28,
      note: 'JM Financial cut target 21.6% from prior ₹7,600 — reflects sector-wide de-rating, not company deterioration',
    },
    entry: { call: 'Buy on Dip', buy_zone_low: 4200, buy_zone_high: 4800, in_zone: false, zone_status: 'near_zone', rationale: 'Near lower end of zone — wait for pullback to ₹4,200–4,400 for better margin of safety', horizon: '5–7 years', conviction: 'High' },
    thesis: { core_business: "India's highest-quality mid-cap IT. Focused on software product engineering, cloud-native development, and AI-native application development.", competitive_advantage: "Fastest organic revenue growth in listed Indian IT (18–21% CAGR FY23–25). AI-first delivery model natively embedded. CEO Sandeep Kalra's credible execution track record.", growth_drivers: ['Software product engineering — fastest-growing global sub-segment', 'AI-native application development mandates', 'Strong hyperscaler partner ecosystem (AWS, Azure, GCP, Salesforce)', 'BFSI and healthcare verticals — digital transformation pipeline'], risks: ['Premium valuation still at 30x requires sustained 18%+ growth', 'North America BFSI concentration — macro sensitivity', 'JM Financial downgraded; target cut 21.6% in Feb 2026', 'Stock fell ~31% from peak — further selling pressure possible'], valuation_status: 'Fairly Valued After Correction' },
  },
  {
    id: 'coforge', name: 'Coforge', ticker: 'COFORGE',
    exchange: 'NSE', sector: 'Information Technology', sectorId: 'it',
    category: 'Mid-Cap IT — Domain-Focused (Travel, BFSI, Insurance)', market_cap_cr: 39000,
    recommendation: 'Strong Buy',
    screening_scores: { business_quality: 7, financial_strength: 7, growth_potential: 8, management_quality: 7, valuation_attractiveness: 7, total: 36, max: 50 },
    financials: { pe_ratio: 17, pb_ratio: 4.8, roe_pct: 22, dividend_yield_pct: null, debt_to_equity: 0.20, operating_margin_pct: null, ev_ebitda: null, week_52_high: 2000, week_52_low: 1050, market_cap_cr: 39000 },
    price_data: {
      current_price: 1153, price_date: '2026-03-13',
      analyst_targets: [
        { brokerage: 'JM Financial',   target: 1500, rating: 'Add' },
        { brokerage: 'Choice Broking', target: 2045, rating: 'Buy' },
        { brokerage: 'Emkay Global',   target: 1600, rating: 'Add' },
      ],
      consensus_target_low: 1500, consensus_target_high: 2045, consensus_target_avg: 1715,
      upside_to_low_pct: 30, upside_to_high_pct: 77, upside_to_avg_pct: 49,
      note: 'JM Financial cut target 31% (prior ₹2,180) — sector-wide de-rating, not company-specific',
    },
    entry: { call: 'Buy Now', buy_zone_low: 1050, buy_zone_high: 1250, in_zone: true, zone_status: 'in_zone', rationale: 'Currently inside zone — de-rated sharply from peak; cheapest mid-cap at 17x FY27E; accumulate in tranches', horizon: '3–7 years', conviction: 'Medium-High' },
    thesis: { core_business: "Mid-cap IT with deep vertical specialization in travel, BFSI, and insurance. Following NIIT Technologies merger, now a focused domain-led player.", competitive_advantage: "Vertical specialization drives higher win rates and pricing power vs generalist IT. Insurance and travel digitization remain structurally underpenetrated.", growth_drivers: ['Large deal pipeline in insurance digital transformation', 'BFSI modernization mandates across US and UK', 'Geographic expansion into Europe', 'Travel sector digitization long runway post-pandemic reset'], risks: ['Travel vertical cyclicality — vulnerable to global macro shocks', 'Stock fell 23% in one month — ongoing sector sentiment pressure', 'JM Financial downgraded to Add (31% target cut, Feb 2026)', 'Client concentration risk in travel segment'], valuation_status: 'Undervalued' },
  },
  {
    id: 'ltimindtree', name: 'LTIMindtree', ticker: 'LTIM',
    exchange: 'NSE', sector: 'Information Technology', sectorId: 'it',
    category: 'Large Mid-Cap IT Services — Post-Merger Entity', market_cap_cr: 134000,
    recommendation: 'Buy on Correction',
    screening_scores: { business_quality: 8, financial_strength: 8, growth_potential: 7, management_quality: 7, valuation_attractiveness: 5, total: 35, max: 50 },
    financials: { pe_ratio: 24, pb_ratio: 6.5, roe_pct: 25, dividend_yield_pct: null, debt_to_equity: 0.05, operating_margin_pct: null, ev_ebitda: null, week_52_high: 7000, week_52_low: 4300, market_cap_cr: 134000 },
    price_data: {
      current_price: 4504, price_date: '2026-03-06',
      analyst_targets: [
        { brokerage: 'JM Financial',   target: 5095, rating: 'Reduce' },
        { brokerage: 'Jefferies',      target: 4300, rating: 'Underperform' },
        { brokerage: 'Choice Broking', target: 5800, rating: 'Add' },
      ],
      consensus_target_low: 4300, consensus_target_high: 5800, consensus_target_avg: 5065,
      upside_to_low_pct: -5, upside_to_high_pct: 29, upside_to_avg_pct: 12,
    },
    entry: { call: 'Buy on Correction', buy_zone_low: 3800, buy_zone_high: 4200, in_zone: false, zone_status: 'near_zone', rationale: 'Wait for 8–12% correction before entry — merger integration still playing out; execution needs to stabilize', horizon: '3–5 years', conviction: 'Medium' },
    thesis: { core_business: "Merged entity of LTI and Mindtree. Large mid-cap IT across BFSI, hi-tech, and manufacturing. Combining LTI's BFSI strength with Mindtree's consumer and retail tech.", competitive_advantage: "Scale post-merger provides large deal eligibility. BFSI domain depth from LTI heritage. Strong talent bench from both organizations.", growth_drivers: ['Post-merger synergy realization from FY27 onward', 'Large deal pipeline benefiting from combined scale', 'BFSI client wallet share expansion', 'AI and cloud transformation mandates'], risks: ['Post-merger integration execution risk — still ongoing', 'Jefferies — Underperform rating, ₹4,300 target (below market)', 'JM Financial — Reduce rating with ₹5,095 target', 'Stock fell ~20% in one month; consensus divided'], valuation_status: 'Fairly Valued — Needs Execution Proof' },
  },
  {
    id: 'wipro', name: 'Wipro', ticker: 'WIPRO',
    exchange: 'NSE', sector: 'Information Technology', sectorId: 'it',
    category: 'Large-Cap IT Services — Restructuring Phase', market_cap_cr: 210000,
    recommendation: 'Watchlist',
    screening_scores: { business_quality: 6, financial_strength: 8, growth_potential: 5, management_quality: 6, valuation_attractiveness: 7, total: 32, max: 50 },
    financials: { pe_ratio: 18, pb_ratio: 3.2, roe_pct: 16, dividend_yield_pct: 3.0, debt_to_equity: 0.15, operating_margin_pct: 17.6, ev_ebitda: null, week_52_high: 285, week_52_low: 193, market_cap_cr: 210000 },
    price_data: {
      current_price: 196, price_date: '2026-03-13',
      analyst_targets: [
        { brokerage: 'ICICI Securities', target: 255, rating: 'Hold' },
        { brokerage: 'Jefferies',        target: 255, rating: 'Hold' },
        { brokerage: 'Choice Broking',   target: 285, rating: 'Add' },
      ],
      consensus_target_low: 255, consensus_target_high: 285, consensus_target_avg: 265,
      upside_to_low_pct: 30, upside_to_high_pct: 45, upside_to_avg_pct: 35,
      note: 'JM Financial — no catalyst for re-rating despite reasonable valuation',
    },
    entry: { call: 'Watchlist Only', buy_zone_low: 180, buy_zone_high: 200, in_zone: false, zone_status: 'watchlist', rationale: 'Only on visible management-driven growth inflection — chronically underperforms peers for 3+ years', horizon: 'Avoid for now', conviction: 'Low' },
    thesis: { core_business: "India's fourth-largest IT services company. Undergoing strategic restructuring under CEO Srini Pallia with focus on AI-led delivery (WINGS and WEGA platforms).", competitive_advantage: "Strong balance sheet and dividend payout (~$1.3B annually). Best EBIT margin performance in years at 17.6% Q3FY26. Conservative financial management.", growth_drivers: ['WINGS AI delivery platform and WEGA AI innovation network', 'Phoenix deal ramp-up and vendor consolidation with US banks', 'AI-led productivity margin expansion', 'Interim dividend ₹6/share declared Jan 2026'], risks: ['Revenue growth chronically below peers for 3+ years', 'Net profit down 7% YoY in Q3FY26', 'JM Financial: no catalyst seen for re-rating', 'Consumer, retail, emerging markets remain soft'], valuation_status: 'Reasonably Valued — Structural Concerns Persist' },
  },
  {
    id: 'techmahindra', name: 'Tech Mahindra', ticker: 'TECHM',
    exchange: 'NSE', sector: 'Information Technology', sectorId: 'it',
    category: 'Large Mid-Cap IT — Telecom & 5G Specialist', market_cap_cr: 130000,
    recommendation: 'Buy on Correction',
    screening_scores: { business_quality: 6, financial_strength: 7, growth_potential: 6, management_quality: 6, valuation_attractiveness: 7, total: 32, max: 50 },
    financials: { pe_ratio: 22, pb_ratio: 3.8, roe_pct: 14, dividend_yield_pct: null, debt_to_equity: 0.18, operating_margin_pct: null, ev_ebitda: null, week_52_high: 1806, week_52_low: 1230, market_cap_cr: 130000 },
    price_data: {
      current_price: 1333, price_date: '2026-03-06',
      analyst_targets: [
        { brokerage: 'JM Financial',   target: 1660, rating: 'Add' },
        { brokerage: 'Choice Broking', target: 1730, rating: 'Buy' },
        { brokerage: 'Emkay Global',   target: 1580, rating: 'Add' },
      ],
      consensus_target_low: 1580, consensus_target_high: 1730, consensus_target_avg: 1657,
      upside_to_low_pct: 18, upside_to_high_pct: 30, upside_to_avg_pct: 24,
    },
    entry: { call: 'Buy on Correction', buy_zone_low: 1150, buy_zone_high: 1300, in_zone: false, zone_status: 'near_zone', rationale: 'Marginally above ideal entry — wait for pullback to ₹1,200–1,300; telecom turnaround needs 1–2 more quarters validation', horizon: '3–5 years', conviction: 'Medium' },
    thesis: { core_business: "Telecom-focused large mid-cap IT. Dominant in BSS/OSS transformation for global telcos. Undergoing restructuring under new CEO Mohit Joshi.", competitive_advantage: "Deepest telecom domain expertise among Indian IT — unique positioning for 5G network transformation. GCC build-out for telcos. Mahindra Group governance.", growth_drivers: ['5G network transformation mandates for global telcos', 'AI and network automation services for CSPs', 'New CEO restructuring — cost optimization driving margin recovery', 'Manufacturing and BFSI vertical diversification'], risks: ['Telecom capex globally under pressure — core vertical headwinds', 'Turnaround still in progress — not yet demonstrated at scale', 'CapGemini/Ericsson competition in telecom IT space', 'Revenue growth lagged peers in FY24–25'], valuation_status: 'Fair — Turnaround Optionality Priced In' },
  },
  {
    id: 'mphasis', name: 'Mphasis', ticker: 'MPHASIS',
    exchange: 'NSE', sector: 'Information Technology', sectorId: 'it',
    category: 'Mid-Cap IT — BFSI Digital Transformation Specialist', market_cap_cr: 44000,
    recommendation: 'Buy on Dip',
    screening_scores: { business_quality: 7, financial_strength: 7, growth_potential: 6, management_quality: 7, valuation_attractiveness: 6, total: 33, max: 50 },
    financials: { pe_ratio: 23, pb_ratio: 5.5, roe_pct: 21, dividend_yield_pct: null, debt_to_equity: 0.08, operating_margin_pct: null, ev_ebitda: null, week_52_high: 3140, week_52_low: 2100, market_cap_cr: 44000 },
    price_data: {
      current_price: 2232, price_date: '2026-03-13',
      analyst_targets: [
        { brokerage: 'JM Financial',   target: 2995, rating: 'Buy' },
        { brokerage: 'Jefferies',      target: 2450, rating: 'Hold' },
        { brokerage: 'Choice Broking', target: 2935, rating: 'Add' },
      ],
      consensus_target_low: 2450, consensus_target_high: 2995, consensus_target_avg: 2793,
      upside_to_low_pct: 10, upside_to_high_pct: 34, upside_to_avg_pct: 25,
    },
    entry: { call: 'Buy on Dip', buy_zone_low: 2000, buy_zone_high: 2250, in_zone: true, zone_status: 'in_zone', rationale: 'Approaching lower end of zone — BFSI concentration means strong recovery leverage when US financial services spend revives', horizon: '3–5 years', conviction: 'Medium' },
    thesis: { core_business: "Mid-cap IT services specialist in BFSI digital transformation. ~80% revenue from banking and financial services clients. DXC Technology is a major channel partner.", competitive_advantage: "Deep BFSI domain knowledge — mortgage, lending, capital markets digitization. Direct exposure to US financial services recovery cycle. Low debt, strong cash generation.", growth_drivers: ['US BFSI discretionary spending recovery in H2 2026', 'Mortgage and lending digitization pipeline', 'Cloud-first financial services transformation', 'DXC channel partnership ramp-up'], risks: ['~80% BFSI concentration — high single-vertical exposure', 'DXC partnership dependency for deal flow', 'Jefferies downgraded to Hold (target ₹2,450)', 'US interest rate environment affecting BFSI capex decisions'], valuation_status: 'Fairly Valued' },
  },
  {
    id: 'ofss', name: 'Oracle Financial Services', ticker: 'OFSS',
    exchange: 'NSE', sector: 'Information Technology', sectorId: 'it',
    category: 'Mid-Cap Software Products — Banking Technology', market_cap_cr: 57000,
    recommendation: 'Buy on Correction',
    screening_scores: { business_quality: 8, financial_strength: 9, growth_potential: 5, management_quality: 8, valuation_attractiveness: 4, total: 34, max: 50 },
    financials: { pe_ratio: 30, pb_ratio: 12.0, roe_pct: 40, dividend_yield_pct: 2.5, debt_to_equity: 0.00, operating_margin_pct: null, ev_ebitda: null, week_52_high: 9400, week_52_low: 6300, market_cap_cr: 57000 },
    price_data: {
      current_price: 6843, price_date: '2026-03-06',
      analyst_targets: [],
      consensus_target_low: null, consensus_target_high: null, consensus_target_avg: null,
      upside_to_low_pct: null, upside_to_high_pct: null, upside_to_avg_pct: null,
      note: 'Limited broker coverage — Oracle parent holds ~73% stake; limited free float reduces analyst attention',
    },
    entry: { call: 'Buy on Correction', buy_zone_low: 5800, buy_zone_high: 6400, in_zone: false, zone_status: 'near_zone', rationale: 'Wait for 7–10% correction — best-in-class cash generation and ROE; niche banking software moat; limited free float illiquidity premium', horizon: '5–10 years', conviction: 'Medium' },
    thesis: { core_business: "India-listed subsidiary of Oracle providing FLEXCUBE and Reveleus banking software to financial institutions globally. Near-monopoly in core banking software for emerging market banks.", competitive_advantage: "FLEXCUBE core banking platform deeply embedded in 600+ banks globally — extremely high switching costs. Zero debt. 40%+ ROE. Oracle parentage provides credibility.", growth_drivers: ['Core banking modernization wave in emerging markets', 'FLEXCUBE upgrades and cloud migration of existing client base', 'Digital lending and payments module cross-sell', 'India domestic banking sector spending'], risks: ['Oracle parent (73% stake) — limited free float, illiquidity', 'Growth slow vs pure-play IT services peers', 'Niche addressable market caps revenue growth potential', 'Expensive on absolute P/E at 30x for moderate growth'], valuation_status: 'Slightly Rich — Worth It for Quality Moat' },
  },
];

// ─── RENEWABLE ENERGY SECTOR COMPANIES ─────────────────────────────────────

const reCompanies: Company[] = [
  {
    id: 'jsw_energy', name: 'JSW Energy', ticker: 'JSWENERGY',
    exchange: 'NSE', sector: 'Renewable Energy', sectorId: 'renewable',
    category: 'Integrated Power (Thermal + RE)', market_cap_cr: 90000,
    recommendation: 'Strong Buy',
    screening_scores: { business_quality: 8, financial_strength: 8, growth_potential: 9, management_quality: 8, valuation_attractiveness: 7, total: 40, max: 50 },
    financials: { pe_ratio: 33, pb_ratio: 2.84, roe_pct: 17, dividend_yield_pct: null, debt_to_equity: null, operating_margin_pct: null, ev_ebitda: 25, week_52_high: 579, week_52_low: 419, market_cap_cr: 90000 },
    price_data: {
      current_price: 513, price_date: '2026-03-12',
      analyst_targets: [
        { brokerage: 'JM Financial',    target: 614, rating: 'Buy' },
        { brokerage: 'Axis Securities', target: 705, rating: 'Buy' },
        { brokerage: 'MOFSL',           target: 697, rating: 'Buy' },
      ],
      consensus_target_low: 614, consensus_target_high: 705, consensus_target_avg: 672,
      upside_to_low_pct: 20, upside_to_high_pct: 37, upside_to_avg_pct: 31,
    },
    entry: { call: 'Buy Now', buy_zone_low: 460, buy_zone_high: 530, in_zone: true, zone_status: 'in_zone', rationale: 'Currently inside zone — accumulate now or add on dips to ₹460–480', horizon: '3–7 years', conviction: 'High' },
    thesis: { core_business: "Integrated power — thermal + RE. 10.9 GW total capacity FY25, rapidly shifting to RE via O2 Power acquisition (4.7 GW by 2027).", competitive_advantage: "Conservative capital structure vs peers; diversified PPA-backed revenue; BESS + green hydrogen investments; first FDRE PPA with SECI.", growth_drivers: ['O2 Power integration → ~15 GW RE target', '₹18,000 Cr capex FY26', 'Green hydrogen JV at Vijayanagar', '30 GW generation target by 2030'], risks: ['O2 Power integration execution risk', 'Merchant power price exposure', 'Grid curtailment impact on PLF'], valuation_status: 'Fairly Valued' },
  },
  {
    id: 'tata_power', name: 'Tata Power', ticker: 'TATAPOWER',
    exchange: 'NSE', sector: 'Renewable Energy', sectorId: 'renewable',
    category: 'Integrated Utility (Solar + Wind + Hydro + Thermal)', market_cap_cr: 120000,
    recommendation: 'Buy on Correction',
    screening_scores: { business_quality: 8, financial_strength: 7, growth_potential: 8, management_quality: 8, valuation_attractiveness: 7, total: 38, max: 50 },
    financials: { pe_ratio: null, pb_ratio: null, roe_pct: null, dividend_yield_pct: 0.60, debt_to_equity: null, operating_margin_pct: null, ev_ebitda: null, week_52_high: 417, week_52_low: 326, market_cap_cr: 120000 },
    price_data: {
      current_price: 370, price_date: '2026-03-13',
      analyst_targets: [
        { brokerage: 'JM Financial', target: 429, rating: 'Buy' },
        { brokerage: 'MOFSL',        target: 383, rating: 'Buy' },
      ],
      consensus_target_low: 383, consensus_target_high: 429, consensus_target_avg: 406,
      upside_to_low_pct: 3, upside_to_high_pct: 16, upside_to_avg_pct: 10,
    },
    entry: { call: 'Buy on Dip', buy_zone_low: 300, buy_zone_high: 340, in_zone: false, zone_status: 'near_zone', rationale: 'Near lower analyst target but above ideal entry — wait for 8–10% pullback', horizon: '5–10 years', conviction: 'High' },
    thesis: { core_business: "India's largest integrated power company — solar, wind, hydro, thermal + EV charging + rooftop solar. Target: 15 GW RE by 2030.", competitive_advantage: "Tata brand trust; diversified revenue streams; EPC capability; pumped hydro ₹11,000 Cr investment in Pune; Bhutan hydropower stake.", growth_drivers: ['Rooftop solar + EV charging platform', 'C&I solar demand growth', 'Distribution utility franchise (Ajmer, Odisha)', 'Pumped hydro storage investments'], risks: ['Execution pace on 15 GW target', 'Regulated tariff caps on distribution', 'Q3 FY26 net profit down 25% YoY'], valuation_status: 'Fair / Slight Premium' },
  },
  {
    id: 'suzlon', name: 'Suzlon Energy', ticker: 'SUZLON',
    exchange: 'NSE', sector: 'Renewable Energy', sectorId: 'renewable',
    category: 'Wind Turbine Manufacturer + Developer', market_cap_cr: 56000,
    recommendation: 'Buy on Dip',
    screening_scores: { business_quality: 7, financial_strength: 7, growth_potential: 9, management_quality: 7, valuation_attractiveness: 6, total: 36, max: 50 },
    financials: { pe_ratio: null, pb_ratio: null, roe_pct: 30, dividend_yield_pct: null, debt_to_equity: null, operating_margin_pct: null, ev_ebitda: 25.68, week_52_high: 74, week_52_low: 38, market_cap_cr: 56000 },
    price_data: {
      current_price: 42.5, price_date: '2026-03-12',
      analyst_targets: [
        { brokerage: 'JM Financial', target: 64, rating: 'Buy' },
        { brokerage: 'Others',       target: 70, rating: 'Buy' },
      ],
      consensus_target_low: 64, consensus_target_high: 70, consensus_target_avg: 67,
      upside_to_low_pct: 51, upside_to_high_pct: 65, upside_to_avg_pct: 58,
    },
    entry: { call: 'Buy in Tranches', buy_zone_low: 38, buy_zone_high: 52, in_zone: true, zone_status: 'in_zone', rationale: 'Currently inside zone — buy in tranches given high volatility. Ideal tranche entry: ₹38–42', horizon: '3–5 years', conviction: 'Medium-High' },
    thesis: { core_business: "Only pure-play Indian wind OEM. Vertically integrated turbine manufacturer + project developer. Wind + solar hybrid capability.", competitive_advantage: "Only domestic wind OEM at scale; strong order book; 18 GW/yr manufacturing capacity; hybrid park pipeline in Rajasthan.", growth_drivers: ['India wind target 100 GW by 2030 (from ~50 GW)', 'Hybrid and FDRE project growth', 'New CEO — transformation to full-stack RE solutions', 'Operating leverage at current scale'], risks: ['Wind policy and ISTS delays', 'Order book cyclicality', 'China component dependency', 'High stock volatility on policy news'], valuation_status: 'Slightly Rich — Worth It for Growth' },
  },
  {
    id: 'waaree', name: 'Waaree Energies', ticker: 'WAAREEENER',
    exchange: 'NSE', sector: 'Renewable Energy', sectorId: 'renewable',
    category: 'Solar Module Manufacturer + IPP', market_cap_cr: 75700,
    recommendation: 'Buy on Correction',
    screening_scores: { business_quality: 7, financial_strength: 7, growth_potential: 8, management_quality: 7, valuation_attractiveness: 6, total: 35, max: 50 },
    financials: { pe_ratio: null, pb_ratio: null, roe_pct: 27, dividend_yield_pct: null, debt_to_equity: null, operating_margin_pct: null, ev_ebitda: 16.34, week_52_high: 3865, week_52_low: 1863, market_cap_cr: 75700 },
    price_data: {
      current_price: 2637, price_date: '2026-03-10',
      analyst_targets: [
        { brokerage: 'YES Securities', target: 3500, rating: 'Buy', note: 'implied from ~60% upside estimate' },
      ],
      consensus_target_low: 3200, consensus_target_high: 3500, consensus_target_avg: 3350,
      upside_to_low_pct: 21, upside_to_high_pct: 33, upside_to_avg_pct: 27,
    },
    entry: { call: 'Wait / Watch', buy_zone_low: 2200, buy_zone_high: 2400, in_zone: false, zone_status: 'above_zone', rationale: 'Currently above ideal entry — wait for correction or ALCM policy clarity post Jun-26', horizon: '3–5 years', conviction: 'Medium' },
    thesis: { core_business: "India's largest solar module manufacturer. 23 GW module capacity. PLI beneficiary. Domestic content mandates provide structural advantage.", competitive_advantage: "Scale; PLI beneficiary; ALMM domestic content rules favor local manufacturers; backward integration drive.", growth_drivers: ['ALCM cell extension (Jun-26)', 'Domestic RE manufacturing push', 'C&I and utility-scale demand', 'Export opportunity if US tariffs ease'], risks: ['US 50% tariffs on Indian exports', 'ALCM policy uncertainty post Jun-26', 'Chinese import competition if ALMM weakens', 'Module price compression'], valuation_status: 'Fair — Wait for Dip' },
  },
  {
    id: 'ntpc_green', name: 'NTPC Green Energy', ticker: 'NTPCGREEN',
    exchange: 'NSE', sector: 'Renewable Energy', sectorId: 'renewable',
    category: 'PSU Pure-Play RE Generator', market_cap_cr: 77000,
    recommendation: 'Watchlist — Wait',
    screening_scores: { business_quality: 7, financial_strength: 8, growth_potential: 8, management_quality: 6, valuation_attractiveness: 7, total: 36, max: 50 },
    financials: { pe_ratio: null, pb_ratio: null, roe_pct: 8.5, dividend_yield_pct: null, debt_to_equity: null, operating_margin_pct: null, ev_ebitda: 28.66, week_52_high: 145, week_52_low: 85, market_cap_cr: 77000 },
    price_data: {
      current_price: 97, price_date: '2026-03-12',
      analyst_targets: [],
      consensus_target_low: null, consensus_target_high: null, consensus_target_avg: null,
      upside_to_low_pct: null, upside_to_high_pct: null, upside_to_avg_pct: null,
      note: 'No firm 12-month target widely published — PSU, limited analyst coverage',
    },
    entry: { call: 'Buy on Pullback', buy_zone_low: 82, buy_zone_high: 92, in_zone: false, zone_status: 'near_zone', rationale: 'Recent rally pushed above ideal entry — good accumulation zone is pullback to ₹85–92', horizon: '5–7 years', conviction: 'Medium' },
    thesis: { core_business: "NTPC's dedicated renewable arm. Utility-scale solar and wind. Backed by sovereign balance sheet. 30 GW RE target by 2030.", competitive_advantage: "PSU balance sheet; lowest cost of capital in sector; sovereign backing removes refinancing risk; ONGC JV for green hydrogen.", growth_drivers: ['Parent NTPC\'s ₹1 lakh crore RE investment plan', 'Khavda solar cluster expansion', 'Green hydrogen and ammonia pilot projects', 'Floating solar and offshore wind pipeline'], risks: ['PSU execution pace slower than private peers', 'Low RoE (8.5% FY27E vs peers at 17–30%)', 'Management quality limited by bureaucratic constraints', 'Curtailment in Rajasthan and Gujarat'], valuation_status: 'Reasonable for PSU' },
  },
  {
    id: 'adani_green', name: 'Adani Green Energy', ticker: 'ADANIGREEN',
    exchange: 'NSE', sector: 'Renewable Energy', sectorId: 'renewable',
    category: 'Pure-Play RE Generator', market_cap_cr: 142000,
    recommendation: 'Watchlist',
    screening_scores: { business_quality: 8, financial_strength: 4, growth_potential: 8, management_quality: 4, valuation_attractiveness: 5, total: 29, max: 50 },
    financials: { pe_ratio: 83, pb_ratio: 8.59, roe_pct: null, dividend_yield_pct: null, debt_to_equity: null, operating_margin_pct: null, ev_ebitda: null, week_52_high: 1178, week_52_low: 758, market_cap_cr: 142000 },
    price_data: {
      current_price: 858, price_date: '2026-03-13',
      analyst_targets: [
        { brokerage: 'JM Financial', target: 1204, rating: 'Buy' },
      ],
      consensus_target_low: 1204, consensus_target_high: 1204, consensus_target_avg: 1204,
      upside_to_low_pct: 40, upside_to_high_pct: 40, upside_to_avg_pct: 40,
      note: 'High upside on paper but significant governance and leverage risk',
    },
    entry: { call: 'Watchlist Only', buy_zone_low: 700, buy_zone_high: 800, in_zone: false, zone_status: 'above_zone', rationale: 'Only if governance concerns resolve. Small position only — do not overweight', horizon: 'Long-term only', conviction: 'Low' },
    thesis: { core_business: "India's largest pure-play RE IPP. 17.5 GW operational capacity. Solar + wind hybrid. Target 50 GW by 2030.", competitive_advantage: "Scale and execution speed; long-term PPAs providing cash flow visibility; Adani Group financial backing; Khavda gigapark.", growth_drivers: ['50 GW capacity target by 2030', 'Khavda — world\'s largest RE park', 'Hybrid and storage project pipeline', 'International green bond access'], risks: ['Governance and group-level scrutiny (Hindenburg overhang)', 'Low interest coverage ratio', 'Q3 FY26 net profit down 98.9% YoY', 'PE at 83× — 188% premium to peer median', 'High leverage relative to peers'], valuation_status: 'Expensive — PE 83×' },
  },
];

// ─── SECTORS ─────────────────────────────────────────────────────────────────

export const sectors: Sector[] = [
  {
    id: 'it',
    name: 'Information Technology',
    shortName: 'IT Sector',
    stage: 'Late Growth → Cyclical Trough',
    stage_detail: 'Cyclical correction + structural AI transition; near 10-yr valuation lows on P/E',
    metrics: [
      { label: 'Sector Revenue FY25', value: 283, unit: 'USD Bn', note: '+5.1% YoY · NASSCOM FY25' },
      { label: 'FY26E Sector Revenue', value: 300, unit: 'USD Bn', note: '~6% growth · crossing $300B milestone' },
      { label: 'IT Exports FY25', value: 224, unit: 'USD Bn', note: '+4.6% YoY · 43–45% of India\'s total services exports' },
      { label: 'Domestic IT Spending 2026E', value: 176.3, unit: 'USD Bn', note: '+10.6% YoY · Gartner estimate' },
      { label: 'Workforce', value: 5.8, unit: 'M employees', note: '+126,000 net hires added in FY25' },
      { label: 'GDP Contribution', value: 7.3, unit: '% of GDP', note: 'Targeting 10% of GDP by 2026' },
      { label: 'Nifty IT YTD (2026)', value: -19.28, unit: '%', note: 'As of Feb 25, 2026 · Near 52-week lows' },
    ],
    breakdown: [
      { segment: 'IT Services',         share_pct: 52, color: '#185FA5' },
      { segment: 'BPM / BPO',           share_pct: 20, color: '#1D9E75' },
      { segment: 'Engineering R&D',     share_pct: 20, color: '#7F77DD' },
      { segment: 'Software Products',   share_pct:  8, color: '#EF9F27' },
    ],
    tailwinds: [
      'Enterprise AI and GenAI transformation mandates',
      'Cloud migration — multi-cloud and FinOps spending',
      'GCC (Global Capability Centre) expansion in India',
      'Engineering R&D segment growing at 7% — fastest sub-segment',
      'BFSI core banking and payments modernization',
      'Domestic India digital infrastructure spend (+11% YoY)',
      'Rupee depreciation tailwind on USD revenues',
      'NASSCOM: 77% of providers expect higher FY26 business growth',
      'India AI market projected at $28.8B by 2025 at 45% CAGR',
    ],
    risks: [
      'AI structural disruption to managed services business mix',
      'US macro slowdown — Fed GDP forecast cut to 1.4% for FY25',
      'Discretionary tech spend freeze by US clients',
      'FII outflows — 26.1% net outflow from IT sector in 2025',
      'Jefferies and JM Financial broad sector downgrades (Feb 2026)',
      'Valuation de-rating from premium 27–35x P/E to historical avg 19–22x',
      'Talent cost pressure and attrition in AI-adjacent roles',
    ],
    companies: itCompanies,
    icon: '💻',
  },
  {
    id: 'renewable',
    name: 'Renewable Energy',
    shortName: 'Clean Energy',
    stage: 'Growth',
    stage_detail: 'Early-to-mid growth phase; high capex, expanding TAM',
    metrics: [
      { label: 'Total RE Installed Capacity', value: 254, unit: 'GW', note: '+23% YoY · Nov 2025' },
      { label: 'FY26 Capacity Addition (5M)', value: 20.1, unit: 'GW', note: '+123% vs same period FY25' },
      { label: '2030 Non-Fossil Target', value: 500, unit: 'GW', note: '~246 GW still to add in 4 years' },
      { label: 'Sector Market Size 2030E', value: 150, unit: 'USD Bn', note: 'India RE market estimate' },
      { label: 'Solar CAGR (2010–2025)', value: 24.8, unit: '%', note: 'Highest among all RE sub-sectors' },
      { label: 'RE Share of Installed Capacity', value: 46, unit: '%', note: 'Oct 2025 · Targeting 65%+ by 2030' },
    ],
    breakdown: [
      { segment: 'Solar',           share_pct: 52, value_gw: 132.9, color: '#EF9F27' },
      { segment: 'Wind',            share_pct: 20, value_gw: 50.0,  color: '#378ADD' },
      { segment: 'Large Hydro',     share_pct: 20, value_gw: 50.3,  color: '#1D9E75' },
      { segment: 'Biomass / Other', share_pct:  8, value_gw: 21.0,  color: '#7F77DD' },
    ],
    tailwinds: [
      '500 GW non-fossil target by 2030',
      'GST cut 12% → 5% on RE equipment',
      'PLI solar manufacturing scheme',
      'PM Surya Ghar (rooftop solar)',
      'Green Hydrogen Mission',
      'BESS hybrid mandates',
      'C&I demand 45–50% of grid',
      '100% FDI allowed in RE sector',
      'Falling module costs',
    ],
    risks: [
      'Grid curtailment 10–30% in RE states',
      'ISTS transmission delays',
      'ALCM/ALMM policy uncertainty post Jun-26',
      'Discom unpaid dues >$9B',
      'China mineral export controls',
      'Bidding slowdown (3.4 GW H1 FY26)',
      'US tariffs on Indian exports',
    ],
    companies: reCompanies,
    icon: '⚡',
  },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

export const allCompanies: Company[] = sectors.flatMap(s => s.companies);

export function getCompanyById(id: string): Company | undefined {
  return allCompanies.find(c => c.id === id);
}

export function getSectorById(id: string): Sector | undefined {
  return sectors.find(s => s.id === id);
}

export function getStrongBuys(): Company[] {
  return allCompanies.filter(c => c.recommendation === 'Strong Buy');
}

export function getInZoneStocks(): Company[] {
  return allCompanies.filter(c => c.entry.zone_status === 'in_zone' && c.price_data.current_price != null);
}

export function getSortedByUpside(): Company[] {
  return [...allCompanies]
    .filter(c => c.price_data.upside_to_avg_pct != null && c.price_data.current_price != null)
    .sort((a, b) => (b.price_data.upside_to_avg_pct ?? 0) - (a.price_data.upside_to_avg_pct ?? 0));
}
