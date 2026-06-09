import Link from 'next/link';
import type { StoreProduct } from '@/store/components/product-card';
import { StoreContainer } from '@/store/components/store-container';
import { ProductDetailGallery } from './product-detail-gallery';
import { ProductDetailInfo } from './product-detail-info';
import { ProductDetailRelated } from './product-detail-related';
import { ProductDetailTabs } from './product-detail-tabs';

export interface CatalogProductDetailProps {
  product: StoreProduct;
  related: StoreProduct[];
}

export function CatalogProductDetail({ product, related }: CatalogProductDetailProps) {
  return (
    <div>
      <StoreContainer className="pt-6 pb-10">
        <nav className="text-muted-foreground mb-4 text-sm">
          <Link href="/" className="hover:text-foreground text-inherit no-underline">
            Trang chủ
          </Link>
          {' / '}
          <Link href="/san-pham" className="hover:text-foreground text-inherit no-underline">
            Sản phẩm
          </Link>
          {' / '}
          <span className="text-foreground">{product.brand}</span>
        </nav>

        <div className="grid grid-cols-1 gap-6 rounded-[10px] border bg-white p-5 md:p-6 lg:grid-cols-2">
          <ProductDetailGallery tone={product.tone} />
          <ProductDetailInfo product={product} />
        </div>

        <ProductDetailTabs product={product} />
      </StoreContainer>

      <ProductDetailRelated products={related} />
    </div>
  );
}
