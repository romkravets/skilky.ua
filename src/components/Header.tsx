'use client';

import Link from 'next/link';
import { useState } from 'react';

const NAV = [
  { label: 'Калькулятор', href: '/' },
  { label: 'Лічильник', href: '/counter' },
  { label: 'Методологія', href: '/about' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="border-b border-white/7 px-5 md:px-10 h-14 flex items-center justify-between sticky top-0 bg-[rgba(12,11,11,0.92)] backdrop-blur-md z-50">
        <div className="flex items-center gap-3">
          <div
            className="w-2 h-2 rounded-full bg-red-600 shrink-0"
            style={{ boxShadow: '0 0 8px #DC2626', animation: 'pulse-red 2s infinite' }}
          />
          <span className="font-mono text-[13px] tracking-[0.12em] text-white/70 uppercase">
            KRADENE.UA
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-7">
          {NAV.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="font-sans text-[13px] text-white/45 hover:text-white/90 transition-colors tracking-wide no-underline"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile burger */}
        <button
          onClick={() => setOpen(o => !o)}
          className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 cursor-pointer bg-transparent border-none p-1"
          aria-label="Меню"
        >
          <span className="block h-[1.5px] bg-white/60 transition-all duration-200" style={{ width: open ? '100%' : '100%', transform: open ? 'translateY(6.5px) rotate(45deg)' : 'none' }} />
          <span className="block h-[1.5px] bg-white/60 transition-all duration-200" style={{ opacity: open ? 0 : 1 }} />
          <span className="block h-[1.5px] bg-white/60 transition-all duration-200" style={{ transform: open ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }} />
        </button>
      </header>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden fixed top-14 left-0 right-0 z-40 bg-[rgba(12,11,11,0.97)] backdrop-blur-md border-b border-white/7">
          {NAV.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="block px-5 py-4 font-mono text-[13px] text-white/60 hover:text-white hover:bg-white/5 transition-colors tracking-wide no-underline border-b border-white/5 last:border-0"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
