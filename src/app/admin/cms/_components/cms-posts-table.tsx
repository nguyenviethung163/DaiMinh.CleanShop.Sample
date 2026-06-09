'use client';

import type { ReactNode } from 'react';
import {
  ArrowDownUp,
  Check,
  Copy,
  Edit,
  Eye,
  LayoutGrid,
  List,
  MoreHorizontal,
  Search,
  Trash2,
} from 'lucide-react';
import { formatNum } from '@/lib/format';
import { getProductToneClass } from '@/app/admin/products/_lib/product-meta';
import { CMS_TABS, getPostStatusMeta, type CmsTab, type Post } from '../_lib/cms-meta';
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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn, getInitials } from '@/lib/utils';
import { toast } from 'sonner';

type CmsPostsTableProps = {
  tab: CmsTab;
  rows: Post[];
  counts: Record<CmsTab, number>;
  view: 'table' | 'grid';
  onTabChange: (tab: CmsTab) => void;
  onViewChange: (view: 'table' | 'grid') => void;
  onRowClick: (post: Post) => void;
  onEdit: (post: Post) => void;
  onDelete: (post: Post) => void;
  gridSlot: ReactNode;
};

export function CmsPostsTable({
  tab,
  rows,
  counts,
  view,
  onTabChange,
  onViewChange,
  onRowClick,
  onEdit,
  onDelete,
  gridSlot,
}: CmsPostsTableProps) {
  return (
    <Card className="gap-0 py-0">
      <div className="border-b px-4 pt-4">
        <Tabs value={tab} onValueChange={(v) => onTabChange(v as CmsTab)}>
          <TabsList className="h-auto flex-wrap justify-start">
            {CMS_TABS.map((item) => (
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
          <Input placeholder="Tìm tiêu đề, tác giả…" className="pl-9" />
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
          <ArrowDownUp />
          Mới nhất
        </Button>
      </CardContent>

      {view === 'table' ? (
        <>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Bài viết</TableHead>
                  <TableHead>Chuyên mục</TableHead>
                  <TableHead>Tác giả</TableHead>
                  <TableHead className="text-center">Lượt xem</TableHead>
                  <TableHead>Ngày</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="w-24 text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((post) => {
                  const status = getPostStatusMeta(post.status);
                  return (
                    <TableRow
                      key={post.id}
                      className="cursor-pointer"
                      onClick={() => onRowClick(post)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              'h-10 w-14 shrink-0 rounded-md',
                              getProductToneClass(post.tone),
                            )}
                          />
                          <div className="min-w-0">
                            <p className="max-w-sm truncate text-sm font-medium">{post.title}</p>
                            <p className="text-muted-foreground text-xs">
                              {post.id} · {post.cat}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{post.cat}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="size-7">
                            <AvatarFallback className="text-[10px]">
                              {getInitials(post.author)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{post.author}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center font-semibold">
                        {post.views ? formatNum(post.views) : '—'}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">{post.date}</TableCell>
                      <TableCell>
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </TableCell>
                      <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => toast.success('Mở xem trước bài viết')}
                          >
                            <Eye />
                          </Button>
                          <Button variant="ghost" size="icon-sm" onClick={() => onEdit(post)}>
                            <Edit />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon-sm">
                                <MoreHorizontal />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => toast.success('Mở xem trước bài viết')}
                              >
                                <Eye />
                                Xem trước
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => onEdit(post)}>
                                <Edit />
                                Chỉnh sửa
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  toast.success(
                                    post.status === 'published'
                                      ? 'Đã gỡ xuống nháp'
                                      : 'Đã đăng bài',
                                  )
                                }
                              >
                                <Check />
                                {post.status === 'published' ? 'Gỡ xuống nháp' : 'Đăng bài'}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => toast.success('Đã nhân bản bài viết')}
                              >
                                <Copy />
                                Nhân bản
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                variant="destructive"
                                onClick={() => onDelete(post)}
                              >
                                <Trash2 />
                                Xoá bài viết
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
            <p className="text-muted-foreground text-sm">Hiển thị {rows.length} / 142 bài</p>
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
