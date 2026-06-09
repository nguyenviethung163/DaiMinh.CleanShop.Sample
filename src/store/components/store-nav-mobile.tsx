'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Flame, Phone, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAV } from '../data';
import { StoreMegaMenuMobile } from './nav/store-mega-menu-mobile';
import { StoreLogo } from './store-logo';
import { StoreSearchBar } from './store-search-bar';

export interface StoreNavMobileProps {
  open: boolean;
  onClose: () => void;
}

export function StoreNavMobile({ open, onClose }: StoreNavMobileProps) {
  const pathname = usePathname();
  const [megaOpen, setMegaOpen] = useState(false);
  const isActive = (to: string) => (to === '/' ? pathname === '/' : pathname.startsWith(to));

  const handleClose = () => {
    setMegaOpen(false);
    onClose();
  };

  return (
    <>
      {open && (
        <div
          onClick={handleClose}
          className="fixed inset-0 z-[110] bg-black/50 lg:hidden"
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-[120] flex w-[min(300px,85vw)] flex-col bg-white shadow-lg transition-transform duration-200 lg:hidden',
          open ? 'translate-x-0' : 'pointer-events-none -translate-x-full',
        )}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border border-b px-4 py-3">
          <StoreLogo size="sm" href="/" onClick={handleClose} />
          <button
            type="button"
            onClick={handleClose}
            aria-label="Đóng menu"
            className="text-muted-foreground hover:bg-muted grid h-9 w-9 place-items-center rounded-md border bg-white"
          >
            <X className="shrink-0" size={18} strokeWidth={1.7} aria-hidden="true" />
          </button>
        </div>

        <div className="border border-b p-4">
          <StoreSearchBar />
        </div>

        <nav className="flex-1 overflow-y-auto">
          {NAV.map((n) =>
            n.mega ? (
              <div key={n.to}>
                <button
                  type="button"
                  onClick={() => setMegaOpen((v) => !v)}
                  className={cn(
                    'text-foreground flex w-full items-center justify-between border border-b px-4 py-3 text-left text-sm font-medium',
                    (isActive(n.to) || megaOpen) && 'bg-primary/10 text-secondary font-bold',
                  )}
                >
                  {n.label}
                  <ChevronDown
                    className={cn('shrink-0', 'transition-transform', megaOpen && 'rotate-180')}
                    size={14}
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                </button>
                <StoreMegaMenuMobile open={megaOpen} onClose={handleClose} />
              </div>
            ) : (
              <Link
                key={n.to}
                href={n.to}
                onClick={handleClose}
                className={cn(
                  'text-foreground flex items-center justify-between border border-b px-4 py-3 text-sm font-medium no-underline',
                  isActive(n.to) && 'bg-primary/10 text-secondary font-bold',
                )}
              >
                {n.label}
              </Link>
            ),
          )}

          <Link
            href="/khuyen-mai"
            onClick={handleClose}
            className="text-primary flex items-center gap-2 px-4 py-3 text-sm font-bold no-underline"
          >
            <Flame className="shrink-0" size={14} strokeWidth={1.7} aria-hidden="true" />
            FLASH SALE 12H
          </Link>
        </nav>

        <div className="border border-t p-4">
          <Link
            href="/lien-he"
            onClick={handleClose}
            className="text-secondary mb-3 flex items-center gap-2 text-sm font-bold no-underline"
          >
            <Phone className="shrink-0" size={16} strokeWidth={1.7} aria-hidden="true" />
            Hotline 1900 6868
          </Link>
          <div className="flex gap-3 text-sm font-semibold">
            <Link href="/dang-nhap" onClick={handleClose} className="text-secondary no-underline">
              Đăng nhập
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link href="/dang-ky" onClick={handleClose} className="text-primary no-underline">
              Đăng ký
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
