import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { StoreContainer } from './store-container';

export interface StoreSectionProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  noPaddingBottom?: boolean;
}

export function StoreSection({
  children,
  className,
  containerClassName,
  noPaddingBottom,
}: StoreSectionProps) {
  return (
    <section className={cn('py-8 md:py-10', noPaddingBottom && 'pb-0', className)}>
      <StoreContainer className={containerClassName}>{children}</StoreContainer>
    </section>
  );
}

export interface StoreSectionHeadProps {
  title: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function StoreSectionHead({ title, action, className }: StoreSectionHeadProps) {
  return (
    <div className={cn('mb-4 flex flex-wrap items-baseline justify-between gap-3', className)}>
      <h2 className="text-secondary m-0 text-xl font-extrabold tracking-[-0.01em] md:text-2xl">
        {title}
      </h2>
      {action}
    </div>
  );
}
