'use client';

import { LogOut, Monitor } from 'lucide-react';
import { ADB } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const shift = ADB.POS_SHIFT;

export function ShiftSummary() {
  const stats = [
    { label: 'Đơn trong ca', value: String(shift.orders) },
    { label: 'Tiền mặt', value: `${(shift.cash / 1e6).toFixed(1)}tr` },
    { label: 'Chuyển khoản', value: `${(shift.transfer / 1e6).toFixed(1)}tr` },
  ];

  return (
    <Card>
      <CardContent className="flex flex-wrap items-center gap-4 p-4">
        <div className="flex items-center gap-3">
          <div className="bg-secondary/10 text-secondary flex size-10 items-center justify-center rounded-lg">
            <Monitor className="size-5" />
          </div>
          <div>
            <p className="font-semibold">{shift.register}</p>
            <p className="text-muted-foreground text-xs">
              Thu ngân: {shift.cashier} · Mở ca {shift.opened}
            </p>
          </div>
        </div>
        <div className="ml-auto flex flex-wrap items-center gap-5">
          {stats.map((item) => (
            <div key={item.label} className="text-right">
              <p className="font-bold">{item.value}</p>
              <p className="text-muted-foreground text-xs">{item.label}</p>
            </div>
          ))}
          <Button variant="outline" size="sm">
            <LogOut />
            Đóng ca
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
