'use client';

import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const SORT_OPTIONS = [
  'Phổ biến',
  'Mới nhất',
  'Bán chạy',
  'Giá thấp → cao',
  'Giá cao → thấp',
  'Đánh giá',
] as const;

export interface CatalogSortBarProps {
  value: string;
  onChange: (sort: string) => void;
  from?: number;
  to?: number;
  total?: number;
}

export function CatalogSortBar({
  value,
  onChange,
  from = 1,
  to = 16,
  total = 248,
}: CatalogSortBarProps) {
  return (
    <div className="flex h-11 min-w-0 flex-1 items-center gap-2 rounded-lg border bg-white px-3">
      {/* Mobile: dropdown */}
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:hidden">
        <span className="text-muted-foreground shrink-0 text-xs font-semibold">SẮP XẾP:</span>
        <div className="relative min-w-0 flex-1">
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            aria-label="Sắp xếp sản phẩm"
            className="text-secondary h-full w-full min-w-0 cursor-pointer appearance-none border-0 bg-transparent py-0 pr-7 pl-0 text-sm font-bold outline-none focus:outline-none"
          >
            {SORT_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <ChevronDown
            className="text-muted-foreground pointer-events-none absolute top-1/2 right-0 shrink-0"
            size={14}
            strokeWidth={1.7}
            fill="none"
            aria-hidden="true"
            style={{ transform: 'translateY(-50%) rotate(180deg)' }}
          />
        </div>
      </div>

      {/* Desktop: pill buttons */}
      <div className="hidden min-w-0 flex-1 [scrollbar-width:none] flex-nowrap items-center gap-2 overflow-x-auto [-ms-overflow-style:none] sm:flex [&::-webkit-scrollbar]:hidden">
        <span className="text-muted-foreground shrink-0 text-xs font-semibold">SẮP XẾP:</span>
        {SORT_OPTIONS.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={cn(
              'shrink-0 cursor-pointer rounded-md px-3 py-1.5 text-sm',
              value === n
                ? 'bg-secondary font-bold text-white'
                : 'text-muted-foreground font-medium',
            )}
          >
            {n}
          </button>
        ))}
      </div>

      <span className="text-muted-foreground ml-auto hidden shrink-0 text-xs sm:inline">
        Hiển thị{' '}
        <b className="text-foreground">
          {from}–{to}
        </b>{' '}
        / <b className="text-foreground">{total}</b>
      </span>
    </div>
  );
}
