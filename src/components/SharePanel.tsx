'use client';

import { useState } from 'react';
import { BASE_URL } from '@/lib/config';
import { formatUAH, formatCount } from '@/lib/formatters';
import OGCard from './OGCard';

const TelegramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.19 13.9l-2.965-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.963.659z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const LinkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>
);

export default function SharePanel({ amount }: { amount: number }) {
  const [copied, setCopied] = useState(false);
  const [showOG, setShowOG] = useState(false);

  const pageUrl = `${BASE_URL}/result/${amount}`;
  const uah = formatUAH(amount);
  const armor = formatCount(Math.floor(amount / 15000));
  const shareText = `${uah} вкрадених коштів — це ${armor} бронежилетів для ЗСУ. Порахуй сам: ${pageUrl}`;

  function copy() {
    navigator.clipboard.writeText(pageUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  const buttons = [
    {
      label: 'Telegram',
      icon: <TelegramIcon />,
      bg: 'rgba(34,158,217,0.12)',
      border: 'rgba(34,158,217,0.35)',
      color: '#229ED9',
      href: `https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(shareText)}`,
    },
    {
      label: 'Twitter / X',
      icon: <TwitterIcon />,
      bg: 'rgba(231,233,234,0.08)',
      border: 'rgba(231,233,234,0.25)',
      color: '#E7E9EA',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
    },
    {
      label: 'Facebook',
      icon: <FacebookIcon />,
      bg: 'rgba(24,119,242,0.12)',
      border: 'rgba(24,119,242,0.35)',
      color: '#1877F2',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
    },
  ];

  return (
    <>
      {showOG && <OGCard amount={amount} onClose={() => setShowOG(false)} />}

      <div className="px-5 md:px-10 pt-10 pb-6 max-w-[900px] mx-auto w-full" style={{ animation: 'fadeUp 0.4s ease both' }}>
        <div className="rounded border border-red-600/25 bg-red-600/5 p-6 md:p-8">

          <div className="font-mono text-[11px] tracking-[0.2em] text-red-600 uppercase mb-3">
            // Поділитися результатом
          </div>

          <div className="font-display font-bold text-white mb-1" style={{ fontSize: 'clamp(28px, 5vw, 52px)', lineHeight: 1.05 }}>
            {uah}
          </div>
          <div className="font-mono text-[13px] text-white/40 mb-6 tracking-wide">
            = {armor} бронежилетів · {pageUrl.replace('https://', '')}
          </div>

          <div className="flex gap-2 flex-wrap">
            {buttons.map(b => (
              <a
                key={b.label}
                href={b.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-mono text-[13px] px-4 py-3 rounded no-underline transition-all cursor-pointer"
                style={{ background: b.bg, border: `1px solid ${b.border}`, color: b.color }}
                onMouseEnter={e => (e.currentTarget.style.background = b.bg.replace('0.12', '0.2').replace('0.08', '0.14'))}
                onMouseLeave={e => (e.currentTarget.style.background = b.bg)}
              >
                {b.icon}
                <span>{b.label}</span>
              </a>
            ))}

            <button
              onClick={copy}
              className="flex items-center gap-2 font-mono text-[13px] px-4 py-3 rounded border cursor-pointer transition-all"
              style={{
                background: copied ? 'rgba(5,150,105,0.12)' : 'transparent',
                border: copied ? '1px solid rgba(5,150,105,0.35)' : '1px solid rgba(255,255,255,0.12)',
                color: copied ? '#059669' : 'rgba(240,237,232,0.5)',
              }}
            >
              {copied ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
              ) : (
                <LinkIcon />
              )}
              <span>{copied ? 'Скопійовано!' : 'Копіювати посилання'}</span>
            </button>

            <button
              onClick={() => setShowOG(true)}
              className="flex items-center gap-2 font-mono text-[13px] px-4 py-3 rounded border border-white/7 text-white/35 bg-transparent cursor-pointer hover:border-white/15 hover:text-white/60 transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
              <span>OG-картка</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
