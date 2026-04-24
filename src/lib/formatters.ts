export function formatUAH(n: number): string {
  if (n >= 1e9) return `${(n / 1e9).toFixed(1).replace('.0', '')} млрд ₴`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(1).replace('.0', '')} млн ₴`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(0)} тис. ₴`;
  return `${n} ₴`;
}

export function formatCount(n: number): string {
  if (n >= 1e9) return `${(n / 1e9).toFixed(1).replace(/\.0$/, '')} млрд`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(1).replace(/\.0$/, '')} млн`;
  if (n >= 1e3) return Number(n.toFixed(0)).toLocaleString('uk-UA');
  return n.toFixed(0);
}

export function parseInput(raw: string): number {
  const clean = raw.replace(/\s/g, '').replace(',', '.').replace(/[₴$]/g, '');
  const num = parseFloat(clean);
  return isNaN(num) ? 0 : num;
}

export function formatUSD(n: number): string {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1).replace('.0', '')}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1).replace('.0', '')}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(0)}K`;
  return `$${n}`;
}

export const USD_TO_UAH_FALLBACK = 41.5;
