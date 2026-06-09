'use client';

import { Banknote, CreditCard, Minus, Plus, QrCode, RefreshCw, Trash2 } from 'lucide-react';
import { formatVND } from '@/lib/format';
import type { CartLine } from '../_lib/cart';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { getInitials } from '@/lib/utils';

type Customer = {
  id: string;
  name: string;
  phone: string;
  tier: string;
};

type CartPanelProps = {
  cart: CartLine[];
  customer: Customer;
  sub: number;
  discount: number;
  vat: number;
  total: number;
  qtyTotal: number;
  onPickCustomer: () => void;
  onChangeQty: (productId: string, delta: number) => void;
  onRemove: (productId: string) => void;
  onClear: () => void;
  onPay: (method: string) => void;
};

export function CartPanel({
  cart,
  customer,
  sub,
  discount,
  vat,
  total,
  qtyTotal,
  onPickCustomer,
  onChangeQty,
  onRemove,
  onClear,
  onPay,
}: CartPanelProps) {
  return (
    <Card className="flex h-full min-h-0 flex-col gap-0 overflow-hidden py-0">
      <button
        type="button"
        className="hover:bg-accent/50 flex items-center gap-3 border-b px-4 py-3 text-left transition-colors"
        onClick={onPickCustomer}
      >
        <Avatar>
          <AvatarFallback className="bg-secondary text-secondary-foreground">
            {getInitials(customer.name)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="font-semibold">{customer.name}</p>
          <p className="text-muted-foreground text-xs">
            {customer.phone} · {customer.tier}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onPickCustomer();
          }}
        >
          <RefreshCw />
          Đổi
        </Button>
      </button>

      <CardHeader className="flex-row items-center justify-between space-y-0 border-b px-4 py-3">
        <p className="font-semibold">
          Giỏ hàng <span className="text-muted-foreground">({qtyTotal})</span>
        </p>
        {cart.length > 0 && (
          <Button variant="link" className="text-destructive h-auto p-0" onClick={onClear}>
            Xoá tất cả
          </Button>
        )}
      </CardHeader>

      <CardContent className="min-h-0 flex-1 p-0">
        <ScrollArea className="h-full max-h-[calc(100vh-28rem)] px-4">
          {cart.length === 0 ? (
            <Empty className="py-12">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <CreditCard />
                </EmptyMedia>
                <EmptyTitle>Chưa có sản phẩm</EmptyTitle>
                <EmptyDescription>Chọn sản phẩm bên trái để thêm vào giỏ.</EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            <div className="flex flex-col gap-3 py-3">
              {cart.map((line) => (
                <div key={line.product.id} className="flex items-center gap-3">
                  <Skeleton className="size-11 shrink-0 rounded-lg" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{line.product.name}</p>
                    <p className="text-primary text-sm font-semibold">
                      {formatVND(line.product.posPrice)}
                    </p>
                  </div>
                  <div className="flex items-center overflow-hidden rounded-md border">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="rounded-none"
                      onClick={() => onChangeQty(line.product.id, -1)}
                    >
                      <Minus />
                    </Button>
                    <span className="w-8 text-center text-sm font-semibold">{line.qty}</span>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="rounded-none"
                      onClick={() => onChangeQty(line.product.id, 1)}
                    >
                      <Plus />
                    </Button>
                  </div>
                  <Button variant="ghost" size="icon-sm" onClick={() => onRemove(line.product.id)}>
                    <Trash2 />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>

      <CardFooter className="bg-muted/30 flex-col gap-3 border-t p-4">
        <div className="w-full space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tạm tính</span>
            <span className="font-medium">{formatVND(sub)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Giảm giá (5%)</span>
            <span className="text-primary font-medium">− {formatVND(discount)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">VAT (8%)</span>
            <span className="font-medium">{formatVND(vat)}</span>
          </div>
          <Separator />
          <div className="flex items-baseline justify-between">
            <span className="font-semibold">Tổng cộng</span>
            <span className="text-secondary text-2xl font-bold">{formatVND(total)}</span>
          </div>
        </div>
        <div className="grid w-full grid-cols-2 gap-2">
          <Button variant="outline" disabled={!cart.length} onClick={() => onPay('Tiền mặt')}>
            <Banknote />
            Tiền mặt
          </Button>
          <Button
            variant="outline"
            disabled={!cart.length}
            onClick={() => onPay('Chuyển khoản QR')}
          >
            <QrCode />
            Chuyển khoản
          </Button>
        </div>
        <Button
          className="w-full"
          size="lg"
          disabled={!cart.length}
          onClick={() => onPay('Thẻ / Khác')}
        >
          <CreditCard />
          Thanh toán · {formatVND(total)}
        </Button>
      </CardFooter>
    </Card>
  );
}
