import type { VariantProps } from 'class-variance-authority';
import type { badgeVariants } from '@/components/ui/badge';

type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>['variant']>;

const TIER_VARIANT: Record<string, BadgeVariant> = {
  Đồng: 'outline',
  Bạc: 'secondary',
  Vàng: 'default',
  'Bạch kim': 'secondary',
  'Vãng lai': 'outline',
};

export function getTierVariant(tier: string): BadgeVariant {
  return TIER_VARIANT[tier] ?? 'outline';
}
