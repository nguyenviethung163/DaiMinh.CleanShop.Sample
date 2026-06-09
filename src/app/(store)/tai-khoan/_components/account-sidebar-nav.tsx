'use client';

import { LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getStoreIcon } from '@/store/lib/store-icons';
import type { AccountNavItem, AccountTabId } from '@/store/lib/commerce-data';

export interface AccountSidebarNavProps {
  items: AccountNavItem[];
  activeTab: AccountTabId;
  onTabChange: (tab: AccountTabId) => void;
  className?: string;
}

export function AccountSidebarNav({
  items,
  activeTab,
  onTabChange,
  className,
}: AccountSidebarNavProps) {
  return (
    <nav className={cn('rounded-xl border bg-white p-1.5', className)}>
      {items.map((item) => {
        const active = activeTab === item.id;
        const Icon = getStoreIcon(item.icon);
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onTabChange(item.id)}
            className={cn(
              'flex w-full cursor-pointer items-center gap-3 rounded-lg px-3.5 py-2.5 text-left text-[13.5px] font-semibold',
              active ? 'bg-primary/10 text-primary font-bold' : 'text-muted-foreground',
            )}
          >
            <Icon className={cn('shrink-0')} size={17} strokeWidth={1.7} aria-hidden="true" />
            <span className="min-w-0 flex-1">{item.label}</span>
            {item.badge && (
              <span
                className={cn(
                  'rounded-full px-[7px] py-0.5 text-[10px] font-bold',
                  active ? 'bg-primary text-white' : 'bg-muted text-muted-foreground',
                )}
              >
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
      <button
        type="button"
        className="text-muted-foreground mt-1.5 flex w-full cursor-pointer items-center gap-3 border border-t px-3.5 py-2.5 text-left text-[13.5px] font-semibold"
      >
        <LogOut className="shrink-0" size={17} strokeWidth={1.7} fill="none" aria-hidden="true" />
        Đăng xuất
      </button>
    </nav>
  );
}
