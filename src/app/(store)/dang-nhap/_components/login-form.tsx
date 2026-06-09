'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { AuthSocialButtons } from '@/store/components/auth/auth-social-buttons';

export function LoginForm() {
  const router = useRouter();

  return (
    <form
      className="max-w-md"
      onSubmit={(e) => {
        e.preventDefault();
        router.push('/tai-khoan');
      }}
    >
      <div className="text-primary text-xs font-bold tracking-wide uppercase">
        Chào mừng trở lại
      </div>
      <h1 className="text-secondary m-0 mt-2 text-2xl font-extrabold sm:text-[28px]">Đăng nhập</h1>
      <p className="text-muted-foreground mt-2 text-sm">
        Chưa có tài khoản?{' '}
        <Link href="/dang-ky" className="text-primary font-bold no-underline">
          Đăng ký miễn phí
        </Link>
      </p>

      <div className="mt-6 flex flex-col gap-4">
        <div>
          <Label className="text-foreground mb-1.5 block text-sm font-semibold">
            Số điện thoại hoặc Email <span className="text-destructive">*</span>
          </Label>
          <Input
            type="text"
            placeholder="0988 xxx xxx hoặc email@example.com"
            autoComplete="username"
          />
        </div>
        <div>
          <Label className="text-foreground mb-1.5 block text-sm font-semibold">
            Mật khẩu <span className="text-destructive">*</span>
          </Label>
          <Input type="password" placeholder="Nhập mật khẩu" autoComplete="current-password" />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
        <label className="text-muted-foreground inline-flex cursor-pointer items-center gap-2">
          <input type="checkbox" defaultChecked className="accent-secondary" />
          Ghi nhớ đăng nhập
        </label>
        <Link
          href="/lien-he"
          className="text-secondary hover:text-primary font-semibold no-underline"
        >
          Quên mật khẩu?
        </Link>
      </div>

      <Button
        type="submit"
        variant="default"
        className={cn('gap-2 font-bold', 'mt-6 w-full py-3.5')}
      >
        Đăng nhập
      </Button>

      <AuthSocialButtons />
    </form>
  );
}
