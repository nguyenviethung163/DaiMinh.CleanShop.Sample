import { cn } from '@/lib/utils';

type BadgeTone = 'orange' | 'success' | 'muted';

const TONE: Record<BadgeTone, string> = {
  orange: 'bg-white text-primary',
  success: 'bg-success text-white',
  muted: 'bg-muted text-muted-foreground',
};

export interface CommerceBadgeProps {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
}

export function CommerceBadge({ children, tone = 'orange', className }: CommerceBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex rounded px-[7px] py-0.5 text-[10px] font-bold',
        TONE[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
