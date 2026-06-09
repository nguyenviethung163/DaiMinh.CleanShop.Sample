import { Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { PromoVoucher } from '../_lib/promotions-data';

export interface PromoVoucherCardProps {
  voucher: PromoVoucher;
}

export function PromoVoucherCard({ voucher }: PromoVoucherCardProps) {
  return (
    <article className="border-orange relative flex items-center gap-3 rounded-lg border-[1.5px] border-dashed bg-white p-3.5">
      <div className="from-orange to-orange-deep grid h-[76px] w-[76px] shrink-0 place-items-center rounded-lg bg-gradient-to-br text-white">
        <Tag className="shrink-0" size={30} strokeWidth={1.7} fill="none" aria-hidden="true" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="text-secondary text-base font-extrabold">{voucher.name}</div>
        <div className="text-muted-foreground mt-1 text-xs">{voucher.cond}</div>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="bg-muted text-muted-foreground rounded px-1.5 py-0.5 text-xs font-semibold">
            {voucher.type}
          </span>
          <span className="text-muted-foreground text-xs">HSD: {voucher.exp}</span>
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-2">
        <div className="bg-muted text-foreground rounded px-2 py-0.5 font-mono text-[11px] font-bold">
          {voucher.code}
        </div>
        <Button
          variant="default"
          size="sm"
          className={cn('gap-2 font-bold', 'px-3.5 py-[7px] text-xs')}
        >
          Lưu mã
        </Button>
      </div>
    </article>
  );
}
