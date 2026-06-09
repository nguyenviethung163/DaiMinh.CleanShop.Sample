import { cn } from '@/lib/utils';
import { getToneGradient } from '@/store/lib/tone-meta';
import { TESTIMONIALS } from '@/store/data';
import { StoreSection } from '@/store/components/store-section';
import { StoreSectionHead } from '@/store/components/store-section';
import { StoreStars } from '@/store/components/store-stars';
import { HomeConsultForm } from './home-consult-form';

export function HomeTestimonials() {
  return (
    <StoreSection noPaddingBottom>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.7fr_1fr]">
        <div className="rounded-lg bg-white p-5 md:p-7">
          <StoreSectionHead
            title="Khách hàng nói gì về Sơn Đại Minh"
            action={
              <div className="flex items-center gap-2">
                <StoreStars n={5} size={14} />
                <span className="text-foreground font-bold">4.9/5</span>
                <span className="text-muted-foreground text-sm">· 2.847 đánh giá</span>
              </div>
            }
            className="mb-4"
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="rounded-lg border p-4">
                <div
                  className={cn('relative overflow-hidden', 'mb-2.5 h-[120px] w-full rounded-md')}
                  style={{ background: getToneGradient(t.tone) }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(45deg, rgba(255,255,255,.06) 0 2px, transparent 2px 14px)',
                    }}
                  />
                  <div className="absolute top-2.5 left-2.5 rounded bg-black/35 px-2 py-1 text-[10px] font-semibold tracking-[.04em] text-white/95 uppercase">
                    Công trình thực tế
                  </div>
                </div>
                <StoreStars n={t.rating} />
                <p className="text-muted-foreground my-2 text-sm leading-[1.55]">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="border border-t pt-2.5">
                  <div className="text-foreground text-sm font-bold">{t.name}</div>
                  <div className="text-muted-foreground text-xs">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <HomeConsultForm />
      </div>
    </StoreSection>
  );
}
