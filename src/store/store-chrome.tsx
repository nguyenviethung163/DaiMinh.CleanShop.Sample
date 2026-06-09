'use client';

import { useState } from 'react';
import {
  StoreAnnounceBar,
  StoreContainer,
  StoreFooterBottom,
  StoreFooterMain,
  StoreHeaderActions,
  StoreLogo,
  StoreNavDesktop,
  StoreNavMobile,
  StoreNewsletter,
  StoreSearchBar,
} from './components';

export function StoreHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header>
      <StoreAnnounceBar />

      <div className="sticky top-0 z-40 border border-b bg-white">
        <StoreContainer className="flex flex-col gap-3 py-3 md:grid md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center md:gap-7 md:py-4">
          <div className="flex items-center justify-between md:contents">
            <StoreLogo className="md:col-start-1 md:row-start-1" />
            <StoreHeaderActions
              className="md:col-start-3 md:row-start-1"
              onMenuOpen={() => setMobileOpen(true)}
            />
          </div>
          <StoreSearchBar className="md:col-start-2 md:row-start-1" />
        </StoreContainer>

        <StoreNavDesktop />
      </div>

      <StoreNavMobile open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}

export function StoreFooter() {
  return (
    <footer className="bg-chart-5 mt-10 text-white">
      <StoreNewsletter />
      <StoreFooterMain />
      <StoreFooterBottom />
    </footer>
  );
}
