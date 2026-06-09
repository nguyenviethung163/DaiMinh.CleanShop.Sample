'use client';

import { useState } from 'react';
import { ACCOUNT_NAV, type AccountTabId } from '@/store/lib/commerce-data';
import { StoreContainer } from '@/store/components/store-container';
import { AccountAddressSection } from './account-address-section';
import { AccountNavDrawer, AccountNavDrawerTrigger } from './account-nav-drawer';
import { AccountOrdersSection } from './account-orders-section';
import { AccountPlaceholderSection } from './account-placeholder-section';
import { AccountProfileCard } from './account-profile-card';
import { AccountProfileSection } from './account-profile-section';
import { AccountSidebarNav } from './account-sidebar-nav';

const IMPLEMENTED_TABS: AccountTabId[] = ['orders', 'profile', 'addresses'];

export function AccountView() {
  const [activeTab, setActiveTab] = useState<AccountTabId>('orders');
  const [navOpen, setNavOpen] = useState(false);

  const currentNav = ACCOUNT_NAV.find((item) => item.id === activeTab) ?? ACCOUNT_NAV[1];

  return (
    <StoreContainer className="py-6 md:py-8">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-6">
        <aside className="flex flex-col gap-4">
          <AccountProfileCard />
          <AccountNavDrawerTrigger onOpen={() => setNavOpen(true)} />
          <AccountSidebarNav
            items={ACCOUNT_NAV}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            className="hidden lg:block"
          />
        </aside>

        <div>
          {activeTab === 'orders' && <AccountOrdersSection />}
          {activeTab === 'profile' && <AccountProfileSection />}
          {activeTab === 'addresses' && <AccountAddressSection />}
          {!IMPLEMENTED_TABS.includes(activeTab) && <AccountPlaceholderSection tab={currentNav} />}
        </div>
      </div>

      <AccountNavDrawer
        open={navOpen}
        onClose={() => setNavOpen(false)}
        items={ACCOUNT_NAV}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </StoreContainer>
  );
}
