'use client';

import { Filter, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CatalogFilterPanel } from './catalog-filter-panel';

export interface CatalogFilterDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CatalogFilterDrawerTrigger({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="text-secondary inline-flex h-11 shrink-0 items-center gap-2 rounded-lg border bg-white px-3 text-sm font-bold lg:hidden"
    >
      <Filter className="shrink-0" size={16} strokeWidth={1.7} fill="none" aria-hidden="true" />
      Bộ lọc
    </button>
  );
}

export function CatalogFilterDrawer({ open, onClose }: CatalogFilterDrawerProps) {
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
          <span className="text-secondary text-base font-extrabold">Bộ lọc</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng bộ lọc"
            className="grid h-9 w-9 place-items-center rounded-md border bg-white"
          >
            <X className="shrink-0" size={18} strokeWidth={1.7} fill="none" aria-hidden="true" />
          </button>
        </div>
        <CatalogFilterPanel showHeader={false} onApply={onClose} />
      </aside>
    </>
  );
}
