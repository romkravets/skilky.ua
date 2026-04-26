"use client";

import { useEffect, useState, useRef } from "react";
import { formatCount } from "@/lib/formatters";
import { SVGS } from "@/components/Svgs";

// ─── Methodology ───────────────────────────────────────────────────────────────
// Estimate: Ukraine loses ~3–5 % of GDP annually to corruption (IMF / World Bank
// approach to systemic corruption costs in transition economies).
// Average nominal GDP 1991–2026: ~$100 bn/year.
// Conservative figure used: $4 bn/year average (below mid-range of $5 bn).
// Sources:
//   • IMF Fiscal Affairs Department, "Corruption: Costs and Mitigating Strategies" (2016)
//   • World Bank, "Governance & Anti-Corruption" for ECA region
//   • НАБУ Річний звіт 2023 — підтверджені збитки лише по справах НАБУ перевищують 94 млрд ₴
//   • Transparency International Ukraine — CPI 2024 score: 36/100
// Note: figures are ESTIMATES. Exact total is impossible to verify; counter is
// intentionally labelled as a model/estimate with each step sourced.
// ────────────────────────────────────────────────────────────────────────────────

const INDEPENDENCE = new Date("1991-08-24T00:00:00.000Z").getTime();

// Annual loss, USD (conservative)
const ANNUAL_USD = 4_000_000_000;
// Per-millisecond rate
const PER_MS = ANNUAL_USD / (365.25 * 24 * 60 * 60 * 1000);

// ≈ average UAH/USD since 1991 weighted toward recent years
// We keep it fixed so the counter stays stable without live API calls
const UAH_PER_USD = 41;

function calcTotal(now: number): number {
  const ms = now - INDEPENDENCE;
  return Math.max(0, ms * PER_MS);
}

function fmt(n: number, decimals = 0): string {
  return new Intl.NumberFormat("uk-UA", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);
}

// ─── War & budget constants ─────────────────────────────────────────────────────
// Full-scale Russian invasion: Feb 24, 2022 05:00 UTC
const WAR_START = new Date("2022-02-24T05:00:00.000Z").getTime();
// Annual economic cost: GDP loss + reconstruction financing burden
// Sources: KSE War Damage Report 2024; World Bank Ukraine Reconstruction 2023
const WAR_ANNUAL_USD = 55_000_000_000;
const WAR_PER_MS = WAR_ANNUAL_USD / (365.25 * 24 * 60 * 60 * 1000);

// Ukraine state budget revenues 2024: ~₴1,860B ≈ $45.4B (Мінфін України)
const BUDGET_ANNUAL_USD = 45_400_000_000;
const BUDGET_PER_SEC_UAH = Math.round(
  (BUDGET_ANNUAL_USD / (365.25 * 24 * 3600)) * UAH_PER_USD,
);

function calcWar(now: number): number {
  return Math.max(0, (now - WAR_START) * WAR_PER_MS);
}

// ─── War damage key facts (sourced) ──────────────────────────────────────────
const WAR_STATS = [
  {
    label: "Прямих збитків інфраструктури",
    value: "$152+ млрд",
    sub: "KSE, жовтень 2024",
  },
  {
    label: "Потрібно для відновлення",
    value: "$486 млрд",
    sub: "World Bank / KSE, 2023",
  },
  { label: "Переміщених + емігрованих", value: "~6 млн", sub: "ООН, 2024" },
  { label: "Падіння ВВП у 2022", value: "−29%", sub: "зі $200 до $160 млрд" },
  {
    label: "Частка бюджету на оборону",
    value: "~55%",
    sub: "2024 рік, >$35 млрд",
  },
  {
    label: "Втрата робочих місць",
    value: "~3.4 млн",
    sub: "МОП / Мінекономіки",
  },
];

// ─── Development gap (what Ukraine could be without Russia's war) ─────────────
// Baseline: $200B GDP 2021 → 3.5%/yr growth → $238B by 2026
const GDP_ACTUAL_B = 195;
const GDP_POTENTIAL_B = 238;

