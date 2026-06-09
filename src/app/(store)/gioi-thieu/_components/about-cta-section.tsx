import { Phone } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { StoreSection } from '@/store/components/store-section';

export function AboutCtaSection() {
  return (
    <StoreSection className="pt-0" noPaddingBottom>
      <div className="from-navy to-navy-deep grid grid-cols-1 items-center gap-6 rounded-[20px] bg-gradient-to-br p-8 text-white md:p-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h3 className="m-0 mb-3.5 text-2xl leading-[1.1] font-extrabold tracking-[-0.025em] md:text-[34px]">
            Sẵn sàng đồng hành với công trình của bạn
          </h3>
          <p className="m-0 max-w-[520px] text-[15px] leading-relaxed opacity-85">
            Liên hệ ngay để nhận tư vấn miễn phí từ chuyên viên Sơn Đại Minh – hỗ trợ từ chọn màu
            đến giao hàng tận công trình.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Button
            asChild
            variant="default"
            className={cn('gap-2 font-bold', 'px-[26px] py-[15px]')}
          >
            <Link href="/lien-he">
              <Phone
                className="shrink-0"
                size={16}
                strokeWidth={1.7}
                fill="none"
                aria-hidden="true"
              />
              Gọi hotline 1900 6868
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className={cn(
              'gap-2 font-bold',
              'border border-white/40 bg-white/10 text-white hover:bg-white/15 hover:text-white',
              'px-[26px] py-[15px]',
            )}
          >
            <Link href="/lien-he">Liên hệ qua form</Link>
          </Button>
        </div>
      </div>
    </StoreSection>
  );
}
