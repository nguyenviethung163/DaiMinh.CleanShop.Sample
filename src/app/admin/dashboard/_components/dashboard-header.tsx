'use client';

import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { TypographyH1, TypographyMuted } from '@/components/ui/typography';

const RANGE_OPTIONS = ['7 ngày', '30 ngày', 'Quý này', 'Năm'] as const;

type DashboardHeaderProps = {
  today: string;
  range: string;
  onRangeChange: (value: string) => void;
};

export function DashboardHeader({ today, range, onRangeChange }: DashboardHeaderProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="space-y-1">
        <TypographyH1 className="text-xl">Xin chào, Đại Minh 👋</TypographyH1>
        <TypographyMuted>
          Tổng quan hoạt động kinh doanh · Cập nhật {today} lúc 09:41
        </TypographyMuted>
      </div>
      <div className="flex items-center gap-2">
        <ToggleGroup
          type="single"
          variant="outline"
          size="sm"
          value={range}
          onValueChange={(v) => v && onRangeChange(v)}
        >
          {RANGE_OPTIONS.map((opt) => (
            <ToggleGroupItem key={opt} value={opt} aria-label={opt}>
              {opt}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <Button variant="outline" size="sm">
          <Download />
          Xuất báo cáo
        </Button>
      </div>
    </div>
  );
}
