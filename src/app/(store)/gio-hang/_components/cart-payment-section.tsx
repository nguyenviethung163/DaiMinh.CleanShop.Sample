'use client';

import type { PaymentOption } from '@/store/lib/commerce-data';
import { CheckoutSection } from '@/store/components/commerce/checkout-section';
import { CommerceSelectCard } from '@/store/components/commerce/commerce-select-card';

export interface CartPaymentSectionProps {
  options: PaymentOption[];
  value: string;
  onChange: (id: string) => void;
}

export function CartPaymentSection({ options, value, onChange }: CartPaymentSectionProps) {
  return (
    <CheckoutSection step={4} title="Phương thức thanh toán">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {options.map((option) => (
          <CommerceSelectCard
            key={option.id}
            selected={value === option.id}
            onSelect={() => onChange(option.id)}
            icon={option.icon}
            title={option.title}
            subtitle={option.sub}
          />
        ))}
      </div>
    </CheckoutSection>
  );
}
