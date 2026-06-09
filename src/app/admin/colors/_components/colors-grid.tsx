'use client';

import { Filter, Search } from 'lucide-react';
import { COLOR_TONES, swatchClass, type ColorItem } from '../_lib/color-meta';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';

type ColorsGridProps = {
  rows: ColorItem[];
  selected: ColorItem;
  tone: string;
  onToneChange: (tone: string) => void;
  onSelect: (color: ColorItem) => void;
};

export function ColorsGrid({ rows, selected, tone, onToneChange, onSelect }: ColorsGridProps) {
  return (
    <Card className="gap-0 py-0">
      <CardContent className="space-y-3 border-b p-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-[200px] flex-1">
            <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <Input placeholder="Tìm mã màu, tên màu…" className="pl-9" />
          </div>
          <Button variant="outline" size="sm">
            <Filter />
            Thương hiệu
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {COLOR_TONES.map((tn) => (
            <Button
              key={tn}
              size="sm"
              variant={tone === tn ? 'default' : 'outline'}
              className="h-7 rounded-full"
              onClick={() => onToneChange(tn)}
            >
              {tn}
            </Button>
          ))}
        </div>
      </CardContent>

      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {rows.map((color) => (
            <button
              key={color.code}
              type="button"
              onClick={() => onSelect(color)}
              className={cn(
                'bg-card overflow-hidden rounded-lg border text-left transition-shadow hover:shadow-md',
                color.code === selected.code && 'ring-primary ring-2',
              )}
            >
              <div
                className={cn('h-[76px]', swatchClass(color.hex))}
                style={{ backgroundColor: color.hex }}
              />
              <div className="p-2.5">
                <p className="truncate text-sm font-semibold">{color.name}</p>
                <p className="text-muted-foreground mt-0.5 font-mono text-xs">{color.code}</p>
                <div className="mt-2 flex items-center justify-between">
                  <Badge variant="secondary">{color.brand}</Badge>
                  <span className="text-muted-foreground text-xs">{color.recipes} CT</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </CardContent>

      <CardFooter className="justify-between border-t px-4 py-3">
        <p className="text-muted-foreground text-sm">Hiển thị {rows.length} / 2.048 mã màu</p>
        <Pagination className="mx-0 w-auto">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>
    </Card>
  );
}
