'use client';

import { EQUIVALENTS, CAT_COLORS } from '@/lib/equivalents';
import { formatUAH, formatCount } from '@/lib/formatters';

interface Props {
  amount: number;
  onClose: () => void;
}

export default function OGCard({ amount, onClose }: Props) {
  const top = EQUIVALENTS
    .filter(e => e.category !== 'physical' && Math.floor(amount / e.price) >= 1)
    .sort((a, b) => (amount / a.price) - (amount / b.price))
    .slice(0, 3);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6"
      style={{ background: 'rgba(0,0,0,0.85)', animation: 'fadeUp 0.2s ease' }}
      onClick={onClose}
    >
      <div
        className="flex flex-col items-center gap-4 w-full max-w-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="font-mono text-[11px] text-white/45 tracking-[0.15em] uppercase self-start">
          // Превʼю OG-картки (1200×630)
        </div>

        {/* OG card at 1200:630 ratio */}
        <div
          className="w-full border border-white/12 rounded-md overflow-hidden relative flex flex-col justify-between"
          style={{
            aspectRatio: '1200 / 630',
            background: '#0a0909',
            padding: '7% 8%',
            fontFamily: 'var(--font-oswald), sans-serif',
          }}
        >
          <div className="absolute top-0 left-0 bottom-0 w-[5px] bg-red-600" />

          {/* Grid bg */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          <div className="font-mono uppercase tracking-[0.18em] text-red-600" style={{ fontSize: 'clamp(8px, 1.4vw, 14px)' }}>
            KRADENE.UA · Калькулятор вкрадених мільярдів
          </div>

          <div>
            <div
              className="font-bold text-[#f0ede8] leading-none tracking-tight mb-[3%]"
              style={{ fontSize: 'clamp(28px, 6vw, 72px)' }}
            >
              {formatUAH(amount)}
            </div>
            <div className="flex flex-col gap-[2%]">
              {top.map((eq, i) => {
                const cnt = Math.floor(amount / eq.price);
                const color = CAT_COLORS[eq.category];
                return (
                  <div key={eq.id} className="flex items-baseline gap-[2%]" style={{ opacity: 1 - i * 0.08 }}>
                    <span className="font-mono tracking-wide" style={{ fontSize: 'clamp(7px, 1.2vw, 13px)', color }}>
                      =
                    </span>
                    <span className="font-bold text-[#f0ede8] leading-none" style={{ fontSize: 'clamp(16px, 3vw, 36px)' }}>
                      {formatCount(cnt)}
                    </span>
                    <span className="font-mono text-[#f0ede8]/60 tracking-wide" style={{ fontSize: 'clamp(8px, 1.3vw, 14px)' }}>
                      {eq.name.toLowerCase()}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="font-mono text-[#f0ede8]/30 tracking-[0.12em]" style={{ fontSize: 'clamp(7px, 1.1vw, 12px)' }}>
            kradene.ua/result/{amount}
          </div>
        </div>

        <div className="flex gap-2 self-start flex-wrap">
          <button
            onClick={onClose}
            className="font-mono text-xs px-4 py-2 rounded border border-white/12 text-white/50 bg-transparent cursor-pointer hover:bg-white/5 transition-colors"
          >
            Закрити
          </button>
        </div>
      </div>
    </div>
  );
}
