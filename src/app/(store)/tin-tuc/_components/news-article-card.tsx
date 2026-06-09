import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getToneGradient } from '@/store/lib/tone-meta';
import type { NewsArticle } from '../_lib/news-data';
import { NewsCategoryBadge } from './news-category-badge';

export interface NewsArticleCardProps {
  article: NewsArticle;
  variant?: 'grid' | 'related';
  className?: string;
}

export function NewsArticleCard({ article, variant = 'grid', className }: NewsArticleCardProps) {
  const href = article.href ?? '/tin-tuc/bai-viet';

  if (variant === 'related') {
    return (
      <Link
        href={href}
        className={cn(
          'text-foreground overflow-hidden rounded-[10px] border bg-white no-underline',
          className,
        )}
      >
        <div
          className={cn('relative overflow-hidden', 'aspect-[16/10] w-full')}
          style={{ background: getToneGradient(article.tone ?? 'navy') }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, rgba(255,255,255,.06) 0 2px, transparent 2px 14px)',
            }}
          />
        </div>
        <div className="p-4">
          <NewsCategoryBadge label={article.cat} />
          <h3 className="m-0 mt-2 line-clamp-2 min-h-[42px] text-[15px] leading-[1.35] font-bold">
            {article.title}
          </h3>
          <div className="text-muted-foreground mt-1.5 text-xs">
            {article.date} · {article.read}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        'text-foreground overflow-hidden rounded-[10px] border bg-white no-underline',
        className,
      )}
    >
      <div
        className={cn('relative overflow-hidden', 'aspect-[16/10] w-full')}
        style={{ background: getToneGradient(article.tone ?? 'navy') }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, rgba(255,255,255,.06) 0 2px, transparent 2px 14px)',
          }}
        />
        <div className="absolute top-2.5 left-2.5 rounded bg-black/35 px-2 py-1 text-[10px] font-semibold tracking-[.04em] text-white/95 uppercase">
          Ảnh bài viết
        </div>
      </div>
      <div className="p-4">
        <div className="text-muted-foreground mb-2 flex items-center gap-2 text-xs">
          <NewsCategoryBadge label={article.cat} />
          <span>{article.date}</span>
        </div>
        <h3 className="m-0 min-h-[44px] text-base leading-[1.35] font-bold">{article.title}</h3>
        <p className="text-muted-foreground my-2 line-clamp-2 text-sm leading-[1.55]">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between border border-t pt-3">
          <span className="text-muted-foreground inline-flex items-center gap-1 text-xs">
            <Clock
              className="shrink-0"
              size={12}
              strokeWidth={1.7}
              fill="none"
              aria-hidden="true"
            />{' '}
            {article.read}
          </span>
          <span className="text-primary inline-flex items-center gap-1 text-xs font-bold">
            Đọc tiếp{' '}
            <ArrowRight
              className="shrink-0"
              size={12}
              strokeWidth={1.7}
              fill="none"
              aria-hidden="true"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
