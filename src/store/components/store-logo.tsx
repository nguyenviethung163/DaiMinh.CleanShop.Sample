import Link from 'next/link';
import { cn } from '@/lib/utils';

const MARK_GRADIENT = 'linear-gradient(135deg, var(--secondary) 0 55%, var(--primary) 55% 100%)';

export interface StoreLogoProps {
  size?: 'sm' | 'md';
  showTag?: boolean;
  variant?: 'light' | 'dark';
  href?: string | null;
  className?: string;
  onClick?: () => void;
}

export function StoreLogo({
  size = 'md',
  showTag = true,
  variant = 'dark',
  href = '/',
  className,
  onClick,
}: StoreLogoProps) {
  const markSize = size === 'md' ? 'h-12 w-12 text-xl' : 'h-11 w-11 text-lg';
  const nameSize = size === 'md' ? 'text-lg' : 'text-[17px]';

  const content = (
    <>
      <div
        className={cn(
          'grid shrink-0 place-items-center rounded-lg font-extrabold text-white italic shadow-md',
          markSize,
        )}
        style={{ background: MARK_GRADIENT }}
      >
        SĐ
      </div>
      <div className="min-w-0">
        <div
          className={cn(
            'font-extrabold tracking-[-0.01em]',
            nameSize,
            variant === 'dark' ? 'text-secondary' : 'text-white',
          )}
        >
          Sơn Đại Minh
        </div>
        {showTag && (
          <div
            className={cn(
              'mt-0.5 text-[10px] tracking-[0.16em] uppercase',
              variant === 'dark' ? 'text-muted-foreground' : 'text-white/55',
            )}
          >
            Sơn chính hãng · Từ 2008
          </div>
        )}
      </div>
    </>
  );

  if (href !== null) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={cn('flex items-center gap-3 no-underline', className)}
      >
        {content}
      </Link>
    );
  }

  return <div className={cn('flex items-center gap-3', className)}>{content}</div>;
}
