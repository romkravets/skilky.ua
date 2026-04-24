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

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#0a0909',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 72px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Grid background */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        {/* Red left bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, bottom: 0, width: '6px',
          background: '#DC2626',
        }} />

        {/* Top label */}
        <div style={{
          fontSize: '14px',
          color: '#DC2626',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          display: 'flex',
        }}>
          KRADENE.UA · Калькулятор вкрадених мільярдів
        </div>

        {/* Center */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {label && (
            <div style={{ fontSize: '22px', color: 'rgba(240,237,232,0.55)', display: 'flex' }}>
              {label}
            </div>
          )}

          {/* Amount */}
          <div style={{
            fontSize: '80px',
            fontWeight: 700,
            color: '#f0ede8',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            display: 'flex',
          }}>
            {formatUAH(amount)}
          </div>

          {/* Equivalents */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
            {top.map((eq, i) => {
              const cnt = Math.floor(amount / eq.price);
              const color = CAT_COLORS[eq.category];
              return (
                <div key={eq.id} style={{
                  display: 'flex', alignItems: 'baseline', gap: '12px',
                  opacity: 1 - i * 0.1,
                }}>
                  <span style={{ fontSize: '16px', color, letterSpacing: '0.06em', display: 'flex' }}>=</span>
                  <span style={{ fontSize: '44px', fontWeight: 700, color: '#f0ede8', lineHeight: 1, display: 'flex' }}>
                    {formatCount(cnt)}
                  </span>
                  <span style={{ fontSize: '18px', color: 'rgba(240,237,232,0.55)', display: 'flex' }}>
                    {eq.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom domain */}
        <div style={{
          fontSize: '14px',
          color: 'rgba(240,237,232,0.25)',
          letterSpacing: '0.12em',
          display: 'flex',
        }}>
          kradene-ua.vercel.app/result/{amount}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
