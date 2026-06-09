'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const PROFILE_FIELDS = [
  ['Họ và tên', 'Nguyễn Văn A'],
  ['Số điện thoại', '0988 555 999'],
  ['Email', 'nguyenvana@email.com'],
  ['Giới tính', 'Nam'],
  ['Ngày sinh', '12/08/1988'],
] as const;

export function AccountProfileSection() {
  return (
    <div className="max-w-[520px] rounded-xl border bg-white p-5 sm:p-6">
      <h1 className="text-secondary m-0 mb-4 text-[22px] font-extrabold">Thông tin tài khoản</h1>
      <div className="flex flex-col gap-3">
        {PROFILE_FIELDS.map(([label, value]) => (
          <div key={label}>
            <Label className="text-foreground mb-1.5 block text-sm font-semibold">{label}</Label>
            <Input defaultValue={value} />
          </div>
        ))}
        <Button variant="default" className={cn('gap-2 font-bold', 'mt-2 self-start')}>
          Lưu thay đổi
        </Button>
      </div>
    </div>
  );
}
