import type { StoreProduct } from '@/store/components/product-card';
import { ProductCard, ProductGrid } from '@/store/components/product-card';
import { StoreSection, StoreSectionHead } from '@/store/components/store-section';

export interface ProductDetailRelatedProps {
  products: StoreProduct[];
}

export function ProductDetailRelated({ products }: ProductDetailRelatedProps) {
  return (
    <StoreSection noPaddingBottom>
      <StoreSectionHead title="Sản phẩm liên quan" />
      <div className="overflow-hidden rounded-lg">
        <ProductGrid>
          {products.map((r) => (
            <ProductCard key={r.id} product={r} compact showQuickAdd={false} showTags={false} />
          ))}
        </ProductGrid>
      </div>
    </StoreSection>
  );
}
