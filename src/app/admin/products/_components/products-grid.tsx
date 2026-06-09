'use client';

import { formatNum, formatVND } from '@/lib/format';
import { getProductToneClass, getStockBadge } from '../_lib/product-meta';
import type { Product } from '../_lib/product-meta';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type ProductsGridProps = {
  rows: Product[];
  onSelect: (product: Product) => void;
};

export function ProductsGrid({ rows, onSelect }: ProductsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4">
      {rows.map((product) => {
        const stock = getStockBadge(product);
        return (
          <Card
            key={product.id}
            className="cursor-pointer overflow-hidden py-0 transition-shadow hover:shadow-md"
            onClick={() => onSelect(product)}
          >
            <CardContent className="p-0">
              <div className="relative">
                <div className={cn('aspect-[4/3] w-full', getProductToneClass(product.tone))} />
                <Badge variant={stock.variant} className="absolute top-2 left-2">
                  {stock.label}
                </Badge>
              </div>
              <div className="p-3">
                <p className="text-primary text-xs font-bold tracking-wide uppercase">
                  {product.brand}
                </p>
                <p className="mt-1 line-clamp-2 min-h-[2.125rem] text-sm font-semibold">
                  {product.name}
                </p>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="font-bold">{formatVND(product.price)}</span>
                  <span className="text-muted-foreground text-xs">
                    Đã bán {formatNum(product.sold)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
