'use client';

import { useState } from 'react';
import { ADB } from '@/lib/data';
import { COLOR_TONE_OPTIONS, swatchClass, type ColorItem } from '../_lib/color-meta';
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
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type ColorFormDialogProps = {
  color: ColorItem | 'new' | null;
  onClose: () => void;
};

export function ColorFormDialog({ color, onClose }: ColorFormDialogProps) {
  const isNew = color === 'new';
  const data = isNew ? null : color;
  const [hex, setHex] = useState(data?.hex ?? '#2B4A7A');

  return (
    <Dialog open={!!color} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{isNew ? 'Thêm mã màu' : 'Chỉnh sửa mã màu'}</DialogTitle>
          <DialogDescription>{isNew ? 'Thêm màu vào thư viện' : data?.code}</DialogDescription>
        </DialogHeader>

        <div className="flex gap-4">
          <div
            className={cn('size-28 shrink-0 rounded-xl', swatchClass(hex))}
            style={{ backgroundColor: hex }}
          />
          <div className="flex flex-1 flex-col justify-center gap-3">
            <div className="space-y-2">
              <Label htmlFor="color-hex">Mã hex</Label>
              <Input
                id="color-hex"
                value={hex}
                onChange={(e) => setHex(e.target.value)}
                className="font-mono font-bold"
              />
            </div>
            <input
              type="color"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              className="bg-background h-10 w-full cursor-pointer rounded-lg border"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="color-name">Tên màu *</Label>
            <Input id="color-name" defaultValue={data?.name} placeholder="VD: Xanh navy" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="color-code">Mã chuẩn hãng *</Label>
            <Input
              id="color-code"
              defaultValue={data?.code}
              placeholder="70BB 12/220"
              className="font-mono"
            />
          </div>
          <div className="space-y-2">
            <Label>Thương hiệu</Label>
            <Select defaultValue={data?.brand ?? ADB.brands[0]}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ADB.brands.map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Tông màu</Label>
            <Select defaultValue={data?.tone ?? COLOR_TONE_OPTIONS[0]}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {COLOR_TONE_OPTIONS.map((tone) => (
                  <SelectItem key={tone} value={tone}>
                    {tone}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Huỷ
          </Button>
          <Button
            onClick={() => {
              toast.success(isNew ? 'Đã thêm mã màu' : 'Đã lưu mã màu');
              onClose();
            }}
          >
            {isNew ? 'Thêm màu' : 'Lưu'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
