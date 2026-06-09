import { cn } from '@/lib/utils';
import { getStoreIcon } from '@/store/lib/store-icons';
import type { AccountNavItem } from '@/store/lib/commerce-data';

export interface AccountPlaceholderSectionProps {
  tab: AccountNavItem;
}

export function AccountPlaceholderSection({ tab }: AccountPlaceholderSectionProps) {
  const Icon = getStoreIcon(tab.icon);
  return (
    <div className="rounded-xl border bg-white px-5 py-16 text-center">
      <div className="bg-muted text-secondary mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl">
        <Icon className={cn('shrink-0')} size={30} strokeWidth={1.7} aria-hidden="true" />
      </div>
      <div className="text-foreground text-lg font-extrabold">{tab.label}</div>
      <p className="text-muted-foreground mt-1.5 text-base">
        Nội dung mục &quot;{tab.label}&quot; sẽ hiển thị tại đây.
      </p>
    </div>
  );
}
