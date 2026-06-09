import { cn } from '@/lib/utils';
import { getStoreIcon } from '@/store/lib/store-icons';
import type { ReactNode } from 'react';

export interface CommerceSelectCardProps {
  selected?: boolean;
  onSelect?: () => void;
  icon?: string;
  title: string;
  subtitle?: string;
  trailing?: ReactNode;
  className?: string;
  children?: ReactNode;
}

export function CommerceSelectCard({
  selected = false,
  onSelect,
  icon,
  title,
  subtitle,
  trailing,
  className,
  children,
}: CommerceSelectCardProps) {
  const Comp = onSelect ? 'button' : 'div';
  const Icon = getStoreIcon(icon ?? '');

  return (
    <Comp
      type={onSelect ? 'button' : undefined}
      onClick={onSelect}
      className={cn(
        'flex w-full items-start gap-3 rounded-lg border-[1.5px] p-3.5 text-left sm:items-center sm:p-4',
        selected ? 'border-orange bg-primary/10' : 'border bg-white',
        onSelect && 'cursor-pointer',
        className,
      )}
    >
      <div
        className={cn(
          'mt-0.5 h-[18px] w-[18px] shrink-0 rounded-full sm:mt-0',
          selected
            ? 'bg-primary shadow-[0_0_0_1.5px_var(--primary)] ring-4 ring-white'
            : 'border border-2 bg-white',
        )}
      />
      {icon && (
        <div
          className={cn(
            'grid h-9 w-9 shrink-0 place-items-center rounded-md bg-white',
            selected ? 'text-primary' : 'text-secondary',
          )}
        >
          <Icon
            className={cn('shrink-0')}
            size={icon === 'truck' ? 22 : 18}
            strokeWidth={1.7}
            aria-hidden="true"
          />
        </div>
      )}
      <div className="min-w-0 flex-1">
        {children ?? (
          <>
            <div className="text-foreground text-base font-bold">{title}</div>
            {subtitle && <div className="text-muted-foreground mt-1 text-xs">{subtitle}</div>}
          </>
        )}
      </div>
      {trailing && <div className="shrink-0">{trailing}</div>}
    </Comp>
  );
}
