'use client';

import type { ReactNode } from 'react';
import { Clock, DollarSign, RefreshCw, ShoppingCart, Truck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type SummaryItem = {
  label: string;
  value: string | number;
  icon: ReactNode;
  iconClass: string;
};

type OrdersSummaryProps = {
  pendingCount: number;
};

export function OrdersSummary({ pendingCount }: OrdersSummaryProps) {
  const items: SummaryItem[] = [
    {
      label: 'Tổng đơn tháng',
      value: '342',
      icon: <ShoppingCart className="size-4" />,
      iconClass: 'bg-secondary/10 text-secondary',
    },
    {
      label: 'Doanh thu',
      value: '1.28 tỷ',
      icon: <DollarSign className="size-4" />,
      iconClass: 'bg-primary/10 text-primary',
    },
    {
      label: 'Chờ xử lý',
      value: pendingCount,
      icon: <Clock className="size-4" />,
      iconClass: 'bg-muted text-muted-foreground',
    },
    {
      label: 'Đang giao',
      value: 18,
      icon: <Truck className="size-4" />,
      iconClass: 'bg-accent text-accent-foreground',
    },
    {
      label: 'Tỷ lệ hoàn',
      value: '1.2%',
      icon: <RefreshCw className="size-4" />,
      iconClass: 'bg-destructive/10 text-destructive',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {items.map((item) => (
        <Card key={item.label}>
          <CardContent className="flex items-center gap-3 p-4">
            <div
              className={cn('flex size-9 items-center justify-center rounded-lg', item.iconClass)}
            >
              {item.icon}
            </div>
            <div>
              <p className="text-lg leading-none font-bold">{item.value}</p>
              <p className="text-muted-foreground mt-1 text-xs">{item.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
