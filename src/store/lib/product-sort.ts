import type { StoreProduct } from '@/store/components/product-card';

export const PRODUCT_SORT_OPTIONS = [
  'Phổ biến',
  'Mới nhất',
  'Bán chạy',
  'Giá thấp → cao',
  'Giá cao → thấp',
  'Đánh giá',
] as const;

export type ProductSortOption = (typeof PRODUCT_SORT_OPTIONS)[number];
export type SearchSortOption = ProductSortOption;

export function sortProducts(products: StoreProduct[], sort: string): StoreProduct[] {
  const list = [...products];

  switch (sort) {
    case 'Giá thấp → cao':
      return list.sort((a, b) => a.price - b.price);
    case 'Giá cao → thấp':
      return list.sort((a, b) => b.price - a.price);
    case 'Đánh giá':
      return list.sort((a, b) => b.rating - a.rating);
    case 'Bán chạy':
      return list.sort((a, b) => b.sold - a.sold);
    case 'Mới nhất':
      return list.reverse();
    default:
      return list;
  }
}
