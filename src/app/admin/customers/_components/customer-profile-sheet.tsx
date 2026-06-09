'use client';

import { Mail, Phone, Plus } from 'lucide-react';
import { ADB } from '@/lib/data';
import { formatNum, formatVND } from '@/lib/format';
import { getOrderStatusVariant } from '@/app/admin/dashboard/_lib/order-status';
import { getCustomerTypeVariant, getNextTier, getTierVariant } from '../_lib/customer-meta';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { cn, getInitials } from '@/lib/utils';
import { toast } from 'sonner';

type Customer = (typeof ADB.CUSTOMERS)[number];

type CustomerProfileSheetProps = {
  customer: Customer | null;
  onClose: () => void;
};

const SPENDING_BARS = [40, 65, 50, 80, 72, 95];

export function CustomerProfileSheet({ customer, onClose }: CustomerProfileSheetProps) {
  if (!customer) return null;

  const nextTier = getNextTier(customer.tier);

  return (
    <Sheet open={!!customer} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
        <SheetHeader>
          <div className="flex items-start justify-between gap-3 pr-8">
            <div>
              <SheetTitle>{customer.name}</SheetTitle>
              <SheetDescription>
                {customer.id} · Thành viên từ {customer.joined}
              </SheetDescription>
            </div>
            <Badge variant={getTierVariant(customer.tier)}>{customer.tier}</Badge>
          </div>
        </SheetHeader>

        <div className="flex flex-col gap-4 px-4 pb-4">
          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <Avatar className="size-14">
                <AvatarFallback className="text-lg">{getInitials(customer.name)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="text-lg font-semibold">{customer.name}</p>
                <p className="text-muted-foreground text-sm">
                  {customer.phone} · {customer.email}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <Badge variant={getCustomerTypeVariant(customer.type)}>{customer.type}</Badge>
                  <Badge variant="outline">{customer.city}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Tổng đơn', value: String(customer.orders), className: 'text-secondary' },
              {
                label: 'Tổng chi tiêu',
                value: `${(customer.spent / 1e6).toFixed(0)}tr`,
                className: 'text-primary',
              },
              {
                label: 'Điểm tích lũy',
                value: formatNum(customer.points),
                className: 'text-accent-foreground',
              },
            ].map((item) => (
              <Card key={item.label}>
                <CardContent className="pt-4 text-center">
                  <p className={cn('text-xl font-bold tracking-tight', item.className)}>
                    {item.value}
                  </p>
                  <p className="text-muted-foreground mt-1 text-xs">{item.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Hạng thành viên</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>
                  Hạng hiện tại: <span className="font-semibold">{customer.tier}</span>
                </span>
                <span className="text-muted-foreground">Lên hạng {nextTier}</span>
              </div>
              <Progress value={58} />
              <p className="text-muted-foreground text-xs">
                Còn <span className="text-foreground font-semibold">5.4tr đ</span> chi tiêu để lên
                hạng {nextTier}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Chi tiêu 6 tháng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-24 items-end gap-2">
                {SPENDING_BARS.map((height, i) => (
                  <div key={i} className="flex min-w-0 flex-1 flex-col items-center gap-1">
                    <div
                      className={cn(
                        'w-full rounded-md',
                        i === 5 ? 'bg-primary' : 'bg-secondary/80',
                      )}
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-muted-foreground text-xs">T{i + 1}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="gap-0 py-0">
            <CardHeader className="border-b">
              <CardTitle className="text-base">Đơn hàng gần đây</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {ADB.ORDERS.slice(0, 4).map((order, i) => {
                const status = ADB.ORDER_STATUS[order.status as keyof typeof ADB.ORDER_STATUS];
                return (
                  <div
                    key={order.id}
                    className={cn('flex items-center gap-3 px-4 py-3', i > 0 && 'border-t')}
                  >
                    <div>
                      <p className="text-secondary font-mono text-sm font-semibold">{order.id}</p>
                      <p className="text-muted-foreground mt-0.5 text-xs">
                        {order.date} · {order.items} sản phẩm
                      </p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="font-semibold">{formatVND(order.total)}</p>
                      <Badge variant={getOrderStatusVariant(order.status)} className="mt-1">
                        {status.label}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        <SheetFooter className="flex-row gap-2 border-t pt-4">
          <Button variant="outline" size="sm" onClick={() => toast.success('Đã gửi email')}>
            <Mail />
            Gửi email
          </Button>
          <Button variant="outline" size="sm">
            <Phone />
            Gọi điện
          </Button>
          <Button size="sm" onClick={() => toast.success(`Mở tạo đơn cho ${customer.name}`)}>
            <Plus />
            Tạo đơn cho khách
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
