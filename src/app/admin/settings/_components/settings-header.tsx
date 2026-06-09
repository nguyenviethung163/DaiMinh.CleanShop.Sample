'use client';

import { TypographyH1, TypographyMuted } from '@/components/ui/typography';

export function SettingsHeader() {
  return (
    <div className="space-y-1">
      <TypographyH1 className="text-xl">Cấu hình hệ thống</TypographyH1>
      <TypographyMuted>Quản lý thiết lập chung của cửa hàng và admin</TypographyMuted>
    </div>
  );
}
