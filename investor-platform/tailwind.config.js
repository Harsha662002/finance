/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', '"Courier New"', 'monospace'],
        sans: ['"Outfit"', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg: {
          primary:  '#05080F',
          surface:  '#090F1C',
          card:     '#0D1628',
          elevated: '#112038',
          hover:    '#162846',
        },
        gold: {
          DEFAULT: '#C9914A',
          light:   '#E8AC65',
          dim:     '#8A6332',
          glow:    'rgba(201,145,74,0.18)',
        },
        rec: {
          'strong-buy': '#00E676',
          'buy':        '#4ADE80',
          'dip':        '#F59E0B',
          'correction': '#F97316',
          'watchlist':  '#94A3B8',
          'speculative':'#EF4444',
        },
        zone: {
          in:     '#00E676',
          near:   '#F59E0B',
          above:  '#64748B',
          watch:  '#475569',
        },
        border: {
          subtle: 'rgba(148,163,184,0.08)',
          gold:   'rgba(201,145,74,0.2)',
          bright: 'rgba(148,163,184,0.18)',
        },
      },
      animation: {
        'fade-in':     'fadeIn 0.5s ease-out both',
        'slide-up':    'slideUp 0.45s cubic-bezier(0.16,1,0.3,1) both',
        'slide-right': 'slideRight 0.4s ease-out both',
        'glow-pulse':  'glowPulse 2.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:     { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp:    { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideRight: { '0%': { opacity: '0', transform: 'translateX(-12px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        glowPulse:  { '0%,100%': { opacity: '0.6' }, '50%': { opacity: '1' } },
      },
      boxShadow: {
        'card':      '0 1px 3px rgba(0,0,0,0.5), 0 0 0 1px rgba(148,163,184,0.06)',
        'card-gold': '0 1px 3px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,145,74,0.2)',
        'card-hover':'0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(201,145,74,0.3)',
        'glow-green':'0 0 20px rgba(0,230,118,0.25)',
        'glow-gold': '0 0 24px rgba(201,145,74,0.3)',
      },
    },
  },
  plugins: [],
}
