import HistoricalCounter from "@/components/HistoricalCounter";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Лічильник корупційних втрат і збитків від війни | kradene.ua",
  description:
    "Скільки Україна втратила через корупцію з 1991 року і через війну Росії з 2022? Лічильник у реальному часі: збитки від корупції, економічний вплив повномасштабного вторгнення та доходи держбюджету. Дані МВФ, Світового банку, KSE.",
  openGraph: {
    title: "Лічильник корупційних втрат і збитків від війни",
    description:
      "Лічильник у реальному часі: корупційні втрати з 1991 року, збитки від повномасштабного вторгнення Росії та доходи держбюджету України.",
    url: "https://kradene-ua.vercel.app/counter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Лічильник корупційних втрат і збитків від війни | kradene.ua",
    description:
      "Реальночасовий лічильник: корупція з 1991, збитки від війни з 2022, бюджет України.",
  },
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
