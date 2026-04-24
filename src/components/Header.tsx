'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b border-white/7 px-10 h-14 flex items-center justify-between sticky top-0 bg-[rgba(12,11,11,0.92)] backdrop-blur-md z-50">
      <div className="flex items-center gap-3">
        <div
          className="w-2 h-2 rounded-full bg-red-600"
          style={{ boxShadow: '0 0 8px #DC2626', animation: 'pulse-red 2s infinite' }}
        />
        <span className="font-mono text-[13px] tracking-[0.12em] text-white/70 uppercase">
          KRADENE.UA
        </span>
      </div>
      <nav className="flex gap-7">
        {[
          { label: 'Калькулятор', href: '/' },
          { label: 'Лічильник', href: '/counter' },
          { label: 'Методологія', href: '/about' },
        ].map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className="font-sans text-[13px] text-white/45 hover:text-white/90 transition-colors tracking-wide no-underline"
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
