import type { VariantProps } from 'class-variance-authority';
import type { badgeVariants } from '@/components/ui/badge';

type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>['variant']>;

export const INVENTORY_TABS = [
  { value: 'stock', label: 'Tồn kho' },
  { value: 'moves', label: 'Lịch sử nhập/xuất' },
  { value: 'low', label: 'Cảnh báo tồn thấp' },
] as const;

export type InventoryTab = (typeof INVENTORY_TABS)[number]['value'];

export type InventoryItem = {
  id: string;
  sku: string;
  name: string;
  tone: string;
  onHand: number;
  reserved: number;
  incoming: number;
  reorder: number;
  cost: number;
  location: string;
};

export type StockMove = {
  id: string;
  type: 'in' | 'out';
  product: string;
  qty: number;
  by: string;
  note: string;
  date: string;
};

export function getStockLevelPercent(item: Pick<InventoryItem, 'onHand' | 'reorder'>) {
  return Math.min(100, (item.onHand / (item.reorder * 2.5)) * 100);
}

export function getStockLevelClass(item: Pick<InventoryItem, 'onHand' | 'reorder'>) {
  if (item.onHand < item.reorder) return '[&>div]:bg-destructive';
  if (item.onHand < item.reorder * 1.5) return '[&>div]:bg-secondary';
  return '[&>div]:bg-primary';
}

export function getMoveTypeBadge(type: string): { variant: BadgeVariant; label: string } {
  if (type === 'in') return { variant: 'default', label: 'Nhập kho' };
  return { variant: 'secondary', label: 'Xuất kho' };
}

export const WAREHOUSES = ['Kho A · Hà Nội', 'Kho B · TP.HCM'] as const;

export const OUT_REASONS = ['Xuất bán', 'Xuất huỷ', 'Điều chuyển kho', 'Hàng mẫu'] as const;
