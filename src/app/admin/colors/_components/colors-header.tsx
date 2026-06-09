'use client';

import { Plus, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TypographyH1, TypographyMuted } from '@/components/ui/typography';

type ColorsHeaderProps = {
  onCreate: () => void;
};

export function ColorsHeader({ onCreate }: ColorsHeaderProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="space-y-1">
        <TypographyH1 className="text-xl">Bảng màu & Pha màu</TypographyH1>
        <TypographyMuted>
          2.000+ mã màu chính hãng · Quản lý công thức pha màu tại showroom
        </TypographyMuted>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Upload />
          Nhập fan màu
        </Button>
        <Button size="sm" onClick={onCreate}>
          <Plus />
          Thêm mã màu
        </Button>
      </div>
    </div>
  );
}
