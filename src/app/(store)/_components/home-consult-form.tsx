import Link from 'next/link';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const FIELDS = [
  ['Họ và tên', 'Nguyễn Văn A'],
  ['Số điện thoại', '0988 xxx xxx'],
  ['Diện tích (m²)', '120 m²'],
] as const;

export function HomeConsultForm() {
  return (
    <div className="from-navy to-navy-deep rounded-lg bg-gradient-to-br p-6 text-white">
      <div className="text-primary text-xs font-bold tracking-wide uppercase">Tư vấn miễn phí</div>
      <h3 className="m-0 mt-2 text-[22px] leading-[1.15] font-extrabold">
        Để chúng tôi tư vấn phối màu cho công trình của Quý khách
      </h3>
      <p className="mt-2 mb-4 text-sm leading-[1.55] opacity-80">
        Chuyên viên sẽ liên hệ trong vòng 15 phút (kể cả ngoài giờ hành chính).
      </p>
      <div className="flex flex-col gap-3">
        {FIELDS.map(([label, placeholder]) => (
          <div key={label}>
            <label className="mb-1 block text-xs opacity-75">{label}</label>
            <input
              placeholder={placeholder}
              className="w-full rounded border-white/20 bg-white/5 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/50"
            />
          </div>
        ))}
      </div>
      <Button asChild variant="default" className={cn('gap-2 font-bold', 'mt-4 w-full')}>
        <Link href="/lien-he">
          <Phone className="shrink-0" size={16} strokeWidth={1.7} fill="none" aria-hidden="true" />
          Yêu cầu gọi lại
        </Link>
      </Button>
    </div>
  );
}
