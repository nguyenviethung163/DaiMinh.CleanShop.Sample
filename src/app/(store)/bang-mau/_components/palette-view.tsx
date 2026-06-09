'use client';

import { useMemo, useState } from 'react';
import { filterPaletteGroups, type PaletteToneFilter } from '@/store/lib/palette-data';
import { StoreContainer } from '@/store/components/store-container';
import { StorePageHero } from '@/store/components/store-page-hero';
import { PaletteGroup } from './palette-group';
import { PaletteToneFilterBar } from './palette-tone-filter';

export function PaletteView() {
  const [tone, setTone] = useState<PaletteToneFilter>('Tất cả');
  const groups = useMemo(() => filterPaletteGroups(tone), [tone]);

  return (
    <div>
      <StorePageHero
        title="Bảng màu sơn"
        crumb="Bảng màu"
        sub="Hơn 2.000 mã màu chính hãng – pha chuẩn tại showroom"
      />

      <StoreContainer className="py-8 md:py-10">
        <PaletteToneFilterBar value={tone} onChange={setTone} />

        <div className="flex flex-col gap-6">
          {groups.map(([group, colors]) => (
            <PaletteGroup key={group} group={group} colors={colors} />
          ))}
        </div>
      </StoreContainer>
    </div>
  );
}
