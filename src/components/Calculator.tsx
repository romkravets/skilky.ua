'use client';

import { useState, useRef } from 'react';
import { EQUIVALENTS, CAT_LABELS, CAT_COLORS } from '@/lib/equivalents';
import { CASES, CorruptionCase } from '@/data/cases';
import { formatUAH, formatUSD, parseInput } from '@/lib/formatters';
import EquivalentCard from './EquivalentCard';
import ShareRow from './ShareRow';

type Currency = 'UAH' | 'USD';

function CurrencyToggle({ currency, onChange }: { currency: Currency; onChange: (c: Currency) => void }) {
  return (
    <div className="flex gap-1 p-1 rounded bg-[var(--bg3)] border border-white/7 w-fit">
      {(['UAH', 'USD'] as Currency[]).map(c => (
        <button
          key={c}
          onClick={() => onChange(c)}
          className="font-mono text-[11px] tracking-[0.1em] px-3 py-1.5 rounded-sm transition-all cursor-pointer"
          style={{
            background: currency === c ? (c === 'USD' ? 'rgba(34,197,94,0.15)' : 'rgba(220,38,38,0.15)') : 'transparent',
            color: currency === c ? (c === 'USD' ? '#22c55e' : '#DC2626') : 'rgba(240,237,232,0.45)',
            border: currency === c ? `1px solid ${c === 'USD' ? 'rgba(34,197,94,0.35)' : 'rgba(220,38,38,0.35)'}` : '1px solid transparent',
          }}
        >
          {c === 'UAH' ? '₴ ГРН' : '$ USD'}
        </button>
      ))}
    </div>
  );
}

