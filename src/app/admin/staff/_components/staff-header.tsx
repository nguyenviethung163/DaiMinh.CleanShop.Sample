'use client';

import { Plus, Shield } from 'lucide-react';
import { ADB } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { TypographyH1, TypographyMuted } from '@/components/ui/typography';

type StaffHeaderProps = {
  onCreate: () => void;
};

export function StaffHeader({ onCreate }: StaffHeaderProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="space-y-1">
        <TypographyH1 className="text-xl">Nhân viên & Phân quyền</TypographyH1>
        <TypographyMuted>
          {ADB.STAFF.length} nhân viên · {ADB.ROLES.length} vai trò
        </TypographyMuted>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Shield />
          Cấu hình quyền
        </Button>
        <Button size="sm" onClick={onCreate}>
          <Plus />
          Thêm nhân viên
        </Button>
      </div>
    </div>
  );
}
