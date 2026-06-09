'use client';

import type { ReactNode } from 'react';
import { Shield, Store, UserCheck, Users } from 'lucide-react';
import { ADB } from '@/lib/data';
import { isOnline } from '../_lib/staff-meta';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type SummaryItem = {
  label: string;
  value: string;
  icon: ReactNode;
  iconClass: string;
};

export function StaffSummary() {
  const onlineCount = ADB.STAFF.filter((s) => isOnline(s.last)).length;

  const items: SummaryItem[] = [
    {
      label: 'Tổng nhân viên',
      value: String(ADB.STAFF.length),
      icon: <Users className="size-4" />,
      iconClass: 'bg-secondary/10 text-secondary',
    },
    {
      label: 'Đang online',
      value: String(onlineCount),
      icon: <UserCheck className="size-4" />,
      iconClass: 'bg-primary/10 text-primary',
    },
    {
      label: 'Vai trò',
      value: String(ADB.ROLES.length),
      icon: <Shield className="size-4" />,
      iconClass: 'bg-accent text-accent-foreground',
    },
    {
      label: 'Phòng ban',
      value: '6',
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
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
