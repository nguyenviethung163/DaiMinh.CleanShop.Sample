'use client';

import { useState } from 'react';
import { ADB } from '@/lib/data';
import { APPLY_SCOPES, DISCOUNT_TYPES } from '../_lib/promotion-meta';
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
import { Switch } from '@/components/ui/switch';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { toast } from 'sonner';

type Voucher = (typeof ADB.VOUCHERS)[number];

type VoucherFormDialogProps = {
  voucher: Voucher | null;
  open: boolean;
  onClose: () => void;
};

export function VoucherFormDialog({ voucher, open, onClose }: VoucherFormDialogProps) {
  const isEdit = !!voucher;
  const [discountType, setDiscountType] = useState(voucher?.type ?? DISCOUNT_TYPES[0]);

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Chỉnh sửa voucher' : 'Tạo voucher mới'}</DialogTitle>
          <DialogDescription>
            {isEdit ? `${voucher.code} · ${voucher.name}` : 'Thiết lập mã giảm giá cho khách hàng'}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="voucher-code">Mã voucher</Label>
              <Input
                id="voucher-code"
                defaultValue={voucher?.code ?? 'SDM'}
                placeholder="VD: SDM200"
                className="font-mono font-bold"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="voucher-name">Tên chương trình</Label>
              <Input
                id="voucher-name"
                defaultValue={voucher?.name}
                placeholder="VD: Giảm 200K đơn từ 5tr"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Loại giảm giá</Label>
            <ToggleGroup
              type="single"
              value={discountType}
              onValueChange={(v) => v && setDiscountType(v)}
              variant="outline"
              className="flex-wrap justify-start"
            >
              {DISCOUNT_TYPES.map((type) => (
                <ToggleGroupItem key={type} value={type} className="px-3">
                  {type}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>
                {discountType === 'Phần trăm' ? 'Phần trăm giảm (%)' : 'Số tiền giảm (đ)'}
              </Label>
              <Input placeholder={discountType === 'Phần trăm' ? '10' : '200.000'} />
            </div>
            <div className="space-y-2">
              <Label>Giảm tối đa (đ)</Label>
              <Input placeholder="500.000" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Đơn tối thiểu (đ)</Label>
              <Input placeholder="2.000.000" />
            </div>
            <div className="space-y-2">
              <Label>Giới hạn lượt dùng</Label>
              <Input placeholder="1000" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Ngày bắt đầu</Label>
              <Input defaultValue="30/05/2026" />
            </div>
            <div className="space-y-2">
              <Label>Ngày kết thúc</Label>
              <Input defaultValue="30/06/2026" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Áp dụng cho</Label>
            <Select defaultValue={APPLY_SCOPES[0]}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {APPLY_SCOPES.map((scope) => (
                  <SelectItem key={scope} value={scope}>
                    {scope}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-3 rounded-lg border p-4">
            <Switch defaultChecked />
            <div>
              <p className="font-medium">Hiển thị công khai</p>
              <p className="text-muted-foreground text-xs">
                Voucher hiển thị trên trang khuyến mãi của website
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            Huỷ
          </Button>
          <Button variant="secondary">Lưu nháp</Button>
          <Button
            onClick={() => {
              toast.success(isEdit ? 'Đã cập nhật voucher' : 'Đã tạo voucher mới');
              onClose();
            }}
          >
            {isEdit ? 'Lưu thay đổi' : 'Tạo & kích hoạt'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
