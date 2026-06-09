/** Gradient tones for product/article thumbnails — semantic CSS vars, navy→orange brand look. */
export const TONE_GRADIENT: Record<string, string> = {
  navy: 'linear-gradient(135deg, var(--secondary) 0%, var(--chart-3) 100%)',
  orange: 'linear-gradient(135deg, var(--primary) 0%, var(--chart-1) 100%)',
  cream: 'linear-gradient(135deg, #efe7d8 0%, #d9c9a3 100%)',
  sage: 'linear-gradient(135deg, #cfd9c9 0%, #9bb29a 100%)',
  sky: 'linear-gradient(135deg, #cfdef3 0%, #8fb6e0 100%)',
  stone: 'linear-gradient(135deg, var(--border) 0%, var(--muted-foreground) 100%)',
  warm: 'linear-gradient(135deg, #e8d4c0 0%, #c79f7d 100%)',
  paint: 'linear-gradient(135deg, var(--secondary) 0%, var(--primary) 100%)',
};

export function getToneGradient(tone: string) {
  return TONE_GRADIENT[tone] ?? TONE_GRADIENT.navy;
}
