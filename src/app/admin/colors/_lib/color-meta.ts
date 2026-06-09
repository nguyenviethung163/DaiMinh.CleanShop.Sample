export type ColorItem = {
  code: string;
  name: string;
  hex: string;
  brand: string;
  tone: string;
  recipes: number;
  popular: number;
};

export const COLOR_TONES = ['Tất cả', 'Trắng', 'Kem', 'Xám', 'Ghi', 'Xanh'] as const;

export const COLOR_TONE_OPTIONS = ['Trắng', 'Kem', 'Xám', 'Ghi', 'Xanh'] as const;

export const SPACE_PREVIEWS = [
  { label: 'Phòng khách', toneClass: 'bg-secondary/30' },
  { label: 'Phòng ngủ', toneClass: 'bg-amber-50' },
  { label: 'Ngoại thất', toneClass: 'bg-secondary/10' },
  { label: 'Phòng bếp', toneClass: 'bg-accent' },
] as const;

export function swatchClass(hex: string) {
  return hex.toUpperCase() === '#FFFFFF' ? 'ring-1 ring-border' : '';
}
