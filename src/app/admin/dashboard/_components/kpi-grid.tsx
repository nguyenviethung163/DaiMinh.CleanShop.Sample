'use client';

import type { ReactNode } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Users,
} from 'lucide-react';
import { ADB } from '@/lib/data';
import { formatNum, shortVND } from '@/lib/format';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type KpiItem = {
  label: string;
  value: string;
  delta: string;
  deltaDir?: 'up' | 'down';
  icon: ReactNode;
  iconClass: string;
  sub?: string;
};

export function KpiGrid() {
  const k = ADB.KPI;

  const items: KpiItem[] = [
    {
      label: 'Doanh thu hôm nay',
      value: `${shortVND(k.revenueToday)} đ`,
      delta: '+12.4%',
      deltaDir: 'up',
      icon: <DollarSign className="size-4" />,
      iconClass: 'bg-primary/10 text-primary',
    },
    {
      label: 'Đơn hàng',
      value: formatNum(k.orders),
      delta: '+8.2%',
      deltaDir: 'up',
      icon: <ShoppingCart className="size-4" />,
      iconClass: 'bg-secondary/10 text-secondary',
      sub: `${k.ordersToday} đơn hôm nay`,
    },
    {
      label: 'Khách hàng mới',
      value: formatNum(k.newCustomers),
      delta: '+5.1%',
      deltaDir: 'up',
      icon: <Users className="size-4" />,
      iconClass: 'bg-accent text-accent-foreground',
      sub: 'trong tháng',
    },
    {
      label: 'Giá trị TB/đơn',
      value: `${shortVND(k.aov)} đ`,
      delta: '-2.3%',
      deltaDir: 'down',
      icon: <TrendingUp className="size-4" />,
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
            <div className="text-2xl font-bold tracking-tight">{item.value}</div>
            <div className="mt-1 flex items-center gap-1 text-xs">
              {item.deltaDir === 'down' ? (
                <ArrowDownRight className="text-destructive size-3" />
              ) : (
                <ArrowUpRight className="text-primary size-3" />
              )}
              <span
                className={cn(
                  'font-medium',
                  item.deltaDir === 'down' ? 'text-destructive' : 'text-primary',
                )}
              >
                {item.delta}
              </span>
              {item.sub && <span className="text-muted-foreground">· {item.sub}</span>}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
