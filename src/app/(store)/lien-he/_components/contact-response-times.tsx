import { Clock } from 'lucide-react';
import { CONTACT_RESPONSE_TIMES } from '@/store/lib/storeinfo-data';

export function ContactResponseTimes() {
  return (
    <div className="bg-muted rounded-xl p-[22px]">
      <div className="text-secondary mb-3 inline-flex items-center gap-2 text-sm font-extrabold">
        <Clock
          className="text-primary shrink-0"
          size={16}
          strokeWidth={1.7}
          fill="none"
          aria-hidden="true"
        />
        Thời gian phản hồi
      </div>
      {CONTACT_RESPONSE_TIMES.map((item) => (
        <div key={item.channel} className="mb-2 flex justify-between text-sm last:mb-0">
          <span className="text-muted-foreground">{item.channel}</span>
          <span className="text-success font-bold">{item.time}</span>
        </div>
      ))}
    </div>
  );
}
