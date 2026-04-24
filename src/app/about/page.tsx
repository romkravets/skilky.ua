import type { Metadata } from 'next';
import Link from 'next/link';
import { EQUIVALENTS, CAT_LABELS, CAT_COLORS } from '@/lib/equivalents';
import { formatUAH } from '@/lib/formatters';

export const metadata: Metadata = {
  title: 'Методологія та джерела | kradene.ua',
  description: 'Як працює калькулятор вкрадених мільярдів: методологія розрахунків, джерела цін, правові застереження.',
};

function Section({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-16">
      <div className="font-mono text-[11px] tracking-[0.2em] text-red-600 uppercase mb-4">
        // {label}
      </div>
      {children}
    </section>
  );
}

function SourceRow({ name, url, desc }: { name: string; url: string; desc: string }) {
  return (
    <div className="flex gap-4 py-4 border-b border-white/7 last:border-0">
      <div className="flex-1">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-sm text-white/80 hover:text-white transition-colors underline"
        >
          {name}
        </a>
        <p className="text-sm text-white/40 mt-1 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

const catGroups = ['military', 'healthcare', 'education', 'housing', 'physical'] as const;

export default function AboutPage() {
  return (
    <main className="flex-1 px-10 py-16 max-w-[900px] mx-auto">

      {/* Hero */}
      <div className="font-mono text-[11px] tracking-[0.2em] text-red-600 uppercase mb-6" style={{ animation: 'fadeUp 0.5s ease both' }}>
        // Про проєкт
      </div>
      <h1
        className="font-display font-bold leading-tight mb-6"
        style={{ fontSize: 'clamp(32px, 5vw, 60px)', animation: 'fadeUp 0.5s 0.05s ease both' }}
      >
        Методологія<br />
        <span className="text-red-600">та джерела</span>
      </h1>
      <p className="text-white/60 text-[17px] max-w-[640px] mb-16 leading-[1.8] font-light" style={{ animation: 'fadeUp 0.5s 0.1s ease both' }}>
        Калькулятор вкрадених мільярдів перетворює абстрактні цифри корупційних
        скандалів на конкретні втрачені можливості. Кожна цифра має джерело.
        Жодних вигаданих чисел.
      </p>

      {/* What it is */}
      <Section id="about" label="Що це таке">
        <div className="bg-[var(--bg2)] border border-white/7 rounded p-7 space-y-4">
          <p className="text-white/70 leading-[1.8]">
            Це <strong className="text-white">некомерційний соціальний проєкт</strong>. Ніякої монетизації, реклами,
            підписок. Мета — зробити корупцію відчутною: перетворити мільярди на
            бронежилети, лікарні, школи та квартири.
          </p>
          <p className="text-white/70 leading-[1.8]">
            Користувач вводить суму — з новини, вироку суду, розслідування — і бачить,
            скільки конкретних речей можна було придбати або збудувати замість цього.
          </p>
          <p className="text-white/70 leading-[1.8]">
            Проєкт <strong className="text-white">не висуває звинувачень</strong> і не називає конкретних осіб без
            судового рішення. Усі кейси в базі — з офіційних джерел: НАБУ, САП,
            Bihus.Info, рішень судів.
          </p>
        </div>
      </Section>

      {/* Equivalents */}
      <Section id="equivalents" label="Еквіваленти та ціни">
        <p className="text-white/55 leading-[1.8] mb-8">
          Використовуємо медіанні ціни — не рекламні, не тендерні максимуми.
          Джерела: Prom.ua, Rozetka, офіційні тендери ProZorro, перевірені фонди.
          Ціни перевіряються щокварталу.
        </p>

        {catGroups.map(cat => {
          const items = EQUIVALENTS.filter(e => e.category === cat);
          const color = CAT_COLORS[cat];
          return (
            <div key={cat} className="mb-8">
              <div
                className="font-mono text-xs tracking-[0.12em] uppercase mb-3 pb-2 border-b"
                style={{ color, borderColor: `${color}30` }}
              >
                {CAT_LABELS[cat]}
              </div>
              <div className="space-y-0">
                {items.map(e => (
                  <div
                    key={e.id}
                    className="flex items-start justify-between gap-4 py-3 border-b border-white/5 last:border-0"
                  >
                    <div>
                      <div className="text-sm text-white/80">{e.name}</div>
                      <div className="text-xs text-white/35 mt-0.5">{e.desc}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-mono text-sm text-white/70">{formatUAH(e.price)}</div>
                      <div className="font-mono text-[10px] text-white/30 mt-0.5">{e.source}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </Section>

      {/* Counter methodology */}
      <Section id="counter" label="Лічильник — методологія">
        <div className="bg-[var(--bg2)] border border-white/7 rounded p-7 space-y-4">
          <p className="text-white/70 leading-[1.8]">
            Лічильник на сторінці{' '}
            <Link href="/counter" className="text-red-400 hover:text-red-300 transition-colors underline">
              /лічильник
            </Link>{' '}
            показує оцінку прямих корупційних втрат з початку поточного року.
          </p>
          <p className="text-white/70 leading-[1.8]">
            Базова оцінка: <strong className="text-white">~5% ВВП на рік</strong> —
            консервативна межа за Transparency International CPI та оцінками НАБУ.
            ВВП України 2023 року становить близько 7 трлн ₴ → 5% = 350 млрд ₴/рік.
          </p>
          <p className="text-white/70 leading-[1.8]">
            Лічильник <strong className="text-white">не претендує на точність</strong> — це
            ілюстрація масштабу. Реальна сума може бути більшою або меншою залежно
            від року та методології підрахунку.
          </p>
          <div className="border-t border-white/7 pt-4 font-mono text-xs text-white/35 space-y-1">
            <div>Рівняння: <span className="text-white/55">350 000 000 000 ÷ (365.25 × 24 × 3600) ≈ 11 092 ₴/сек</span></div>
            <div>Джерело: <a href="https://ti.org/cpi" target="_blank" rel="noopener noreferrer" className="text-white/45 hover:text-white/70 underline">ti.org/cpi</a>, <a href="https://nabu.gov.ua" target="_blank" rel="noopener noreferrer" className="text-white/45 hover:text-white/70 underline">nabu.gov.ua</a></div>
          </div>
        </div>
      </Section>

      {/* Sources */}
      <Section id="sources" label="Джерела даних">
        <SourceRow
          name="НАБУ — Національне антикорупційне бюро України"
          url="https://nabu.gov.ua"
          desc="Офіційна статистика розслідувань, суми збитків по справах, рішення судів."
        />
        <SourceRow
          name="САП — Спеціалізована антикорупційна прокуратура"
          url="https://sap.gov.ua"
          desc="Обвинувальні акти, вироки, публічні справи."
        />
        <SourceRow
          name="Bihus.Info"
          url="https://bihus.info"
          desc="Незалежні журналістські розслідування корупційних схем в Україні."
        />
        <SourceRow
          name="DoZorro — моніторинг публічних закупівель"
          url="https://dozorro.org"
          desc="Аналіз тендерів ProZorro, виявлення ризикових закупівель."
        />
        <SourceRow
          name="Transparency International — CPI"
          url="https://ti.org/cpi"
          desc="Індекс сприйняття корупції, оцінка рівня корупції в % ВВП."
        />
        <SourceRow
          name="МОЗ України"
          url="https://moz.gov.ua"
          desc="Офіційні нормативи вартості медичних послуг та обладнання."
        />
        <SourceRow
          name="МОН України"
          url="https://mon.gov.ua"
          desc="Нормативна вартість будівництва освітніх закладів, зарплатні дані."
        />
        <SourceRow
          name="ProZorro — реєстр державних тендерів"
          url="https://prozorro.gov.ua"
          desc="Ринкові ціни на техніку, медикаменти, будівництво через реальні тендери."
        />
        <SourceRow
          name="Фонд «Повернись живим»"
          url="https://savelife.in.ua"
          desc="Ціни на бронежилети, каски, тепловізори, дрони для ЗСУ."
        />
        <SourceRow
          name="ЛУН Нерухомість"
          url="https://lun.ua"
          desc="Медіанні ціни на квартири в Києві та обласних центрах."
        />
      </Section>

      {/* Legal */}
      <Section id="legal" label="Правові застереження">
        <div className="bg-[var(--bg3)] border border-white/7 rounded p-7 space-y-3">
          <p className="text-white/60 text-sm leading-[1.8]">
            Проєкт оперує <strong className="text-white/80">відкритими даними</strong> з офіційних
            джерел. Висновки щодо конкретних осіб — виключно в межах офіційних
            розслідувань НАБУ, САП та вироків судів.
          </p>
          <p className="text-white/60 text-sm leading-[1.8]">
            Калькулятор не збирає персональних даних відвідувачів, не використовує
            cookies для трекінгу, не має реєстрації або авторизації.
          </p>
          <p className="text-white/60 text-sm leading-[1.8]">
            Код проєкту — <strong className="text-white/80">відкритий, MIT License</strong>.
            Дані еквівалентів — CC-BY з атрибуцією.
            Контрибʼюції вітаються.
          </p>
        </div>
      </Section>

      {/* CTA */}
      <div className="border-t border-white/7 pt-8 flex gap-4 flex-wrap">
        <Link
          href="/"
          className="inline-block font-display text-base tracking-[0.1em] uppercase bg-red-600 text-white px-8 py-3.5 rounded-sm hover:opacity-85 transition-opacity no-underline"
        >
          Відкрити калькулятор
        </Link>
        <Link
          href="/counter"
          className="inline-block font-mono text-[13px] text-white/45 border border-white/7 px-6 py-3.5 rounded-sm hover:border-white/15 hover:text-white transition-all no-underline"
        >
          Лічильник
        </Link>
      </div>
    </main>
  );
}
