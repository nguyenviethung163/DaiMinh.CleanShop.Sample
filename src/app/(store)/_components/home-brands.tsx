import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BRANDS } from '@/store/data';
import { StoreSection, StoreSectionHead } from '@/store/components/store-section';

export function HomeBrands() {
  return (
    <StoreSection noPaddingBottom>
      <StoreSectionHead
        title="Thương hiệu phân phối chính hãng"
        action={
          <Link
            href="/san-pham"
            className="text-primary inline-flex items-center gap-1.5 text-sm font-bold no-underline"
          >
            Xem tất cả 18 thương hiệu{' '}
            <ArrowRight
              className="shrink-0"
              size={12}
              strokeWidth={1.7}
              fill="none"
              aria-hidden="true"
            />
          </Link>
        }
      />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {BRANDS.map((b) => (
          <div
            key={b.name}
            className="relative cursor-pointer rounded-lg border bg-white px-3.5 py-4 text-center"
          >
            <div className="bg-primary/10 text-primary absolute top-2 right-2 rounded px-1.5 py-0.5 text-[9px] font-bold">
              {b.tag}
            </div>
            <div className="text-secondary text-[22px] font-black tracking-[-0.02em] italic">
              {b.name}
            </div>
            <div className="text-muted-foreground mt-1.5 text-xs">{b.line}</div>
          </div>
        ))}
      </div>
    </StoreSection>
  );
}
