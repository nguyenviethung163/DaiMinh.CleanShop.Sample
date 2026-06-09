'use client';

import type { ReactNode } from 'react';
import { Clock, Eye, FileText, Star } from 'lucide-react';
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

export function CmsSummary() {
  const reviewCount = ADB.POSTS.filter((p) => p.status === 'review').length;

  const items: SummaryItem[] = [
    {
      label: 'Tổng bài viết',
      value: '142',
      icon: <FileText className="size-4" />,
      iconClass: 'bg-secondary/10 text-secondary',
    },
    {
      label: 'Lượt xem tháng',
      value: '86.4K',
      delta: '+22%',
      icon: <Eye className="size-4" />,
      iconClass: 'bg-primary/10 text-primary',
    },
    {
      label: 'Đang chờ duyệt',
      value: String(reviewCount),
      icon: <Clock className="size-4" />,
      iconClass: 'bg-muted text-muted-foreground',
    },
    {
      label: 'Bài viết nổi bật',
      value: 'Xu hướng màu 2026',
      sub: '12.480 lượt xem',
      icon: <Star className="size-4" />,
      iconClass: 'bg-accent text-accent-foreground',
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
