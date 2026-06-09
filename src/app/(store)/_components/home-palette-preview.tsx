import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PALETTE_GROUPS } from '@/store/lib/palette-data';
import { PaletteColorRow } from '@/store/components/palette/palette-color-row';
import { StoreSection } from '@/store/components/store-section';

export function HomePalettePreview() {
  return (
    <StoreSection noPaddingBottom>
      <div className="grid grid-cols-1 gap-6 rounded-lg bg-white p-5 md:p-7 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-8">
        <div>
          <div className="text-primary text-xs font-bold tracking-wide uppercase">Bảng màu sơn</div>
          <h2 className="text-secondary m-0 mt-1 text-[26px] leading-[1.15] font-extrabold tracking-[-0.01em]">
            Hơn 2.000 mã màu chính hãng – chọn ngay tông phù hợp
          </h2>
          <p className="text-muted-foreground mt-3 text-sm leading-[1.6]">
            Mỗi tông màu đều có mã chuẩn từ hãng và có thể pha tại showroom. Tư vấn viên sẽ hỗ trợ
            bạn chọn tông phù hợp với phong cách nhà.
          </p>
          <Button asChild variant="secondary" className={cn('gap-2 font-bold', 'mt-4')}>
            <Link href="/bang-mau">
              Xem bảng màu đầy đủ{' '}
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

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {Object.entries(PALETTE_GROUPS).map(([group, tones]) => (
            <div key={group}>
              <div className="text-secondary mb-3 text-base font-bold">{group}</div>
              <div className="flex flex-col gap-2">
                {tones.map((color) => (
                  <PaletteColorRow key={color.hex} color={color} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </StoreSection>
  );
}
