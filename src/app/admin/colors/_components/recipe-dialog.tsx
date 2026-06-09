'use client';

import { AlertTriangle, Check, Printer } from 'lucide-react';
import { ADB } from '@/lib/data';
import { swatchClass, type ColorItem } from '../_lib/color-meta';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type RecipeDialogProps = {
  color: ColorItem | null;
  onClose: () => void;
};

export function RecipeDialog({ color, onClose }: RecipeDialogProps) {
  if (!color) return null;

  const recipe = ADB.TINT_RECIPE;

  return (
    <Dialog open={!!color} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Công thức pha · {color.name}</DialogTitle>
          <DialogDescription>
            {color.code} · {color.brand}
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-4">
          <div
            className={cn('size-24 shrink-0 rounded-xl', swatchClass(color.hex))}
            style={{ backgroundColor: color.hex }}
          />
          <div className="grid flex-1 grid-cols-2 gap-3">
            {[
              ['Base sơn', recipe.base],
              ['Dung tích', recipe.volume],
              ['Hệ màu', 'Acomix'],
              ['Mã pha', `TX-${color.code.slice(0, 4)}`],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-muted-foreground text-xs">{label}</p>
                <p className="mt-1 font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold">Tỷ lệ chất tạo màu (colorant)</p>
          <div className="overflow-hidden rounded-lg border">
            {recipe.colorants.map((item, i) => (
              <div
                key={item.code}
                className={cn('flex items-center gap-3 px-3.5 py-3', i > 0 && 'border-t')}
              >
                <div className="bg-secondary text-secondary-foreground flex size-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold">
                  {item.code}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-muted-foreground text-xs">Colorant {item.code}</p>
                </div>
                <p className="text-primary font-mono font-bold">{item.amount}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2 rounded-lg bg-amber-50 px-3.5 py-3 text-sm text-amber-900">
          <AlertTriangle className="size-4 shrink-0" />
          Công thức cho base 18L. Lắc máy 3–5 phút sau khi thêm colorant để đảm bảo màu đồng đều.
        </div>

        <DialogFooter>
          <Button variant="outline">
            <Printer />
            In công thức
          </Button>
          <Button
            onClick={() => {
              toast.success('Đã tạo lệnh pha');
              onClose();
            }}
          >
            <Check />
            Tạo lệnh pha
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
