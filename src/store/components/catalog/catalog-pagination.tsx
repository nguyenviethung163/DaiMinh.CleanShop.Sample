import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const PAGES: (number | string)[] = [1, 2, 3, 4, '…', 16];

export interface CatalogPaginationProps {
  from?: number;
  to?: number;
  total?: number;
  activePage?: number;
}

export function CatalogPagination({
  from = 1,
  to = 16,
  total = 248,
  activePage = 1,
}: CatalogPaginationProps) {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
      <div className="text-muted-foreground text-sm">
        Hiển thị{' '}
        <b className="text-foreground">
          {from}–{to}
        </b>{' '}
        trong <b className="text-foreground">{total}</b> sản phẩm
      </div>
      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label="Trang trước"
          className="text-foreground grid h-9 w-9 place-items-center rounded-sm border bg-white text-sm font-bold"
        >
          <ChevronDown
            className="shrink-0"
            size={14}
            strokeWidth={1.7}
            fill="none"
            aria-hidden="true"
            style={{ transform: 'rotate(90deg)' }}
          />
        </button>
        {PAGES.map((n, i) => (
          <button
            key={i}
            type="button"
            className={cn(
              'text-foreground grid h-9 min-w-9 place-items-center rounded-sm border bg-white px-2.5 text-sm font-bold',
              n === activePage && 'border-secondary bg-secondary text-white',
            )}
          >
            {n}
          </button>
        ))}
        <button
          type="button"
          aria-label="Trang sau"
          className="text-foreground grid h-9 w-9 place-items-center rounded-sm border bg-white text-sm font-bold"
        >
          <ChevronDown
            className="shrink-0"
            size={14}
            strokeWidth={1.7}
            fill="none"
            aria-hidden="true"
            style={{ transform: 'rotate(-90deg)' }}
          />
        </button>
      </div>
    </div>
  );
}
