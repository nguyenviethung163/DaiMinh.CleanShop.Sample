'use client';

import { Check, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getStoreIcon } from '@/store/lib/store-icons';
import { VOUCHER_CODE, calcCartTotals, formatVND, type CartItem } from '@/store/lib/commerce-data';

export interface CartOrderSummaryProps {
  items: CartItem[];
  showCheckoutButton?: boolean;
}

export function CartOrderSummary({ items, showCheckoutButton = true }: CartOrderSummaryProps) {
  const { subtotal, discount, total, itemCount, points } = calcCartTotals(items);

  return (
    <aside className="rounded-xl border bg-white p-4 sm:p-5 md:p-[22px]">
      <div className="text-secondary text-base font-extrabold">Tóm tắt đơn hàng</div>

      <div className="bg-primary/10 mt-3 mb-3.5 flex items-center gap-2 rounded-md px-3 py-2">
        <Check
          className="text-primary shrink-0"
          size={14}
          strokeWidth={1.7}
          fill="none"
          aria-hidden="true"
        />
        <span className="text-primary flex-1 text-xs font-bold">
          Đã áp dụng <b>{VOUCHER_CODE}</b> – Giảm {formatVND(discount)}
        </span>
        <button type="button" className="text-primary cursor-pointer text-xs">
          Bỏ
        </button>
      </div>

      {[
        ['Số sản phẩm', `${itemCount} sản phẩm`, 'text-foreground'],
        ['Tạm tính', formatVND(subtotal), 'text-foreground'],
        ['Giảm giá voucher', `− ${formatVND(discount)}`, 'text-primary'],
        ['Phí giao hàng', 'Miễn phí', 'text-success'],
      ].map(([label, value, color]) => (
        <div key={label} className="mb-2 flex justify-between text-base">
          <span className="text-muted-foreground">{label}</span>
          <span className={cn('font-semibold', color)}>{value}</span>
        </div>
      ))}

      <div className="mt-1 flex items-baseline justify-between border border-t pt-3.5">
        <span className="text-foreground text-sm font-bold">Tổng cộng</span>
        <span className="text-primary text-[26px] font-black tracking-[-0.02em]">
          {formatVND(total)}
        </span>
      </div>
      <div className="text-muted-foreground text-right text-xs">(đã bao gồm VAT)</div>

      <div className="bg-muted mt-4 flex items-center gap-2 rounded-md p-3">
        <Sparkles
          className="text-primary shrink-0"
          size={14}
          strokeWidth={1.7}
          fill="none"
          aria-hidden="true"
        />
        <span className="text-muted-foreground text-xs">
          Đơn này tích lũy <b className="text-primary">{points} điểm</b> ={' '}
          {formatVND(points * 1000)} cho lần sau.
        </span>
      </div>

      {showCheckoutButton && (
        <Button
          variant="default"
          className={cn(
            'gap-2 font-bold',
            'mt-4 hidden w-full py-[15px] text-[15px] lg:inline-flex',
          )}
        >
          <Zap className="shrink-0" size={16} strokeWidth={1.7} fill="none" aria-hidden="true" />
          Đặt hàng ngay
        </Button>
      )}

      <div className="mt-4 flex flex-col gap-2 border border-t pt-3.5">
        {[
          ['shield', 'Bảo đảm chính hãng 100%'],
          ['truck', 'Đổi trả trong 7 ngày'],
          ['phone', 'Hỗ trợ 24/7'],
        ].map(([icon, label]) => {
          const Icon = getStoreIcon(icon);
          return (
            <div key={label} className="text-muted-foreground flex items-center gap-2 text-xs">
              <Icon
                className={cn('shrink-0', 'text-success')}
                size={14}
                strokeWidth={1.7}
                aria-hidden="true"
              />
              {label}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
