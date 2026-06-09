'use client';

import { Plus, Upload } from 'lucide-react';
import { ADB } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { TypographyH1, TypographyMuted } from '@/components/ui/typography';

type ProductsHeaderProps = {
  onCreate: () => void;
};

export function ProductsHeader({ onCreate }: ProductsHeaderProps) {
  const outCount = ADB.PRODUCTS.filter((p) => p.status === 'out').length;
  const lowCount = ADB.PRODUCTS.filter((p) => p.status === 'low').length;

  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="space-y-1">
        <TypographyH1 className="text-xl">Quản lý sản phẩm</TypographyH1>
        <TypographyMuted>
          {ADB.PRODUCTS.length} sản phẩm · {outCount} hết hàng · {lowCount} sắp hết
        </TypographyMuted>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Upload />
          Nhập từ Excel
        </Button>
        <Button size="sm" onClick={onCreate}>
          <Plus />
          Thêm sản phẩm
        </Button>
      </div>
    </div>
  );
}
