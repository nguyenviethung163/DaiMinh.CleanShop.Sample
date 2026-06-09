'use client';

import { Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { calcCartTotals, formatVND, type CartItem } from '@/store/lib/commerce-data';

export interface CartMobileBarProps {
  items: CartItem[];
}

export function CartMobileBar({ items }: CartMobileBarProps) {
  const { total } = calcCartTotals(items);

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] border border-t bg-white p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden">
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <div className="text-muted-foreground text-xs">Tổng cộng</div>
          <div className="text-primary text-xl font-black tracking-[-0.02em]">
            {formatVND(total)}
          </div>
        </div>
        <Button variant="default" className={cn('gap-2 font-bold', 'shrink-0 px-5 py-3')}>
          <Zap className="shrink-0" size={16} strokeWidth={1.7} fill="none" aria-hidden="true" />
          Đặt hàng
        </Button>
      </div>
    </div>
  );
}
