'use client';

import { useState } from 'react';
import { formatUAH, formatCount } from '@/lib/formatters';
import OGCard from './OGCard';

interface Props {
  amount: number;
}

export default function ShareRow({ amount }: Props) {
  const [copied, setCopied] = useState(false);
  const [showOG, setShowOG] = useState(false);

  function copyLink() {
    navigator.clipboard.writeText(`https://kradene.ua/result/${amount}`).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const shareText = `${formatUAH(amount)} вкрадених коштів — це ${formatCount(Math.floor(amount / 15000))} бронежилетів для ЗСУ. Порахуй сам: kradene.ua`;

  const platforms = [
    { name: 'Telegram', color: '#229ED9', href: `https://t.me/share/url?url=https://kradene.ua/result/${amount}&text=${encodeURIComponent(shareText)}` },
    { name: 'Facebook', color: '#1877F2', href: `https://www.facebook.com/sharer/sharer.php?u=https://kradene.ua/result/${amount}` },
    { name: 'Twitter/X', color: '#E7E9EA', href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}` },
  ];

  return (
    <>
      {showOG && <OGCard amount={amount} onClose={() => setShowOG(false)} />}
      <div className="mt-12 p-7 border border-white/7 rounded bg-[var(--bg2)]">
        <div className="font-mono text-[11px] text-white/45 tracking-[0.15em] uppercase mb-4">
          // Поділитися результатом
        </div>

        <button
          onClick={() => setShowOG(true)}
          className="flex items-center gap-2 font-mono text-xs px-4 py-2.5 mb-4 rounded w-full cursor-pointer transition-colors"
          style={{
            border: '1px solid rgba(220,38,38,0.3)',
            color: '#DC2626',
            background: 'rgba(220,38,38,0.06)',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(220,38,38,0.12)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(220,38,38,0.06)')}
        >
          <span className="text-sm">▣</span>
          <span>Превʼю OG-картки для соцмереж</span>
          <span className="ml-auto opacity-50">1200×630</span>
        </button>

        <div className="flex gap-2 flex-wrap">
          {platforms.map(p => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[13px] px-4 py-2.5 rounded no-underline transition-colors"
              style={{
                border: `1px solid ${p.color}44`,
                color: p.color,
                background: `${p.color}0d`,
              }}
              onMouseEnter={e => (e.currentTarget.style.background = `${p.color}22`)}
              onMouseLeave={e => (e.currentTarget.style.background = `${p.color}0d`)}
            >
              {p.name}
            </a>
          ))}
          <button
            onClick={copyLink}
            className="font-mono text-[13px] px-4 py-2.5 rounded border border-white/7 bg-transparent cursor-pointer transition-colors"
            style={{ color: copied ? '#059669' : 'rgba(240,237,232,0.45)' }}
          >
            {copied ? '✓ Скопійовано' : 'Копіювати посилання'}
          </button>
        </div>
      </div>
    </>
  );
}
