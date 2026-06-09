'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Flame, LayoutGrid } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAV } from '../data';
import { StoreMegaMenu } from './nav/store-mega-menu';
import { StoreContainer } from './store-container';

export function StoreNavDesktop() {
  const pathname = usePathname();
  const [megaOpen, setMegaOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const isActive = (to: string) => (to === '/' ? pathname === '/' : pathname.startsWith(to));

  const openMega = useCallback(() => setMegaOpen(true), []);
  const closeMega = useCallback(() => setMegaOpen(false), []);

  useEffect(() => {
    closeMega();
  }, [pathname, closeMega]);

  useEffect(() => {
    if (!megaOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMega();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [megaOpen, closeMega]);

  useEffect(() => {
    if (!megaOpen) return;

    const onPointerDown = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) closeMega();
    };

    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [megaOpen, closeMega]);

  return (
    <nav ref={navRef} className="bg-secondary relative hidden lg:block">
      <StoreContainer className="flex items-stretch">
        <button
          type="button"
          aria-expanded={megaOpen}
          aria-haspopup="true"
          onMouseEnter={openMega}
          onClick={() => setMegaOpen((v) => !v)}
          className={cn(
            'bg-chart-5 flex min-w-[230px] items-center gap-2.5 px-5 py-3.5 text-sm font-bold text-white',
            megaOpen && 'bg-chart-5/90',
          )}
        >
          <LayoutGrid className="shrink-0" size={18} strokeWidth={1.7} aria-hidden="true" />
          Danh mục sản phẩm
          <ChevronDown
            className={cn('shrink-0', 'ml-auto transition-transform', megaOpen && 'rotate-180')}
            size={14}
            strokeWidth={1.7}
            aria-hidden="true"
          />
        </button>

        {NAV.map((n) =>
          n.mega ? (
            <button
              key={n.to}
              type="button"
              aria-expanded={megaOpen}
              onMouseEnter={openMega}
              onClick={() => setMegaOpen((v) => !v)}
              className={cn(
                'inline-flex items-center gap-1 border-b-[3px] border-transparent px-4 py-3.5 text-sm text-white/90 hover:text-white',
                (isActive(n.to) || megaOpen) && 'border-b-orange font-bold text-white',
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
          ) : (
            <Link
              key={n.to}
              href={n.to}
              onMouseEnter={closeMega}
              className={cn(
                'inline-flex items-center gap-1 border-b-[3px] border-transparent px-4 py-3.5 text-sm text-white/90 no-underline hover:text-white',
                isActive(n.to) && 'border-b-orange font-bold text-white',
              )}
            >
              {n.label}
            </Link>
          ),
        )}

        <Link
          href="/khuyen-mai"
          onMouseEnter={closeMega}
          className="text-primary ml-auto inline-flex items-center gap-2 px-2 text-[13px] font-bold no-underline"
        >
          <Flame className="shrink-0" size={14} strokeWidth={1.7} aria-hidden="true" />
          FLASH SALE 12H
        </Link>
      </StoreContainer>

      <StoreMegaMenu open={megaOpen} onClose={closeMega} />
    </nav>
  );
}
