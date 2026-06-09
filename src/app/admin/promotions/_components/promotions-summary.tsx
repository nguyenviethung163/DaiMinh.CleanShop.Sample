'use client';

import type { ReactNode } from 'react';
import { CreditCard, DollarSign, Tag, TrendingUp } from 'lucide-react';
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

export function PromotionsSummary() {
  const activeCount = ADB.VOUCHERS.filter((v) => v.status === 'active').length;

  const items: SummaryItem[] = [
    {
      label: 'Voucher đang chạy',
      value: String(activeCount),
      icon: <Tag className="size-4" />,
      iconClass: 'bg-secondary/10 text-secondary',
    },
    {
      label: 'Lượt sử dụng',
      value: '5.160',
      delta: '+18%',
      sub: 'trong tháng',
      icon: <TrendingUp className="size-4" />,
      iconClass: 'bg-primary/10 text-primary',
    },
    {
      label: 'Doanh thu từ KM',
      value: '284tr đ',
      sub: 'đơn dùng voucher',
      icon: <DollarSign className="size-4" />,
      iconClass: 'bg-accent text-accent-foreground',
    },
    {
      label: 'Chi phí KM',
      value: '42tr đ',
      sub: 'giá trị giảm giá',
      icon: <CreditCard className="size-4" />,
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
