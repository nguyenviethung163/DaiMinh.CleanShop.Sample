'use client';

import Link from 'next/link';
import { ArrowRight, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { StoreProduct } from '@/store/components/product-card';
import { ProductCard, ProductGrid } from '@/store/components/product-card';
import { StoreSection } from '@/store/components/store-section';

const PROD_TABS = [
  'Tất cả',
  'Sơn nội thất',
  'Sơn ngoại thất',
  'Sơn chống thấm',
  'Sơn kinh tế',
  'Bột trét',
] as const;

const BRAND_FILTERS = ['Dulux', 'Jotun', 'Nippon', 'Kova'] as const;

export interface HomeFeaturedProductsProps {
  tab: string;
  brand: string | null;
  products: StoreProduct[];
  onTabChange: (tab: string) => void;
  onBrandChange: (brand: string | null) => void;
}

export function HomeFeaturedProducts({
  tab,
  brand,
  products,
  onTabChange,
  onBrandChange,
}: HomeFeaturedProductsProps) {
  return (
    <StoreSection noPaddingBottom>
      <div className="overflow-hidden rounded-lg">
        <div className="border-orange flex flex-col gap-3 rounded-t-lg border-b-2 bg-white px-4 py-4 md:flex-row md:flex-wrap md:items-center md:gap-5">
          <h2 className="text-secondary m-0 inline-flex items-center gap-2 text-xl font-extrabold tracking-[-0.01em] md:text-[22px]">
            <Flame
              className="shrink-0"
              size={22}
              strokeWidth={1.7}
              fill="none"
              style={{ color: 'var(--primary)' }}
              aria-hidden="true"
            />
            Sản phẩm nổi bật
          </h2>
          <div className="flex flex-wrap gap-1">
            {PROD_TABS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => onTabChange(t)}
                className={cn(
                  'text-muted-foreground cursor-pointer rounded-full px-3.5 py-1.5 text-[13px] font-medium',
                  tab === t && 'bg-secondary font-bold text-white',
                )}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="text-muted-foreground ml-auto hidden items-center gap-2 text-xs sm:flex">
            <span>Lọc:</span>
            {BRAND_FILTERS.map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => onBrandChange(brand === b ? null : b)}
                className={cn(
                  'cursor-pointer rounded-full border px-2.5 py-1 font-semibold',
                  brand === b ? 'border-orange text-primary' : 'text-muted-foreground border',
                )}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        <ProductGrid>
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </ProductGrid>
      </div>

      <div className="mt-5 text-center">
        <Button
          asChild
          variant="outline"
          className={cn('gap-2 font-bold', 'border-secondary text-secondary hover:bg-muted')}
        >
          <Link href="/san-pham">
            Xem thêm 240+ sản phẩm{' '}
            <ArrowRight
              className="shrink-0"
              size={14}
              strokeWidth={1.7}
              fill="none"
              aria-hidden="true"
            />
          </Link>
        </Button>
      </div>
    </StoreSection>
  );
}