function HeroSection({
  inputRaw,
  setInputRaw,
  currency,
  setCurrency,
  usdRate,
  onCalculate,
}: {
  inputRaw: string;
  setInputRaw: (v: string) => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  usdRate: number;
  onCalculate: () => void;
}) {
  const [focused, setFocused] = useState(false);
  const rawNum = parseInput(inputRaw);

  function handleCurrencyChange(c: Currency) {
    if (c === currency) return;
    const n = parseInput(inputRaw);
    if (n > 0) {
      const converted = c === 'UAH'
        ? Math.round(n * usdRate)
        : Math.round((n / usdRate) * 100) / 100;
      setInputRaw(String(converted));
    }
    setCurrency(c);
  }

  const hint = rawNum > 0
    ? currency === 'USD'
      ? `≈ ${formatUAH(rawNum * usdRate)} · курс НБУ ${usdRate.toFixed(2)} ₴/$`
      : `→ ${formatUAH(rawNum)}`
    : null;

  return (
    <section className="px-10 pt-20 pb-16 max-w-[900px] mx-auto" style={{ animation: 'fadeUp 0.6s ease both' }}>
      <div className="font-mono text-[11px] tracking-[0.2em] text-red-600 uppercase mb-6">
        // Калькулятор вкрадених мільярдів
      </div>

      <h1
        className="font-display font-bold leading-[1.05] tracking-tight mb-4"
        style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}
      >
        Скільки це насправді<br />
        <span className="text-red-600">означає?</span>
      </h1>

      <p className="text-white/70 text-[17px] max-w-[560px] mb-12 leading-[1.7] font-light">
        Введіть суму вкрадених коштів — і дізнайтеся, що могло бути збудовано, куплено або врятовано.
      </p>

      <div className="relative max-w-[640px]">
        {/* Currency toggle above input */}
        <div className="mb-2">
          <CurrencyToggle currency={currency} onChange={handleCurrencyChange} />
        </div>

        <div
          className="relative rounded bg-[var(--bg2)] transition-all"
          style={{
            border: `1px solid ${focused ? '#DC2626' : 'rgba(255,255,255,0.15)'}`,
            boxShadow: focused ? '0 0 0 3px rgba(220,38,38,0.15)' : 'none',
          }}
        >
          <span className="absolute left-5 top-1/2 -translate-y-1/2 font-mono text-[28px] text-white/45 pointer-events-none">
            {currency === 'UAH' ? '₴' : '$'}
          </span>
          <input
            type="text"
            inputMode="numeric"
            value={inputRaw}
            onChange={e => setInputRaw(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={e => e.key === 'Enter' && onCalculate()}
            placeholder={currency === 'UAH' ? '500 000 000' : '12 000 000'}
            className="w-full bg-transparent border-none outline-none font-mono text-[28px] text-white tracking-[0.04em]"
            style={{ padding: '22px 80px 22px 52px' }}
          />
          <span
            className="absolute right-5 top-1/2 -translate-y-1/2 font-mono text-xs tracking-[0.1em]"
            style={{ color: currency === 'USD' ? '#22c55e' : 'rgba(240,237,232,0.45)' }}
          >
            {currency === 'UAH' ? 'ГРН' : 'USD'}
          </span>
        </div>

        {hint && (
          <div
            className="absolute top-[calc(100%+8px)] left-0 font-mono text-xs text-white/45 tracking-[0.06em]"
            style={{ animation: 'fadeUp 0.3s ease' }}
          >
            {hint}
          </div>
        )}
      </div>

      <div className="flex gap-3 mt-10 flex-wrap">
        <button
          onClick={onCalculate}
          className="font-display text-base tracking-[0.1em] uppercase bg-red-600 text-white border-none px-9 py-3.5 cursor-pointer rounded-sm transition-opacity hover:opacity-85"
        >
          Порахувати
        </button>
        <button
          onClick={() => setInputRaw('')}
          className="font-mono text-[13px] bg-transparent text-white/45 border border-white/7 px-6 py-3.5 cursor-pointer rounded-sm transition-all hover:border-white/15 hover:text-white"
        >
          Очистити
        </button>
      </div>
    </section>
  );
}

function CaseCard({ c, onSelect }: { c: CorruptionCase; onSelect: (c: CorruptionCase) => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={() => onSelect(c)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="rounded text-left cursor-pointer transition-all flex flex-col gap-2 p-5"
      style={{
        background: hov ? 'var(--bg3)' : 'var(--bg2)',
        border: `1px solid ${hov ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.07)'}`,
        color: 'var(--text)',
      }}
    >
      <div className="font-mono text-[11px] text-red-600 tracking-[0.12em] uppercase">{c.year}</div>
      <div className="font-display text-lg font-semibold leading-tight text-white">{c.title}</div>
      <div
        className="font-mono text-xl tracking-[0.03em] transition-colors"
        style={{ color: hov ? '#DC2626' : 'rgba(240,237,232,0.7)' }}
      >
        {formatUAH(c.amount)}
      </div>
      <div className="text-xs text-white/45 leading-relaxed">{c.desc}</div>
      <div
        className="font-mono text-[11px] transition-colors mt-1"
        style={{ color: hov ? 'rgba(240,237,232,0.7)' : 'transparent' }}
      >
        → Порахувати
      </div>
    </button>
  );
}

function ResultSection({
  amount,
  inputCurrency,
  inputRaw,
  activeFilter,
  setActiveFilter,
}: {
  amount: number;
  inputCurrency: Currency;
  inputRaw: string;
  activeFilter: string;
  setActiveFilter: (f: string) => void;
}) {
  const categories = ['all', 'military', 'healthcare', 'education', 'housing', 'physical'];
  const catLabel: Record<string, string> = { all: 'Всі', ...CAT_LABELS };

  const filtered = EQUIVALENTS.filter(
    e => (activeFilter === 'all' || e.category === activeFilter) && Math.floor(amount / e.price) >= 1
  );

  return (
    <section className="px-10 pb-20 max-w-[900px] mx-auto">
      <div
        className="border-t border-b border-white/7 py-8 mb-9 flex items-baseline gap-5 flex-wrap"
        style={{ animation: 'countUp 0.5s ease both' }}
      >
        <div
          className="font-display font-bold leading-none tracking-tight text-white"
          style={{ fontSize: 'clamp(40px, 7vw, 80px)' }}
        >
          {inputCurrency === 'USD'
            ? formatUSD(parseInput(inputRaw))
            : formatUAH(amount)}
        </div>
        {inputCurrency === 'USD' && (
          <div className="font-mono text-[15px] text-white/45 tracking-wide">
            ≈ {formatUAH(amount)}
          </div>
        )}
        <div className="font-mono text-[13px] text-white/45 tracking-[0.08em]">
          = ось що можна було б мати
        </div>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 mb-7 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className="font-mono text-xs tracking-[0.08em] uppercase py-2 px-3.5 rounded-sm cursor-pointer transition-all"
            style={{
              border: `1px solid ${activeFilter === cat ? (cat === 'all' ? 'rgba(255,255,255,0.15)' : CAT_COLORS[cat]) : 'rgba(255,255,255,0.07)'}`,
              background: activeFilter === cat ? (cat === 'all' ? 'var(--bg3)' : `${CAT_COLORS[cat]}18`) : 'transparent',
              color: activeFilter === cat ? (cat === 'all' ? 'var(--text)' : CAT_COLORS[cat]) : 'rgba(240,237,232,0.45)',
            }}
          >
            {catLabel[cat]}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="font-mono text-sm text-white/45 py-10 text-center">
          Сума занадто мала для цієї категорії
        </div>
      ) : (
        <div className="grid gap-3.5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
          {filtered.map((eq, i) => (
            <EquivalentCard key={eq.id} eq={eq} amount={amount} delay={i * 60} />
          ))}
        </div>
      )}

      <ShareRow amount={amount} />
    </section>
  );
}

