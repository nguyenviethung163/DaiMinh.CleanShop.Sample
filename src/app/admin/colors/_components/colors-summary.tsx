'use client';

import type { ReactNode } from 'react';
import { Layers, Palette, Star, TrendingUp } from 'lucide-react';
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

export function ColorsSummary() {
  const items: SummaryItem[] = [
    {
      label: 'Tổng mã màu',
      value: '2.048',
      sub: 'từ 18 thương hiệu',
      icon: <Palette className="size-4" />,
      iconClass: 'bg-secondary/10 text-secondary',
    },
    {
      label: 'Công thức pha',
      value: '1.284',
      sub: 'đã chuẩn hoá',
      icon: <Layers className="size-4" />,
      iconClass: 'bg-primary/10 text-primary',
    },
    {
      label: 'Pha trong tháng',
      value: '342 lượt',
      delta: '+12%',
      icon: <TrendingUp className="size-4" />,
      iconClass: 'bg-accent text-accent-foreground',
    },
    {
      label: 'Màu phổ biến nhất',
      value: 'Trắng tinh khôi',
      sub: '3.201 lượt pha',
      icon: <Star className="size-4" />,
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
              {item.delta && <span className="text-primary font-medium">{item.delta} · </span>}
              {item.sub ?? 'so với tháng trước'}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
