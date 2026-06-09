import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getToneGradient } from '@/store/lib/tone-meta';
import { NEWS } from '@/store/data';
import { StoreSection, StoreSectionHead } from '@/store/components/store-section';

export function HomeNews() {
  return (
    <StoreSection>
      <StoreSectionHead
        title="Tin tức & kinh nghiệm chọn sơn"
        action={
          <Link
            href="/tin-tuc"
            className="text-primary inline-flex items-center gap-1.5 text-sm font-bold no-underline"
          >
            Xem tất cả{' '}
            <ArrowRight
              className="shrink-0"
              size={12}
              strokeWidth={1.7}
              fill="none"
              aria-hidden="true"
            />
          </Link>
        }
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {NEWS.map((n, i) => (
          <Link
            key={i}
            href="/tin-tuc/bai-viet"
            className="text-foreground overflow-hidden rounded-lg border bg-white no-underline"
          >
            <div
              className={cn('relative overflow-hidden', 'aspect-[16/10] w-full')}
              style={{ background: getToneGradient(n.tone) }}
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
            <div className="p-3">
              <div className="text-muted-foreground mb-2 flex items-center gap-2 text-xs">
                <span className="bg-primary/10 text-primary rounded px-2 py-0.5 font-bold">
                  {n.cat}
                </span>
                <span>{n.date}</span>
                <span>·</span>
                <span>{n.read}</span>
              </div>
              <div className="text-base leading-[1.35] font-bold">{n.title}</div>
              <p className="text-muted-foreground mt-2 line-clamp-2 text-sm leading-[1.55]">
                {n.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </StoreSection>
  );
}
