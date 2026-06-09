import { getStoreIcon } from '@/store/lib/store-icons';
import { ABOUT_VALUES } from '@/store/lib/storeinfo-data';
import { StoreSection } from '@/store/components/store-section';
import { StoreSectionIntro } from '@/store/components/store-section-intro';

export function AboutValuesSection() {
  return (
    <StoreSection className="pt-0">
      <StoreSectionIntro
        eyebrow="Giá trị cốt lõi"
        title="Những nguyên tắc làm nên Sơn Đại Minh"
        align="center"
        className="mb-6"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ABOUT_VALUES.map((value) => {
          const Icon = getStoreIcon(value.icon);
          return (
            <article key={value.title} className="bg-muted rounded-[14px] p-6">
              <div className="bg-secondary mb-4 grid h-[52px] w-[52px] place-items-center rounded-xl text-white">
                <Icon className="shrink-0" size={26} strokeWidth={1.8} aria-hidden="true" />
              </div>
              <h3 className="text-secondary m-0 mb-2 text-base leading-snug font-extrabold">
                {value.title}
              </h3>
              <p className="text-muted-foreground m-0 text-sm leading-[1.65]">{value.desc}</p>
            </article>
          );
        })}
      </div>
    </StoreSection>
  );
}
