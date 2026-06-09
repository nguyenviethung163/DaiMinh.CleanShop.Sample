import { cn } from '@/lib/utils';

export interface NewsCategoryBadgeProps {
  label: string;
  variant?: 'orange' | 'navy';
  className?: string;
}

export function NewsCategoryBadge({
  label,
  variant = 'orange',
  className,
}: NewsCategoryBadgeProps) {
  return (
    <span
      className={cn(
        'inline-block font-bold',
        variant === 'orange' && 'bg-primary/10 text-primary rounded px-2 py-0.5 text-[11px]',
        variant === 'navy' &&
          'bg-secondary rounded px-3 py-1.5 text-[11px] tracking-[0.06em] text-white',
        className,
      )}
    >
      {label}
    </span>
  );
}