// What $486B reconstruction cost equals in concrete development
const RECONSTRUCTION_BUILDS = [
  { label: "км автобанів", count: "324 000", svgKey: "road" },
  { label: "сучасних шкіл", count: "60 750", svgKey: "school" },
  { label: "регіональних лікарень", count: "12 150", svgKey: "hospital_bldg" },
  { label: "культурних центрів", count: "97 200", svgKey: "museum" },
];

// ─── What could have been built ────────────────────────────────────────────────
const BUILDS = [
  {
    id: "road",
    label: "км автомагістралей",
    subLabel: "повна заміна покриття",
    costUSD: 1_500_000,
    svgKey: "road",
    source: "Укравтодор / Держбуд | ~$1.5 млн/км",
    color: "#F59E0B",
  },
  {
    id: "school",
    label: "сучасних шкіл",
    subLabel: "500 учнів, «під ключ»",
    costUSD: 8_000_000,
    svgKey: "school",
    source: "Держбуд норматив | ~$8 млн",
    color: "#2563EB",
  },
  {
    id: "hospital",
    label: "регіональних лікарень",
    subLabel: "200 ліжок, повне оснащення",
    costUSD: 40_000_000,
    svgKey: "hospital_bldg",
    source: "МОЗ тендери | ~$40 млн",
    color: "#059669",
  },
  {
    id: "museum",
    label: "культурних центрів / музеїв",
    subLabel: "регіональний рівень",
    costUSD: 5_000_000,
    svgKey: "museum",
    source: "Мінкультури / проєкти | ~$5 млн",
    color: "#7C3AED",
  },
  {
    id: "jobs",
    label: "робочих місць на рік",
    subLabel: "середня зарплата $7 200/рік",
    costUSD: 7_200,
    svgKey: "jobs",
    source: "Мінекономіки | ~$7 200/рік",
    color: "#DC2626",
  },
  {
    id: "startup",
    label: "tech-стартапів",
    subLabel: "посівне фінансування ($200 K)",
    costUSD: 200_000,
    svgKey: "rocket",
    source: "UNIT.City / AVentures | ~$200 K посів",
    color: "#0EA5E9",
  },
  {
    id: "rail",
    label: "км залізниці",
    subLabel: "нові колії + електрифікація",
    costUSD: 3_000_000,
    svgKey: "rail",
    source: "Укрзалізниця / ЄБРР | ~$3 млн/км",
    color: "#6B7280",
  },
  {
    id: "apartment",
    label: "квартир",
    subLabel: "50 м², регіональний центр",
    costUSD: 36_000,
    svgKey: "apt_region",
    source: "ЛУН / OLX нерухомість | ~1.5 млн ₴",
    color: "#F59E0B",
  },
];

// ─── Era timeline ───────────────────────────────────────────────────────────────
const ERAS = [
  {
    period: "1991–1994",
    title: "Прихватизація",
    desc: "Масова незаконна приватизація держпідприємств по формальним цінам, тіньові схеми конвертації «радянських» активів.",
    amountLabel: "~$15–25 млрд",
  },
  {
    period: "1994–2004",
    title: "Олігархізація",
    desc: "Концентрація металургії, енергетики, медіа в руках наближених до влади. Бюджетні субсидії — під «своїх».",
    amountLabel: "~$30–50 млрд",
  },
  {
    period: "2004–2014",
    title: "Регіонали & сім'я",
    desc: "«Родина» Януковича, «Роттердам+», закупівлі ПДВ через фіктивні компанії. За 4 роки — ~$37 млрд готівкою.",
    amountLabel: "~$40–70 млрд",
  },
  {
    period: "2014–2019",
    title: "Реформи vs корупція",
    desc: "Поява НАБУ, НАЗК, ProZorro. Але системна корупція збереглась у судах, силових структурах, Укроборонпромі.",
    amountLabel: "~$20–30 млрд",
  },
  {
    period: "2019–2026",
    title: "Воєнний стан",
    desc: "Зернові та медичні скандали, Укроборонпром, будівельні тендери на відновлення. Збитки по справах НАБУ — 94+ млрд ₴ (2023).",
    amountLabel: "~$15–25 млрд",
  },
];

