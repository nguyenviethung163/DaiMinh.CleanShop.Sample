'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import type { DeliveryAddress } from '@/store/lib/commerce-data';
import { CheckoutSection } from '@/store/components/commerce/checkout-section';
import { CommerceBadge } from '@/store/components/commerce/commerce-badge';
export interface CartAddressSectionProps {
  address: DeliveryAddress;
}

export function CartAddressSection({ address }: CartAddressSectionProps) {
  return (
    <CheckoutSection
      step={2}
      title="Thông tin giao hàng"
      right={
        <button type="button" className="text-primary cursor-pointer text-sm font-bold">
          + Thêm địa chỉ
        </button>
      }
    >
      <div className="border-orange bg-primary/10 flex items-start gap-3 rounded-[10px] border-[1.5px] p-4">
        <div className="bg-primary mt-1 h-[18px] w-[18px] shrink-0 rounded-full shadow-[0_0_0_1.5px_var(--primary)] ring-4 ring-white" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-foreground text-[14.5px] font-extrabold">{address.name}</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-foreground text-sm font-semibold">{address.phone}</span>
            <CommerceBadge>{address.label}</CommerceBadge>
            {address.isDefault && <CommerceBadge tone="success">MẶC ĐỊNH</CommerceBadge>}
          </div>
          <div className="text-muted-foreground mt-2 text-sm leading-relaxed">
            {address.address}
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            'gap-2 font-bold',
            'border-secondary text-secondary hover:bg-muted',
            'border-orange text-primary shrink-0',
          )}
        >
          Sửa
        </Button>
      </div>

      <div className="mt-3">
        <div>
          <Label className="text-foreground mb-1.5 block text-sm font-semibold">
            Ghi chú cho người giao hàng (không bắt buộc)
          </Label>
          <Textarea
            rows={2}
            placeholder="VD: Gọi điện trước khi tới, công trình ở tầng 4 không có thang máy…"
          />
        </div>
      </div>
    </CheckoutSection>
  );
}
