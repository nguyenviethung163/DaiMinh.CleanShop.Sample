'use client';

import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export function NewsSidebarNewsletter() {
  return (
    <div className="from-navy to-navy-deep rounded-[10px] bg-gradient-to-br p-[22px] text-white">
      <Mail
        className="text-primary shrink-0"
        size={26}
        strokeWidth={1.7}
        fill="none"
        aria-hidden="true"
      />
      <div className="mt-2 text-base leading-tight font-extrabold">Đăng ký nhận bản tin</div>
      <p className="my-2 text-sm leading-relaxed opacity-82">
        Cẩm nang chọn sơn và xu hướng mới hàng tuần.
      </p>
      <form onSubmit={(e) => e.preventDefault()}>
        <Input
          type="email"
          placeholder="Email của Quý khách"
          className="border-white/20 bg-white/6 text-white placeholder:text-white/60"
        />
        <Button
          type="submit"
          variant="default"
          className={cn('gap-2 font-bold', 'mt-2 w-full py-2.5')}
        >
          Đăng ký
        </Button>
      </form>
    </div>
  );
}
