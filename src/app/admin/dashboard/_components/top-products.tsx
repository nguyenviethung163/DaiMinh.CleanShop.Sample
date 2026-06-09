'use client';

import { ADB } from '@/lib/data';
import { formatNum, formatVND } from '@/lib/format';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const topProducts = [...ADB.PRODUCTS].sort((a, b) => b.sold - a.sold).slice(0, 5);

export function TopProducts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sản phẩm bán chạy</CardTitle>
        <CardDescription>Top theo số lượng tháng này</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {topProducts.map((product, index) => (
          <Item key={product.id} size="sm">
            <ItemMedia>
              <span
                className={cn(
                  'w-5 text-center text-sm font-bold italic',
                  index < 3 ? 'text-primary' : 'text-muted-foreground',
                )}
              >
                {index + 1}
              </span>
            </ItemMedia>
            <ItemMedia>
              <Skeleton className="size-10 rounded-md" />
            </ItemMedia>
            <ItemContent>
              <ItemTitle className="line-clamp-1">{product.name}</ItemTitle>
              <ItemDescription>
                {product.brand} · Đã bán {formatNum(product.sold)}
              </ItemDescription>
            </ItemContent>
            <span className="text-primary shrink-0 text-sm font-semibold">
              {formatVND(product.price)}
            </span>
          </Item>
        ))}
      </CardContent>
    </Card>
  );
}
