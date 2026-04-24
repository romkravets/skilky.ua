export interface CorruptionCase {
  id: string;
  title: string;
  amount: number;
  year: number;
  desc: string;
  source: string;
}

export const CASES: CorruptionCase[] = [
  {
    id: "c1",
    title: 'Справа "Укроборонпром"',
    amount: 6700000000,
    year: 2023,
    desc: "Розкрадання при закупівлі двигунів та запчастин для ЗСУ. Справа НАБУ/САП.",
    source: "https://nabu.gov.ua",
  },
  {
    id: "c2",
    title: 'Справа "Нафтогаз-Укргазвидобування"',
    amount: 4000000000,
    year: 2022,
    desc: "Тіньові схеми при видобутку газу. Розслідування Bihus.Info.",
    source: "https://bihus.info",
  },
  {
    id: "c3",
    title: '"Роттердам+" (схема ДТЕК)',
    amount: 19000000000,
    year: 2021,
    desc: "Завищення тарифів на електрику. Збитки для держави за 3 роки.",
    source: "https://nabu.gov.ua",
  },
  {
    id: "c4",
    title: "Зерновий скандал (Мінагрополітики)",
    amount: 1400000000,
    year: 2023,
    desc: "Розкрадання зернових субсидій. Кількох топ-чиновників підозрюють у змові.",
    source: "https://bihus.info",
  },
  {
    id: "c5",
    title: "Медичні тендери МОЗ",
    amount: 1100000000,
    year: 2022,
    desc: "Закупівля медикаментів за завищеними цінами в умовах воєнного стану.",
    source: "https://dozorro.org",
  },
];