// ─── Build card (matches EquivalentCard style on home page) ─────────────────
interface Build {
  id: string;
  label: string;
  subLabel: string;
  costUSD: number;
  svgKey: string;
  source: string;
  color: string;
}

function BuildCard({
  build: b,
  count,
  delay,
}: {
  build: Build;
  count: number;
  delay: number;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => setExpanded((e) => !e)}
      className="bg-[var(--bg2)] border border-white/7 rounded cursor-pointer relative overflow-hidden transition-colors hover:border-white/14"
      style={{
        padding: "20px 20px 16px",
        animation: `cardReveal 0.5s ${delay}ms ease both`,
      }}
    >
      {/* Category stripe */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: b.color }}
      />

      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="w-11 h-11 shrink-0">
          {(SVGS[b.svgKey] ?? SVGS["armor"])(b.color)}
        </div>
        <span
          className="font-mono text-[9px] tracking-[0.14em] uppercase px-2 py-1 rounded-sm"
          style={{
            color: b.color,
            background: `${b.color}14`,
            border: `1px solid ${b.color}30`,
          }}
        >
          {b.subLabel}
        </span>
      </div>

      {/* Count */}
      <div
        className="font-mono font-semibold leading-none tracking-tight"
        style={{ fontSize: "clamp(28px, 3.5vw, 44px)", color: "var(--text)" }}
      >
        {count > 0 ? formatCount(count) : "—"}
      </div>
      <div className="font-display text-base text-white/70 mt-1 mb-3">
        {b.label}
      </div>

      {expanded && (
        <div style={{ animation: "fadeUp 0.2s ease both" }}>
          <div className="text-xs text-white/45 leading-relaxed mb-2 border-t border-white/7 pt-3">
            Розрахунок: ${b.costUSD.toLocaleString("en-US")} за одиницю
          </div>
          <div className="font-mono text-[10px] text-white/45 tracking-wide">
            {b.source}
          </div>
        </div>
      )}

      <div className="font-mono text-[10px] text-white/45 mt-2 opacity-50 tracking-wide">
        {expanded ? "▲ згорнути" : "▼ деталі"}
      </div>
    </div>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────────
