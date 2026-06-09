'use client';

import { useParams } from 'next/navigation';
import { PRODUCTS } from '@/store/data';
import type { StoreProduct } from '@/store/components/product-card';
import { resolveProduct } from '@/store/lib/catalog-data';
import { CatalogProductDetail } from '../../_components/catalog-product-detail';

export function ProductDetailView() {
  const { id } = useParams();
  const product = resolveProduct(id);
  const related = (PRODUCTS as StoreProduct[]).filter((x) => x.id !== product.id).slice(0, 4);

  return <CatalogProductDetail product={product} related={related} />;
}
