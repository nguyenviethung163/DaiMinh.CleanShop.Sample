import type { VariantProps } from 'class-variance-authority';
import type { badgeVariants } from '@/components/ui/badge';

type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>['variant']>;

export type PostStatus = 'published' | 'draft' | 'review' | 'scheduled';

export type Post = {
  id: string;
  title: string;
  cat: string;
  status: PostStatus;
  author: string;
  views: number;
  date: string;
  tone: string;
};

const POST_STATUS: Record<PostStatus, { variant: BadgeVariant; label: string }> = {
  published: { variant: 'default', label: 'Đã đăng' },
  draft: { variant: 'outline', label: 'Nháp' },
  review: { variant: 'secondary', label: 'Chờ duyệt' },
  scheduled: { variant: 'secondary', label: 'Lên lịch' },
};

export function getPostStatusMeta(status: string) {
  return POST_STATUS[status as PostStatus] ?? { variant: 'outline' as BadgeVariant, label: status };
}

export const CMS_TABS = [
  { value: 'all', label: 'Tất cả' },
  { value: 'published', label: 'Đã đăng' },
  { value: 'draft', label: 'Nháp' },
  { value: 'review', label: 'Chờ duyệt' },
  { value: 'scheduled', label: 'Lên lịch' },
] as const;

export type CmsTab = (typeof CMS_TABS)[number]['value'];

export const POST_CATEGORIES = [
  'Xu hướng',
  'Phối màu',
  'Kinh nghiệm',
  'Phong thủy',
  'Sản phẩm mới',
] as const;

export const POST_AUTHORS = ['Minh Anh', 'Quốc Bảo', 'Thu Trang'] as const;
