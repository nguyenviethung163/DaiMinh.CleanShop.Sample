'use client';

import { Edit, Eye, Filter, Mail, MoreHorizontal, Printer, Search, Trash2 } from 'lucide-react';
import { ADB } from '@/lib/data';
import { formatVND } from '@/lib/format';
import { getQuoteStatusVariant } from '../_lib/quote-status';
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
import { getInitials } from '@/lib/utils';
import { toast } from 'sonner';

type Quote = (typeof ADB.QUOTES)[number];

type QuotesTableProps = {
  onRowClick: (quote: Quote) => void;
  onDelete: (quote: Quote) => void;
};

export function QuotesTable({ onRowClick, onDelete }: QuotesTableProps) {
  return (
    <Card className="gap-0 py-0">
      <CardContent className="border-b p-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-[220px] flex-1">
            <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <Input placeholder="Tìm mã, khách hàng, công trình…" className="pl-9" />
          </div>
          <Button variant="outline" size="sm">
            <Filter />
            Lọc
          </Button>
        </div>
      </CardContent>

      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Mã BG</TableHead>
              <TableHead>Khách hàng</TableHead>
              <TableHead>Công trình</TableHead>
              <TableHead>Giá trị</TableHead>
              <TableHead>Phụ trách</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Ngày</TableHead>
              <TableHead className="w-24 text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ADB.QUOTES.map((quote) => {
              const status = ADB.QUOTE_STATUS[quote.status as keyof typeof ADB.QUOTE_STATUS];
              return (
                <TableRow
                  key={quote.id}
                  className="cursor-pointer"
                  onClick={() => onRowClick(quote)}
                >
                  <TableCell className="text-secondary font-mono text-sm font-semibold">
                    {quote.id}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar size="sm">
                        <AvatarFallback className="text-xs">
                          {getInitials(quote.customer)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{quote.customer}</p>
                        <p className="text-muted-foreground text-xs">{quote.phone}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm font-medium">{quote.project}</p>
                    <p className="text-muted-foreground text-xs">
                      {quote.city} · {quote.area}m²
                    </p>
                  </TableCell>
                  <TableCell className="text-primary font-semibold">
                    {formatVND(quote.value)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar size="sm">
                        <AvatarFallback className="text-[10px]">
                          {getInitials(quote.assignee)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-muted-foreground text-sm">
                        {quote.assignee.split(' ').slice(-2).join(' ')}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getQuoteStatusVariant(quote.status)}>{status.label}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-right text-sm">
                    {quote.date}
                  </TableCell>
                  <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon-sm" onClick={() => onRowClick(quote)}>
                        <Eye />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon-sm">
                            <MoreHorizontal />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onRowClick(quote)}>
                            <Eye />
                            Xem chi tiết
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onRowClick(quote)}>
                            <Edit />
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => toast.success(`Đang xuất PDF báo giá ${quote.id}`)}
                          >
                            <Printer />
                            Xuất PDF
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => toast.success('Đã gửi báo giá cho khách')}
                          >
                            <Mail />
                            Gửi cho khách
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem variant="destructive" onClick={() => onDelete(quote)}>
                            <Trash2 />
                            Xoá báo giá
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
          Hiển thị {ADB.QUOTES.length} / {ADB.QUOTES.length} báo giá
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
