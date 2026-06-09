'use client';

import { Plus } from 'lucide-react';
import { ADB } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { TypographyH1, TypographyMuted } from '@/components/ui/typography';

type QuotesHeaderProps = {
  pipelineValue: number;
  view: 'kanban' | 'table';
  onViewChange: (view: 'kanban' | 'table') => void;
  onCreate: () => void;
};

export function QuotesHeader({ pipelineValue, view, onViewChange, onCreate }: QuotesHeaderProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="space-y-1">
        <TypographyH1 className="text-xl">Báo giá công trình</TypographyH1>
        <TypographyMuted>
          {ADB.QUOTES.length} báo giá · Pipeline {(pipelineValue / 1e6).toFixed(0)}tr đ
        </TypographyMuted>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <ToggleGroup
          type="single"
          variant="outline"
          size="sm"
          value={view}
          onValueChange={(v) => v && onViewChange(v as 'kanban' | 'table')}
        >
          <ToggleGroupItem value="kanban">Kanban</ToggleGroupItem>
          <ToggleGroupItem value="table">Bảng</ToggleGroupItem>
        </ToggleGroup>
        <Button size="sm" onClick={onCreate}>
          <Plus />
          Tạo báo giá
        </Button>
      </div>
    </div>
  );
}
