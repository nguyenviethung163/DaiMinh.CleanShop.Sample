import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface StoreContainerProps {
  className?: string;
  children: ReactNode;
}

export function StoreContainer({ className, children }: StoreContainerProps) {
  return (
    <div className={cn('mx-auto w-full max-w-[1280px] px-4 sm:px-6', className)}>{children}</div>
  );
}
