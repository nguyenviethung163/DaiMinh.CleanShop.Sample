'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { getToneGradient } from '@/store/lib/tone-meta';
import { CONTACT_MAP_DEFAULT, SHOWROOMS } from '@/store/lib/storeinfo-data';
import { StoreSectionIntro } from '@/store/components/store-section-intro';
import { StoreSection } from '@/store/components/store-section';
import { ContactShowroomCard } from './contact-showroom-card';

export function ContactShowroomsSection() {
  const [activeShowroom, setActiveShowroom] = useState(0);

  return (
    <StoreSection noPaddingBottom className="pt-0">
      <StoreSectionIntro
        eyebrow="Hệ thống showroom"
        title="3 showroom trên toàn quốc"
        className="mb-6"
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div
          className={cn('relative overflow-hidden', 'h-[280px] w-full rounded-[14px] md:h-[460px]')}
          style={{ background: getToneGradient(CONTACT_MAP_DEFAULT.tone ?? 'navy') }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, rgba(255,255,255,.06) 0 2px, transparent 2px 14px)',
            }}
          />
          {CONTACT_MAP_DEFAULT.label && (
            <div className="absolute top-2.5 left-2.5 rounded bg-black/35 px-2 py-1 text-[10px] font-semibold tracking-[.04em] text-white/95 uppercase">
              {CONTACT_MAP_DEFAULT.label}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3">
          {SHOWROOMS.map((showroom, index) => (
            <ContactShowroomCard
              key={showroom.city}
              showroom={showroom}
              active={activeShowroom === index}
              onSelect={() => setActiveShowroom(index)}
            />
          ))}
        </div>
      </div>
    </StoreSection>
  );
}
