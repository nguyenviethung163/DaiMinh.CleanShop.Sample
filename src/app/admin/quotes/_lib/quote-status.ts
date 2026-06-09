import type { VariantProps } from 'class-variance-authority';
import type { badgeVariants } from '@/components/ui/badge';

type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>['variant']>;

const QUOTE_STATUS_VARIANT: Record<string, BadgeVariant> = {
  new: 'outline',
  surveying: 'secondary',
  quoted: 'default',
  won: 'default',
  lost: 'destructive',
};

export function getQuoteStatusVariant(status: string): BadgeVariant {
  return QUOTE_STATUS_VARIANT[status] ?? 'outline';
}

export const KANBAN_COLUMNS = [
  { key: 'new', title: 'Mới', borderClass: 'border-t-primary' },
  { key: 'surveying', title: 'Đang khảo sát', borderClass: 'border-t-secondary' },
  { key: 'quoted', title: 'Đã báo giá', borderClass: 'border-t-ring' },
  { key: 'won', title: 'Chốt đơn', borderClass: 'border-t-secondary' },
  { key: 'lost', title: 'Không thành', borderClass: 'border-t-destructive' },
] as const;

export const PROJECT_TYPES = [
  'Nhà phố 4 tầng',
  'Biệt thự sân vườn',
  'Căn hộ chung cư',
  'Nhà xưởng KCN',
  'Văn phòng cho thuê',
  'Khách sạn mini',
] as const;

export const QUOTE_CITIES = ['Hà Nội', 'TP.HCM', 'Bắc Ninh', 'Hưng Yên'] as const;
