'use client';

import { cn } from '@/lib/utils';
import {
  PROMO_STATUS_TABS,
  PROMO_TYPE_FILTERS,
  type PromoStatusTab,
  type PromoTypeFilter,
} from '../_lib/promotions-data';
import { StoreContainer } from '@/store/components/store-container';

export interface PromoFilterToolbarProps {
  statusTab: PromoStatusTab;
  typeFilter: PromoTypeFilter;
  onStatusChange: (tab: PromoStatusTab) => void;
  onTypeChange: (type: PromoTypeFilter) => void;
}

export function PromoFilterToolbar({
  statusTab,
  typeFilter,
  onStatusChange,
  onTypeChange,
}: PromoFilterToolbarProps) {
  return (
    <div className="border border-b bg-white">
      <StoreContainer className="flex flex-wrap items-center gap-3 py-4">
        <div className="flex [scrollbar-width:none] gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:hidden">
          {PROMO_STATUS_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => onStatusChange(tab)}
              className={cn(
                'shrink-0 cursor-pointer rounded-lg px-3.5 py-2 text-base font-semibold',
                statusTab === tab ? 'bg-secondary font-bold text-white' : 'text-muted-foreground',
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="text-muted-foreground ml-auto hidden items-center gap-2 text-sm sm:flex">
          <span>Loại:</span>
          {PROMO_TYPE_FILTERS.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => onTypeChange(type)}
              className={cn(
                'cursor-pointer rounded-full border px-[11px] py-1.5 text-[12.5px] font-semibold',
                typeFilter === type
                  ? 'border-orange bg-primary/10 text-primary'
                  : 'text-muted-foreground border bg-white',
              )}
            >
              {type}
            </button>
          ))}
        </div>
      </StoreContainer>
    </div>
  );
}
