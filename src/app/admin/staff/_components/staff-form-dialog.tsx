'use client';

import { useState } from 'react';
import { ADB } from '@/lib/data';
import { PERMISSION_GROUPS, STAFF_DEPARTMENTS, type StaffMember } from '../_lib/staff-meta';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type StaffFormDialogProps = {
  member: StaffMember | 'new' | null;
  onClose: () => void;
};

function PermissionCheck({ label, defaultChecked }: { label: string; defaultChecked: boolean }) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm">
      <Checkbox checked={checked} onCheckedChange={(v) => setChecked(v === true)} />
      {label}
    </label>
  );
}

export function StaffFormDialog({ member, onClose }: StaffFormDialogProps) {
  const isNew = member === 'new';
  const data = isNew ? null : member;

  return (
    <Dialog open={!!member} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isNew ? 'Thêm nhân viên' : 'Chỉnh sửa nhân viên'}</DialogTitle>
          <DialogDescription>{isNew ? 'Tạo tài khoản nhân viên mới' : data?.id}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="staff-name">Họ và tên</Label>
            <Input id="staff-name" defaultValue={data?.name} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="staff-email">Email</Label>
            <Input id="staff-email" defaultValue={data?.email} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="staff-phone">Số điện thoại</Label>
            <Input id="staff-phone" defaultValue={data?.phone} />
          </div>
          <div className="space-y-2">
            <Label>Phòng ban</Label>
            <Select defaultValue={data?.dept ?? STAFF_DEPARTMENTS[0]}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STAFF_DEPARTMENTS.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Vai trò</Label>
            <Select defaultValue={data?.role ?? ADB.ROLES[0].name}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ADB.ROLES.map((role) => (
                  <SelectItem key={role.name} value={role.name}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Trạng thái</Label>
            <Select defaultValue={data?.status === 'inactive' ? 'Tạm khoá' : 'Hoạt động'}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Hoạt động">Hoạt động</SelectItem>
                <SelectItem value="Tạm khoá">Tạm khoá</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <p className="font-semibold">Phân quyền chi tiết</p>
            <p className="text-muted-foreground text-sm">Tuỳ chỉnh quyền truy cập từng chức năng</p>
          </div>
          <div className="overflow-hidden rounded-lg border">
            {PERMISSION_GROUPS.map(([group, perms], i) => (
              <div key={group} className={cn('px-3.5 py-3', i > 0 && 'border-t')}>
                <p className="mb-2 text-sm font-semibold">{group}</p>
                <div className="flex flex-wrap gap-4">
                  {perms.map((perm, j) => (
                    <PermissionCheck key={perm} label={perm} defaultChecked={j < 2} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Huỷ
          </Button>
          <Button
            onClick={() => {
              toast.success(isNew ? 'Đã thêm nhân viên' : 'Đã lưu nhân viên');
              onClose();
            }}
          >
            Lưu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
