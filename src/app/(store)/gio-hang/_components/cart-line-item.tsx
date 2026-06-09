'use client';

import { Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getToneGradient } from '@/store/lib/tone-meta';
import { formatVND, type CartItem } from '@/store/lib/commerce-data';
import { CommerceQtyStepper } from '@/store/components/commerce/commerce-qty-stepper';

export interface CartLineItemProps {
  item: CartItem;
  onQtyChange: (qty: number) => void;
  onRemove: () => void;
  isFirst?: boolean;
}

export function CartLineItem({ item, onQtyChange, onRemove, isFirst }: CartLineItemProps) {
  return (
    <div
      className={
        isFirst
          ? 'grid grid-cols-[72px_minmax(0,1fr)] gap-3 py-4 sm:grid-cols-[90px_minmax(0,1fr)_auto_auto] sm:items-center sm:gap-4'
          : 'grid grid-cols-[72px_minmax(0,1fr)] gap-3 border border-t py-4 sm:grid-cols-[90px_minmax(0,1fr)_auto_auto] sm:items-center sm:gap-4'
      }
    >
      <div
        className={cn('relative overflow-hidden', 'w-[72px] rounded-md sm:w-[90px]')}
        style={{ background: getToneGradient(item.tone ?? 'navy'), aspectRatio: '1/1' }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, rgba(255,255,255,.06) 0 2px, transparent 2px 14px)',
          }}
        />
      </div>

      <div className="min-w-0">
        <div className="text-primary text-xs font-bold tracking-wide uppercase">{item.brand}</div>
        <div className="text-foreground mt-1 text-base leading-snug font-semibold">{item.name}</div>
        <div className="text-muted-foreground mt-1 text-xs">{item.vol}</div>
        {item.lowStock && (
          <div className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-[#946100]">
            <Zap className="shrink-0" size={11} strokeWidth={1.7} fill="none" aria-hidden="true" />
            Chỉ còn 3 sản phẩm
          </div>
        )}
        <div className="mt-3 flex items-center justify-between gap-3 sm:hidden">
          <CommerceQtyStepper value={item.qty} onChange={onQtyChange} />
          <div className="text-right">
            <div className="text-primary text-[15px] font-extrabold">
              {formatVND(item.price * item.qty)}
            </div>
            <button
              type="button"
              onClick={onRemove}
              className="text-muted-foreground mt-1 cursor-pointer text-xs"
            >
              Xoá
            </button>
          </div>
        </div>
      </div>

      <div className="hidden sm:block">
        <CommerceQtyStepper value={item.qty} onChange={onQtyChange} />
      </div>

      <div className="hidden text-right sm:block">
        <div className="text-primary text-[15px] font-extrabold">
          {formatVND(item.price * item.qty)}
        </div>
        <div className="text-muted-foreground mt-1 text-xs">{formatVND(item.price)} / sp</div>
        <button
          type="button"
          onClick={onRemove}
          className="text-muted-foreground mt-1 cursor-pointer text-xs"
        >
          Xoá
        </button>
      </div>
    </div>
  );
}
