'use client';

import type { ReactNode } from 'react';
import { AlertTriangle, Box, Truck, Warehouse } from 'lucide-react';
import { ADB } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type SummaryItem = {
  label: string;
  value: string;
  sub?: string;
  delta?: string;
  icon: ReactNode;
  iconClass: string;
};

export function InventorySummary() {
  const lowCount = ADB.INVENTORY.filter((p) => p.onHand < p.reorder).length;
  const totalValue = ADB.INVENTORY.reduce((sum, p) => sum + p.onHand * p.cost, 0);

  const items: SummaryItem[] = [
    {
      label: 'Giá trị tồn kho',
      value: `${(totalValue / 1e6).toFixed(0)}tr đ`,
      sub: 'theo giá vốn',
      icon: <Warehouse className="size-4" />,
      iconClass: 'bg-secondary/10 text-secondary',
    },
    {
      label: 'Tổng SKU',
      value: String(ADB.INVENTORY.length),
      sub: 'đang theo dõi',
      icon: <Box className="size-4" />,
      iconClass: 'bg-accent text-accent-foreground',
    },
    {
      label: 'Dưới ngưỡng',
      value: String(lowCount),
      delta: 'cần đặt thêm',
      icon: <AlertTriangle className="size-4" />,
      iconClass: 'bg-destructive/10 text-destructive',
    },
    {
      label: 'Hàng đang về',
      value: '3 đơn NCC',
      sub: '450 sản phẩm',
      icon: <Truck className="size-4" />,
      iconClass: 'bg-muted text-muted-foreground',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <Card key={item.label}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardDescription>{item.label}</CardDescription>
            <div className={cn('rounded-md p-2', item.iconClass)}>{item.icon}</div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold tracking-tight">{item.value}</p>
            <p className="text-muted-foreground mt-1 text-xs">
              {item.delta && <span className="text-destructive font-medium">{item.delta} · </span>}
              {item.sub ?? 'so với tháng trước'}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
