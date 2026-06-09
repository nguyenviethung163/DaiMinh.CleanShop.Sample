'use client';

import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { ADB } from '@/lib/data';
import { addToCart, calcTotals, changeQty, removeFromCart, type CartLine } from '../_lib/cart';
import { CartPanel } from './cart-panel';
import { CustomerDialog } from './customer-dialog';
import { PaymentDialog } from './payment-dialog';
import { ProductGrid } from './product-grid';
import { ShiftSummary } from './shift-summary';

type Customer = {
  id: string;
  name: string;
  phone: string;
  tier: string;
  city?: string;
};

type PaymentInfo = {
  method: string;
  total: number;
};

export function PosView() {
  const [category, setCategory] = useState('Tất cả');
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState<CartLine[]>(() =>
    ADB.POS_PRODUCTS.slice(0, 3).map((product, index) => ({
      product,
      qty: index === 0 ? 2 : 1,
    })),
  );
  const [customer, setCustomer] = useState<Customer>(ADB.POS_QUICK_CUSTOMERS[0]);
  const [payment, setPayment] = useState<PaymentInfo | null>(null);
  const [pickCustomer, setPickCustomer] = useState(false);

  const totals = useMemo(() => calcTotals(cart), [cart]);

  return (
    <div className="-m-4 grid h-[calc(100svh-3.5rem)] min-h-[600px] grid-cols-1 gap-4 overflow-hidden p-4 md:-m-6 md:p-6 lg:grid-cols-[1fr_400px]">
      <div className="flex min-h-0 min-w-0 flex-col gap-3">
        <ShiftSummary />
        <ProductGrid
          category={category}
          query={query}
          onCategoryChange={setCategory}
          onQueryChange={setQuery}
          onAdd={(product) => setCart((current) => addToCart(current, product))}
        />
      </div>

      <CartPanel
        cart={cart}
        customer={customer}
        sub={totals.sub}
        discount={totals.discount}
        vat={totals.vat}
        total={totals.total}
        qtyTotal={totals.qtyTotal}
        onPickCustomer={() => setPickCustomer(true)}
        onChangeQty={(id, delta) => setCart((current) => changeQty(current, id, delta))}
        onRemove={(id) => setCart((current) => removeFromCart(current, id))}
        onClear={() => setCart([])}
        onPay={(method) => cart.length && setPayment({ method, total: totals.total })}
      />

      <PaymentDialog
        open={!!payment}
        info={payment}
        onClose={() => setPayment(null)}
        onDone={() => {
          setPayment(null);
          setCart([]);
          toast.success('Thanh toán thành công · Đã in hoá đơn');
        }}
      />

      <CustomerDialog
        open={pickCustomer}
        current={customer}
        onClose={() => setPickCustomer(false)}
        onPick={(picked) => {
          setCustomer(picked);
          setPickCustomer(false);
        }}
      />
    </div>
  );
}
