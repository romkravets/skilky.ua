import type { Metadata } from "next";
import Link from "next/link";
import HistoricalCounter from "@/components/HistoricalCounter";

export const metadata: Metadata = {
  title: "Лічильник корупційних втрат | kradene.ua",
  description:
    "Скільки Україна втратила через корупцію з 1991 року? Оціночний лічильник на основі даних МВФ, Світового банку та НАБУ.",
};

export default function CounterPage() {
  return (
    <main className="flex-1 px-10 py-16 max-w-[900px] mx-auto">
      {/* Page header */}
      <div className="mb-10">
        <h1
          className="font-display font-bold leading-tight mb-3"
          style={{ fontSize: "clamp(28px, 4.5vw, 52px)" }}
        >
          Скільки вкрадено за всю історію України?
        </h1>
        <p className="text-white/50 text-[15px] max-w-[580px] leading-[1.75] font-light">
          Оціночний лічильник корупційних втрат із дня незалежності — 24 серпня
          1991 року. Показує, що можна було збудувати замість цього.
        </p>
      </div>

      {/* Live counter */}
      <HistoricalCounter />

      {/* Back link */}
      <div className="mt-12 pt-8 border-t border-white/7">
        <Link
          href="/"
          className="inline-block font-display text-sm tracking-[0.1em] uppercase bg-red-600 text-white px-6 py-3 rounded-sm hover:opacity-85 transition-opacity no-underline"
        >
          ← Калькулятор справ
        </Link>
      </div>
    </main>
  );
}
