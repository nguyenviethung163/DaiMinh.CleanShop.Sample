'use client';

import {
  Download,
  Edit,
  Filter,
  MoreHorizontal,
  PackageMinus,
  PackagePlus,
  Search,
  Trash2,
  Truck,
} from 'lucide-react';
import { formatVND } from '@/lib/format';
import { getProductToneClass } from '@/app/admin/products/_lib/product-meta';
import {
  getMoveTypeBadge,
  getStockLevelClass,
  getStockLevelPercent,
  INVENTORY_TABS,
  type InventoryItem,
  type InventoryTab,
  type StockMove,
} from '../_lib/inventory-meta';
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
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn, getInitials } from '@/lib/utils';
import { toast } from 'sonner';

type InventoryTableProps = {
  tab: InventoryTab;
  stockRows: InventoryItem[];
  moveRows: StockMove[];
  counts: Record<InventoryTab, number>;
  onTabChange: (tab: InventoryTab) => void;
  onStockIn: () => void;
  onStockOut: () => void;
  onStopTracking: (item: InventoryItem) => void;
};

export function InventoryTable({
  tab,
  stockRows,
  moveRows,
  counts,
  onTabChange,
  onStockIn,
  onStockOut,
  onStopTracking,
}: InventoryTableProps) {
  return (
    <Card className="gap-0 py-0">
      <div className="border-b px-4 pt-4">
        <Tabs value={tab} onValueChange={(v) => onTabChange(v as InventoryTab)}>
          <TabsList className="h-auto flex-wrap justify-start">
            {INVENTORY_TABS.map((item) => (
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

      <CardContent className="flex flex-wrap items-center gap-2 border-b p-4">
        <div className="relative min-w-[220px] flex-1">
          <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input placeholder="Tìm sản phẩm, SKU…" className="pl-9" />
        </div>
        <Button variant="outline" size="sm">
          <Download />
          Xuất tồn kho
        </Button>
        <Button variant="outline" size="sm">
          <Filter />
          Lọc theo kho
        </Button>
      </CardContent>

      {tab === 'moves' ? (
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Mã phiếu</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Sản phẩm</TableHead>
                <TableHead className="text-center">Số lượng</TableHead>
                <TableHead>Ghi chú</TableHead>
                <TableHead>Người thực hiện</TableHead>
                <TableHead className="text-right">Ngày</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {moveRows.map((move) => {
                const typeBadge = getMoveTypeBadge(move.type);
                return (
                  <TableRow key={move.id}>
                    <TableCell className="text-secondary font-mono text-sm font-semibold">
                      {move.id}
                    </TableCell>
                    <TableCell>
                      <Badge variant={typeBadge.variant}>{typeBadge.label}</Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate font-medium">{move.product}</TableCell>
                    <TableCell
                      className={cn(
                        'text-center font-bold',
                        move.type === 'in' ? 'text-primary' : 'text-secondary',
                      )}
                    >
                      {move.type === 'in' ? '+' : '−'}
                      {move.qty}
                    </TableCell>
                    <TableCell className="text-muted-foreground max-w-[200px] truncate text-sm">
                      {move.note}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="size-7">
                          <AvatarFallback className="text-[10px]">
                            {getInitials(move.by)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{move.by}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-right text-sm">
                      {move.date}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      ) : (
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Sản phẩm</TableHead>
                <TableHead className="text-center">Tồn thực</TableHead>
                <TableHead className="text-center">Đã giữ</TableHead>
                <TableHead className="text-center">Khả dụng</TableHead>
                <TableHead className="text-center">Đang về</TableHead>
                <TableHead className="w-[160px]">Mức tồn</TableHead>
                <TableHead className="text-right">Giá trị tồn</TableHead>
                <TableHead className="w-24 text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stockRows.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'size-10 shrink-0 rounded-md',
                          getProductToneClass(item.tone),
                        )}
                      />
                      <div className="min-w-0">
                        <p className="max-w-xs truncate text-sm font-medium">{item.name}</p>
                        <p className="text-muted-foreground text-xs">
                          {item.sku} · {item.location}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className={cn(
                        'text-base font-bold',
                        item.onHand < item.reorder && 'text-destructive',
                      )}
                    >
                      {item.onHand}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-center">
                    {item.reserved}
                  </TableCell>
                  <TableCell className="text-secondary text-center font-semibold">
                    {Math.max(0, item.onHand - item.reserved)}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.incoming > 0 ? (
                      <Badge variant="secondary">+{item.incoming}</Badge>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Progress
                      value={getStockLevelPercent(item)}
                      className={getStockLevelClass(item)}
                    />
                    <p className="text-muted-foreground mt-1 text-xs">
                      Ngưỡng đặt lại: {item.reorder}
                    </p>
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {formatVND(item.onHand * item.cost)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon-sm" onClick={onStockIn}>
                        <PackagePlus />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon-sm">
                            <MoreHorizontal />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={onStockIn}>
                            <PackagePlus />
                            Nhập kho
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={onStockOut}>
                            <PackageMinus />
                            Xuất kho
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.success('Mở điều chỉnh tồn kho')}>
                            <Edit />
                            Điều chỉnh tồn
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => toast.success('Đã tạo đề nghị nhập hàng')}
                          >
                            <Truck />
                            Đặt hàng NCC
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => onStopTracking(item)}
                          >
                            <Trash2 />
                            Ngừng theo dõi
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      )}

      <CardFooter className="justify-between border-t px-4 py-3">
        <p className="text-muted-foreground text-sm">
          Hiển thị {tab === 'moves' ? moveRows.length : stockRows.length} mục
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
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>
    </Card>
  );
}
