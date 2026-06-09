import type { VariantProps } from 'class-variance-authority';
import type { badgeVariants } from '@/components/ui/badge';

type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>['variant']>;

const LEAD_STATUS_VARIANT: Record<string, BadgeVariant> = {
  new: 'outline',
  contacted: 'secondary',
  qualified: 'secondary',
  proposal: 'default',
  won: 'default',
  lost: 'destructive',
};

export function getLeadStatusVariant(status: string): BadgeVariant {
  return LEAD_STATUS_VARIANT[status] ?? 'outline';
}

export function getLeadScoreClass(score: number) {
  if (score >= 80) return 'text-secondary';
  if (score >= 55) return 'text-primary';
  return 'text-destructive';
}

export const KANBAN_COLUMNS = [
  { key: 'new', title: 'Mới', borderClass: 'border-t-primary' },
  { key: 'contacted', title: 'Đã liên hệ', borderClass: 'border-t-secondary' },
  { key: 'qualified', title: 'Tiềm năng', borderClass: 'border-t-muted-foreground' },
  { key: 'proposal', title: 'Đã gửi đề xuất', borderClass: 'border-t-ring' },
  { key: 'won', title: 'Chuyển đổi', borderClass: 'border-t-secondary' },
] as const;
