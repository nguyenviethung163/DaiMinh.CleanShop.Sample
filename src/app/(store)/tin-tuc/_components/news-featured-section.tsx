import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getToneGradient } from '@/store/lib/tone-meta';
import { ARTICLE_AUTHOR, ARTICLE_FEATURED } from '../_lib/news-data';
import { StoreContainer } from '@/store/components/store-container';
import { NewsCategoryBadge } from './news-category-badge';

export function NewsFeaturedSection() {
  const article = ARTICLE_FEATURED;

  return (
    <section className="bg-white py-8 md:py-10">
      <StoreContainer>
        <div className="text-primary text-xs font-bold tracking-wide uppercase">
          Tin tức & kinh nghiệm
        </div>
        <h1 className="text-secondary m-0 mt-1 text-[28px] font-extrabold md:text-[34px]">
          Cẩm nang chọn sơn cho ngôi nhà của bạn
        </h1>

        <div className="mt-4 grid grid-cols-1 overflow-hidden rounded-2xl border lg:grid-cols-[1.4fr_1fr]">
          <div
            className={cn('relative overflow-hidden', 'min-h-[280px] w-full lg:min-h-[360px]')}
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
              Ảnh bài viết nổi bật
            </div>
          </div>
          <div className="flex flex-col justify-center p-6 md:p-8 lg:px-8 lg:py-9">
            <NewsCategoryBadge
              label={`BÀI VIẾT NỔI BẬT · ${article.cat.toUpperCase()}`}
              variant="navy"
              className="self-start"
            />
            <h2 className="text-secondary m-0 my-4 text-2xl leading-[1.15] font-extrabold tracking-[-0.025em] md:text-[30px]">
              {article.title}
            </h2>
            <p className="text-muted-foreground m-0 mb-[18px] text-[15px] leading-relaxed">
              {article.excerpt}
            </p>
            <div className="text-muted-foreground mb-5 flex flex-wrap items-center gap-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="bg-muted text-secondary grid h-[26px] w-[26px] place-items-center rounded-full text-[11px] font-bold">
                  {ARTICLE_AUTHOR.initials}
                </div>
                <span className="text-foreground font-semibold">{ARTICLE_AUTHOR.name}</span>
              </div>
              <span>·</span>
              <span>{article.date}</span>
              <span>·</span>
              <span>{article.read}</span>
            </div>
            <Button asChild variant="default" className={cn('gap-2 font-bold', 'self-start')}>
              <Link href="/tin-tuc/bai-viet">
                Đọc bài viết{' '}
                <ArrowRight
                  className="shrink-0"
                  size={15}
                  strokeWidth={1.7}
                  fill="none"
                  aria-hidden="true"
                />
              </Link>
            </Button>
          </div>
        </div>
      </StoreContainer>
    </section>
  );
}
