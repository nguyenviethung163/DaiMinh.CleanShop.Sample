'use client';

import { MapPin, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SAVED_ADDRESSES } from '@/store/lib/commerce-data';
import { CommerceBadge } from '@/store/components/commerce/commerce-badge';

export function AccountAddressSection() {
  return (
    <div className="max-w-[640px]">
      <h1 className="text-secondary m-0 mb-4 text-[22px] font-extrabold">Sổ địa chỉ</h1>

      {SAVED_ADDRESSES.map((address) => (
        <div
          key={address.id}
          className={
            address.isDefault
              ? 'border-orange mb-3 flex items-start gap-3 rounded-[10px] border-[1.5px] bg-white p-4'
              : 'mb-3 flex items-start gap-3 rounded-[10px] border border-[1.5px] bg-white p-4'
          }
        >
          <MapPin
            className={cn(
              'shrink-0',
              address.isDefault
                ? 'text-primary mt-0.5 shrink-0'
                : 'text-muted-foreground mt-0.5 shrink-0',
            )}
            size={18}
            strokeWidth={1.7}
            fill="none"
            aria-hidden="true"
          />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-foreground font-bold">{address.name}</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground text-sm">{address.phone}</span>
              {address.isDefault && <CommerceBadge tone="success">MẶC ĐỊNH</CommerceBadge>}
            </div>
            <div className="text-muted-foreground mt-1 text-sm leading-relaxed">
              {address.address}
            </div>
          </div>
          <button type="button" className="text-primary shrink-0 cursor-pointer text-sm font-bold">
            Sửa
          </button>
        </div>
      ))}

      <Button
        variant="outline"
        className={cn('gap-2 font-bold', 'border-secondary text-secondary hover:bg-muted')}
      >
        <Plus className="shrink-0" size={15} strokeWidth={1.7} fill="none" aria-hidden="true" />
        Thêm địa chỉ mới
      </Button>
    </div>
  );
}
