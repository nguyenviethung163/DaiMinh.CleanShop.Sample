'use client';

import {
  Edit,
  Filter,
  KeyRound,
  MoreHorizontal,
  RefreshCw,
  Search,
  Shield,
  Trash2,
} from 'lucide-react';
import { getStaffStatusMeta, isOnline, type StaffMember } from '../_lib/staff-meta';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CardContent, CardFooter } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn, getInitials } from '@/lib/utils';
import { toast } from 'sonner';

type StaffMembersTableProps = {
  rows: StaffMember[];
  onRowClick: (member: StaffMember) => void;
  onEdit: (member: StaffMember) => void;
  onDelete: (member: StaffMember) => void;
};

export function StaffMembersTable({ rows, onRowClick, onEdit, onDelete }: StaffMembersTableProps) {
  return (
    <>
      <CardContent className="flex flex-wrap items-center gap-2 border-b p-4">
        <div className="relative min-w-[220px] flex-1">
          <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input placeholder="Tìm nhân viên, email…" className="pl-9" />
        </div>
        <Button variant="outline" size="sm">
          <Filter />
          Phòng ban
        </Button>
      </CardContent>

      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Nhân viên</TableHead>
              <TableHead>Vai trò</TableHead>
              <TableHead>Phòng ban</TableHead>
              <TableHead>Điện thoại</TableHead>
              <TableHead>Hoạt động</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="w-24 text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((member) => {
              const status = getStaffStatusMeta(member.status);
              const online = isOnline(member.last);
              return (
                <TableRow
                  key={member.id}
                  className="cursor-pointer"
                  onClick={() => onRowClick(member)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarFallback style={{ backgroundColor: member.tone, color: '#fff' }}>
                            {getInitials(member.name)}
                          </AvatarFallback>
                        </Avatar>
                        {online && (
                          <span className="border-background bg-primary absolute right-0 bottom-0 size-2.5 rounded-full border-2" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-muted-foreground text-xs">{member.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{member.role}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">{member.dept}</TableCell>
                  <TableCell className="text-sm">{member.phone}</TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        'text-sm',
                        online ? 'text-primary font-semibold' : 'text-muted-foreground',
                      )}
                    >
                      {member.last}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </TableCell>
                  <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon-sm" onClick={() => onEdit(member)}>
                        <Edit />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon-sm">
                            <MoreHorizontal />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onEdit(member)}>
                            <Edit />
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onEdit(member)}>
                            <Shield />
                            Phân quyền
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              toast.success(
                                member.status === 'active'
                                  ? `Đã tạm khoá ${member.name}`
                                  : `Đã kích hoạt ${member.name}`,
                              )
                            }
                          >
                            <RefreshCw />
                            {member.status === 'active' ? 'Tạm khoá' : 'Kích hoạt'}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => toast.success('Đã gửi email đặt lại mật khẩu')}
                          >
                            <KeyRound />
                            Đặt lại mật khẩu
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem variant="destructive" onClick={() => onDelete(member)}>
                            <Trash2 />
                            Xoá nhân viên
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>

      <CardFooter className="justify-between border-t px-4 py-3">
        <p className="text-muted-foreground text-sm">Hiển thị {rows.length} nhân viên</p>
        <Pagination className="mx-0 w-auto">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>
    </>
  );
}
