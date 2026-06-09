import { ABOUT_TIMELINE } from '@/store/lib/storeinfo-data';
import { StoreSection } from '@/store/components/store-section';
import { StoreSectionIntro } from '@/store/components/store-section-intro';

export function AboutTimelineSection() {
  return (
    <StoreSection className="pt-0">
      <StoreSectionIntro
        eyebrow="Hành trình 18 năm"
        title="Những cột mốc đáng nhớ"
        align="center"
        className="mb-6"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ABOUT_TIMELINE.map((item) => (
          <article
            key={item.year}
            className="border-t-orange rounded-xl border-t-[3px] bg-white p-5"
          >
            <div className="text-primary text-[28px] leading-none font-black tracking-[-0.02em]">
              {item.year}
            </div>
            <div className="text-secondary my-2 text-base font-extrabold">{item.title}</div>
            <p className="text-muted-foreground m-0 text-sm leading-relaxed">{item.desc}</p>
          </article>
        ))}
      </div>
    </StoreSection>
  );
}
