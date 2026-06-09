import { PRODUCTS } from '@/store/data';
import type { StoreProduct } from '@/store/components/product-card';

export const CATALOG: StoreProduct[] = [
  ...PRODUCTS,
  ...PRODUCTS.map((p, i) => ({
    ...p,
    id: p.id + '-x',
    name: p.name.replace('18L', '5L').replace('17L', '5L'),
    price: Math.round((p.price * 0.32) / 1000) * 1000,
    old: Math.round((p.old * 0.32) / 1000) * 1000,
    sold: Math.max(120, p.sold - 600),
    badge: i % 2 ? 'GIẢM 8%' : 'CÒN 12',
  })),
].slice(0, 16) as StoreProduct[];

export function resolveProduct(id: string | string[] | undefined): StoreProduct {
  const key = Array.isArray(id) ? id[0] : id;
  return (
    (PRODUCTS as StoreProduct[]).find((x) => x.id === key) ||
    CATALOG.find((x) => x.id === key) ||
    (PRODUCTS[0] as StoreProduct)
  );
}
