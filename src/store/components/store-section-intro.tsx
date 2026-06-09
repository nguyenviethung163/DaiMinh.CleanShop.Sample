import { cn } from '@/lib/utils';

export interface StoreSectionIntroProps {
  eyebrow: string;
  title: string;
  align?: 'left' | 'center';
  className?: string;
}

export function StoreSectionIntro({
  eyebrow,
  title,
  align = 'left',
  className,
}: StoreSectionIntroProps) {
  return (
    <div className={cn(align === 'center' && 'text-center', className)}>
      <div className="text-primary text-xs font-bold tracking-wide uppercase">{eyebrow}</div>
      <h2 className="text-secondary m-0 mt-2 text-2xl font-extrabold md:text-[32px]">{title}</h2>
    </div>
  );
}
