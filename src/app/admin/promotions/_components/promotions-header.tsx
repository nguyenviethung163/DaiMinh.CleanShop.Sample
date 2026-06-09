'use client';

import { BarChart3, Plus } from 'lucide-react';
import { ADB } from '@/lib/data';
import { formatNum } from '@/lib/format';
import { Button } from '@/components/ui/button';
import { TypographyH1, TypographyMuted } from '@/components/ui/typography';

type PromotionsHeaderProps = {
  onCreate: () => void;
};

export function PromotionsHeader({ onCreate }: PromotionsHeaderProps) {
  const activeCount = ADB.VOUCHERS.filter((v) => v.status === 'active').length;
  const totalUsed = ADB.VOUCHERS.reduce((sum, v) => sum + v.used, 0);

  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="space-y-1">
        <TypographyH1 className="text-xl">Khuyến mãi & Voucher</TypographyH1>
        <TypographyMuted>
          {activeCount} chương trình đang chạy · {formatNum(totalUsed)} lượt sử dụng
        </TypographyMuted>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <BarChart3 />
          Hiệu quả
        </Button>
        <Button size="sm" onClick={onCreate}>
          <Plus />
          Tạo khuyến mãi
        </Button>
      </div>
    </div>
  );
}
