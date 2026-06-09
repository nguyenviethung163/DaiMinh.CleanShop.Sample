'use client';

import Link from 'next/link';
import type { CartItem } from '@/store/lib/commerce-data';
import { CheckoutSection } from '@/store/components/commerce/checkout-section';
import { CartLineItem } from './cart-line-item';

export interface CartItemsSectionProps {
  items: CartItem[];
  onQtyChange: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}

export function CartItemsSection({ items, onQtyChange, onRemove }: CartItemsSectionProps) {
  return (
    <CheckoutSection
      step={1}
      title="Sản phẩm trong giỏ"
      right={
        <Link href="/san-pham" className="text-primary text-sm font-bold no-underline">
          ← Tiếp tục mua
        </Link>
      }
    >
      {items.map((item, index) => (
        <CartLineItem
          key={item.id}
          item={item}
          isFirst={index === 0}
          onQtyChange={(qty) => onQtyChange(item.id, qty)}
          onRemove={() => onRemove(item.id)}
        />
      ))}
    </CheckoutSection>
  );
}
