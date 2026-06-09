'use client';

import { Plus, QrCode, Search } from 'lucide-react';
import { ADB } from '@/lib/data';
import { formatVND } from '@/lib/format';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

type ProductGridProps = {
  category: string;
  query: string;
  onCategoryChange: (value: string) => void;
  onQueryChange: (value: string) => void;
  onAdd: (product: (typeof ADB.POS_PRODUCTS)[number]) => void;
};

export function ProductGrid({
  category,
  query,
  onCategoryChange,
  onQueryChange,
  onAdd,
}: ProductGridProps) {
  const products = ADB.POS_PRODUCTS.filter(
    (product) =>
      (category === 'Tất cả' || product.cat === category) &&
      (!query ||
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.sku.toLowerCase().includes(query.toLowerCase())),
  );

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3">
      <div className="relative">
        <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
        <Input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Quét mã vạch hoặc tìm sản phẩm…"
          className="bg-card pr-10 pl-9"
        />
        <QrCode className="text-secondary pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2" />
      </div>

      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-2 pb-1">
          {ADB.POS_CATEGORIES.map((cat) => (
            <Button
              key={cat}
              size="sm"
              variant={category === cat ? 'default' : 'outline'}
              className="shrink-0 rounded-full"
              onClick={() => onCategoryChange(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <ScrollArea className="min-h-0 flex-1">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3 pr-3">
          {products.map((product) => {
            const outOfStock = product.stock === 0;
            return (
              <Card
                key={product.id}
                className={cn(
                  'cursor-pointer gap-0 overflow-hidden py-0 transition-opacity',
                  outOfStock && 'cursor-not-allowed opacity-50',
                )}
                onClick={() => !outOfStock && onAdd(product)}
              >
                <div className="relative">
                  <Skeleton className="aspect-square w-full rounded-none" />
                  {outOfStock && (
                    <div className="bg-background/60 absolute inset-0 flex items-center justify-center">
                      <Badge variant="destructive">Hết hàng</Badge>
                    </div>
                  )}
                  <Badge className="bg-foreground/70 text-background hover:bg-foreground/70 absolute top-2 right-2">
                    Tồn {product.stock}
                  </Badge>
                </div>
                <div className="space-y-1 p-3">
                  <p className="text-primary text-[10px] font-bold tracking-wide uppercase">
                    {product.brand}
                  </p>
                  <p className="line-clamp-2 min-h-[2.5rem] text-sm font-medium">{product.name}</p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="font-bold">{formatVND(product.posPrice)}</span>
                    <span className="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-md">
                      <Plus className="size-4" />
                    </span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
