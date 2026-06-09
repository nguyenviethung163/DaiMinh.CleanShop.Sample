'use client';

import { Plus, Save, Trash2 } from 'lucide-react';
import { ADB } from '@/lib/data';
import { getProductToneClass } from '@/app/admin/products/_lib/product-meta';
import { OUT_REASONS, WAREHOUSES } from '../_lib/inventory-meta';
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
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type StockMoveDialogProps = {
  type: 'in' | 'out' | null;
  onClose: () => void;
};

export function StockMoveDialog({ type, onClose }: StockMoveDialogProps) {
  if (!type) return null;

  const isIn = type === 'in';

  return (
    <Dialog open={!!type} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isIn ? 'Tạo phiếu nhập kho' : 'Tạo phiếu xuất kho'}</DialogTitle>
          <DialogDescription>
            {isIn ? 'Nhập hàng từ nhà cung cấp' : 'Xuất hàng khỏi kho'}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>{isIn ? 'Nhà cung cấp' : 'Lý do xuất'}</Label>
              <Select defaultValue={isIn ? `NCC ${ADB.brands[0]}` : OUT_REASONS[0]}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {isIn
                    ? ADB.brands.map((brand) => (
                        <SelectItem key={brand} value={`NCC ${brand}`}>
                          NCC {brand}
                        </SelectItem>
                      ))
                    : OUT_REASONS.map((reason) => (
                        <SelectItem key={reason} value={reason}>
                          {reason}
                        </SelectItem>
                      ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Kho</Label>
              <Select defaultValue={WAREHOUSES[0]}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {WAREHOUSES.map((warehouse) => (
                    <SelectItem key={warehouse} value={warehouse}>
                      {warehouse}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Sản phẩm</Label>
            <div className="overflow-hidden rounded-lg border">
              {ADB.PRODUCTS.slice(0, 3).map((product, i) => (
                <div
                  key={product.id}
                  className={cn('flex items-center gap-3 p-3', i > 0 && 'border-t')}
                >
                  <div
                    className={cn('size-9 shrink-0 rounded-md', getProductToneClass(product.tone))}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{product.name}</p>
                    <p className="text-muted-foreground text-xs">Tồn hiện tại: {product.stock}</p>
                  </div>
                  <Input defaultValue={(i + 1) * 20} className="w-16 text-center font-bold" />
                  <Button variant="ghost" size="icon-sm">
                    <Trash2 />
                  </Button>
                </div>
              ))}
              <div className="border-t p-3">
                <Button variant="secondary" size="sm">
                  <Plus />
                  Thêm sản phẩm
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="move-note">Ghi chú</Label>
            <Textarea id="move-note" rows={2} placeholder="Số chứng từ, ghi chú thêm…" />
          </div>

          <div className="bg-muted flex items-center justify-between rounded-lg px-4 py-3">
            <span className="text-sm">Tổng số lượng {isIn ? 'nhập' : 'xuất'}</span>
            <span className={cn('text-xl font-bold', isIn ? 'text-primary' : 'text-secondary')}>
              120 sản phẩm
            </span>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Huỷ
          </Button>
          <Button
            onClick={() => {
              toast.success(isIn ? 'Đã tạo phiếu nhập kho' : 'Đã tạo phiếu xuất kho');
              onClose();
            }}
          >
            <Save />
            {isIn ? 'Xác nhận nhập' : 'Xác nhận xuất'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
