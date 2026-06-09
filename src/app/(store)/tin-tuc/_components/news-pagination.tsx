import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NEWS_PAGINATION_PAGES } from '../_lib/news-data';

export interface NewsPaginationProps {
  activePage?: number;
  pages?: (number | string)[];
}

export function NewsPagination({
  activePage = 1,
  pages = NEWS_PAGINATION_PAGES,
}: NewsPaginationProps) {
  const buttonClass =
    'grid h-8 min-w-8 cursor-pointer place-items-center rounded-sm border bg-white px-2.5 text-sm font-bold text-foreground';

  return (
    <div className="mt-7 flex items-center justify-center gap-1">
      <button type="button" aria-label="Trang trước" className={buttonClass}>
        <ChevronDown
          className="shrink-0"
          size={13}
          strokeWidth={1.7}
          fill="none"
          aria-hidden="true"
          style={{ transform: 'rotate(90deg)' }}
        />
      </button>
      {pages.map((page, index) => (
        <button
          key={index}
          type="button"
          className={cn(
            buttonClass,
            page === activePage && 'border-secondary bg-secondary text-white',
          )}
        >
          {page}
        </button>
      ))}
      <button type="button" aria-label="Trang sau" className={buttonClass}>
        <ChevronDown
          className="shrink-0"
          size={13}
          strokeWidth={1.7}
          fill="none"
          aria-hidden="true"
          style={{ transform: 'rotate(-90deg)' }}
        />
      </button>
    </div>
  );
}
