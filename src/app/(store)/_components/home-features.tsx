import { getStoreIcon } from '@/store/lib/store-icons';
import { FEATURES } from '@/store/data';
import { StoreSection } from '@/store/components/store-section';

export function HomeFeatures() {
  return (
    <StoreSection noPaddingBottom>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {FEATURES.map((f) => {
          const Icon = getStoreIcon(f.icon);
          return (
            <div key={f.title} className="rounded-lg border bg-white p-4">
              <div className="bg-primary/10 text-primary mb-2.5 grid h-11 w-11 place-items-center rounded-lg">
                <Icon className="shrink-0" size={22} strokeWidth={1.8} aria-hidden="true" />
              </div>
              <div className="text-secondary text-base leading-[1.3] font-bold">{f.title}</div>
              <div className="text-muted-foreground mt-1.5 text-sm leading-normal">{f.desc}</div>
            </div>
          );
        })}
      </div>
    </StoreSection>
  );
}
