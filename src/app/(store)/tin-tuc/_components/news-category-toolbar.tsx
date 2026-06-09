'use client';

import { cn } from '@/lib/utils';
import { NEWS_CATEGORIES, type NewsCategoryName } from '../_lib/news-data';
import { StoreContainer } from '@/store/components/store-container';

export interface NewsCategoryToolbarProps {
  category: NewsCategoryName;
  onCategoryChange: (category: NewsCategoryName) => void;
}

export function NewsCategoryToolbar({ category, onCategoryChange }: NewsCategoryToolbarProps) {
  return (
    <div className="border border-y bg-white">
      <StoreContainer className="flex flex-wrap items-center gap-2 py-4">
        <span className="text-muted-foreground shrink-0 text-xs font-semibold">CHUYÊN MỤC:</span>
        <div className="flex [scrollbar-width:none] gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:hidden">
          {NEWS_CATEGORIES.map(({ name, count }) => (
            <button
              key={name}
              type="button"
              onClick={() => onCategoryChange(name)}
              className={cn(
                'shrink-0 cursor-pointer rounded-full px-3.5 py-[7px] text-sm font-semibold',
                category === name
                  ? 'bg-secondary font-bold text-white'
                  : 'text-muted-foreground border bg-white',
              )}
            >
              {name}{' '}
              <span className={cn('ml-0.5', category === name ? 'opacity-80' : 'opacity-65')}>
                ({count})
              </span>
            </button>
          ))}
        </div>
      </StoreContainer>
    </div>
  );
}
