'use client';

import { cn } from '@/lib/utils';
import type { ShippingOption } from '@/store/lib/commerce-data';
import { CheckoutSection } from '@/store/components/commerce/checkout-section';
import { CommerceSelectCard } from '@/store/components/commerce/commerce-select-card';

export interface CartShippingSectionProps {
  options: ShippingOption[];
  value: string;
  onChange: (id: string) => void;
}

export function CartShippingSection({ options, value, onChange }: CartShippingSectionProps) {
  return (
    <CheckoutSection step={3} title="Phương thức giao hàng">
      <div className="flex flex-col gap-2">
        {options.map((option) => (
          <CommerceSelectCard
            key={option.id}
            selected={value === option.id}
            onSelect={() => onChange(option.id)}
            icon="truck"
            title={option.title}
            subtitle={option.sub}
            trailing={
              <span
                className={cn(
                  'text-sm font-extrabold',
                  option.feeFree ? 'text-success' : 'text-foreground',
                )}
              >
                {option.fee}
              </span>
            }
          />
        ))}
      </div>
    </CheckoutSection>
  );
}
