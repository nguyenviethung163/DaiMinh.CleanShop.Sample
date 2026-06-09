import Link from 'next/link';
import { Zap } from 'lucide-react';
import { StoreContainer } from './store-container';

export function StoreAnnounceBar() {
  return (
    <div className="bg-secondary text-xs text-white">
      <StoreContainer className="flex h-9 items-center justify-between gap-3">
        <span className="inline-flex min-w-0 items-center gap-2 truncate text-[11px] sm:text-xs">
          <Zap className="shrink-0" size={14} strokeWidth={1.7} aria-hidden="true" />
          <span className="truncate">Miễn phí giao hàng nội thành cho đơn từ 2.000.000đ</span>
        </span>
        <span className="hidden shrink-0 sm:inline">
          Hotline 24/7: 1900 6868 ·{' '}
          <Link href="/dang-nhap" className="hover:text-primary text-white no-underline">
            Đăng nhập
          </Link>
          {' / '}
          <Link href="/dang-ky" className="hover:text-primary text-white no-underline">
            Đăng ký
          </Link>
        </span>
      </StoreContainer>
    </div>
  );
}
