'use client';

import type { ReactNode } from 'react';
import { DollarSign, RefreshCw, Store, Users } from 'lucide-react';
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

export function CustomersSummary() {
  const items: SummaryItem[] = [
    {
      label: 'Tổng khách hàng',
      value: '8.247',
      delta: '+124',
      sub: 'khách mới tháng này',
      icon: <Users className="size-4" />,
      iconClass: 'bg-secondary/10 text-secondary',
    },
    {
      label: 'Khách quay lại',
      value: '64%',
      delta: '+3.2%',
      icon: <RefreshCw className="size-4" />,
      iconClass: 'bg-accent text-accent-foreground',
    },
    {
      label: 'Giá trị vòng đời TB',
      value: '32tr đ',
      sub: 'LTV trung bình',
      icon: <DollarSign className="size-4" />,
      iconClass: 'bg-primary/10 text-primary',
    },
    {
      label: 'Nhà thầu / DN',
      value: '412',
      sub: 'khách doanh nghiệp',
      icon: <Store className="size-4" />,
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
