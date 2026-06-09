'use client';

import { Download, Plus } from 'lucide-react';
import { ADB } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { TypographyH1, TypographyMuted } from '@/components/ui/typography';

type OrdersHeaderProps = {
  pendingCount: number;
  onCreate: () => void;
};

export function OrdersHeader({ pendingCount, onCreate }: OrdersHeaderProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="space-y-1">
        <TypographyH1 className="text-xl">Quản lý đơn hàng</TypographyH1>
        <TypographyMuted>
          Tổng {ADB.ORDERS.length} đơn · {pendingCount} đơn chờ xử lý
        </TypographyMuted>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Download />
          Xuất Excel
        </Button>
        <Button size="sm" onClick={onCreate}>
          <Plus />
          Tạo đơn mới
        </Button>
      </div>
    </div>
  );
}
