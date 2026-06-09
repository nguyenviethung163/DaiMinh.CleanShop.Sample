'use client';

import type { ReactNode } from 'react';
import { Check, ClipboardList, DollarSign, TrendingUp } from 'lucide-react';
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

type QuotesSummaryProps = {
  pipelineValue: number;
  openCount: number;
  wonCount: number;
  wonValue: number;
};

export function QuotesSummary({
  pipelineValue,
  openCount,
  wonCount,
  wonValue,
}: QuotesSummaryProps) {
  const items: SummaryItem[] = [
    {
      label: 'Pipeline đang mở',
      value: `${(pipelineValue / 1e6).toFixed(0)}tr đ`,
      sub: `${openCount} báo giá`,
      icon: <ClipboardList className="size-4" />,
      iconClass: 'bg-secondary/10 text-secondary',
    },
    {
      label: 'Chốt tháng này',
      value: `${wonCount} đơn`,
      delta: '+2',
      sub: `${(wonValue / 1e6).toFixed(0)}tr giá trị`,
      icon: <Check className="size-4" />,
      iconClass: 'bg-accent text-accent-foreground',
    },
    {
      label: 'Tỷ lệ chốt',
      value: '42%',
      delta: '+5%',
      icon: <TrendingUp className="size-4" />,
      iconClass: 'bg-primary/10 text-primary',
    },
    {
      label: 'Giá trị TB/báo giá',
      value: '186tr đ',
      icon: <DollarSign className="size-4" />,
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
