'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatVND } from '@/lib/format';
import { cn } from '@/lib/utils';
import type { StoreProduct } from '@/store/components/product-card';
import { StoreStars } from '@/store/components/store-stars';

const VOLUMES = ['5L', '18L', '20kg'] as const;

export interface ProductDetailInfoProps {
  product: StoreProduct;
}

export function ProductDetailInfo({ product: p }: ProductDetailInfoProps) {
  const [vol, setVol] = useState('18L');
  const [qty, setQty] = useState(1);

  return (
    <div>
      <div className="text-primary text-xs font-bold tracking-wide uppercase">
        {p.brand} · {p.cat}
      </div>
      <h1 className="text-secondary my-1.5 text-xl leading-tight font-extrabold md:text-[26px]">
        {p.name}
      </h1>
      <div className="text-muted-foreground mb-3 flex flex-wrap items-center gap-2 text-sm">
        <StoreStars n={p.rating} size={14} />
        <b className="text-foreground">{p.rating}</b>
        <span>· Đã bán {p.sold.toLocaleString('vi-VN')}</span>
        <span>·</span>
        <span className="text-success font-semibold">Còn hàng</span>
      </div>

      <div className="bg-muted mb-4 rounded-lg p-4">
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="text-primary text-3xl font-black tracking-[-0.02em]">
            {formatVND(p.price)}
          </span>
          <span className="text-muted-foreground text-xs line-through">{formatVND(p.old)}</span>
          <span className="bg-primary rounded px-2 py-0.5 text-xs font-extrabold text-white">
            {p.badge}
          </span>
        </div>
      </div>

      <div className="mb-3">
        <div className="mb-2 text-sm font-bold">Dung tích</div>
        <div className="flex flex-wrap gap-2">
          {VOLUMES.map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setVol(v)}
              className={cn(
                'cursor-pointer rounded-md border-[1.5px] px-4 py-2 text-sm font-semibold',
                vol === v ? 'border-orange text-primary' : 'text-muted-foreground border',
              )}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="flex items-center overflow-hidden rounded-lg border">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="bg-muted text-muted-foreground grid h-10 w-9 place-items-center text-lg"
          >
            −
          </button>
          <span className="w-11 text-center font-bold">{qty}</span>
          <button
            type="button"
            onClick={() => setQty((q) => q + 1)}
            className="bg-muted text-muted-foreground grid h-10 w-9 place-items-center text-lg"
          >
            +
          </button>
        </div>
        <span className="text-success text-sm font-semibold">
          <Truck className="shrink-0" size={13} strokeWidth={1.7} fill="none" aria-hidden="true" />{' '}
          Giao 2 giờ nội thành
        </span>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          asChild
          variant="outline"
          className={cn(
            'gap-2 font-bold',
            'border-secondary text-secondary hover:bg-muted',
            'flex-1',
          )}
        >
          <Link href="/gio-hang">
            <ShoppingCart
              className="shrink-0"
              size={16}
              strokeWidth={1.7}
              fill="none"
              aria-hidden="true"
            />
            Thêm vào giỏ
          </Link>
        </Button>
        <Button asChild variant="default" className={cn('gap-2 font-bold', 'flex-1')}>
          <Link href="/gio-hang">Mua ngay</Link>
        </Button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <span
            key={t}
            className="bg-muted text-muted-foreground rounded px-2.5 py-1 text-xs font-semibold"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
