'use client';

import { cn } from '@/lib/utils';
import { PALETTE_TONES, type PaletteToneFilter } from '@/store/lib/palette-data';

export interface PaletteToneFilterProps {
  value: PaletteToneFilter;
  onChange: (value: PaletteToneFilter) => void;
  className?: string;
}

export function PaletteToneFilterBar({ value, onChange, className }: PaletteToneFilterProps) {
  return (
    <div
      className={cn(
        'mb-4 flex [scrollbar-width:none] gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:hidden',
        className,
      )}
    >
      {PALETTE_TONES.map((tone) => (
        <button
          key={tone}
          type="button"
          onClick={() => onChange(tone)}
          className={cn(
            'shrink-0 cursor-pointer rounded-full border px-3.5 py-[7px] text-sm font-semibold',
            value === tone
              ? 'border-orange bg-primary/10 text-primary font-bold'
              : 'text-muted-foreground border bg-white',
          )}
        >
          {tone}
        </button>
      ))}
    </div>
  );
}
