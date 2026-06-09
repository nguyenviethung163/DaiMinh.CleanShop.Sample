import { cn } from '@/lib/utils';
import { getToneGradient } from '@/store/lib/tone-meta';
import { ABOUT_TEAM } from '@/store/lib/storeinfo-data';
import { StoreSection } from '@/store/components/store-section';
import { StoreSectionIntro } from '@/store/components/store-section-intro';

export function AboutTeamSection() {
  return (
    <StoreSection className="pt-0">
      <StoreSectionIntro
        eyebrow="Đội ngũ lãnh đạo"
        title="Những người đứng sau Sơn Đại Minh"
        align="center"
        className="mb-6"
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {ABOUT_TEAM.map((member) => (
          <div key={member.name} className="text-center">
            <div
              className={cn('relative overflow-hidden', 'aspect-[4/5] w-full rounded-xl')}
              style={{ background: getToneGradient(member.tone ?? 'navy') }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(45deg, rgba(255,255,255,.06) 0 2px, transparent 2px 14px)',
                }}
              />
              <div className="absolute top-2.5 left-2.5 rounded bg-black/35 px-2 py-1 text-[10px] font-semibold tracking-[.04em] text-white/95 uppercase">
                Ảnh chân dung
              </div>
            </div>
            <div className="text-secondary mt-3.5 text-[17px] font-extrabold">{member.name}</div>
            <div className="text-primary mt-1 text-sm font-semibold">{member.role}</div>
            <div className="text-muted-foreground mt-1 text-xs">
              Tại Sơn Đại Minh từ {member.since}
            </div>
          </div>
        ))}
      </div>
    </StoreSection>
  );
}
