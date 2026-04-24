import Calculator from '@/components/Calculator';
import { fetchUsdRate } from '@/lib/nbu';

export default async function Home() {
  const usdRate = await fetchUsdRate();
  return <Calculator usdRate={usdRate} />;
}
