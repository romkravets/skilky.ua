'use client';

import { useState, useEffect, useRef } from 'react';
import { Equivalent, CAT_LABELS, CAT_COLORS } from '@/lib/equivalents';
import { formatUAH, formatCount } from '@/lib/formatters';
import { SVGS } from './Svgs';
import DotMatrix from './DotMatrix';

function useAnimatedNumber(target: number, duration = 800) {
  const [display, setDisplay] = useState(target);
  const raf = useRef<number | null>(null);
  const prevTarget = useRef(target);

  useEffect(() => {
    const start = prevTarget.current;
    prevTarget.current = target;
    const diff = target - start;
    if (diff === 0) return;
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(start + diff * eased);
      if (p < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [target, duration]);

  return display;
}

interface Props {
  eq: Equivalent;
  amount: number;
  delay: number;
}

export default function EquivalentCard({ eq, amount, delay }: Props) {
  const count = Math.floor(amount / eq.price);
  const animCount = useAnimatedNumber(count, 900);
  const catColor = CAT_COLORS[eq.category];
  const [expanded, setExpanded] = useState(false);

  if (count < 1) return null;

  const SvgFn = SVGS[eq.svgKey] ?? SVGS['armor'];

  return (
    <div
      onClick={() => setExpanded(e => !e)}
      className="bg-[var(--bg2)] border border-white/7 rounded cursor-pointer relative overflow-hidden transition-colors hover:border-white/14"
      style={{
        padding: '20px 20px 16px',
        animation: `cardReveal 0.5s ${delay}ms ease both`,
      }}
    >
      {/* Category stripe */}
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: catColor }} />

      {/* Header: SVG + category badge */}
      <div className="flex justify-between items-start mb-3">
        <div className="w-11 h-11 shrink-0">{SvgFn(catColor)}</div>
        <span
          className="font-mono text-[9px] tracking-[0.14em] uppercase px-2 py-1 rounded-sm"
          style={{
            color: catColor,
            background: `${catColor}14`,
            border: `1px solid ${catColor}30`,
          }}
        >
          {CAT_LABELS[eq.category]}
        </span>
      </div>

      {/* Count */}
      <div
        className="font-mono font-semibold leading-none tracking-tight"
        style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', color: 'var(--text)' }}
      >
        {formatCount(animCount)}
      </div>
      <div className="font-display text-base text-white/70 mt-1 mb-3">{eq.name}</div>

      <DotMatrix count={count} color={catColor} svgKey={eq.svgKey} />

      {expanded && (
        <div style={{ animation: 'fadeUp 0.2s ease both' }}>
          <div className="text-xs text-white/45 leading-relaxed mb-2 border-t border-white/7 pt-3">
            {eq.desc}
          </div>
          <div className="font-mono text-[10px] text-white/45 tracking-wide">
            {formatUAH(eq.price)} за одиницю · {eq.source}
          </div>
        </div>
      )}

      <div className="font-mono text-[10px] text-white/45 mt-2 opacity-50 tracking-wide">
        {expanded ? '▲ згорнути' : '▼ деталі'}
      </div>
    </div>
  );
}
