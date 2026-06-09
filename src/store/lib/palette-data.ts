export interface PaletteColor {
  name: string;
  hex: string;
}

export const PALETTE_GROUPS: Record<string, PaletteColor[]> = {
  Trắng: [
    { name: 'Trắng tinh khôi', hex: '#FFFFFF' },
    { name: 'Trắng kem', hex: '#FAF3E7' },
    { name: 'Trắng ngọc trai', hex: '#F2EFE9' },
    { name: 'Trắng sữa', hex: '#F7F1E3' },
  ],
  Xám: [
    { name: 'Xám khói', hex: '#B7B9BD' },
    { name: 'Xám tro', hex: '#8C8F95' },
    { name: 'Xám bê tông', hex: '#6E737B' },
    { name: 'Xám lông chuột', hex: '#A1A3A7' },
  ],
  Kem: [
    { name: 'Kem nhạt', hex: '#F5E9D3' },
    { name: 'Kem cát', hex: '#E8D6B3' },
    { name: 'Kem be', hex: '#D9C29B' },
    { name: 'Kem nâu', hex: '#C2A37A' },
  ],
  Xanh: [
    { name: 'Xanh dương nhạt', hex: '#B9D4E3' },
    { name: 'Xanh navy', hex: '#2B4A7A' },
    { name: 'Xanh ngọc', hex: '#7FB8B0' },
    { name: 'Xanh rêu', hex: '#7A8B62' },
  ],
  Ghi: [
    { name: 'Ghi sáng', hex: '#CFCBC2' },
    { name: 'Ghi đá', hex: '#A8A39A' },
    { name: 'Ghi nâu', hex: '#8E867B' },
    { name: 'Ghi đậm', hex: '#6B655B' },
  ],
};

/** @deprecated Use PALETTE_GROUPS — kept for backward-compatible imports from data.ts */
export const PALETTE = PALETTE_GROUPS;

export const PALETTE_TONES = ['Tất cả', ...Object.keys(PALETTE_GROUPS)] as const;
export type PaletteToneFilter = (typeof PALETTE_TONES)[number];

export function filterPaletteGroups(tone: PaletteToneFilter): [string, PaletteColor[]][] {
  return Object.entries(PALETTE_GROUPS).filter(([group]) => tone === 'Tất cả' || group === tone);
}

export function swatchBorderStyle(hex: string): string | undefined {
  return hex.toUpperCase() === '#FFFFFF' ? 'inset 0 0 0 1px #e6e8ee' : undefined;
}
