import { Palette, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ContactConsultCta() {
  return (
    <div className="from-navy to-navy-deep rounded-xl bg-gradient-to-br p-[22px] text-white">
      <Palette
        className="text-primary shrink-0"
        size={26}
        strokeWidth={1.7}
        fill="none"
        aria-hidden="true"
      />
      <div className="mt-2 text-[17px] leading-tight font-extrabold">Tư vấn phối màu miễn phí</div>
      <p className="my-2 text-sm leading-relaxed opacity-82">
        Đội ngũ chuyên viên thiết kế sẽ tư vấn phối màu phù hợp với phong cách nhà của Quý khách.
      </p>
      <Button type="button" variant="default" className={cn('gap-2 font-bold', 'w-full py-[11px]')}>
        <Phone className="shrink-0" size={14} strokeWidth={1.7} fill="none" aria-hidden="true" />
        Đặt lịch tư vấn
      </Button>
    </div>
  );
}
