import { Clock, MapPin, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getToneGradient } from '@/store/lib/tone-meta';
import { SHOWROOMS } from '@/store/lib/storeinfo-data';
import { StoreSection } from '@/store/components/store-section';
import { StoreSectionIntro } from '@/store/components/store-section-intro';

export function AboutShowroomsSection() {
  return (
    <StoreSection className="pt-0">
      <StoreSectionIntro
        eyebrow="Hệ thống showroom"
        title="Đến trải nghiệm trực tiếp tại showroom"
        className="mb-4"
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {SHOWROOMS.map((showroom) => (
          <article key={showroom.city} className="overflow-hidden rounded-xl border bg-white">
            <div
              className={cn('relative overflow-hidden', 'h-[180px] w-full')}
              style={{ background: getToneGradient(showroom.tone ?? 'navy') }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(45deg, rgba(255,255,255,.06) 0 2px, transparent 2px 14px)',
                }}
              />
              <div className="absolute top-2.5 left-2.5 rounded bg-black/35 px-2 py-1 text-[10px] font-semibold tracking-[.04em] text-white/95 uppercase">
                Showroom {showroom.city}
              </div>
            </div>
            <div className="p-4">
              <div className="text-secondary text-lg font-extrabold">Showroom {showroom.city}</div>
              <div className="text-muted-foreground mt-3 flex flex-col gap-2 text-sm">
                <div className="flex gap-2">
                  <MapPin
                    className="text-primary mt-0.5 shrink-0"
                    size={15}
                    strokeWidth={1.7}
                    fill="none"
                    aria-hidden="true"
                  />
                  {showroom.addr}
                </div>
                <div className="flex gap-2">
                  <Clock
                    className="text-primary shrink-0"
                    size={15}
                    strokeWidth={1.7}
                    fill="none"
                    aria-hidden="true"
                  />
                  T2–CN: {showroom.hour}
                </div>
                <div className="flex gap-2">
                  <Phone
                    className="text-primary shrink-0"
                    size={15}
                    strokeWidth={1.7}
                    fill="none"
                    aria-hidden="true"
                  />
                  <span className="text-secondary font-bold">{showroom.tel}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </StoreSection>
  );
}