export default function HistoricalCounter() {
  // Start at 0 for SSR to produce stable HTML. On the client we start the
  // live counter in an effect which uses Date.now() (client-only) so markup
  // doesn't differ between server and client during hydration.
  const [total, setTotal] = useState<number>(0);
  const [warTotal, setWarTotal] = useState<number>(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    function tick() {
      const now = Date.now();
      setTotal(calcTotal(now));
      setWarTotal(calcWar(now));
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const uah = total * UAH_PER_USD;
  const perSecUSD = ANNUAL_USD / (365.25 * 24 * 3600);
  const perSecUAH = perSecUSD * UAH_PER_USD;
  const warPerSecUSD = WAR_ANNUAL_USD / (365.25 * 24 * 3600);
  const warPerSecUAH = warPerSecUSD * UAH_PER_USD;

  return (
    <div className={`transition-opacity duration-700 opacity-100`}>
      {/* ── Label */}
      <div className="font-mono text-[11px] tracking-[0.2em] text-red-600 uppercase mb-6">
        {"// Корупційні втрати — з 24 серпня 1991"}
      </div>

      {/* ── Main counter: UAH */}
      <div className="mb-2">
        <div className="font-mono text-[11px] text-white/30 tracking-[0.15em] uppercase mb-1">
          Оціночні втрати — гривня (UAH × {UAH_PER_USD})
        </div>
        <div
          className="font-display font-bold text-red-500 leading-none tabular-nums"
          style={{
            fontSize: "clamp(28px, 5.5vw, 64px)",
            letterSpacing: "-0.02em",
          }}
        >
          ₴ {fmt(uah)}
        </div>
      </div>

      {/* ── Sub: USD */}
      <div className="font-mono text-[13px] text-white/45 mb-1">
        ≈ ${fmt(total)} USD
      </div>

      {/* ── Rate badge */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <span className="inline-block font-mono text-[11px] px-2 py-1 rounded-sm bg-red-950/50 border border-red-900/50 text-red-400">
          ₴ {fmt(perSecUAH, 0)} / сек
        </span>
        <span className="inline-block font-mono text-[11px] px-2 py-1 rounded-sm bg-white/5 border border-white/10 text-white/40">
          ${fmt(perSecUSD, 0)} / сек · оцінка $4 млрд/рік
        </span>
      </div>

      {/* ── Income vs Corruption comparison */}
      <div className="rounded-sm border border-white/7 overflow-hidden mb-10">
        <div className="grid grid-cols-2 divide-x divide-white/7">
          <div className="bg-[var(--bg2)] p-4">
            <div className="font-mono text-[9px] tracking-[0.15em] text-green-500/70 uppercase mb-2">
              {"// Держбюджет збирає / сек"}
            </div>
            <div
              className="font-mono font-semibold text-green-400 leading-none tabular-nums"
              style={{ fontSize: "clamp(16px, 2.2vw, 24px)" }}
            >
              ₴ {fmt(BUDGET_PER_SEC_UAH)}
            </div>
            <div className="font-mono text-[10px] text-white/25 mt-1">
              ~$45.4 млрд/рік · Мінфін 2024
            </div>
          </div>
          <div className="bg-[var(--bg2)] p-4">
            <div className="font-mono text-[9px] tracking-[0.15em] text-red-500/70 uppercase mb-2">
              {"// Корупція краде / сек"}
            </div>
            <div
              className="font-mono font-semibold text-red-400 leading-none tabular-nums"
              style={{ fontSize: "clamp(16px, 2.2vw, 24px)" }}
            >
              ₴ {fmt(perSecUAH, 0)}
            </div>
            <div className="font-mono text-[10px] text-white/25 mt-1">
              ~$4 млрд/рік · оцінка МВФ
            </div>
          </div>
        </div>
        <div className="bg-[var(--bg3)] px-4 py-2.5 border-t border-white/7">
          <div className="font-mono text-[10px] text-white/40 text-center">
            Корупція поглинає ~
            <span className="text-red-400 font-semibold"> 8.8% </span>
            держбюджету — кожна 11-а гривня, зібрана державою, зникає «вліво»
          </div>
        </div>
      </div>

      {/* ── What could have been built */}
      <div className="mb-12">
        <div className="font-mono text-[11px] tracking-[0.2em] text-white/30 uppercase mb-5">
          Що могло бути збудовано
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {BUILDS.map((b, i) => {
            const count = Math.floor(total / b.costUSD);
            return (
              <BuildCard key={b.id} build={b} count={count} delay={i * 60} />
            );
          })}
        </div>
      </div>

      {/* ── War damage counter */}
      <div className="mb-12">
        <div className="font-mono text-[11px] tracking-[0.2em] text-orange-500/80 uppercase mb-1">
          {"// Вартість Російської агресії"}
        </div>
        <div className="font-mono text-[10px] text-white/30 mb-6">
          з 24 лютого 2022 — повномасштабне вторгнення
        </div>

        <div className="mb-2">
          <div className="font-mono text-[11px] text-white/30 tracking-[0.15em] uppercase mb-1">
            Накопичені економічні втрати (оцінка)
          </div>
          <div
            className="font-display font-bold text-orange-500 leading-none tabular-nums"
            style={{
              fontSize: "clamp(26px, 5vw, 58px)",
              letterSpacing: "-0.02em",
            }}
          >
            $ {fmt(warTotal)}
          </div>
        </div>
        <div className="font-mono text-[13px] text-white/45 mb-1">
          ≈ ₴ {fmt(warTotal * UAH_PER_USD)}
        </div>
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <span className="inline-block font-mono text-[11px] px-2 py-1 rounded-sm bg-orange-950/50 border border-orange-900/50 text-orange-400">
            ₴ {fmt(warPerSecUAH, 0)} / сек
          </span>
          <span className="inline-block font-mono text-[11px] px-2 py-1 rounded-sm bg-white/5 border border-white/10 text-white/40">
            ~$55 млрд/рік · KSE / World Bank
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {WAR_STATS.map((s, i) => (
            <div
              key={i}
              className="p-3 rounded-sm border border-white/7 bg-[var(--bg2)]"
            >
              <div className="font-display font-bold text-orange-400 text-[18px] leading-tight mb-1">
                {s.value}
              </div>
              <div className="font-mono text-[10px] text-white/50 leading-[1.5]">
                {s.label}
              </div>
              <div className="font-mono text-[9px] text-white/25 mt-1">
                {s.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Development without war */}
      <div className="mb-12">
        <div className="font-mono text-[11px] tracking-[0.2em] text-white/30 uppercase mb-1">
          {"// Як би ми жили без війни"}
        </div>
        <div className="font-mono text-[10px] text-white/25 mb-6">
          Порівняння фактичного розвитку з потенційним без Російської агресії
        </div>

        {/* GDP comparison bar */}
        <div className="rounded-sm border border-white/7 bg-[var(--bg2)] p-5 mb-6">
          <div className="font-mono text-[10px] text-white/30 uppercase tracking-widest mb-4">
            ВВП України 2026 — факт vs потенціал
          </div>
          <div className="mb-4">
            <div className="flex justify-between items-baseline mb-1.5">
              <span className="font-mono text-[11px] text-white/50">
                Фактично (з війною)
              </span>
              <span className="font-mono text-[13px] font-semibold text-white/70">
                ${GDP_ACTUAL_B} млрд
              </span>
            </div>
            <div className="h-3 rounded-full bg-white/8 overflow-hidden">
              <div
                className="h-full rounded-full bg-red-600/70"
                style={{
                  width: `${Math.round((GDP_ACTUAL_B / GDP_POTENTIAL_B) * 100)}%`,
                }}
              />
            </div>
          </div>
          <div className="mb-4">
            <div className="flex justify-between items-baseline mb-1.5">
              <span className="font-mono text-[11px] text-white/50">
                Потенційно (без війни, 3.5%/рік від 2021)
              </span>
              <span className="font-mono text-[13px] font-semibold text-green-400/80">
                ${GDP_POTENTIAL_B} млрд
              </span>
            </div>
            <div className="h-3 rounded-full bg-white/8 overflow-hidden">
              <div className="h-full rounded-full bg-green-600/60 w-full" />
            </div>
          </div>
          <div className="border-t border-white/7 pt-3 space-y-1.5">
            <div className="font-mono text-[11px] text-white/50">
              Різниця:{" "}
              <span className="text-red-400 font-semibold">
                ${GDP_POTENTIAL_B - GDP_ACTUAL_B} млрд/рік
              </span>{" "}
              — Україна на 18% нижче свого потенціалу
            </div>
            <div className="font-mono text-[11px] text-white/50">
              Щоб наздогнати — потрібно{" "}
              <span className="text-white/70 font-semibold">~6 років</span>{" "}
              зростання по 5%/рік
            </div>
            <div className="font-mono text-[11px] text-white/50">
              Кумулятивні втрати 2022–2026:{" "}
              <span className="text-orange-400 font-semibold">~$213 млрд</span>
            </div>
          </div>
        </div>

        {/* What $486B reconstruction cost = in development */}
        <div className="font-mono text-[10px] text-white/30 uppercase tracking-widest mb-3">
          $486 млрд (вартість відновлення) могли дати
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {RECONSTRUCTION_BUILDS.map((b, i) => (
            <div
              key={i}
              className="p-3 rounded-sm border border-white/7 bg-[var(--bg2)] flex flex-col items-center text-center"
            >
              <div className="mb-2 opacity-70">
                {SVGS[b.svgKey as keyof typeof SVGS]?.("#94a3b8") ?? null}
              </div>
              <div className="font-display font-bold text-white text-[15px]">
                {b.count}
              </div>
              <div className="font-mono text-[10px] text-white/40 mt-0.5">
                {b.label}
              </div>
            </div>
          ))}
        </div>

        {/* Development indicator cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(
            [
              {
                title: "Відставання у розвитку",
                value: "~10 років",
                desc: "Стільки часу займе повне відновлення до довоєнного потенціалу за оцінками МВФ та KSE",
                accent: "#DC2626",
              },
              {
                title: "ВВП на особу",
                value: "−22%",
                desc: "Фактичний ВВП/особу ~$5 200 проти потенційного ~$6 350 без агресії",
                accent: "#F59E0B",
              },
              {
                title: "Іноземні інвестиції",
                value: "у 5–7 разів менше",
                desc: "ПІІ впали з ~$7–8 млрд/рік (2021) до ~$1.5 млрд черезризики безпеки",
                accent: "#6B7280",
              },
            ] as const
          ).map((c, i) => (
            <div
              key={i}
              className="p-4 rounded-sm border bg-[var(--bg2)]"
              style={{ borderColor: `${c.accent}30` }}
            >
              <div
                className="font-mono text-[9px] tracking-widest uppercase mb-2"
                style={{ color: c.accent }}
              >
                {c.title}
              </div>
              <div className="font-display font-bold text-white text-[20px] mb-2">
                {c.value}
              </div>
              <div className="text-white/40 text-[11px] leading-[1.6]">
                {c.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Era timeline */}
      <div className="mb-10">
        <div className="font-mono text-[11px] tracking-[0.2em] text-white/30 uppercase mb-5">
          {"// Ключові корупційні епохи України"}
        </div>
        <div className="flex flex-col gap-0">
          {ERAS.map((era, i) => (
            <div
              key={i}
              className="flex gap-4 py-4 border-b border-white/6 last:border-b-0"
            >
              <div className="shrink-0 w-[90px]">
                <div className="font-mono text-[10px] text-white/35">
                  {era.period}
                </div>
                <div className="font-mono text-[10px] text-red-500/70 mt-1 font-medium">
                  {era.amountLabel}
                </div>
              </div>
              <div className="min-w-0">
                <div className="font-display font-semibold text-white text-[13px] mb-1">
                  {era.title}
                </div>
                <div className="text-white/45 text-[12px] leading-[1.6] font-light">
                  {era.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Methodology */}
      <div className="border border-white/8 rounded-sm p-5 bg-[var(--bg2)] mb-8">
        <div className="font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase mb-3">
          {"// Методологія та джерела"}
        </div>
        <div className="text-white/45 text-[12px] leading-[1.75] font-light space-y-2">
          <p>
            Лічильник є{" "}
            <strong className="text-white/60">оціночною моделлю</strong>,
            побудованою на консервативному припущенні: корупційні втрати
            становлять ~4% ВВП щорічно. За даними МВФ та Світового банку для
            перехідних економік Східної Європи — діапазон 2–7% ВВП. Ми
            використовуємо нижній кінець: $4 млрд/рік при середньому ВВП ~$100
            млрд.
          </p>
          <p>
            Це значно нижче часто цитованої оцінки Chatham House ($37 млрд/рік),
            яка включає капіталовтечу та тіньову економіку, і концентрується
            лише на прямих корупційних збитках.
          </p>
          <p>
            Підтверджені збитки лише по справах НАБУ за 2023 рік — понад 94 млрд
            ₴ (~$2.3 млрд). Це «відкрита частина айсберга».
          </p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            {
              label: "МВФ · Fiscal Affairs 2016",
              href: "https://www.imf.org/external/pubs/ft/sdn/2016/sdn1605.pdf",
            },
            {
              label: "НАБУ Звіт 2023",
              href: "https://nabu.gov.ua/en/post/nabu-annual-report-2023",
            },
            { label: "TI Ukraine CPI 2024", href: "https://ti-ukraine.org" },
            { label: "Bihus.Info розслідування", href: "https://bihus.info" },
            { label: "ProZorro (закупівлі)", href: "https://prozorro.gov.ua" },
          ].map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] px-2 py-1 rounded-sm border border-white/10 text-white/35
                         hover:text-white/60 hover:border-white/25 transition-colors"
            >
              ↗ {s.label}
            </a>
          ))}
        </div>
      </div>

      {/* ── Disclaimer */}
      <div className="font-mono text-[10px] text-white/20 leading-[1.7]">
        ⚠ Лічильник — це оцінка на основі публічних досліджень міжнародних
        організацій. Точна сума не може бути підтверджена — за своєю природою
        корупція прихована. Курс UAH/USD зафіксований на рівні 41 ₴/$ для
        стабільності відображення.
      </div>
    </div>
  );
}
