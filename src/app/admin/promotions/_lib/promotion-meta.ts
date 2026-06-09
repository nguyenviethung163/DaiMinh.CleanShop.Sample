import type { VariantProps } from 'class-variance-authority';
import type { badgeVariants } from '@/components/ui/badge';

type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>['variant']>;

export type VoucherStatus = 'active' | 'ended' | 'scheduled';

const VOUCHER_STATUS: Record<VoucherStatus, { variant: BadgeVariant; label: string }> = {
  active: { variant: 'default', label: 'Đang chạy' },
  ended: { variant: 'outline', label: 'Đã kết thúc' },
  scheduled: { variant: 'secondary', label: 'Lên lịch' },
};

export function getVoucherStatusMeta(status: string) {
  return (
    VOUCHER_STATUS[status as VoucherStatus] ?? { variant: 'outline' as BadgeVariant, label: status }
  );
}

export const PROMOTION_TABS = [
  { value: 'voucher', label: 'Voucher / Mã giảm giá' },
  { value: 'campaign', label: 'Chiến dịch' },
  { value: 'flash', label: 'Flash sale' },
  { value: 'combo', label: 'Combo' },
] as const;

export type PromotionTab = (typeof PROMOTION_TABS)[number]['value'];

export const TAB_COUNTS: Record<PromotionTab, number> = {
  voucher: 6,
  campaign: 4,
  flash: 2,
  combo: 3,
};

export const DISCOUNT_TYPES = ['Phần trăm', 'Số tiền', 'Miễn phí ship'] as const;

export const APPLY_SCOPES = [
  'Toàn bộ sản phẩm',
  'Theo danh mục',
  'Sản phẩm chọn lọc',
  'Khách hàng mới',
] as const;

export type CampaignItem = {
  sup: string;
  title: string;
  toneClass: string;
  statusVariant: BadgeVariant;
  statusLabel: string;
  sold: number;
  rev: string;
};

export const CAMPAIGNS: CampaignItem[] = [
  {
    sup: 'COMBO GIA ĐÌNH',
    title: 'Trọn bộ sơn nhà tiết kiệm 1.5tr',
    toneClass: 'bg-secondary/20',
    statusVariant: 'default',
    statusLabel: 'Đang chạy',
    sold: 156,
    rev: '38tr',
  },
  {
    sup: 'FLASH SALE',
    title: 'Sale chớp nhoáng giảm 35%',
    toneClass: 'bg-primary/15',
    statusVariant: 'secondary',
    statusLabel: 'Lên lịch 5/6',
    sold: 0,
    rev: '0đ',
  },
  {
    sup: 'QUÀ TẶNG',
    title: 'Mua 18L tặng rulo + cọ',
    toneClass: 'bg-accent',
    statusVariant: 'default',
    statusLabel: 'Đang chạy',
    sold: 421,
    rev: '—',
  },
  {
    sup: 'CÔNG TRÌNH',
    title: 'Chiết khấu 12% đơn từ 50tr',
    toneClass: 'bg-muted',
    statusVariant: 'default',
    statusLabel: 'Đang chạy',
    sold: 18,
    rev: '124tr',
  },
];
