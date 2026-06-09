'use client';

import { Check, MapPin, Printer, Truck } from 'lucide-react';
import { ADB } from '@/lib/data';
import { formatVND } from '@/lib/format';
import { getOrderStatusVariant } from '../_lib/order-status';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { cn, getInitials } from '@/lib/utils';
import { toast } from 'sonner';

type Order = (typeof ADB.ORDERS)[number];

type OrderDetailSheetProps = {
  order: Order | null;
  onClose: () => void;
};

function getSteps(order: Order) {
  return [
    { label: 'Đặt hàng', done: true, time: `${order.time} ${order.date}` },
    {
      label: 'Xác nhận',
      done: ['confirmed', 'packing', 'shipping', 'done'].includes(order.status),
      time: `09:12 ${order.date}`,
    },
    {
      label: 'Chuẩn bị hàng',
      done: ['packing', 'shipping', 'done'].includes(order.status),
      time: `10:40 ${order.date}`,
    },
    {
      label: 'Đang giao',
      done: ['shipping', 'done'].includes(order.status),
      time: ['shipping', 'done'].includes(order.status) ? `14:20 ${order.date}` : '',
    },
    {
      label: 'Hoàn thành',
      done: order.status === 'done',
      time: order.status === 'done' ? `16:55 ${order.date}` : '',
    },
  ];
}

export function OrderDetailSheet({ order, onClose }: OrderDetailSheetProps) {
  if (!order) return null;

  const status = ADB.ORDER_STATUS[order.status as keyof typeof ADB.ORDER_STATUS];
  const lineItems = ADB.PRODUCTS.slice(0, order.items > 4 ? 4 : order.items);
  const sub = lineItems.reduce((sum, product) => sum + product.price, 0);
  const steps = getSteps(order);

  return (
    <Sheet open={!!order} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
        <SheetHeader>
          <div className="flex items-start justify-between gap-3 pr-8">
            <div>
              <SheetTitle>Đơn {order.id}</SheetTitle>
              <SheetDescription>
                {order.date} · {order.time} · {order.channel}
              </SheetDescription>
            </div>
            <Badge variant={getOrderStatusVariant(order.status)}>{status.label}</Badge>
          </div>
        </SheetHeader>

        <div className="space-y-4 px-4 pb-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Trạng thái xử lý</CardTitle>
            </CardHeader>
            <CardContent className="space-y-0">
              {steps.map((step, index) => (
                <div key={step.label} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        'flex size-7 items-center justify-center rounded-full',
                        step.done
                          ? 'bg-secondary text-secondary-foreground'
                          : 'border-border bg-background border-2',
                      )}
                    >
                      {step.done && <Check className="size-3.5" />}
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={cn(
                          'min-h-6 w-0.5 flex-1',
                          step.done ? 'bg-secondary' : 'bg-border',
                        )}
                      />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p
                      className={cn('text-sm font-semibold', !step.done && 'text-muted-foreground')}
                    >
                      {step.label}
                    </p>
                    {step.time && <p className="text-muted-foreground mt-1 text-xs">{step.time}</p>}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Khách hàng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarFallback>{getInitials(order.customer)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{order.customer}</p>
                    <p className="text-muted-foreground text-sm">{order.phone}</p>
                  </div>
                </div>
                <Badge variant="default">Khách hàng Vàng · 24 đơn</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Giao hàng</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-2 text-sm">
                <p className="flex gap-2">
                  <MapPin className="text-primary mt-0.5 size-4 shrink-0" />
                  {order.addr}
                </p>
                <p className="flex gap-2">
                  <Truck className="text-primary size-4 shrink-0" />
                  Giao siêu tốc 2 giờ
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="gap-0 py-0">
            <CardHeader className="border-b px-4 py-3">
              <CardTitle className="text-base">Sản phẩm ({order.items})</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {lineItems.map((product, index) => (
                <div
                  key={product.id}
                  className={cn('flex items-center gap-3 px-4 py-3', index > 0 && 'border-t')}
                >
                  <Skeleton className="size-12 shrink-0 rounded-lg" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{product.name}</p>
                    <p className="text-muted-foreground text-xs">SKU {product.sku} · x1</p>
                  </div>
                  <p className="font-semibold">{formatVND(product.price)}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Thanh toán</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tạm tính</span>
                <span className="font-medium">{formatVND(sub)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Giảm giá (SDM100)</span>
                <span className="text-primary font-medium">− 100.000đ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phí giao hàng</span>
                <span className="text-secondary font-medium">Miễn phí</span>
              </div>
              <Separator />
              <div className="flex items-baseline justify-between">
                <span className="font-semibold">Tổng cộng</span>
                <span className="text-primary text-xl font-bold">{formatVND(order.total)}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <SheetFooter className="flex-row gap-2 border-t px-4 py-4">
          <Button variant="outline" onClick={() => toast.success(`Đang in đơn ${order.id}`)}>
            <Printer />
            In đơn
          </Button>
          <Button variant="destructive">Huỷ đơn</Button>
          <Button
            className="flex-1"
            onClick={() => {
              toast.success(`Đã xác nhận đơn ${order.id}`);
              onClose();
            }}
          >
            <Check />
            Xác nhận & giao
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
