import { cn } from '@/lib/utils';
import { getToneGradient } from '@/store/lib/tone-meta';
import { StoreContainer } from '@/store/components/store-container';

export function AboutHero() {
  return (
    <section className="from-navy to-navy-soft relative overflow-hidden bg-gradient-to-br from-[48%] py-12 text-white md:py-14">
      <div
        className="pointer-events-none absolute -top-20 -right-24 h-[380px] w-[380px] rounded-full opacity-[0.22]"
        style={{
          background: 'radial-gradient(circle, var(--primary) 0%, transparent 65%)',
        }}
      />

      <StoreContainer className="relative grid grid-cols-1 items-center gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <div className="text-primary text-xs font-bold tracking-wide uppercase">
            Về Sơn Đại Minh
          </div>
          <h1 className="m-0 mt-3.5 mb-[18px] text-3xl leading-[1.04] font-extrabold tracking-[-0.03em] sm:text-4xl lg:text-[50px]">
            Đồng hành cùng <span className="text-primary">15.000+</span> công trình trong suốt 18
            năm
          </h1>
          <p className="m-0 max-w-[520px] text-base leading-[1.65] opacity-90">
            Sơn Đại Minh là đại lý phân phối chính hãng các thương hiệu sơn hàng đầu thế giới. Từ
            một cửa hàng nhỏ tại Thanh Xuân năm 2008, chúng tôi đã trở thành đối tác tin cậy của
            hàng nghìn gia đình và nhà thầu.
          </p>
        </div>

        <div
          className={cn(
            'relative overflow-hidden',
            'h-[280px] w-full rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.3)] sm:h-[340px] lg:h-[400px]',
          )}
          style={{ background: getToneGradient('paint') }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, rgba(255,255,255,.06) 0 2px, transparent 2px 14px)',
            }}
          />
          <div className="absolute top-2.5 left-2.5 rounded bg-black/35 px-2 py-1 text-[10px] font-semibold tracking-[.04em] text-white/95 uppercase">
            Showroom Sơn Đại Minh tại Hà Nội
          </div>
        </div>
      </StoreContainer>
    </section>
  );
}
