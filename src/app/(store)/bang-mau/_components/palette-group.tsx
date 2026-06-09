import type { PaletteColor } from '@/store/lib/palette-data';
import { PaletteColorCard } from '@/store/components/palette/palette-color-card';

export interface PaletteGroupProps {
  group: string;
  colors: PaletteColor[];
}

export function PaletteGroup({ group, colors }: PaletteGroupProps) {
  return (
    <section>
      <h2 className="text-secondary mb-3 text-base font-extrabold">Tông {group.toLowerCase()}</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-[repeat(auto-fill,minmax(160px,1fr))]">
        {colors.map((color) => (
          <PaletteColorCard key={color.hex} color={color} />
        ))}
      </div>
    </section>
  );
}
