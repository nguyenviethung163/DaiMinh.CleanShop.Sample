'use client';

import { Box, Check, Eye, Link, Pencil, Star } from 'lucide-react';
import { getProductToneClass } from '@/app/admin/products/_lib/product-meta';
import { POST_AUTHORS, POST_CATEGORIES, type Post } from '../_lib/cms-meta';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type PostEditorDialogProps = {
  post: Post | 'new' | null;
  onClose: () => void;
};

const EDITOR_TOOLS = [
  { icon: Pencil, label: 'Chỉnh sửa' },
  { icon: Star, label: 'Nổi bật' },
  { icon: Link, label: 'Liên kết' },
  { icon: Box, label: 'Media' },
  { icon: Eye, label: 'Xem' },
] as const;

export function PostEditorDialog({ post, onClose }: PostEditorDialogProps) {
  const isNew = post === 'new';
  const data = isNew ? null : post;

  return (
    <Dialog open={!!post} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{isNew ? 'Viết bài mới' : 'Chỉnh sửa bài viết'}</DialogTitle>
          <DialogDescription>
            {isNew ? 'Tạo bài viết tin tức / cẩm nang' : data?.id}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="post-title">Tiêu đề bài viết</Label>
            <Input
              id="post-title"
              defaultValue={data?.title}
              placeholder="Nhập tiêu đề hấp dẫn…"
              className="text-lg font-bold"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Chuyên mục</Label>
              <Select defaultValue={data?.cat ?? POST_CATEGORIES[0]}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {POST_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Tác giả</Label>
              <Select defaultValue={data?.author ?? POST_AUTHORS[0]}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {POST_AUTHORS.map((author) => (
                    <SelectItem key={author} value={author}>
                      {author}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Ảnh đại diện</Label>
            <div
              className={cn(
                'flex h-40 w-full items-center justify-center rounded-lg',
                getProductToneClass(data?.tone ?? 'orange'),
              )}
            >
              <span className="text-muted-foreground text-sm">Ảnh bìa bài viết 16:9</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="post-content">Nội dung</Label>
            <div className="overflow-hidden rounded-lg border">
              <div className="bg-muted/50 flex items-center gap-1 border-b p-2">
                {EDITOR_TOOLS.map((tool) => (
                  <Button
                    key={tool.label}
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    title={tool.label}
                  >
                    <tool.icon className="size-4" />
                  </Button>
                ))}
                <Separator orientation="vertical" className="mx-1 h-6" />
                <span className="text-muted-foreground px-2 text-sm font-medium">Đoạn văn</span>
              </div>
              <Textarea
                id="post-content"
                rows={7}
                className="resize-none rounded-none border-0 focus-visible:ring-0"
                defaultValue={data ? 'Năm 2026 đánh dấu sự trở lại của các tông màu trầm ấm…' : ''}
                placeholder="Bắt đầu viết nội dung bài viết…"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            Huỷ
          </Button>
          <Button variant="secondary">Lưu nháp</Button>
          <Button variant="outline">Xem trước</Button>
          <Button
            onClick={() => {
              toast.success(isNew ? 'Đã đăng bài viết' : 'Đã cập nhật bài viết');
              onClose();
            }}
          >
            <Check />
            Đăng bài
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
