'use client';

import { Download, Plus } from 'lucide-react';
import { ADB } from '@/lib/data';
import { formatNum } from '@/lib/format';
import { Button } from '@/components/ui/button';
import { TypographyH1, TypographyMuted } from '@/components/ui/typography';

type CustomersHeaderProps = {
  onCreate: () => void;
};

export function CustomersHeader({ onCreate }: CustomersHeaderProps) {
  const contractorCount = ADB.CUSTOMERS.filter((c) => c.type === 'Nhà thầu').length;

  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="space-y-1">
        <TypographyH1 className="text-xl">Khách hàng</TypographyH1>
        <TypographyMuted>
          {formatNum(8247)} khách hàng · {contractorCount} nhà thầu
        </TypographyMuted>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Download />
          Xuất danh sách
        </Button>
        <Button size="sm" onClick={onCreate}>
          <Plus />
          Thêm khách hàng
        </Button>
      </div>
    </div>
  );
}
