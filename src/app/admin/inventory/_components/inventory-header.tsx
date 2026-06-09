'use client';

import { PackageMinus, PackagePlus } from 'lucide-react';
import { ADB } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { TypographyH1, TypographyMuted } from '@/components/ui/typography';

type InventoryHeaderProps = {
  onStockIn: () => void;
  onStockOut: () => void;
};

export function InventoryHeader({ onStockIn, onStockOut }: InventoryHeaderProps) {
  const lowCount = ADB.INVENTORY.filter((p) => p.onHand < p.reorder).length;

  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="space-y-1">
        <TypographyH1 className="text-xl">Quản lý kho</TypographyH1>
        <TypographyMuted>
          {ADB.INVENTORY.length} mặt hàng · {lowCount} dưới ngưỡng đặt lại
        </TypographyMuted>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onStockOut}>
          <PackageMinus />
          Xuất kho
        </Button>
        <Button size="sm" onClick={onStockIn}>
          <PackagePlus />
          Nhập kho
        </Button>
      </div>
    </div>
  );
}
