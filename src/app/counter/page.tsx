import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Лічильник | kradene.ua',
  description: 'Лічильник корупційних втрат — у розробці.',
};

export default function CounterPage() {
  return (
    <main className="flex-1 px-10 py-16 max-w-[900px] mx-auto flex flex-col justify-center min-h-[60vh]">
      <div className="font-mono text-[11px] tracking-[0.2em] text-red-600 uppercase mb-6">
        // Лічильник корупційних втрат
      </div>

      <h1
        className="font-display font-bold leading-tight mb-6"
        style={{ fontSize: 'clamp(32px, 5vw, 60px)' }}
      >
        У розробці
      </h1>

      <p className="text-white/55 text-[17px] max-w-[560px] leading-[1.8] font-light mb-4">
        Щоб показувати реальний лічильник, потрібне верифіковане джерело —
        конкретна річна сума підтверджених корупційних втрат з офіційного звіту.
      </p>

      <p className="text-white/40 text-sm font-mono max-w-[540px] leading-[1.7] mb-12">
        Кандидати: річні звіти НАБУ з сумами збитків по справах, дані САП,
        верифіковані дослідження Transparency International для України.
        Якщо знаєте надійне джерело —{' '}
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/55 hover:text-white/80 transition-colors underline"
        >
          відкрийте issue на GitHub
        </a>
        .
      </p>

      <Link
        href="/"
        className="inline-block font-display text-base tracking-[0.1em] uppercase bg-red-600 text-white px-8 py-3.5 rounded-sm hover:opacity-85 transition-opacity no-underline w-fit"
      >
        Відкрити калькулятор
      </Link>
    </main>
  );
}
