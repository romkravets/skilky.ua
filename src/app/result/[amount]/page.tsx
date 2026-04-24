import type { Metadata } from 'next';
import { BASE_URL } from '@/lib/config';
import { formatUAH } from '@/lib/formatters';
import Calculator from '@/components/Calculator';
import SharePanel from '@/components/SharePanel';
import { fetchUsdRate } from '@/lib/nbu';

interface Props {
  params: Promise<{ amount: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { amount: raw } = await params;
  const amount = parseInt(raw, 10);
  const amountStr = formatUAH(amount);
  const ogImage = `${BASE_URL}/api/og?amount=${amount}`;

  return {
    title: `${amountStr} = скільки бронежилетів? | kradene.ua`,
    description: `${amountStr} вкрадених коштів — порахуй, що можна було збудувати або купити.`,
    openGraph: {
      title: `${amountStr} вкрадених коштів`,
      description: 'Подивись, що можна було збудувати або купити на ці гроші.',
      url: `${BASE_URL}/result/${amount}`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: amountStr }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${amountStr} вкрадених коштів`,
      images: [ogImage],
    },
  };
}

export default async function ResultPage({ params }: Props) {
  const { amount: raw } = await params;
  const amount = parseInt(raw, 10);
  const usdRate = await fetchUsdRate();

  return (
    <>
      <SharePanel amount={amount} />
      <Calculator usdRate={usdRate} prefillAmount={amount} />
    </>
  );
}
