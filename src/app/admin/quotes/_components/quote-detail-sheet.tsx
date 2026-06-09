'use client';

import { Check, Mail, Printer } from 'lucide-react';
import { ADB } from '@/lib/data';
import { formatVND } from '@/lib/format';
import { getQuoteStatusVariant } from '../_lib/quote-status';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getInitials } from '@/lib/utils';
import { toast } from 'sonner';

type Quote = (typeof ADB.QUOTES)[number];

type QuoteDetailSheetProps = {
  quote: Quote | null;
  onClose: () => void;
};

export function QuoteDetailSheet({ quote, onClose }: QuoteDetailSheetProps) {
  if (!quote) return null;

  const status = ADB.QUOTE_STATUS[quote.status as keyof typeof ADB.QUOTE_STATUS];
  const lineItems = ADB.PRODUCTS.slice(0, 4);

  const summaryRows = [
    ['Tạm tính', formatVND(quote.value * 0.92), ''],
    ['Chiết khấu công trình (12%)', `− ${formatVND(quote.value * 0.12)}`, 'text-primary'],
    ['VAT (8%)', formatVND(quote.value * 0.08), ''],
  ] as const;

  return (
    <Sheet open={!!quote} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
        <SheetHeader>
          <div className="flex items-start justify-between gap-3 pr-8">
            <div>
              <SheetTitle>Báo giá {quote.id}</SheetTitle>
              <SheetDescription>
                {quote.project} · {quote.city}
              </SheetDescription>
            </div>
            <Badge variant={getQuoteStatusVariant(quote.status)}>{status.label}</Badge>
          </div>
        </SheetHeader>

        <div className="space-y-4 px-4 pb-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Khách hàng</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarFallback>{getInitials(quote.customer)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{quote.customer}</p>
                    <p className="text-muted-foreground text-sm">{quote.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Công trình</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-1 text-sm">
                <p className="text-foreground font-semibold">{quote.project}</p>
                <p>
                  Diện tích: {quote.area}m² · {quote.city}
                </p>
                <p>Phụ trách: {quote.assignee.split(' ').slice(-2).join(' ')}</p>
              </CardContent>
            </Card>
          </div>

          <Card className="gap-0 py-0">
            <CardHeader className="border-b px-4 py-3">
              <CardTitle className="text-base">Hạng mục báo giá</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Sản phẩm</TableHead>
                    <TableHead className="text-right">SL</TableHead>
                    <TableHead className="text-right">Đơn giá</TableHead>
                    <TableHead className="text-right">Thành tiền</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lineItems.map((product, index) => {
                    const qty = (index + 2) * 4;
                    return (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell className="text-muted-foreground text-right">{qty}</TableCell>
                        <TableCell className="text-muted-foreground text-right">
                          {formatVND(product.price)}
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          {formatVND(product.price * qty)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Tổng quan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {summaryRows.map(([label, value, className]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-muted-foreground">{label}</span>
                  <span className={`font-medium ${className}`}>{value}</span>
                </div>
              ))}
              <Separator />
              <div className="flex items-baseline justify-between">
                <span className="font-semibold">Tổng báo giá</span>
                <span className="text-primary text-xl font-bold">{formatVND(quote.value)}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <SheetFooter className="flex-row gap-2 border-t px-4 py-4">
          <Button variant="outline">
            <Printer />
            Xuất PDF
          </Button>
          <Button variant="outline">
            <Mail />
            Gửi khách
          </Button>
          <Button className="flex-1" onClick={() => toast.success('Đã chuyển trạng thái báo giá')}>
            <Check />
            Chuyển trạng thái
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
