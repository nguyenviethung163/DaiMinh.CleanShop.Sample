import Link from 'next/link';
import { Menu, Phone, ShoppingCart, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface StoreHeaderActionsProps {
  cartCount?: number;
  onMenuOpen?: () => void;
  className?: string;
}

export function StoreHeaderActions({
  cartCount = 3,
  onMenuOpen,
  className,
}: StoreHeaderActionsProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Link href="/lien-he" className="hidden items-center gap-2.5 no-underline md:flex">
        <div className="bg-primary/10 text-primary grid h-9 w-9 place-items-center rounded-full">
          <Phone className="shrink-0" size={18} strokeWidth={2} aria-hidden="true" />
        </div>
        <div>
          <div className="text-muted-foreground text-xs tracking-wide uppercase">Hotline 24/7</div>
          <div className="text-primary text-base font-extrabold">1900 6868</div>
        </div>
      </Link>

      <Link
        href="/dang-nhap"
        className="text-secondary hidden flex-col items-center no-underline md:flex"
      >
        <User className="shrink-0" size={24} strokeWidth={1.7} aria-hidden="true" />
        <span className="text-muted-foreground mt-0.5 text-xs">Tài khoản</span>
      </Link>

      <Link
        href="/gio-hang"
        className="text-secondary relative flex flex-col items-center no-underline"
      >
        <span className="relative">
          <ShoppingCart className="shrink-0" size={24} strokeWidth={1.7} aria-hidden="true" />
          <span className="bg-primary absolute -top-1.5 -right-2 grid h-[18px] min-w-[18px] place-items-center rounded-full border-2 border-white px-1 text-[10px] font-extrabold text-white">
            {cartCount}
          </span>
        </span>
        <span className="text-muted-foreground mt-0.5 text-xs">Giỏ hàng</span>
      </Link>

      <button
        type="button"
        onClick={onMenuOpen}
        aria-label="Mở menu điều hướng"
        className="text-muted-foreground hover:bg-muted grid h-10 w-10 place-items-center rounded-md border bg-white lg:hidden"
      >
        <Menu className="shrink-0" size={20} strokeWidth={1.7} aria-hidden="true" />
      </button>
    </div>
  );
}
