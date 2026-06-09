'use client';

import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getStoreIcon } from '@/store/lib/store-icons';
import { BRANDS, CATEGORIES } from '@/store/data';
import { MEGA_MENU_QUICK_LINKS } from '@/store/lib/mega-menu-data';
import { StoreContainer } from '../store-container';

export interface StoreMegaMenuProps {
  open: boolean;
  onClose: () => void;
  className?: string;
}

export function StoreMegaMenu({ open, onClose, className }: StoreMegaMenuProps) {
  if (!open) return null;

  return (
    <div
      className={cn(
        'absolute top-full right-0 left-0 z-50 border border-t bg-white shadow-[0_24px_48px_rgba(11,42,91,0.14)]',
        className,
      )}
      onMouseLeave={onClose}
    >
      <StoreContainer className="grid grid-cols-1 gap-8 py-8 lg:grid-cols-[1.4fr_1fr_260px]">
        <div>
          <div className="text-primary mb-4 text-xs font-bold tracking-wide uppercase">
            Danh mục sơn
          </div>
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((category) => {
              const Icon = getStoreIcon(category.icon);
              return (
                <Link
                  key={category.name}
                  href="/san-pham"
                  onClick={onClose}
                  className="group text-foreground hover:bg-primary/10 flex items-center gap-2.5 rounded-lg px-2.5 py-2.5 no-underline"
                >
                  <span className="bg-muted text-secondary grid h-9 w-9 shrink-0 place-items-center rounded-lg group-hover:bg-white">
                    <Icon className="shrink-0" size={17} strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm leading-snug font-semibold">
                      {category.name}
                    </span>
                    <span className="text-muted-foreground text-xs">{category.count}</span>
                  </span>
                  <ArrowRight
                    size={12}
                    strokeWidth={1.7}
                    fill="none"
                    aria-hidden="true"
                    className="text-muted-foreground shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </Link>
              );
            })}
          </div>
        </div>

        <div>
          <div className="text-primary mb-4 text-xs font-bold tracking-wide uppercase">
            Thương hiệu
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {BRANDS.map((brand) => (
              <Link
                key={brand.name}
                href="/san-pham"
                onClick={onClose}
                className="hover:border-primary hover:bg-primary/10/40 relative rounded-lg border bg-white px-3 py-3 text-center no-underline"
              >
                <span className="bg-primary/10 text-primary absolute top-2 right-2 rounded px-1.5 py-0.5 text-[9px] font-bold">
                  {brand.tag}
                </span>
                <div className="text-secondary text-lg font-black tracking-[-0.02em] italic">
                  {brand.name}
                </div>
                <div className="text-muted-foreground mt-1 text-[11px] leading-snug">
                  {brand.line}
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="from-orange-deep via-orange rounded-xl bg-gradient-to-br to-[#ff9a4a] p-5 text-white">
            <div className="inline-flex items-center gap-2 text-lg font-black">
              <Zap className="shrink-0" size={22} strokeWidth={0} fill="#fff" aria-hidden="true" />
              FLASH SALE
            </div>
            <p className="mt-2 text-sm leading-relaxed opacity-90">
              Giảm tới 35% — Dulux, Jotun, Nippon. Kết thúc sau 11 giờ.
            </p>
            <Link
              href="/khuyen-mai"
              onClick={onClose}
              className="mt-3 inline-flex w-full items-center justify-center rounded-md border-white/40 bg-white/10 px-[22px] py-2.5 text-sm font-bold text-white no-underline hover:bg-white/15"
            >
              Săn deal ngay
            </Link>
          </div>

          <div className="bg-muted rounded-xl border p-4">
            <div className="text-muted-foreground mb-3 text-xs font-bold tracking-wide uppercase">
              Truy cập nhanh
            </div>
            <div className="flex flex-col gap-1">
              {MEGA_MENU_QUICK_LINKS.map((link) => {
                const Icon = getStoreIcon(link.icon);
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={onClose}
                    className="text-secondary flex items-center gap-2 rounded-md px-2 py-2 text-sm font-semibold no-underline hover:bg-white"
                  >
                    <Icon
                      className={cn('shrink-0', 'text-primary')}
                      size={15}
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </StoreContainer>
    </div>
  );
}
