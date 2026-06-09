'use client';

import { useState } from 'react';
import type { PromoStatusTab, PromoTypeFilter } from '../_lib/promotions-data';
import { StoreContainer } from '@/store/components/store-container';
import { PromoCampaignGrid } from './promo-campaign-grid';
import { PromoFilterToolbar } from './promo-filter-toolbar';
import { PromoHero } from './promo-hero';
import { PromoNewsletterSection } from './promo-newsletter-section';
import { PromoVouchersSection } from './promo-vouchers-section';

export function PromotionsView() {
  const [statusTab, setStatusTab] = useState<PromoStatusTab>('Tất cả (14)');
  const [typeFilter, setTypeFilter] = useState<PromoTypeFilter>('Flash sale');

  return (
    <div>
      <PromoHero />

      <PromoFilterToolbar
        statusTab={statusTab}
        typeFilter={typeFilter}
        onStatusChange={setStatusTab}
        onTypeChange={setTypeFilter}
      />

      <StoreContainer className="py-8 md:py-10">
        <PromoCampaignGrid />
        <PromoVouchersSection />
        <PromoNewsletterSection />
      </StoreContainer>
    </div>
  );
}
