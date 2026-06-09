'use client';

import { cn } from '@/lib/utils';

export interface CommerceFilterPillsProps<T extends string> {
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export function CommerceFilterPills<T extends string>({
  options,
  value,
  onChange,
  className,
}: CommerceFilterPillsProps<T>) {
  return (
    <div
      className={cn(
        'mb-4 flex [scrollbar-width:none] gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:hidden',
        className,
      )}
    >
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={cn(
            'shrink-0 cursor-pointer rounded-full px-4 py-2 text-sm font-semibold',
            value === option
              ? 'bg-secondary font-bold text-white'
              : 'text-muted-foreground border bg-white',
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
