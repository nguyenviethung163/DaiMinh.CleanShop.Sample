'use client';

import { ADB } from '@/lib/data';
import { CUSTOMER_CITIES, CUSTOMER_TIERS, CUSTOMER_TYPES } from '../_lib/customer-meta';
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
import { toast } from 'sonner';

type Customer = (typeof ADB.CUSTOMERS)[number];

type CustomerFormDialogProps = {
  customer: Customer | 'new' | null;
  onClose: () => void;
};

export function CustomerFormDialog({ customer, onClose }: CustomerFormDialogProps) {
  const isNew = customer === 'new';
  const data = isNew ? null : customer;

  return (
    <Dialog open={!!customer} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isNew ? 'Thêm khách hàng' : 'Chỉnh sửa khách hàng'}</DialogTitle>
          <DialogDescription>{isNew ? 'Tạo hồ sơ khách hàng mới' : data?.id}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4 py-2 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="customer-name">Họ và tên *</Label>
            <Input id="customer-name" defaultValue={data?.name} placeholder="Nguyễn Văn A" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="customer-phone">Số điện thoại *</Label>
            <Input id="customer-phone" defaultValue={data?.phone} placeholder="0988 xxx xxx" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="customer-email">Email</Label>
            <Input id="customer-email" defaultValue={data?.email} placeholder="email@example.com" />
          </div>
          <div className="space-y-2">
            <Label>Loại khách hàng</Label>
            <Select defaultValue={data?.type ?? CUSTOMER_TYPES[0]}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CUSTOMER_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Khu vực</Label>
            <Select defaultValue={data?.city ?? CUSTOMER_CITIES[0]}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CUSTOMER_CITIES.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Hạng thành viên</Label>
            <Select defaultValue={data?.tier ?? CUSTOMER_TIERS[0]}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CUSTOMER_TIERS.map((tier) => (
                  <SelectItem key={tier} value={tier}>
                    {tier}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="customer-points">Điểm tích lũy</Label>
            <Input id="customer-points" defaultValue={data?.points} placeholder="0" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="customer-address">Địa chỉ</Label>
            <Input id="customer-address" placeholder="Số nhà, đường, phường/xã…" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="customer-notes">Ghi chú</Label>
            <Textarea id="customer-notes" rows={2} placeholder="Ghi chú nội bộ về khách hàng…" />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Huỷ
          </Button>
          <Button
            onClick={() => {
              toast.success(isNew ? 'Đã thêm khách hàng' : 'Đã lưu hồ sơ');
              onClose();
            }}
          >
            {isNew ? 'Tạo khách hàng' : 'Lưu thay đổi'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
