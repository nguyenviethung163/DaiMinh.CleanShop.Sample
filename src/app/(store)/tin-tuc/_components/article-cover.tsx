import { cn } from '@/lib/utils';
import { getToneGradient } from '@/store/lib/tone-meta';
import { ARTICLE_COVER_CAPTION } from '../_lib/news-data';
import { StoreContainer } from '@/store/components/store-container';

export function ArticleCover() {
  return (
    <StoreContainer className="pt-8">
      <div
        className={cn('relative overflow-hidden', 'h-[240px] w-full rounded-2xl md:h-[480px]')}
        style={{ background: getToneGradient('paint') }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, rgba(255,255,255,.06) 0 2px, transparent 2px 14px)',
          }}
        />
        <div className="absolute top-2.5 left-2.5 rounded bg-black/35 px-2 py-1 text-[10px] font-semibold tracking-[.04em] text-white/95 uppercase">
          Ảnh chính: Phối màu xu hướng 2026 trong phòng khách
        </div>
      </div>
      <p className="text-muted-foreground mt-2.5 text-center text-xs italic">
        {ARTICLE_COVER_CAPTION}
      </p>
    </StoreContainer>
  );
}
