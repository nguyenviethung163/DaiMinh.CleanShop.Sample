'use client';

import { ChevronDown, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AccountNavItem, AccountTabId } from '@/store/lib/commerce-data';
import { AccountSidebarNav } from './account-sidebar-nav';

export interface AccountNavDrawerProps {
  open: boolean;
  onClose: () => void;
  items: AccountNavItem[];
  activeTab: AccountTabId;
  onTabChange: (tab: AccountTabId) => void;
}

export function AccountNavDrawerTrigger({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="text-secondary inline-flex h-11 w-full items-center justify-between gap-2 rounded-lg border bg-white px-3 text-sm font-bold lg:hidden"
    >
      <span className="inline-flex items-center gap-2">
        <Menu className="shrink-0" size={16} strokeWidth={1.7} fill="none" aria-hidden="true" />
        Menu tài khoản
      </span>
      <ChevronDown
        className="text-muted-foreground shrink-0"
        size={14}
        strokeWidth={1.7}
        fill="none"
        style={{ transform: 'rotate(-90deg)' }}
        aria-hidden="true"
      />
    </button>
  );
}

export function AccountNavDrawer({
  open,
  onClose,
  items,
  activeTab,
  onTabChange,
}: AccountNavDrawerProps) {
  const handleTabChange = (tab: AccountTabId) => {
    onTabChange(tab);
    onClose();
  };

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-[110] bg-black/50 lg:hidden"
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-[120] flex w-[min(320px,90vw)] flex-col overflow-y-auto bg-white px-4 shadow-lg transition-transform duration-200 lg:hidden',
          open ? 'translate-x-0' : 'pointer-events-none -translate-x-full',
        )}
        aria-hidden={!open}
      >
        <div className="sticky top-0 flex items-center justify-between border border-b bg-white py-3">
          <span className="text-secondary text-base font-extrabold">Tài khoản</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng menu"
            className="grid h-9 w-9 place-items-center rounded-md border bg-white"
          >
            <X className="shrink-0" size={18} strokeWidth={1.7} fill="none" aria-hidden="true" />
          </button>
        </div>
        <div className="py-3">
          <AccountSidebarNav
            items={items}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            className="border-0 p-0"
          />
        </div>
      </aside>
    </>
  );
}
