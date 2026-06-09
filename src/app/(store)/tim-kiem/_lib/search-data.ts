import { CATALOG } from '@/store/lib/catalog-data';
import type { StoreProduct } from '@/store/components/product-card';

export { sortProducts, type SearchSortOption } from '@/store/lib/product-sort';

export const POPULAR_SEARCHES = [
  'Dulux',
  'Jotun',
  'Sơn nội thất',
  'Sơn ngoại thất',
  'Chống thấm',
  'Weathershield',
  'Nippon',
  'Kova',
] as const;

export const SEARCH_SORT_OPTIONS = [
  'Phổ biến',
  'Mới nhất',
  'Bán chạy',
  'Giá thấp → cao',
  'Giá cao → thấp',
  'Đánh giá',
] as const;

export function searchProducts(query: string, products: StoreProduct[] = CATALOG): StoreProduct[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(normalized) ||
      product.brand.toLowerCase().includes(normalized) ||
      product.cat.toLowerCase().includes(normalized) ||
      product.id.toLowerCase().includes(normalized) ||
      product.tags.some((tag) => tag.toLowerCase().includes(normalized)),
  );
}
