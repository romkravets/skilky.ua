import { USD_TO_UAH_FALLBACK } from './formatters';

interface NbuRate {
  r030: number;
  txt: string;
  rate: number;
  cc: string;
  exchangedate: string;
}

export async function fetchUsdRate(): Promise<number> {
  try {
    const res = await fetch(
      'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&json',
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return USD_TO_UAH_FALLBACK;
    const data: NbuRate[] = await res.json();
    const rate = data[0]?.rate;
    return rate && rate > 0 ? rate : USD_TO_UAH_FALLBACK;
  } catch {
    return USD_TO_UAH_FALLBACK;
  }
}
