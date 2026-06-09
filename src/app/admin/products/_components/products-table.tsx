'use client';

import type { ReactNode } from 'react';
import {
  Copy,
  Edit,
  Eye,
  EyeOff,
  Filter,
  LayoutGrid,
  List,
  MoreHorizontal,
  Search,
  Star,
  Trash2,
} from 'lucide-react';
import { formatNum, formatVND } from '@/lib/format';
import { getProductToneClass, getStockBadge } from '../_lib/product-meta';
import type { Product } from '../_lib/product-meta';
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
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type ProductsTableProps = {
  rows: Product[];
  selected: string[];
  brand: string;
  brands: readonly string[];
  onBrandChange: (brand: string) => void;
  onToggle: (id: string) => void;
  onToggleAll: (checked: boolean) => void;
  onRowClick: (product: Product) => void;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  view: 'table' | 'grid';
  onViewChange: (view: 'table' | 'grid') => void;
  gridSlot: ReactNode;
};

export function ProductsTable({
  rows,
  selected,
  brand,
  brands,
  onBrandChange,
  onToggle,
  onToggleAll,
  onRowClick,
  onEdit,
  onDelete,
  view,
  onViewChange,
  gridSlot,
}: ProductsTableProps) {
  const allSelected = rows.length > 0 && selected.length === rows.length;
  const filterBrands = ['Tất cả', ...brands];

  return (
    <Card className="gap-0 py-0">
      <CardContent className="space-y-3 border-b p-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-[220px] flex-1">
            <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <Input placeholder="Tìm tên, SKU, thương hiệu…" className="pl-9" />
          </div>
          <ToggleGroup
            type="single"
            value={view}
            onValueChange={(v) => v && onViewChange(v as 'table' | 'grid')}
            variant="outline"
            size="sm"
          >
            <ToggleGroupItem value="table" aria-label="Bảng">
              <List />
              Bảng
            </ToggleGroupItem>
            <ToggleGroupItem value="grid" aria-label="Lưới">
              <LayoutGrid />
              Lưới
            </ToggleGroupItem>
          </ToggleGroup>
          <Button variant="outline" size="sm">
            <Filter />
            Lọc
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {filterBrands.map((b) => (
            <Button
              key={b}
              size="sm"
              variant={brand === b ? 'default' : 'outline'}
              className="h-7 rounded-full"
              onClick={() => onBrandChange(b)}
            >
              {b}
            </Button>
          ))}
        </div>
      </CardContent>

      {view === 'table' ? (
        <>
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
                  <TableHead>Sản phẩm</TableHead>
                  <TableHead>Thương hiệu</TableHead>
                  <TableHead>Giá bán</TableHead>
                  <TableHead className="text-center">Tồn kho</TableHead>
                  <TableHead className="text-center">Đã bán</TableHead>
                  <TableHead className="text-center">Đánh giá</TableHead>
                  <TableHead className="text-center">Hiển thị</TableHead>
                  <TableHead className="w-24 text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((product) => {
                  const isSelected = selected.includes(product.id);
                  const stock = getStockBadge(product);
                  return (
                    <TableRow
                      key={product.id}
                      className="cursor-pointer"
                      data-state={isSelected ? 'selected' : undefined}
                      onClick={() => onRowClick(product)}
                    >
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => onToggle(product.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              'size-10 shrink-0 rounded-md',
                              getProductToneClass(product.tone),
                            )}
                          />
                          <div className="min-w-0">
                            <p className="max-w-xs truncate text-sm font-medium">{product.name}</p>
                            <p className="text-muted-foreground text-xs">
                              SKU {product.sku} · {product.cat}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{product.brand}</Badge>
                      </TableCell>
                      <TableCell>
                        <p className="font-semibold">{formatVND(product.price)}</p>
                        <p className="text-muted-foreground text-xs">
                          Vốn {formatVND(product.cost)}
                        </p>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant={stock.variant}>{stock.label}</Badge>
                      </TableCell>
                      <TableCell className="text-center font-semibold">
                        {formatNum(product.sold)}
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="inline-flex items-center gap-1 font-semibold">
                          <Star className="size-3.5 fill-amber-400 text-amber-400" />
                          {product.rating}
                        </span>
                      </TableCell>
                      <TableCell className="text-center" onClick={(e) => e.stopPropagation()}>
                        <Switch defaultChecked={product.visible} />
                      </TableCell>
                      <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon-sm" onClick={() => onEdit(product)}>
                            <Edit />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon-sm">
                                <MoreHorizontal />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => onEdit(product)}>
                                <Edit />
                                Chỉnh sửa
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => toast.success('Đã nhân bản sản phẩm')}
                              >
                                <Copy />
                                Nhân bản
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  toast.success(
                                    product.visible ? 'Đã ẩn sản phẩm' : 'Đã hiển thị sản phẩm',
                                  )
                                }
                              >
                                {product.visible ? <EyeOff /> : <Eye />}
                                {product.visible ? 'Ẩn sản phẩm' : 'Hiển thị'}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                variant="destructive"
                                onClick={() => onDelete(product)}
                              >
                                <Trash2 />
                                Xoá sản phẩm
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
            <p className="text-muted-foreground text-sm">Hiển thị {rows.length} sản phẩm</p>
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
        </>
      ) : (
        gridSlot
      )}
    </Card>
  );
}
