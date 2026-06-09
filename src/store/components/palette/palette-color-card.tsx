import type { PaletteColor } from '@/store/lib/palette-data';
import { PaletteColorSwatch } from '@/store/components/palette/palette-color-swatch';

export interface PaletteColorCardProps {
  color: PaletteColor;
}

export function PaletteColorCard({ color }: PaletteColorCardProps) {
  return (
    <article className="overflow-hidden rounded-lg border bg-white">
      <PaletteColorSwatch hex={color.hex} size="lg" />
      <div className="p-3">
        <div className="text-foreground text-sm font-bold">{color.name}</div>
        <div className="text-muted-foreground mt-1 font-mono text-xs">{color.hex}</div>
      </div>
    </article>
  );
}
