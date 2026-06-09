import type { VariantProps } from 'class-variance-authority';
import type { badgeVariants } from '@/components/ui/badge';

type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>['variant']>;

const TIER_VARIANT: Record<string, BadgeVariant> = {
  Đồng: 'outline',
  Bạc: 'secondary',
  Vàng: 'default',
  'Bạch kim': 'secondary',
};

const TYPE_VARIANT: Record<string, BadgeVariant> = {
  'Nhà thầu': 'secondary',
  'Doanh nghiệp': 'default',
  'Cá nhân': 'outline',
};

export function getTierVariant(tier: string): BadgeVariant {
  return TIER_VARIANT[tier] ?? 'outline';
}

export function getCustomerTypeVariant(type: string): BadgeVariant {
  return TYPE_VARIANT[type] ?? 'outline';
}

export const CUSTOMER_TABS = [
  { value: 'all', label: 'Tất cả' },
  { value: 'vip', label: 'VIP (Vàng+)' },
  { value: 'contractor', label: 'Nhà thầu' },
  { value: 'business', label: 'Doanh nghiệp' },
] as const;

export type CustomerTab = (typeof CUSTOMER_TABS)[number]['value'];

export const CUSTOMER_CITIES = ['Hà Nội', 'TP.HCM', 'Đà Nẵng', 'Bắc Ninh'] as const;

export const CUSTOMER_TYPES = ['Cá nhân', 'Nhà thầu', 'Doanh nghiệp'] as const;

export const CUSTOMER_TIERS = ['Đồng', 'Bạc', 'Vàng', 'Bạch kim'] as const;

export function getNextTier(tier: string) {
  const map: Record<string, string> = {
    Đồng: 'Bạc',
    Bạc: 'Vàng',
    Vàng: 'Bạch kim',
    'Bạch kim': 'Tối đa',
  };
  return map[tier] ?? '—';
}
