import Link from 'next/link';
import { Heart, ShoppingCart, Truck } from 'lucide-react';
import { formatVND } from '@/lib/format';
import { cn } from '@/lib/utils';
import { getToneGradient } from '@/store/lib/tone-meta';
import { StoreStars } from './store-stars';

export interface StoreProduct {
  id: string;
  name: string;
  brand: string;
  cat: string;
  price: number;
  old: number;
  rating: number;
  sold: number;
  tone: string;
  tags: string[];
  badge: string;
}

export interface ProductCardProps {
  product: StoreProduct;
  href?: string;
  showQuickAdd?: boolean;
  showTags?: boolean;
  showFreeship?: boolean;
  compact?: boolean;
  className?: string;
}

export function ProductCard({
  product: p,
  href,
  showQuickAdd = true,
  showTags = true,
  showFreeship = false,
  compact = false,
  className,
}: ProductCardProps) {
  const to = href ?? `/san-pham/${p.id}`;

  return (
    <Link
      href={to}
      className={cn(
        'group text-foreground relative block bg-white p-3.5 no-underline hover:relative hover:z-10 hover:shadow-md',
        className,
      )}
    >
      <div className="relative mb-2.5">
        <div
          className={cn('relative overflow-hidden', 'w-full rounded-md')}
          style={{ background: getToneGradient(p.tone), aspectRatio: '1 / 1' }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, rgba(255,255,255,.06) 0 2px, transparent 2px 14px)',
            }}
          />
          <div className="absolute top-2.5 left-2.5 rounded bg-black/35 px-2 py-1 text-[10px] font-semibold tracking-[.04em] text-white/95 uppercase">
            Ảnh sản phẩm
          </div>
        </div>
        <div className="bg-primary absolute top-2 left-2 rounded px-2 py-0.5 text-[11px] font-extrabold text-white">
          {p.badge}
        </div>
        {!compact && (
          <div className="text-muted-foreground absolute top-2 right-2 grid h-7 w-7 place-items-center rounded-full bg-white/95 shadow-sm">
            <Heart
              className="shrink-0"
              size={14}
              strokeWidth={1.7}
              fill="none"
              aria-hidden="true"
            />
          </div>
        )}
        {showQuickAdd && (
          <div className="bg-secondary absolute right-2 bottom-2 left-2 flex items-center justify-center gap-1.5 rounded px-3 py-2 text-xs font-bold text-white opacity-0 transition-opacity group-hover:opacity-100">
            <ShoppingCart
              className="shrink-0"
              size={14}
              strokeWidth={1.7}
              fill="none"
              aria-hidden="true"
            />
            Thêm vào giỏ
          </div>
        )}
      </div>

      {!compact && (
        <div className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
          {p.brand} · {p.cat}
        </div>
      )}
      <div
        className={cn(
          'line-clamp-2 text-[13px] leading-[1.35] font-semibold',
          compact ? 'mt-0' : 'mt-1 min-h-9',
        )}
      >
        {p.name}
      </div>
      {!compact && (
        <div className="text-muted-foreground mt-1 flex items-center gap-2 text-xs">
          <StoreStars n={p.rating} />
          <span className="text-foreground font-semibold">{p.rating}</span>
          <span>· Đã bán {p.sold.toLocaleString('vi-VN')}</span>
        </div>
      )}
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-primary text-[17px] font-extrabold tracking-[-0.01em]">
          {formatVND(p.price)}
        </span>
        <span className="text-muted-foreground text-xs line-through">{formatVND(p.old)}</span>
      </div>
      {showTags && !compact && (
        <div className="mt-2 flex flex-wrap gap-1">
          {p.tags.map((tg) => (
            <span
              key={tg}
              className="text-muted-foreground rounded bg-[#f1f3f8] px-1.5 py-0.5 text-xs font-semibold"
            >
              {tg}
            </span>
          ))}
        </div>
      )}
      {showFreeship && (
        <div className="text-success mt-2 flex items-center gap-1 text-xs font-semibold">
          <Truck className="shrink-0" size={12} strokeWidth={1.7} fill="none" aria-hidden="true" />
          Freeship · Giao 2 giờ
        </div>
      )}
    </Link>
  );
}

export function ProductGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'bg-border grid grid-cols-2 gap-px overflow-hidden rounded-b-lg md:grid-cols-3 lg:grid-cols-4',
        className,
      )}
    >
      {children}
    </div>
  );
}
