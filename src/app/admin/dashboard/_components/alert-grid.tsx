'use client';

import type { ReactNode } from 'react';
import { ArrowRight, ClipboardList, RefreshCw, ShoppingCart, Warehouse } from 'lucide-react';
import { ADB } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type AlertTone = 'primary' | 'destructive' | 'secondary' | 'muted';

type AlertItem = {
  tone: AlertTone;
  icon: ReactNode;
  count: number;
  label: string;
  cta: string;
};

const TONE_STYLES: Record<AlertTone, { border: string; icon: string; cta: string }> = {
  primary: {
    border: 'border-l-primary',
    icon: 'bg-primary/10 text-primary',
    cta: 'text-primary',
  },
  destructive: {
    border: 'border-l-destructive',
    icon: 'bg-destructive/10 text-destructive',
    cta: 'text-destructive',
  },
  secondary: {
    border: 'border-l-secondary',
    icon: 'bg-secondary/10 text-secondary',
    cta: 'text-secondary',
  },
  muted: {
    border: 'border-l-muted-foreground',
    icon: 'bg-muted text-muted-foreground',
    cta: 'text-foreground',
  },
};

export function AlertGrid() {
  const k = ADB.KPI;

  const alerts: AlertItem[] = [
    {
      tone: 'primary',
      icon: <ShoppingCart className="size-5" />,
      count: k.pendingOrders,
      label: 'đơn chờ xác nhận',
      cta: 'Xử lý ngay',
    },
    {
      tone: 'destructive',
      icon: <Warehouse className="size-5" />,
      count: k.lowStock,
      label: 'sản phẩm sắp hết hàng',
      cta: 'Kiểm tra kho',
    },
    {
      tone: 'secondary',
      icon: <ClipboardList className="size-5" />,
      count: k.openQuotes,
      label: 'báo giá đang chờ',
      cta: 'Xem báo giá',
    },
    {
      tone: 'muted',
      icon: <RefreshCw className="size-5" />,
      count: k.refunds,
      label: 'yêu cầu hoàn tiền',
      cta: 'Phê duyệt',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {alerts.map((alert) => {
        const style = TONE_STYLES[alert.tone];
        return (
          <Card key={alert.label} className={cn('border-l-4 py-4', style.border)}>
            <CardContent className="flex items-center gap-3 px-4">
              <div
                className={cn('grid size-10 shrink-0 place-items-center rounded-lg', style.icon)}
              >
                {alert.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-lg leading-none font-bold">{alert.count}</div>
                <div className="text-muted-foreground mt-1 text-xs">{alert.label}</div>
              </div>
              <Button variant="link" size="sm" className={cn('h-auto shrink-0 p-0', style.cta)}>
                {alert.cta}
                <ArrowRight />
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
