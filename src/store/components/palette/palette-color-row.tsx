import type { PaletteColor } from '@/store/lib/palette-data';
import { PaletteColorSwatch } from '@/store/components/palette/palette-color-swatch';

export interface PaletteColorRowProps {
  color: PaletteColor;
}

export function PaletteColorRow({ color }: PaletteColorRowProps) {
  return (
    <div className="flex items-center gap-2">
      <PaletteColorSwatch hex={color.hex} size="sm" />
      <div className="min-w-0">
        <div className="text-foreground truncate text-sm font-semibold">{color.name}</div>
        <div className="text-muted-foreground font-mono text-xs">{color.hex}</div>
      </div>
    </div>
  );
}
