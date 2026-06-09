'use client';

import {
  BarChart3,
  Calendar,
  Copy,
  Edit,
  Filter,
  MoreHorizontal,
  Search,
  Tag,
  Trash2,
} from 'lucide-react';
import { ADB } from '@/lib/data';
import { formatNum } from '@/lib/format';
import {
  getVoucherStatusMeta,
  PROMOTION_TABS,
  TAB_COUNTS,
  type PromotionTab,
} from '../_lib/promotion-meta';
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
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { CampaignsGrid } from './campaigns-grid';

type Voucher = (typeof ADB.VOUCHERS)[number];

type PromotionsTableProps = {
  tab: PromotionTab;
  onTabChange: (tab: PromotionTab) => void;
  onEdit: (voucher: Voucher) => void;
  onDelete: (voucher: Voucher) => void;
};

export function PromotionsTable({ tab, onTabChange, onEdit, onDelete }: PromotionsTableProps) {
  return (
    <Card className="gap-0 py-0">
      <div className="border-b px-4 pt-4">
        <Tabs value={tab} onValueChange={(v) => onTabChange(v as PromotionTab)}>
          <TabsList className="h-auto flex-wrap justify-start">
            {PROMOTION_TABS.map((item) => (
              <TabsTrigger key={item.value} value={item.value} className="gap-2">
                {item.label}
                <Badge variant="secondary" className="px-1.5 py-0 text-[10px]">
                  {item.value === 'voucher' ? ADB.VOUCHERS.length : TAB_COUNTS[item.value]}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <CardContent className="flex flex-wrap items-center gap-2 border-b p-4">
        <div className="relative min-w-[220px] flex-1">
          <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input placeholder="Tìm mã, tên chương trình…" className="pl-9" />
        </div>
        <Button variant="outline" size="sm">
          <Calendar />
          Tháng 5/2026
        </Button>
        <Button variant="outline" size="sm">
          <Filter />
          Lọc
        </Button>
      </CardContent>

      {tab === 'voucher' ? (
        <>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Mã voucher</TableHead>
                  <TableHead>Loại</TableHead>
                  <TableHead>Giá trị</TableHead>
                  <TableHead className="w-[180px]">Đã dùng</TableHead>
                  <TableHead>Hết hạn</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-center">Bật</TableHead>
                  <TableHead className="w-24 text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ADB.VOUCHERS.map((voucher) => {
                  const usage = (voucher.used / voucher.limit) * 100;
                  const status = getVoucherStatusMeta(voucher.status);
                  return (
                    <TableRow key={voucher.code}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-md">
                            <Tag className="size-4" />
                          </div>
                          <div>
                            <p className="font-mono font-bold">{voucher.code}</p>
                            <p className="text-muted-foreground text-xs">{voucher.name}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{voucher.type}</Badge>
                      </TableCell>
                      <TableCell className="text-primary font-bold">{voucher.value}</TableCell>
                      <TableCell>
                        <p className="mb-1.5 text-sm">
                          <span className="font-semibold">{formatNum(voucher.used)}</span>
                          <span className="text-muted-foreground">
                            {' '}
                            / {formatNum(voucher.limit)}
                          </span>
                        </p>
                        <Progress
                          value={usage}
                          className={cn(usage > 85 && '[&>div]:bg-destructive')}
                        />
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">{voucher.exp}</TableCell>
                      <TableCell>
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch defaultChecked={voucher.status === 'active'} />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon-sm" onClick={() => onEdit(voucher)}>
                            <Edit />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon-sm">
                                <MoreHorizontal />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => onEdit(voucher)}>
                                <Edit />
                                Chỉnh sửa
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => toast.success(`Đã sao chép mã ${voucher.code}`)}
                              >
                                <Copy />
                                Sao chép mã
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => toast.success(`Mở báo cáo ${voucher.code}`)}
                              >
                                <BarChart3 />
                                Xem hiệu quả
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                variant="destructive"
                                onClick={() => onDelete(voucher)}
                              >
                                <Trash2 />
                                Xoá voucher
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
            <p className="text-muted-foreground text-sm">Hiển thị {ADB.VOUCHERS.length} voucher</p>
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
      ) : (
        <CampaignsGrid />
      )}
    </Card>
  );
}
