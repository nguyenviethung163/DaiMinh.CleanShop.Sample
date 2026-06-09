'use client';

import {
  Calendar,
  Check,
  Copy,
  Eye,
  Filter,
  MoreHorizontal,
  Pencil,
  Printer,
  Search,
  SlidersHorizontal,
  Trash2,
} from 'lucide-react';
import { ADB } from '@/lib/data';
import { formatVND } from '@/lib/format';
import { getOrderStatusVariant } from '../_lib/order-status';
import { ORDER_TABS, type OrderTab } from '../_lib/order-tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getInitials } from '@/lib/utils';
import { toast } from 'sonner';

type Order = (typeof ADB.ORDERS)[number];

type OrdersTableProps = {
  tab: OrderTab;
  counts: Record<OrderTab, number>;
  rows: Order[];
  selected: string[];
  onTabChange: (tab: OrderTab) => void;
  onToggle: (id: string) => void;
  onToggleAll: (checked: boolean) => void;
  onClearSelection: () => void;
  onRowClick: (order: Order) => void;
  onDelete: (order: Order) => void;
};

const FILTER_CHIPS = [
  { label: 'Tất cả kênh', active: false },
  { label: 'COD', active: false },
  { label: 'Chuyển khoản', active: true },
];

export function OrdersTable({
  tab,
  counts,
  rows,
  selected,
  onTabChange,
  onToggle,
  onToggleAll,
  onClearSelection,
  onRowClick,
  onDelete,
}: OrdersTableProps) {
  const allSelected = rows.length > 0 && selected.length === rows.length;

  return (
    <Card className="gap-0 py-0">
      <div className="border-b px-4 pt-4">
        <Tabs value={tab} onValueChange={(v) => onTabChange(v as OrderTab)}>
          <TabsList className="h-auto flex-wrap justify-start">
            {ORDER_TABS.map((item) => (
              <TabsTrigger key={item.value} value={item.value} className="gap-2">
                {item.label}
                <Badge variant="secondary" className="px-1.5 py-0 text-[10px]">
                  {counts[item.value]}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <CardContent className="space-y-3 border-b p-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-[220px] flex-1">
            <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <Input placeholder="Tìm mã đơn, tên, SĐT…" className="pl-9" />
          </div>
          <Button variant="outline" size="sm">
            <Calendar />
            Tháng 5/2026
          </Button>
          <Button variant="outline" size="sm">
            <Filter />
            Bộ lọc
          </Button>
          <Button variant="outline" size="sm">
            <SlidersHorizontal />
            Mới nhất
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

      {selected.length > 0 && (
        <div className="bg-primary/5 flex flex-wrap items-center gap-3 border-b px-4 py-2.5">
          <span className="text-sm font-semibold">Đã chọn {selected.length} đơn</span>
          <Button variant="outline" size="sm">
            <Check />
            Xác nhận hàng loạt
          </Button>
          <Button variant="outline" size="sm">
            <Printer />
            In phiếu
          </Button>
          <Button
            variant="link"
            className="text-primary ml-auto h-auto p-0"
            onClick={onClearSelection}
          >
            Bỏ chọn
          </Button>
        </div>
      )}

      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-10">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={(checked) => onToggleAll(checked === true)}
                />
              </TableHead>
              <TableHead>Mã đơn</TableHead>
              <TableHead>Khách hàng</TableHead>
              <TableHead>Kênh</TableHead>
              <TableHead className="text-center">SP</TableHead>
              <TableHead>Giá trị</TableHead>
              <TableHead>Thanh toán</TableHead>
              <TableHead>Ngày</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="w-24 text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((order) => {
              const status = ADB.ORDER_STATUS[order.status as keyof typeof ADB.ORDER_STATUS];
              const isSelected = selected.includes(order.id);

              return (
                <TableRow
                  key={order.id}
                  className="cursor-pointer"
                  data-state={isSelected ? 'selected' : undefined}
                  onClick={() => onRowClick(order)}
                >
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox checked={isSelected} onCheckedChange={() => onToggle(order.id)} />
                  </TableCell>
                  <TableCell className="text-secondary font-mono font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar size="sm">
                        <AvatarFallback className="text-xs">
                          {getInitials(order.customer)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{order.customer}</p>
                        <p className="text-muted-foreground text-xs">{order.phone}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{order.channel}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-center">{order.items}</TableCell>
                  <TableCell className="font-semibold">{formatVND(order.total)}</TableCell>
                  <TableCell className="text-muted-foreground">{order.pay}</TableCell>
                  <TableCell>
                    <p className="text-sm">{order.date}</p>
                    <p className="text-muted-foreground text-xs">{order.time}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getOrderStatusVariant(order.status)}>{status.label}</Badge>
                  </TableCell>
                  <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon-sm" onClick={() => onRowClick(order)}>
                        <Eye />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon-sm">
                            <MoreHorizontal />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onRowClick(order)}>
                            <Eye />
                            Xem chi tiết
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onRowClick(order)}>
                            <Pencil />
                            Sửa đơn hàng
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => toast.success(`Đang in phiếu ${order.id}`)}
                          >
                            <Printer />
                            In phiếu giao
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => toast.success(`Đã sao chép ${order.id}`)}
                          >
                            <Copy />
                            Sao chép đơn
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem variant="destructive" onClick={() => onDelete(order)}>
                            <Trash2 />
                            Huỷ đơn
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
          Hiển thị {rows.length} / {rows.length} đơn
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
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
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
