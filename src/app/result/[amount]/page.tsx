import Calculator from "@/components/Calculator";
import SharePanel from "@/components/SharePanel";
import { BASE_URL } from "@/lib/config";
import { formatUAH } from "@/lib/formatters";
import { fetchUsdRate } from "@/lib/nbu";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ amount: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { amount: raw } = await params;
  const amount = parseInt(raw, 10);
  const amountStr = formatUAH(amount);
  const ogImage = `${BASE_URL}/api/og?amount=${amount}`;

  return {
    title: `${amountStr} вкрадено: що можна купити? | kradene.ua`,
    description: `${amountStr} — це скільки бронежилетів, лікарень або шкіл? Порахуй реальну ціну корупції в Україні.`,
    openGraph: {
      title: `${amountStr} вкрадених коштів — реальна ціна`,
      description: `${amountStr} — це скільки бронежилетів, лікарень або шкіл? Порахуй реальну ціну корупції.`,
      url: `${BASE_URL}/result/${amount}`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: amountStr }],
    },
    twitter: {
      card: "summary_large_image",
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
