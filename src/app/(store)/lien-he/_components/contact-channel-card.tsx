import { cn } from '@/lib/utils';
import { getStoreIcon } from '@/store/lib/store-icons';
import type { ContactChannel } from '@/store/lib/storeinfo-data';

export interface ContactChannelCardProps {
  channel: ContactChannel;
  highlighted?: boolean;
}

export function ContactChannelCard({ channel, highlighted = false }: ContactChannelCardProps) {
  const Icon = getStoreIcon(channel.ic);

  return (
    <div
      className={cn(
        'flex cursor-pointer items-center gap-3 rounded-xl p-5',
        highlighted ? 'bg-primary/10' : 'bg-muted',
      )}
    >
      <div
        className={cn(
          'grid h-[52px] w-[52px] shrink-0 place-items-center rounded-xl bg-white',
          highlighted ? 'text-primary' : 'text-secondary',
        )}
      >
        <Icon className="shrink-0" size={24} strokeWidth={1.8} aria-hidden="true" />
      </div>
      <div>
        <div className="text-muted-foreground text-xs font-semibold">{channel.name}</div>
        <div className="text-secondary mt-0.5 text-base font-extrabold">{channel.val}</div>
        <div className="text-muted-foreground mt-1 text-xs">{channel.sub}</div>
      </div>
    </div>
  );
}
