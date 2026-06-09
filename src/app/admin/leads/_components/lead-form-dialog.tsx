'use client';

import { Save } from 'lucide-react';
import { ADB } from '@/lib/data';
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

const CITIES = ['Hà Nội', 'TP.HCM', 'Bắc Ninh', 'Hưng Yên', 'Hải Phòng'];

type LeadFormDialogProps = {
  open: boolean;
  onClose: () => void;
};

export function LeadFormDialog({ open, onClose }: LeadFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Thêm lead mới</DialogTitle>
          <DialogDescription>Ghi nhận khách hàng tiềm năng</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4 py-2 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="lead-name">Tên khách hàng *</Label>
            <Input id="lead-name" placeholder="Nguyễn Văn A" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lead-phone">Số điện thoại *</Label>
            <Input id="lead-phone" placeholder="0988 xxx xxx" />
          </div>
          <div className="space-y-2">
            <Label>Nguồn lead</Label>
            <Select defaultValue={ADB.LEAD_SOURCES[0]}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ADB.LEAD_SOURCES.map((source) => (
                  <SelectItem key={source} value={source}>
                    {source}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Khu vực</Label>
            <Select defaultValue={CITIES[0]}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CITIES.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="lead-need">Nhu cầu</Label>
            <Input id="lead-need" placeholder="VD: Sơn nhà phố mới xây 120m²" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lead-value">Giá trị dự kiến (đ)</Label>
            <Input id="lead-value" placeholder="0" />
          </div>
          <div className="space-y-2">
            <Label>Phụ trách</Label>
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
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="lead-note">Ghi chú</Label>
            <Textarea id="lead-note" rows={2} placeholder="Thông tin thêm về lead…" />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Huỷ
          </Button>
          <Button
            onClick={() => {
              toast.success('Đã thêm lead mới');
              onClose();
            }}
          >
            <Save />
            Tạo lead
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
