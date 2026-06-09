import { MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Showroom } from '@/store/lib/storeinfo-data';

export interface ContactShowroomCardProps {
  showroom: Showroom;
  active?: boolean;
  onSelect?: () => void;
}

export function ContactShowroomCard({
  showroom,
  active = false,
  onSelect,
}: ContactShowroomCardProps) {
  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onSelect?.();
      }}
      className={cn(
        'relative cursor-pointer rounded-xl border-[1.5px] bg-white p-[18px]',
        active ? 'border-orange' : 'border',
      )}
    >
      {showroom.flagship && (
        <span className="bg-primary absolute top-3.5 right-3.5 rounded px-2 py-0.5 text-[10px] font-extrabold text-white">
          FLAGSHIP
        </span>
      )}

      <div className="flex items-center gap-3">
        <div className="bg-secondary grid h-14 w-14 shrink-0 place-items-center rounded-[10px] text-white">
          <MapPin className="shrink-0" size={24} strokeWidth={1.7} fill="none" aria-hidden="true" />
        </div>
        <div>
          <div className="text-secondary text-lg font-extrabold">Showroom {showroom.city}</div>
          <div className="text-muted-foreground mt-1 text-xs">{showroom.addr}</div>
        </div>
      </div>

      <div className="mt-3.5 grid grid-cols-3 gap-3 border border-t pt-3.5">
        <div>
          <div className="text-muted-foreground text-xs tracking-wide uppercase">Hotline</div>
          <div className="text-primary mt-1 text-xs font-bold">{showroom.tel}</div>
        </div>
        <div>
          <div className="text-muted-foreground text-xs tracking-wide uppercase">Giờ mở</div>
          <div className="text-foreground mt-1 text-xs font-semibold">{showroom.hour}</div>
        </div>
        <div>
          <div className="text-muted-foreground text-xs tracking-wide uppercase">Email</div>
          <div className="text-foreground mt-1 text-[11px] font-semibold">{showroom.email}</div>
        </div>
      </div>

      <div className="mt-3 flex gap-2" onClick={(e) => e.stopPropagation()}>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className={cn('gap-2 font-bold', 'flex-1 py-2 text-xs')}
        >
          <MapPin className="shrink-0" size={13} strokeWidth={1.7} fill="none" aria-hidden="true" />
          Chỉ đường
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className={cn(
            'gap-2 font-bold',
            'border-secondary text-secondary hover:bg-muted',
            'flex-1 py-2 text-xs',
          )}
        >
          <Phone className="shrink-0" size={13} strokeWidth={1.7} fill="none" aria-hidden="true" />
          Gọi ngay
        </Button>
      </div>
    </article>
  );
}
