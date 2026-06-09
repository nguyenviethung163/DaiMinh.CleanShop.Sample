'use client';

import {
  Edit,
  Eye,
  Filter,
  Mail,
  MoreHorizontal,
  Search,
  ShoppingCart,
  SlidersHorizontal,
  Trash2,
} from 'lucide-react';
import { ADB } from '@/lib/data';
import { formatNum, formatVND } from '@/lib/format';
import {
  getCustomerTypeVariant,
  getTierVariant,
  CUSTOMER_TABS,
  type CustomerTab,
} from '../_lib/customer-meta';
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

type Customer = (typeof ADB.CUSTOMERS)[number];

type CustomersTableProps = {
  tab: CustomerTab;
  rows: Customer[];
  selected: string[];
  counts: Record<CustomerTab, number | string>;
  onTabChange: (tab: CustomerTab) => void;
  onToggle: (id: string) => void;
  onToggleAll: (checked: boolean) => void;
  onRowClick: (customer: Customer) => void;
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
};

const FILTER_CHIPS = [
  { label: 'Tất cả hạng', active: false },
  { label: 'Bạch kim', active: true },
  { label: 'Vàng', active: false },
];

export function CustomersTable({
  tab,
  rows,
  selected,
  counts,
  onTabChange,
  onToggle,
  onToggleAll,
  onRowClick,
  onEdit,
  onDelete,
}: CustomersTableProps) {
  const allSelected = rows.length > 0 && selected.length === rows.length;

  return (
    <Card className="gap-0 py-0">
      <div className="border-b px-4 pt-4">
        <Tabs value={tab} onValueChange={(v) => onTabChange(v as CustomerTab)}>
          <TabsList className="h-auto flex-wrap justify-start">
            {CUSTOMER_TABS.map((item) => (
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
            <Input placeholder="Tìm tên, SĐT, email…" className="pl-9" />
          </div>
          <Button variant="outline" size="sm">
            <Filter />
            Khu vực
          </Button>
          <Button variant="outline" size="sm">
            <SlidersHorizontal />
            Chi tiêu cao nhất
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
              <TableHead className="w-10">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={(checked) => onToggleAll(checked === true)}
                />
              </TableHead>
              <TableHead>Khách hàng</TableHead>
              <TableHead>Loại</TableHead>
              <TableHead>Hạng</TableHead>
              <TableHead className="text-center">Đơn hàng</TableHead>
              <TableHead>Tổng chi tiêu</TableHead>
              <TableHead className="text-center">Điểm</TableHead>
              <TableHead>Khu vực</TableHead>
              <TableHead className="text-right">Mua gần nhất</TableHead>
              <TableHead className="w-24 text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((customer) => {
              const isSelected = selected.includes(customer.id);
              return (
                <TableRow
                  key={customer.id}
                  className="cursor-pointer"
                  data-state={isSelected ? 'selected' : undefined}
                  onClick={() => onRowClick(customer)}
                >
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox checked={isSelected} onCheckedChange={() => onToggle(customer.id)} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-muted-foreground text-xs">
                          {customer.id} · {customer.phone}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getCustomerTypeVariant(customer.type)}>{customer.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getTierVariant(customer.tier)}>{customer.tier}</Badge>
                  </TableCell>
                  <TableCell className="text-center font-semibold">{customer.orders}</TableCell>
                  <TableCell className="text-primary font-semibold">
                    {formatVND(customer.spent)}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-center">
                    {formatNum(customer.points)}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{customer.city}</TableCell>
                  <TableCell className="text-muted-foreground text-right text-sm">
                    {customer.lastOrder}
                  </TableCell>
                  <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon-sm" onClick={() => onRowClick(customer)}>
                        <Eye />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon-sm">
                            <MoreHorizontal />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onRowClick(customer)}>
                            <Eye />
                            Xem hồ sơ
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onEdit(customer)}>
                            <Edit />
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => toast.success(`Mở tạo đơn cho ${customer.name}`)}
                          >
                            <ShoppingCart />
                            Tạo đơn cho khách
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.success('Đã gửi tin nhắn')}>
                            <Mail />
                            Gửi tin nhắn
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => onDelete(customer)}
                          >
                            <Trash2 />
                            Xoá khách hàng
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
        <p className="text-muted-foreground text-sm">Hiển thị {rows.length} / 8.247 khách</p>
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
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>
    </Card>
  );
}