export default function Calculator({ usdRate }: { usdRate: number }) {
  const [inputRaw, setInputRaw] = useState('');
  const [currency, setCurrency] = useState<Currency>('UAH');
  const [amount, setAmount] = useState(0);
  const [submittedCurrency, setSubmittedCurrency] = useState<Currency>('UAH');
  const [submittedRaw, setSubmittedRaw] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const resultsRef = useRef<HTMLDivElement>(null);

  function toUAH(n: number, curr: Currency) {
    return curr === 'USD' ? Math.round(n * usdRate) : n;
  }

  function calculate() {
    const n = parseInput(inputRaw);
    if (n > 0) {
      setAmount(toUAH(n, currency));
      setSubmittedCurrency(currency);
      setSubmittedRaw(inputRaw);
      setShowResults(true);
      setActiveFilter('all');
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  }

  function selectCase(c: CorruptionCase) {
    setCurrency('UAH');
    setInputRaw(String(c.amount));
    setAmount(c.amount);
    setSubmittedCurrency('UAH');
    setSubmittedRaw(String(c.amount));
    setShowResults(true);
    setActiveFilter('all');
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
  }

  return (
    <main className="flex-1">
      <HeroSection
        inputRaw={inputRaw}
        setInputRaw={setInputRaw}
        currency={currency}
        setCurrency={setCurrency}
        usdRate={usdRate}
        onCalculate={calculate}
      />

      {/* Cases */}
      <section className="px-10 pb-16 max-w-[900px] mx-auto" style={{ animation: 'fadeUp 0.7s 0.1s ease both' }}>
        <div className="font-mono text-[11px] tracking-[0.2em] text-white/45 uppercase mb-5">
          // Гучні кейси — натисніть, щоб порахувати
        </div>
        <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
          {CASES.map(c => <CaseCard key={c.id} c={c} onSelect={selectCase} />)}
        </div>
      </section>

      {showResults && (
        <div ref={resultsRef}>
          <ResultSection
          amount={amount}
          inputCurrency={submittedCurrency}
          inputRaw={submittedRaw}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
        </div>
      )}
    </main>
  );
}
