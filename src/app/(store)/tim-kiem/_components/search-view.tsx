'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CatalogPagination } from '@/store/components/catalog/catalog-pagination';
import { CatalogSortBar } from '@/store/components/catalog/catalog-sort-bar';
import { ProductCard, ProductGrid } from '@/store/components/product-card';
import { StoreContainer } from '@/store/components/store-container';
import { StorePageHero } from '@/store/components/store-page-hero';
import { StoreSearchBar } from '@/store/components/store-search-bar';
import { searchProducts, sortProducts, type SearchSortOption } from '../_lib/search-data';
import { SearchEmptyState } from './search-empty-state';
import { SearchPopularChips } from './search-popular-chips';

export function SearchView() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q')?.trim() ?? '';
  const [sort, setSort] = useState<SearchSortOption>('Phổ biến');

  const results = useMemo(() => {
    const matched = searchProducts(query);
    return sortProducts(matched, sort);
  }, [query, sort]);

  const hasQuery = query.length > 0;
  const hasResults = results.length > 0;

  return (
    <div>
      <StorePageHero
        title={hasQuery ? `Kết quả tìm kiếm` : 'Tìm kiếm sản phẩm'}
        crumb={hasQuery ? `Tìm kiếm: ${query}` : 'Tìm kiếm'}
        sub={
          hasQuery
            ? hasResults
              ? `Tìm thấy ${results.length} sản phẩm cho “${query}”`
              : `Không có sản phẩm phù hợp với “${query}”`
            : 'Tìm theo tên sản phẩm, thương hiệu, danh mục hoặc mã sản phẩm'
        }
      />

      <StoreContainer className="py-6 md:py-10">
        <div className="mb-6">
          <StoreSearchBar defaultQuery={query} />
        </div>

        {hasQuery ? (
          hasResults ? (
            <div>
              <CatalogSortBar
                value={sort}
                onChange={(value) => setSort(value as SearchSortOption)}
                from={1}
                to={results.length}
                total={results.length}
              />

              <div className="mt-4 overflow-hidden rounded-lg">
                <ProductGrid>
                  {results.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      showQuickAdd={false}
                      showTags={false}
                      showFreeship
                    />
                  ))}
                </ProductGrid>
              </div>

              {results.length > 8 && (
                <CatalogPagination from={1} to={results.length} total={results.length} />
              )}
            </div>
          ) : (
            <SearchEmptyState query={query} />
          )
        ) : (
          <SearchPopularChips />
        )}
      </StoreContainer>
    </div>
  );
}
