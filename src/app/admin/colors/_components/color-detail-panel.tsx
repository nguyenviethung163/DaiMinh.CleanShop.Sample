'use client';

import { Edit, Layers, Trash2 } from 'lucide-react';
import { formatNum } from '@/lib/format';
import { SPACE_PREVIEWS, swatchClass, type ColorItem } from '../_lib/color-meta';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type ColorDetailPanelProps = {
  color: ColorItem;
  onViewRecipe: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export function ColorDetailPanel({ color, onViewRecipe, onEdit, onDelete }: ColorDetailPanelProps) {
  const details = [
    ['Thương hiệu', color.brand],
    ['Tông màu', color.tone],
    ['Công thức', `${color.recipes} base`],
    ['Lượt pha', formatNum(color.popular)],
  ] as const;

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Chi tiết màu</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            className={cn('h-[120px] rounded-lg', swatchClass(color.hex))}
            style={{ backgroundColor: color.hex }}
          />
          <div>
            <p className="text-xl font-bold tracking-tight">{color.name}</p>
            <p className="text-muted-foreground mt-1 font-mono text-sm">
              {color.code} · {color.hex}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {details.map(([label, value]) => (
              <div key={label} className="bg-muted/50 rounded-lg p-2.5">
                <p className="text-muted-foreground text-xs">{label}</p>
                <p className="mt-1 font-semibold">{value}</p>
              </div>
            ))}
          </div>
          <Button className="w-full" onClick={onViewRecipe}>
            <Layers />
            Xem công thức pha
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={onEdit}>
              <Edit />
              Sửa
            </Button>
            <Button variant="destructive" className="flex-1" onClick={onDelete}>
              <Trash2 />
              Xoá
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Áp dụng cho không gian</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {SPACE_PREVIEWS.map((space) => (
              <div key={space.label} className="relative overflow-hidden rounded-lg">
                <div className={cn('h-[70px] w-full', space.toneClass)} />
                <div className="absolute inset-0" style={{ backgroundColor: `${color.hex}55` }} />
                <span className="absolute bottom-1.5 left-2 text-[11px] font-bold text-white drop-shadow-md">
                  {space.label}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
