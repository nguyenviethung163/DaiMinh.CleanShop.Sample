'use client';

import { useMemo, useState } from 'react';
import { CATALOG } from '@/store/lib/catalog-data';
import { sortProducts } from '@/store/lib/product-sort';
import { CatalogProducts } from './catalog-products';

export function ProductsView() {
  const [sort, setSort] = useState('Phổ biến');

  const products = useMemo(() => sortProducts(CATALOG, sort), [sort]);

  return <CatalogProducts products={products} sort={sort} onSortChange={setSort} />;
}
