import type { VariantProps } from 'class-variance-authority';
import type { badgeVariants } from '@/components/ui/badge';

type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>['variant']>;

export type Product = {
  id: string;
  sku: string;
  name: string;
  brand: string;
  cat: string;
  price: number;
  cost: number;
  stock: number;
  sold: number;
  rating: string;
  status: string;
  tone: string;
  visible: boolean;
};

export function getStockBadge(product: Pick<Product, 'stock'>) {
  if (product.stock === 0) {
    return { variant: 'destructive' as BadgeVariant, label: 'Hết hàng' };
  }
  if (product.stock < 10) {
    return { variant: 'secondary' as BadgeVariant, label: `Sắp hết (${product.stock})` };
  }
  return { variant: 'default' as BadgeVariant, label: `Còn ${product.stock}` };
}

const TONE_CLASS: Record<string, string> = {
  sky: 'bg-sky-100',
  navy: 'bg-secondary/20',
  cream: 'bg-amber-50',
  sage: 'bg-accent',
  orange: 'bg-primary/15',
  stone: 'bg-muted',
  warm: 'bg-orange-100',
  paint: 'bg-secondary/10',
};

export function getProductToneClass(tone: string) {
  return TONE_CLASS[tone] ?? 'bg-muted';
}

export const PRODUCT_FORM_TABS = [
  { value: 'info', label: 'Thông tin' },
  { value: 'price', label: 'Giá & Kho' },
  { value: 'media', label: 'Hình ảnh' },
  { value: 'seo', label: 'SEO' },
] as const;

export type ProductFormTab = (typeof PRODUCT_FORM_TABS)[number]['value'];
