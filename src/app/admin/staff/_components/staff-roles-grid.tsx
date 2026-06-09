'use client';

import { Copy, Edit, MoreHorizontal, Plus, Shield, Trash2 } from 'lucide-react';
import type { Role } from '../_lib/staff-meta';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

type StaffRolesGridProps = {
  roles: Role[];
};

export function StaffRolesGrid({ roles }: StaffRolesGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
      {roles.map((role) => (
        <Card key={role.name}>
          <CardContent className="pt-6">
            <div className="mb-3 flex items-start justify-between">
              <div className="bg-secondary/10 text-secondary rounded-md p-2">
                <Shield className="size-5" />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon-sm">
                    <MoreHorizontal />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => toast.success(`Mở cấu hình quyền ${role.name}`)}>
                    <Edit />
                    Sửa quyền
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toast.success('Đã nhân bản vai trò')}>
                    <Copy />
                    Nhân bản vai trò
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => toast.warning('Không thể xoá vai trò đang có người dùng')}
                  >
                    <Trash2 />
                    Xoá vai trò
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <p className="text-base font-bold tracking-tight">{role.name}</p>
            <p className="text-muted-foreground mt-1 min-h-[2.25rem] text-sm leading-snug">
              {role.desc}
            </p>
            <div className="mt-3 flex items-center justify-between border-t pt-3">
              <span className="text-sm">
                <span className="font-semibold">{role.count}</span> nhân viên
              </span>
              <Badge variant={role.perms === 'Tất cả' ? 'default' : 'outline'}>{role.perms}</Badge>
            </div>
          </CardContent>
        </Card>
      ))}

      <button
        type="button"
        className="text-muted-foreground hover:border-primary hover:text-primary flex min-h-40 flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed transition-colors"
        onClick={() => toast.success('Mở tạo vai trò mới')}
      >
        <Plus className="size-6" />
        <span className="font-semibold">Tạo vai trò mới</span>
      </button>
    </div>
  );
}
