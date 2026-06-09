'use client';

import { useState } from 'react';
import { Check, Minus, Plus, Trash2 } from 'lucide-react';
import { ADB } from '@/lib/data';
import { formatVND } from '@/lib/format';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type LineItem = {
  product: (typeof ADB.PRODUCTS)[number];
  qty: number;
};

type OrderFormDialogProps = {
  open: boolean;
  onClose: () => void;
};

export function OrderFormDialog({ open, onClose }: OrderFormDialogProps) {
  const [lines, setLines] = useState<LineItem[]>(() =>
    ADB.PRODUCTS.slice(0, 2).map((product, index) => ({
      product,
      qty: index === 0 ? 2 : 1,
    })),
  );

  const sub = lines.reduce((sum, line) => sum + line.product.price * line.qty, 0);
  const ship = sub >= 2_000_000 ? 0 : 30_000;

  const addLine = () =>
    setLines((current) => [
      ...current,
      {
        product: ADB.PRODUCTS[(current.length * 3) % ADB.PRODUCTS.length],
        qty: 1,
      },
    ]);

  const removeLine = (index: number) =>
    setLines((current) => current.filter((_, i) => i !== index));

  const setQty = (index: number, qty: number) =>
    setLines((current) =>
      current.map((line, i) => (i === index ? { ...line, qty: Math.max(1, qty) } : line)),
    );

  const setProduct = (index: number, productId: string) => {
    const product = ADB.PRODUCTS.find((item) => item.id === productId);
    if (!product) return;
    setLines((current) => current.map((line, i) => (i === index ? { ...line, product } : line)));
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Tạo đơn hàng mới</DialogTitle>
          <DialogDescription>Nhập thông tin khách và sản phẩm</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-2">
          <div className="space-y-3">
            <h3 className="font-semibold">Khách hàng</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="customer-name">Tên khách hàng *</Label>
                <Input id="customer-name" placeholder="Nguyễn Văn A" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customer-phone">Số điện thoại *</Label>
                <Input id="customer-phone" placeholder="0988 xxx xxx" />
              </div>
              <div className="space-y-2">
                <Label>Kênh đặt hàng</Label>
                <Select defaultValue={ADB.channels[0]}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ADB.channels.map((channel) => (
                      <SelectItem key={channel} value={channel}>
                        {channel}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Thanh toán</Label>
                <Select defaultValue={ADB.payMethods[0]}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ADB.payMethods.map((method) => (
                      <SelectItem key={method} value={method}>
                        {method}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="customer-address">Địa chỉ giao hàng</Label>
                <Input id="customer-address" placeholder="Số nhà, đường, phường/xã…" />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Sản phẩm</h3>
              <Button variant="outline" size="sm" onClick={addLine}>
                <Plus />
                Thêm sản phẩm
              </Button>
            </div>
            <div className="overflow-hidden rounded-lg border">
              {lines.map((line, index) => (
                <div
                  key={`${line.product.id}-${index}`}
                  className={cn(
                    'flex flex-wrap items-center gap-3 p-3 sm:flex-nowrap',
                    index > 0 && 'border-t',
                  )}
                >
                  <Skeleton className="size-10 shrink-0 rounded-md" />
                  <div className="min-w-0 flex-1 space-y-1">
                    <Select
                      value={line.product.id}
                      onValueChange={(value) => setProduct(index, value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ADB.PRODUCTS.map((product) => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-muted-foreground text-xs">
                      {formatVND(line.product.price)} · Tồn {line.product.stock}
                    </p>
                  </div>
                  <div className="flex items-center overflow-hidden rounded-md border">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="rounded-none"
                      onClick={() => setQty(index, line.qty - 1)}
                    >
                      <Minus />
                    </Button>
                    <span className="w-9 text-center text-sm font-semibold">{line.qty}</span>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="rounded-none"
                      onClick={() => setQty(index, line.qty + 1)}
                    >
                      <Plus />
                    </Button>
                  </div>
                  <p className="w-28 text-right font-semibold">
                    {formatVND(line.product.price * line.qty)}
                  </p>
                  <Button variant="ghost" size="icon-sm" onClick={() => removeLine(index)}>
                    <Trash2 />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-muted/40 rounded-lg p-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tạm tính</span>
              <span className="font-medium">{formatVND(sub)}</span>
            </div>
            <div className="mt-2 flex justify-between">
              <span className="text-muted-foreground">Phí giao hàng</span>
              <span className="text-secondary font-medium">
                {ship ? formatVND(ship) : 'Miễn phí'}
              </span>
            </div>
            <Separator className="my-3" />
            <div className="flex items-baseline justify-between">
              <span className="font-semibold">Tổng cộng</span>
              <span className="text-primary text-xl font-bold">{formatVND(sub + ship)}</span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Huỷ
          </Button>
          <Button variant="secondary">Lưu nháp</Button>
          <Button
            onClick={() => {
              toast.success('Đã tạo đơn hàng mới');
              onClose();
            }}
          >
            <Check />
            Tạo đơn
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
