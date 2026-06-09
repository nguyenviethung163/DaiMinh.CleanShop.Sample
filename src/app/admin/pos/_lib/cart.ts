import { ADB } from '@/lib/data';

type PosProduct = (typeof ADB.POS_PRODUCTS)[number];

export type CartLine = {
  product: PosProduct;
  qty: number;
};

export function addToCart(cart: CartLine[], product: PosProduct): CartLine[] {
  const existing = cart.find((line) => line.product.id === product.id);
  if (existing) {
    return cart.map((line) =>
      line.product.id === product.id ? { ...line, qty: line.qty + 1 } : line,
    );
  }
  return [...cart, { product, qty: 1 }];
}

export function changeQty(cart: CartLine[], productId: string, delta: number): CartLine[] {
  return cart
    .map((line) =>
      line.product.id === productId ? { ...line, qty: Math.max(0, line.qty + delta) } : line,
    )
    .filter((line) => line.qty > 0);
}

export function removeFromCart(cart: CartLine[], productId: string): CartLine[] {
  return cart.filter((line) => line.product.id !== productId);
}

export function calcTotals(cart: CartLine[]) {
  const sub = cart.reduce((sum, line) => sum + line.product.posPrice * line.qty, 0);
  const discount = Math.round((sub * 0.05) / 1000) * 1000;
  const vat = Math.round(((sub - discount) * 0.08) / 1000) * 1000;
  const total = sub - discount + vat;
  const qtyTotal = cart.reduce((sum, line) => sum + line.qty, 0);
  return { sub, discount, vat, total, qtyTotal };
}
