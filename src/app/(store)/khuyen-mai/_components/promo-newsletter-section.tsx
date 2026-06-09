'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export function PromoNewsletterSection() {
  return (
    <section className="mt-10 rounded-2xl bg-white p-6 md:p-8">
      <div className="flex flex-col flex-wrap items-start justify-between gap-4 lg:flex-row lg:items-center">
        <div className="max-w-xl">
          <div className="text-primary text-xs font-bold tracking-wide uppercase">
            Không bỏ lỡ ưu đãi
          </div>
          <h3 className="text-secondary m-0 mt-2 text-2xl font-extrabold md:text-[26px]">
            Đăng ký nhận thông báo flash sale sớm 6 giờ
          </h3>
          <p className="text-muted-foreground mt-2 text-base leading-relaxed">
            Khách đăng ký nhận thông báo trước sẽ được mua flash sale trước 6 giờ so với khách
            thường.
          </p>
        </div>

        <form
          className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input
            type="email"
            placeholder="Nhập email của Quý khách"
            className="min-w-0 sm:min-w-[240px]"
          />
          <Button
            type="submit"
            variant="default"
            className={cn('gap-2 font-bold', 'shrink-0 px-[26px] py-3.5')}
          >
            Đăng ký
          </Button>
        </form>
      </div>
    </section>
  );
}
