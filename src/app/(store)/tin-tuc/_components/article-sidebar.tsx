import Link from 'next/link';
import { Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getToneGradient } from '@/store/lib/tone-meta';
import { PRODUCTS, formatVND } from '@/store/data';

export function ArticleSidebar() {
  const product = PRODUCTS[0];

  return (
    <aside className="hidden flex-col gap-5 lg:flex">
      <div className="rounded-[10px] border bg-white p-4">
        <div className="text-primary mb-2 text-xs font-bold tracking-wide uppercase">
          Sản phẩm liên quan
        </div>
        <div
          className={cn('relative overflow-hidden', 'w-full rounded-md')}
          style={{ background: getToneGradient(product.tone ?? 'navy'), aspectRatio: '1/1' }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, rgba(255,255,255,.06) 0 2px, transparent 2px 14px)',
            }}
          />
        </div>
        <div className="text-muted-foreground mt-2 text-xs font-bold tracking-wide uppercase">
          {product.brand}
        </div>
        <div className="text-foreground mt-1 min-h-9 text-sm leading-snug font-semibold">
          {product.name}
        </div>
        <div className="text-primary mt-2 text-[17px] font-extrabold">
          {formatVND(product.price)}
        </div>
        <Button
          asChild
          variant="secondary"
          size="sm"
          className={cn('gap-2 font-bold', 'mt-2.5 w-full py-2 text-[12.5px]')}
        >
          <Link href={`/san-pham/${product.id}`}>Mua ngay</Link>
        </Button>
      </div>

      <div className="from-navy to-navy-deep rounded-[10px] bg-gradient-to-br p-[18px] text-white">
        <Palette
          className="text-primary shrink-0"
          size={22}
          strokeWidth={1.7}
          fill="none"
          aria-hidden="true"
        />
        <div className="mt-2 text-sm leading-tight font-extrabold">Cần tư vấn phối màu?</div>
        <p className="my-1.5 text-xs leading-relaxed opacity-82">
          Chuyên viên hỗ trợ miễn phí trong 15 phút.
        </p>
        <Button
          asChild
          variant="default"
          size="sm"
          className={cn('gap-2 font-bold', 'w-full py-2 text-[12.5px]')}
        >
          <Link href="/lien-he">Đặt lịch tư vấn</Link>
        </Button>
      </div>
    </aside>
  );
}
