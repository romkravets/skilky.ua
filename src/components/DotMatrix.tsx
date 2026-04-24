'use client';

import { SVGS } from './Svgs';
import { formatCount } from '@/lib/formatters';

interface DotMatrixProps {
  count: number;
  color: string;
  svgKey: string;
}

export default function DotMatrix({ count, color, svgKey }: DotMatrixProps) {
  const MAX_DOTS = 50;
  const step = count <= MAX_DOTS ? 1 : Math.ceil(count / MAX_DOTS);
  const dots = Math.min(Math.ceil(count / step), MAX_DOTS);
  const SvgFn = SVGS[svgKey] ?? SVGS['armor'];

  return (
    <div className="mb-3">
      <div className="flex flex-wrap gap-[3px] items-start">
        {Array.from({ length: dots }).map((_, i) => (
          <div
            key={i}
            className="w-5 h-5"
            style={{ opacity: 0.7 + 0.3 * (i / dots) }}
          >
            {SvgFn(color)}
          </div>
        ))}
      </div>
      {step > 1 && (
        <div
          className="font-mono text-[10px] mt-1 tracking-[0.08em]"
          style={{ color, opacity: 0.55 }}
        >
          1 іконка = {formatCount(step)}
        </div>
      )}
    </div>
  );
}
