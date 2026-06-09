'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { ADB } from '@/lib/data';
import { formatVND } from '@/lib/format';
import { PROJECT_TYPES, QUOTE_CITIES } from '../_lib/quote-status';
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
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

type QuoteFormDialogProps = {
  open: boolean;
  onClose: () => void;
};

export function QuoteFormDialog({ open, onClose }: QuoteFormDialogProps) {
  const [area, setArea] = useState(120);
  const estimated = area * 220_000;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Tạo báo giá công trình</DialogTitle>
          <DialogDescription>Nhập thông tin khách hàng và quy mô công trình</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4 py-2 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="quote-customer">Tên khách hàng *</Label>
            <Input id="quote-customer" placeholder="Nguyễn Văn A" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quote-phone">Số điện thoại *</Label>
            <Input id="quote-phone" placeholder="0988 xxx xxx" />
          </div>
          <div className="space-y-2">
            <Label>Loại công trình</Label>
            <Select defaultValue={PROJECT_TYPES[0]}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PROJECT_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Khu vực</Label>
            <Select defaultValue={QUOTE_CITIES[0]}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {QUOTE_CITIES.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3 sm:col-span-2">
            <Label>Diện tích thi công: {area} m²</Label>
            <Slider
              min={40}
              max={2000}
              step={10}
              value={[area]}
              onValueChange={(value) => setArea(value[0] ?? 120)}
            />
          </div>
          <div className="space-y-2">
            <Label>Nhân viên phụ trách</Label>
            <Select defaultValue={ADB.STAFF[1].id}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ADB.STAFF.slice(1, 6).map((staff) => (
                  <SelectItem key={staff.id} value={staff.id}>
                    {staff.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Trạng thái</Label>
            <Select defaultValue="new">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(ADB.QUOTE_STATUS).map(([key, item]) => (
                  <SelectItem key={key} value={key}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="quote-note">Ghi chú khảo sát</Label>
            <Textarea
              id="quote-note"
              rows={2}
              placeholder="Hiện trạng tường, yêu cầu đặc biệt, hệ màu mong muốn…"
            />
          </div>
        </div>

        <div className="bg-secondary text-secondary-foreground flex items-center justify-between rounded-lg p-4">
          <div>
            <p className="text-sm opacity-80">Giá trị ước tính (≈ 220.000đ/m²)</p>
            <p className="text-xs opacity-70">Sẽ điều chỉnh sau khảo sát thực tế</p>
          </div>
          <p className="text-primary text-2xl font-bold">{formatVND(estimated)}</p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Huỷ
          </Button>
          <Button variant="secondary">Lưu nháp</Button>
          <Button
            onClick={() => {
              toast.success('Đã tạo báo giá mới');
              onClose();
            }}
          >
            <Check />
            Tạo báo giá
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
