'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { AuthSocialButtons } from '@/store/components/auth/auth-social-buttons';

export function RegisterForm() {
  const router = useRouter();

  return (
    <form
      className="max-w-md"
      onSubmit={(e) => {
        e.preventDefault();
        router.push('/tai-khoan');
      }}
    >
      <div className="text-primary text-xs font-bold tracking-wide uppercase">Khách hàng mới</div>
      <h1 className="text-secondary m-0 mt-2 text-2xl font-extrabold sm:text-[28px]">
        Đăng ký tài khoản
      </h1>
      <p className="text-muted-foreground mt-2 text-sm">
        Đã có tài khoản?{' '}
        <Link href="/dang-nhap" className="text-primary font-bold no-underline">
          Đăng nhập
        </Link>
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label className="text-foreground mb-1.5 block text-sm font-semibold">
            Họ và tên <span className="text-destructive">*</span>
          </Label>
          <Input placeholder="Nguyễn Văn A" autoComplete="name" />
        </div>
        <div>
          <Label className="text-foreground mb-1.5 block text-sm font-semibold">
            Số điện thoại <span className="text-destructive">*</span>
          </Label>
          <Input type="tel" placeholder="0988 xxx xxx" autoComplete="tel" />
        </div>
        <div>
          <Label className="text-foreground mb-1.5 block text-sm font-semibold">Email</Label>
          <Input type="email" placeholder="email@example.com" autoComplete="email" />
        </div>
        <div>
          <Label className="text-foreground mb-1.5 block text-sm font-semibold">
            Mật khẩu <span className="text-destructive">*</span>
          </Label>
          <Input type="password" placeholder="Tối thiểu 8 ký tự" autoComplete="new-password" />
        </div>
        <div>
          <Label className="text-foreground mb-1.5 block text-sm font-semibold">
            Xác nhận mật khẩu <span className="text-destructive">*</span>
          </Label>
          <Input type="password" placeholder="Nhập lại mật khẩu" autoComplete="new-password" />
        </div>
      </div>

      <label className="text-muted-foreground mt-4 flex cursor-pointer items-start gap-2 text-sm leading-relaxed">
        <input type="checkbox" required className="accent-secondary mt-1" />
        <span>
          Tôi đồng ý với{' '}
          <Link href="/gioi-thieu" className="text-secondary font-semibold no-underline">
            Điều khoản sử dụng
          </Link>{' '}
          và{' '}
          <Link href="/lien-he" className="text-secondary font-semibold no-underline">
            Chính sách bảo mật
          </Link>{' '}
          của Sơn Đại Minh.
        </span>
      </label>

      <div className="border-primary/30 bg-primary/10 text-muted-foreground mt-4 rounded-lg px-3 py-2.5 text-sm">
        Đăng ký ngay để nhận <b className="text-secondary">voucher 200.000đ</b> cho đơn đầu tiên.
      </div>

      <Button
        type="submit"
        variant="default"
        className={cn('gap-2 font-bold', 'mt-6 w-full py-3.5')}
      >
        Tạo tài khoản
      </Button>

      <AuthSocialButtons />
    </form>
  );
}
