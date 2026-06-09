'use client';

import { cn } from '@/lib/utils';
import { ARTICLE_TOC } from '../_lib/news-data';

export interface ArticleTocNavProps {
  activeIndex?: number;
}

export function ArticleTocNav({ activeIndex = 1 }: ArticleTocNavProps) {
  return (
    <aside className="sticky top-5 hidden self-start sm:block">
      <div className="text-primary mb-3 text-xs font-bold tracking-wide uppercase">
        Trong bài này
      </div>
      <nav className="flex flex-col gap-2">
        {ARTICLE_TOC.map((item, index) => (
          <button
            key={item}
            type="button"
            className={cn(
              'cursor-pointer border-l-2 py-1.5 pl-3.5 text-left text-sm leading-snug',
              index === activeIndex
                ? 'border-orange text-secondary font-bold'
                : 'text-muted-foreground border font-medium',
            )}
          >
            {item}
          </button>
        ))}
      </nav>
    </aside>
  );
}
