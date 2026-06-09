'use client';

import {
  Check,
  ClipboardList,
  Eye,
  Filter,
  MoreHorizontal,
  Phone,
  Search,
  SlidersHorizontal,
  Trash2,
} from 'lucide-react';
import { ADB } from '@/lib/data';
import { formatVND } from '@/lib/format';
import { getLeadScoreClass, getLeadStatusVariant } from '../_lib/lead-status';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
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

type Lead = (typeof ADB.LEADS)[number];

type LeadsTableProps = {
  onRowClick: (lead: Lead) => void;
  onConvert: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
};

const FILTER_CHIPS = [
  { label: 'Tất cả', active: true },
  { label: 'Điểm ≥ 80', active: false },
  { label: 'Chưa liên hệ', active: false },
];

export function LeadsTable({ onRowClick, onConvert, onDelete }: LeadsTableProps) {
  return (
    <Card className="gap-0 py-0">
      <CardContent className="space-y-3 border-b p-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-[220px] flex-1">
            <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <Input placeholder="Tìm tên, SĐT, nhu cầu…" className="pl-9" />
          </div>
          <Button variant="outline" size="sm">
            <Filter />
            Nguồn
          </Button>
          <Button variant="outline" size="sm">
            <SlidersHorizontal />
            Điểm cao nhất
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {FILTER_CHIPS.map((chip) => (
            <Button
              key={chip.label}
              size="sm"
              variant={chip.active ? 'default' : 'outline'}
              className="h-7 rounded-full"
            >
              {chip.label}
            </Button>
          ))}
        </div>
      </CardContent>

      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Mã</TableHead>
              <TableHead>Khách tiềm năng</TableHead>
              <TableHead>Nhu cầu</TableHead>
              <TableHead>Nguồn</TableHead>
              <TableHead className="text-center">Điểm</TableHead>
              <TableHead>Giá trị dự kiến</TableHead>
              <TableHead>Phụ trách</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="w-24 text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ADB.LEADS.map((lead) => {
              const status = ADB.LEAD_STATUS[lead.status as keyof typeof ADB.LEAD_STATUS];
              return (
                <TableRow key={lead.id} className="cursor-pointer" onClick={() => onRowClick(lead)}>
                  <TableCell className="text-secondary font-mono text-sm font-semibold">
                    {lead.id}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar size="sm">
                        <AvatarFallback className="text-xs">
                          {getInitials(lead.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{lead.name}</p>
                        <p className="text-muted-foreground text-xs">{lead.phone}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{lead.need}</p>
                    <p className="text-muted-foreground text-xs">{lead.city}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{lead.source}</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className={cn(
                        'inline-flex items-center justify-center gap-1 font-bold',
                        getLeadScoreClass(lead.score),
                      )}
                    >
                      <span
                        className={cn(
                          'size-2 rounded-full',
                          lead.score >= 80
                            ? 'bg-secondary'
                            : lead.score >= 55
                              ? 'bg-primary'
                              : 'bg-destructive',
                        )}
                      />
                      {lead.score}
                    </span>
                  </TableCell>
                  <TableCell className="text-primary font-semibold">
                    {formatVND(lead.value)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar size="sm">
                        <AvatarFallback className="text-[10px]">
                          {getInitials(lead.assignee)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-muted-foreground text-sm">
                        {lead.assignee.split(' ').slice(-2).join(' ')}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getLeadStatusVariant(lead.status)}>{status.label}</Badge>
                  </TableCell>
                  <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon-sm" onClick={() => onRowClick(lead)}>
                        <Eye />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon-sm">
                            <MoreHorizontal />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onRowClick(lead)}>
                            <Eye />
                            Xem chi tiết
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.success(`Đang gọi ${lead.phone}`)}>
                            <Phone />
                            Gọi điện
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onConvert(lead)}>
                            <Check />
                            Chuyển thành KH
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => toast.success(`Mở tạo báo giá cho ${lead.name}`)}
                          >
                            <ClipboardList />
                            Tạo báo giá
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem variant="destructive" onClick={() => onDelete(lead)}>
                            <Trash2 />
                            Đánh dấu thất bại
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
        <p className="text-muted-foreground text-sm">
          Hiển thị {ADB.LEADS.length} / {ADB.LEADS.length} lead
        </p>
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
    </Card>
  );
}
