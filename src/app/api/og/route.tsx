import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

const EQUIVALENTS = [
  { id: 'armor',    category: 'military',   name: 'бронежилетів',         price: 15000   },
  { id: 'helmet',   category: 'military',   name: 'касок кевларових',      price: 5000    },
  { id: 'fpv',      category: 'military',   name: 'FPV-дронів',            price: 25000   },
  { id: 'surgery',  category: 'healthcare', name: 'операцій для поранених',price: 150000  },
  { id: 'ambulance',category: 'healthcare', name: 'машин швидкої',         price: 2500000 },
  { id: 'kinder',   category: 'education',  name: 'дитячих садочків',      price: 25000000},
  { id: 'school',   category: 'education',  name: 'шкіл',                  price: 80000000},
  { id: 'apt_kyiv', category: 'housing',    name: 'київських квартир',     price: 3500000 },
];

const CAT_COLORS: Record<string, string> = {
  military:   '#DC2626',
  healthcare: '#059669',
  education:  '#2563EB',
  housing:    '#F59E0B',
};

function formatUAH(n: number): string {
  if (n >= 1e9) return `${(n / 1e9).toFixed(1).replace('.0', '')} млрд ₴`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(1).replace('.0', '')} млн ₴`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(0)} тис. ₴`;
  return `${n} ₴`;
}

function formatCount(n: number): string {
  if (n >= 1e6) return `${(n / 1e6).toFixed(1).replace(/\.0$/, '')} млн`;
  if (n >= 1e3) return Number(n.toFixed(0)).toLocaleString('uk-UA');
  return n.toFixed(0);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const amount = parseInt(searchParams.get('amount') ?? '0', 10);
  const label = searchParams.get('label') ?? '';

  if (!amount || amount <= 0) {
    return new Response('Missing amount', { status: 400 });
  }

  const top = EQUIVALENTS
    .filter(e => Math.floor(amount / e.price) >= 1)
    .sort((a, b) => (amount / b.price) - (amount / a.price))
    .slice(0, 3);

  const domain = (process.env.NEXT_PUBLIC_BASE_URL ?? 'https://kradene-ua.vercel.app').replace('https://', '');

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#0a0909',
          display: 'flex',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Grid background */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        {/* Red left bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '6px', background: '#DC2626' }} />

        {/* LEFT COLUMN — amount */}
        <div style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          width: '480px', padding: '56px 48px 56px 72px',
          position: 'relative', zIndex: 1,
        }}>
          {/* Top label */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ fontSize: '13px', color: '#DC2626', letterSpacing: '0.18em', textTransform: 'uppercase', display: 'flex' }}>
              KRADENE.UA
            </div>
            <div style={{ fontSize: '13px', color: 'rgba(240,237,232,0.35)', letterSpacing: '0.08em', display: 'flex' }}>
              Калькулятор вкрадених мільярдів
            </div>
          </div>

          {/* Amount block */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {label && (
              <div style={{ fontSize: '20px', color: 'rgba(240,237,232,0.45)', display: 'flex' }}>
                {label}
              </div>
            )}
            <div style={{
              fontSize: '86px', fontWeight: 700, color: '#f0ede8',
              lineHeight: 0.95, letterSpacing: '-0.03em', display: 'flex',
            }}>
              {formatUAH(amount)}
            </div>
            <div style={{ fontSize: '20px', color: 'rgba(240,237,232,0.40)', display: 'flex', marginTop: '4px' }}>
              вкрадених коштів
            </div>
          </div>

          {/* Domain */}
          <div style={{ fontSize: '14px', color: 'rgba(240,237,232,0.22)', letterSpacing: '0.08em', display: 'flex' }}>
            {domain}
          </div>
        </div>

        {/* Divider */}
        <div style={{
          width: '1px', background: 'rgba(255,255,255,0.08)',
          margin: '48px 0', flexShrink: 0,
        }} />

        {/* RIGHT COLUMN — equivalents */}
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '48px 64px 48px 56px', gap: '0px',
        }}>
          <div style={{ fontSize: '13px', color: 'rgba(240,237,232,0.30)', letterSpacing: '0.14em', textTransform: 'uppercase', display: 'flex', marginBottom: '32px' }}>
            = ось що можна збудувати
          </div>

          {top.map((eq, i) => {
            const cnt = Math.floor(amount / eq.price);
            const color = CAT_COLORS[eq.category];
            return (
              <div key={eq.id} style={{
                display: 'flex', flexDirection: 'column', gap: '2px',
                paddingBottom: i < top.length - 1 ? '24px' : '0',
                marginBottom: i < top.length - 1 ? '24px' : '0',
                borderBottom: i < top.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                opacity: 1 - i * 0.08,
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px' }}>
                  <span style={{ fontSize: '14px', color, letterSpacing: '0.06em', display: 'flex', fontWeight: 600 }}>=</span>
                  <span style={{ fontSize: '54px', fontWeight: 700, color: '#f0ede8', lineHeight: 1, display: 'flex', letterSpacing: '-0.02em' }}>
                    {formatCount(cnt)}
                  </span>
                </div>
                <div style={{ fontSize: '26px', color: 'rgba(240,237,232,0.60)', display: 'flex', paddingLeft: '28px' }}>
                  {eq.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
