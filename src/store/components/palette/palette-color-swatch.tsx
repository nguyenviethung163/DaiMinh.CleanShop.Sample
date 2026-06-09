import { cn } from '@/lib/utils';
import { swatchBorderStyle } from '@/store/lib/palette-data';

export interface PaletteColorSwatchProps {
  hex: string;
  size?: 'sm' | 'lg';
  className?: string;
}

const SIZE: Record<NonNullable<PaletteColorSwatchProps['size']>, string> = {
  sm: 'h-9 w-9 shrink-0 rounded border-black/10',
  lg: 'h-[90px] w-full',
};

export function PaletteColorSwatch({ hex, size = 'sm', className }: PaletteColorSwatchProps) {
  return (
    <div
      className={cn(SIZE[size], className)}
      style={{
        background: hex,
        boxShadow: swatchBorderStyle(hex),
      }}
      aria-hidden="true"
    />
  );
}
