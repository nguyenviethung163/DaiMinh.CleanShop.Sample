import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { StoreContainer } from '@/store/components/store-container';

export function PromoHero() {
  return (
    <section className="from-navy-deep via-navy to-orange-deep bg-gradient-to-r py-10 text-center text-white md:py-12">
      <StoreContainer>
        <div className="text-primary text-xs font-bold tracking-wide uppercase">
          Ưu đãi tháng 5 / 2026
        </div>
        <h1 className="m-0 my-3.5 text-3xl leading-[1.02] font-black tracking-[-0.03em] sm:text-4xl lg:text-[52px]">
          Khuyến mãi <span className="text-primary">cực sốc</span>
          <br />
          cho mọi công trình
        </h1>
        <p className="mx-auto mb-6 max-w-[600px] text-base leading-relaxed opacity-85">
          Hơn <b>14 chương trình ưu đãi</b> đang diễn ra. Voucher tích lũy không giới hạn, áp dụng
          đồng thời với khuyến mãi của hãng.
        </p>
        <div className="inline-flex flex-wrap justify-center gap-2">
          <Button asChild variant="default" className={cn('gap-2 font-bold')}>
            <Link href="/san-pham">Săn deal ngay</Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className={cn(
              'gap-2 font-bold',
              'border border-white/40 bg-white/10 text-white hover:bg-white/15 hover:text-white',
            )}
          >
            <Link href="/tai-khoan">Voucher của tôi</Link>
          </Button>
        </div>
      </StoreContainer>
    </section>
  );
}
