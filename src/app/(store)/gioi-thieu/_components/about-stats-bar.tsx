import { cn } from '@/lib/utils';
import { ABOUT_STATS } from '@/store/lib/storeinfo-data';
import { StoreContainer } from '@/store/components/store-container';

export function AboutStatsBar() {
  return (
    <section className="bg-white">
      <StoreContainer className="relative z-[2] -mt-10 md:-mt-12">
        <div className="grid grid-cols-2 gap-4 rounded-2xl bg-white p-6 shadow-[0_24px_60px_rgba(11,42,91,0.12)] md:grid-cols-3 md:gap-5 md:px-8 md:py-7 lg:grid-cols-6">
          {ABOUT_STATS.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                'text-center',
                index < ABOUT_STATS.length - 1 && 'lg:border lg:border-r',
                index % 2 === 0 && index < ABOUT_STATS.length - 1 && 'max-lg:pr-2',
              )}
            >
              <div className="text-primary text-[28px] leading-none font-black tracking-[-0.03em] md:text-[34px]">
                {stat.value}
              </div>
              <div className="text-muted-foreground mt-2.5 text-xs font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </StoreContainer>
    </section>
  );
}
