'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { getStoreIcon } from '@/store/lib/store-icons';
import { BRANDS, CATEGORIES } from '@/store/data';
import { MEGA_MENU_QUICK_LINKS } from '@/store/lib/mega-menu-data';

export interface StoreMegaMenuMobileProps {
  open: boolean;
  onClose: () => void;
}

export function StoreMegaMenuMobile({ open, onClose }: StoreMegaMenuMobileProps) {
  if (!open) return null;

  return (
    <div className="bg-muted border border-b px-4 py-3">
      <div className="text-primary mb-3 text-xs font-bold tracking-wide uppercase">
        Danh mục sơn
      </div>
      <div className="flex flex-col gap-1">
        {CATEGORIES.map((category) => {
          const Icon = getStoreIcon(category.icon);
          return (
            <Link
              key={category.name}
              href="/san-pham"
              onClick={onClose}
              className="text-foreground flex items-center gap-2.5 rounded-lg bg-white px-3 py-2.5 text-sm no-underline"
            >
              <Icon
                className={cn('shrink-0', 'text-secondary')}
                size={16}
                strokeWidth={1.7}
                aria-hidden="true"
              />
              <span className="flex-1 font-semibold">{category.name}</span>
              <span className="text-muted-foreground text-xs">{category.count}</span>
            </Link>
          );
        })}
      </div>

      <div className="text-primary mt-4 mb-2 text-xs font-bold tracking-wide uppercase">
        Thương hiệu
      </div>
      <div className="grid grid-cols-2 gap-2">
        {BRANDS.map((brand) => (
          <Link
            key={brand.name}
            href="/san-pham"
            onClick={onClose}
            className="text-secondary rounded-lg border bg-white px-2 py-2.5 text-center text-sm font-bold no-underline"
          >
            {brand.name}
          </Link>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-1">
        {MEGA_MENU_QUICK_LINKS.map((link) => {
          const Icon = getStoreIcon(link.icon);
          return (
            <Link
              key={link.label}
              href={link.href}
              onClick={onClose}
              className={cn(
                'text-secondary flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold no-underline',
                link.icon === 'fire' ? 'bg-primary/10 text-primary' : 'bg-white',
              )}
            >
              <Icon className="shrink-0" size={14} strokeWidth={1.7} aria-hidden="true" />
              {link.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
