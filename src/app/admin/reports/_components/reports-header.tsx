'use client';

import { Calendar, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { TypographyH1, TypographyMuted } from '@/components/ui/typography';

const RANGE_OPTIONS = ['7 ngày', 'Tháng này', 'Quý', 'Năm'] as const;

type ReportsHeaderProps = {
  range: string;
  onRangeChange: (value: string) => void;
};

export function ReportsHeader({ range, onRangeChange }: ReportsHeaderProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="space-y-1">
        <TypographyH1 className="text-xl">Báo cáo & thống kê</TypographyH1>
        <TypographyMuted>Phân tích kinh doanh chuyên sâu · Cập nhật realtime</TypographyMuted>
      </div>
      <div className="flex flex-wrap items-center gap-2">
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
          <Calendar />
          Tùy chỉnh
        </Button>
        <Button size="sm">
          <Download />
          Xuất PDF
        </Button>
      </div>
    </div>
  );
}
