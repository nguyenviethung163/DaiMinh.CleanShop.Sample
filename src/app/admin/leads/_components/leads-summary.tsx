'use client';

import type { ReactNode } from 'react';
import { DollarSign, Filter, Target, TrendingUp } from 'lucide-react';
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

type LeadsSummaryProps = {
  openCount: number;
  pipelineValue: number;
  wonCount: number;
  convRate: number;
};

export function LeadsSummary({ openCount, pipelineValue, wonCount, convRate }: LeadsSummaryProps) {
  const items: SummaryItem[] = [
    {
      label: 'Lead đang mở',
      value: String(openCount),
      sub: 'cần chăm sóc',
      icon: <Filter className="size-4" />,
      iconClass: 'bg-secondary/10 text-secondary',
    },
    {
      label: 'Giá trị pipeline',
      value: `${(pipelineValue / 1e6).toFixed(0)}tr đ`,
      delta: '+18%',
      icon: <DollarSign className="size-4" />,
      iconClass: 'bg-primary/10 text-primary',
    },
    {
      label: 'Chuyển đổi tháng',
      value: `${wonCount} lead`,
      delta: '+4',
      icon: <Target className="size-4" />,
      iconClass: 'bg-accent text-accent-foreground',
    },
    {
      label: 'Tỷ lệ chuyển đổi',
      value: `${convRate}%`,
      delta: '+5%',
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
