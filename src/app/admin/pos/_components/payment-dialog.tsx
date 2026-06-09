'use client';

import { useEffect, useMemo, useState } from 'react';
import { Check, QrCode } from 'lucide-react';
import { formatVND } from '@/lib/format';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import { cn } from '@/lib/utils';

type PaymentInfo = {
  method: string;
  total: number;
};

type PaymentDialogProps = {
  open: boolean;
  info: PaymentInfo | null;
  onClose: () => void;
  onDone: () => void;
};

export function PaymentDialog({ open, info, onClose, onDone }: PaymentDialogProps) {
  const [received, setReceived] = useState(0);
  const [eInvoice, setEInvoice] = useState(true);

  const quickAmounts = useMemo(() => {
    if (!info) return [];
    return [
      ...new Set([
        info.total,
        Math.ceil(info.total / 100_000) * 100_000,
        Math.ceil(info.total / 500_000) * 500_000,
        Math.ceil(info.total / 1_000_000) * 1_000_000,
      ]),
    ];
  }, [info]);

  useEffect(() => {
    if (!info) return;
    const isCash = info.method === 'Tiền mặt';
    setReceived(isCash ? (quickAmounts[1] ?? info.total) : info.total);
    setEInvoice(true);
  }, [info, quickAmounts]);

  if (!info) return null;

  const isCash = info.method === 'Tiền mặt';
  const change = Math.max(0, received - info.total);

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Thanh toán</DialogTitle>
          <DialogDescription>{info.method}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="text-center">
            <p className="text-muted-foreground text-sm">Số tiền cần thanh toán</p>
            <p className="text-secondary text-4xl font-bold">{formatVND(info.total)}</p>
          </div>

          {info.method === 'Chuyển khoản QR' ? (
            <div className="space-y-3 text-center">
              <div className="bg-card mx-auto flex size-52 items-center justify-center rounded-xl border">
                <QrCode className="text-secondary size-32" />
              </div>
              <p className="text-sm">Quét mã VietQR để thanh toán</p>
              <p className="text-muted-foreground text-xs">
                SƠN ĐẠI MINH JSC · VietinBank · 0901xxxxxx
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="received">Tiền khách đưa</Label>
                <Input
                  id="received"
                  value={received.toLocaleString('vi-VN')}
                  onChange={(e) => setReceived(Number(e.target.value.replace(/\D/g, '')) || 0)}
                  className="text-secondary text-right text-2xl font-bold"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {quickAmounts.map((amount) => (
                  <Button
                    key={amount}
                    type="button"
                    size="sm"
                    variant={received === amount ? 'default' : 'outline'}
                    className="flex-1"
                    onClick={() => setReceived(amount)}
                  >
                    {(amount / 1000).toLocaleString('vi-VN')}K
                  </Button>
                ))}
              </div>
              <div
                className={cn(
                  'flex items-center justify-between rounded-lg border p-4',
                  change > 0 ? 'border-secondary/20 bg-secondary/5' : 'bg-muted/50',
                )}
              >
                <span className="font-semibold">Tiền thối lại</span>
                <span
                  className={cn(
                    'text-2xl font-bold',
                    change > 0 ? 'text-secondary' : 'text-muted-foreground',
                  )}
                >
                  {formatVND(change)}
                </span>
              </div>
            </div>
          )}

          <label className="flex cursor-pointer items-center gap-3 text-sm">
            <Checkbox checked={eInvoice} onCheckedChange={(v) => setEInvoice(v === true)} />
            Xuất hoá đơn điện tử (GTGT)
          </label>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Huỷ
          </Button>
          <Button onClick={onDone}>
            <Check />
            Hoàn tất & in hoá đơn
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
