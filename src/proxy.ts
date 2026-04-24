import { NextRequest, NextResponse } from 'next/server';

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 30;
const memStore = new Map<string, number[]>();

function isLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;
  const times = (memStore.get(ip) ?? []).filter(t => t > windowStart);
  if (times.length >= MAX_REQUESTS) return true;
  times.push(now);
  memStore.set(ip, times);
  if (memStore.size > 2000) {
    for (const [k, ts] of memStore) {
      if (ts.every(t => t < windowStart)) memStore.delete(k);
    }
  }
  return false;
}

export function proxy(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

  if (isLimited(ip)) {
    return NextResponse.json(
      { error: 'Забагато запитів. Спробуйте через хвилину.' },
      { status: 429 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/og'],
};
