import Link from 'next/link';
import { cn } from '@/lib/utils';
import { getStoreIcon } from '@/store/lib/store-icons';
import { CATEGORIES } from '@/store/data';

export function CategoryStrip() {
  return (
    <>
      {/* Mobile / tablet: horizontal scroll */}
      <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
        {CATEGORIES.map((c, i) => {
          const Icon = getStoreIcon(c.icon);
          return (
            <Link
              key={c.name}
              href="/san-pham"
              className={cn(
                'text-foreground flex shrink-0 items-center gap-2 rounded-md border bg-white px-3 py-2 text-sm no-underline',
                i === 1 && 'border-orange bg-primary/10 font-bold',
              )}
            >
              <Icon
                className="shrink-0"
                size={16}
                strokeWidth={1.7}
                style={{ color: i === 1 ? 'var(--primary)' : 'var(--secondary)' }}
                aria-hidden="true"
              />
              <span>{c.name}</span>
              <span className="text-muted-foreground text-xs">{c.count}</span>
            </Link>
          );
        })}
      </div>

      {/* Desktop: vertical list */}
      <div className="hidden flex-col rounded-md border bg-white py-2 lg:flex">
        {CATEGORIES.map((c, i) => {
          const Icon = getStoreIcon(c.icon);
          return (
            <Link
              key={c.name}
              href="/san-pham"
              className={cn(
                'text-foreground hover:border-l-orange hover:bg-primary/10 flex items-center gap-2.5 border-l-[3px] border-transparent px-3.5 py-2.5 text-[13px] no-underline',
                i === 1 && 'border-l-orange bg-primary/10 font-bold',
              )}
            >
              <Icon
                className="shrink-0"
                size={16}
                strokeWidth={1.7}
                style={{ color: i === 1 ? 'var(--primary)' : 'var(--secondary)' }}
                aria-hidden="true"
              />
              <span className="min-w-0 flex-1">{c.name}</span>
              <span className="text-muted-foreground text-xs">{c.count}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
