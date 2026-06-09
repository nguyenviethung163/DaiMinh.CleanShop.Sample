import { StoreContainer } from '@/store/components/store-container';

export function ContactHero() {
  return (
    <section className="from-navy to-navy-soft bg-gradient-to-br from-50% py-12 text-center text-white md:py-14">
      <StoreContainer>
        <div className="text-primary text-xs font-bold tracking-wide uppercase">
          Liên hệ với chúng tôi
        </div>
        <h1 className="m-0 my-3.5 text-3xl leading-[1.05] font-extrabold tracking-[-0.025em] sm:text-4xl lg:text-[46px]">
          Sơn Đại Minh luôn sẵn sàng hỗ trợ <span className="text-primary">24/7</span>
        </h1>
        <p className="mx-auto max-w-[620px] text-base leading-relaxed opacity-85">
          Hotline · Zalo · Email · Form liên hệ · 3 showroom trên toàn quốc – Quý khách chọn kênh
          phù hợp nhất.
        </p>
      </StoreContainer>
    </section>
  );
}
