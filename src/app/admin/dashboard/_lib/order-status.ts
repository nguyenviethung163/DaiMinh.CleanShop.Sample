import type { VariantProps } from 'class-variance-authority';
import type { badgeVariants } from '@/components/ui/badge';

type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>['variant']>;

const ORDER_STATUS_VARIANT: Record<string, BadgeVariant> = {
  pending: 'outline',
  confirmed: 'secondary',
  packing: 'secondary',
  shipping: 'secondary',
  done: 'default',
  cancelled: 'destructive',
  refund: 'destructive',
};

export function getOrderStatusVariant(status: string): BadgeVariant {
  return ORDER_STATUS_VARIANT[status] ?? 'outline';
}

export { getInitials } from '@/lib/utils';
