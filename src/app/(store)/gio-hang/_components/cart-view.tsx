'use client';

import { useState } from 'react';
import {
  CART_ITEMS,
  DEFAULT_ADDRESS,
  PAYMENT_OPTIONS,
  SHIPPING_OPTIONS,
  type CartItem,
} from '@/store/lib/commerce-data';
import { StoreContainer } from '@/store/components/store-container';
import { CheckoutStepper } from './checkout-stepper';
import { CartAddressSection } from './cart-address-section';
import { CartItemsSection } from './cart-items-section';
import { CartMobileBar } from './cart-mobile-bar';
import { CartOrderSummary } from './cart-order-summary';
import { CartPaymentSection } from './cart-payment-section';
import { CartShippingSection } from './cart-shipping-section';

export function CartView() {
  const [items, setItems] = useState<CartItem[]>(CART_ITEMS);
  const [shippingId, setShippingId] = useState(SHIPPING_OPTIONS[0].id);
  const [paymentId, setPaymentId] = useState(PAYMENT_OPTIONS[0].id);

  const updateQty = (id: string, qty: number) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, qty } : item)));
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="pb-24 lg:pb-0">
      <CheckoutStepper currentStep={2} />

      <StoreContainer className="max-w-[1040px] py-6 md:py-8">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-6">
          <div className="flex flex-col gap-4">
            <CartItemsSection items={items} onQtyChange={updateQty} onRemove={removeItem} />
            <CartAddressSection address={DEFAULT_ADDRESS} />
            <CartShippingSection
              options={SHIPPING_OPTIONS}
              value={shippingId}
              onChange={setShippingId}
            />
            <CartPaymentSection
              options={PAYMENT_OPTIONS}
              value={paymentId}
              onChange={setPaymentId}
            />
          </div>

          <div className="lg:sticky lg:top-4 lg:self-start">
            <CartOrderSummary items={items} showCheckoutButton />
          </div>
        </div>
      </StoreContainer>

      <CartMobileBar items={items} />
    </div>
  );
}
