'use client';

import { useState } from 'react';
import type { StoreProduct } from '@/store/components/product-card';
import { ProductCard, ProductGrid } from '@/store/components/product-card';
import { StoreContainer } from '@/store/components/store-container';
import { StorePageHero } from '@/store/components/store-page-hero';
import { CatalogActiveFilters } from './catalog-active-filters';
import { CatalogFilterDrawer, CatalogFilterDrawerTrigger } from './catalog-filter-drawer';
import { CatalogFilterSidebar } from './catalog-filter-sidebar';
import { CatalogPagination } from '@/store/components/catalog/catalog-pagination';
import { CatalogSortBar } from '@/store/components/catalog/catalog-sort-bar';

export interface CatalogProductsProps {
  products: StoreProduct[];
  sort: string;
  onSortChange: (sort: string) => void;
}

export function CatalogProducts({ products, sort, onSortChange }: CatalogProductsProps) {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div>
      <StorePageHero
        title="Sơn nội thất"
        crumb="Sản phẩm / Sơn nội thất"
        sub="248 sản phẩm từ 18 thương hiệu chính hãng · Cập nhật giá ngày 28/05/2026"
      />

      <StoreContainer className="py-6 md:py-10">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[240px_minmax(0,1fr)]">
          <CatalogFilterSidebar />

          <div>
            <div className="mb-4 flex min-w-0 items-center gap-2">
              <CatalogFilterDrawerTrigger onOpen={() => setFilterOpen(true)} />
              <CatalogSortBar value={sort} onChange={onSortChange} />
            </div>

            <CatalogActiveFilters />

            <div className="overflow-hidden rounded-lg">
              <ProductGrid>
                {products.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    showQuickAdd={false}
                    showTags={false}
                    showFreeship
                  />
                ))}
              </ProductGrid>
            </div>

            <CatalogPagination />
          </div>
        </div>
      </StoreContainer>

      <CatalogFilterDrawer open={filterOpen} onClose={() => setFilterOpen(false)} />
    </div>
  );
}
