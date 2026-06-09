'use client';

import { useState } from 'react';
import { TrendingUp, Upload } from 'lucide-react';
import { ADB } from '@/lib/data';
import { formatVND } from '@/lib/format';
import {
  getProductToneClass,
  PRODUCT_FORM_TABS,
  type Product,
  type ProductFormTab,
} from '../_lib/product-meta';
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
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type ProductFormDialogProps = {
  product: Product | 'new' | null;
  onClose: () => void;
};

export function ProductFormDialog({ product, onClose }: ProductFormDialogProps) {
  const isNew = product === 'new';
  const data = isNew ? null : product;
  const [tab, setTab] = useState<ProductFormTab>('info');

  const margin = data ? data.price - data.cost : 0;
  const marginPct = data && data.price > 0 ? Math.round((margin / data.price) * 100) : 28;

  return (
    <Dialog open={!!product} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{isNew ? 'Thêm sản phẩm mới' : 'Chỉnh sửa sản phẩm'}</DialogTitle>
          <DialogDescription>
            {isNew ? 'Điền thông tin sản phẩm sơn' : `${data?.sku} · ${data?.name}`}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={tab} onValueChange={(v) => setTab(v as ProductFormTab)}>
          <TabsList className="w-full justify-start">
            {PRODUCT_FORM_TABS.map((item) => (
              <TabsTrigger key={item.value} value={item.value}>
                {item.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="info" className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="product-name">Tên sản phẩm *</Label>
              <Input
                id="product-name"
                defaultValue={data?.name}
                placeholder="VD: Dulux Weathershield Powerflexx 18L"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Thương hiệu *</Label>
                <Select defaultValue={data?.brand ?? ADB.brands[0]}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ADB.brands.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Danh mục *</Label>
                <Select defaultValue={data?.cat ?? ADB.cats[0]}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ADB.cats.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="product-sku">Mã SKU *</Label>
                <Input id="product-sku" defaultValue={data?.sku} placeholder="DLX-8800" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-size">Dung tích / Quy cách</Label>
                <Input id="product-size" defaultValue="18L" placeholder="18L / 5L / 20kg" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="product-desc">Mô tả sản phẩm</Label>
              <Textarea
                id="product-desc"
                rows={4}
                placeholder="Mô tả tính năng, công dụng, ưu điểm…"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="product-features">Tính năng nổi bật</Label>
              <Input
                id="product-features"
                defaultValue="Chống thấm, Bền màu 15 năm, Kháng khuẩn"
                placeholder="Phân cách bằng dấu phẩy"
              />
              <p className="text-muted-foreground text-xs">Phân cách bằng dấu phẩy</p>
            </div>
          </TabsContent>

          <TabsContent value="price" className="mt-4 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="product-cost">Giá vốn (đ) *</Label>
                <Input id="product-cost" defaultValue={data?.cost} placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-price">Giá bán (đ) *</Label>
                <Input id="product-price" defaultValue={data?.price} placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-sale">Giá khuyến mãi (đ)</Label>
                <Input id="product-sale" placeholder="0" />
              </div>
            </div>
            <div className="bg-accent/50 text-accent-foreground flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium">
              <TrendingUp className="size-4 shrink-0" />
              Biên lợi nhuận dự kiến: <span className="font-bold">{marginPct}%</span>
              {data && <span className="text-muted-foreground">(chênh {formatVND(margin)})</span>}
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="product-stock">Tồn kho ban đầu *</Label>
                <Input id="product-stock" defaultValue={data?.stock} placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-threshold">Ngưỡng cảnh báo</Label>
                <Input id="product-threshold" defaultValue="10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-location">Vị trí kho</Label>
                <Input id="product-location" defaultValue="Kho A · Kệ 3" />
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border p-4">
              <Switch defaultChecked />
              <div>
                <p className="font-medium">Cho phép đặt khi hết hàng</p>
                <p className="text-muted-foreground text-xs">
                  Khách vẫn đặt được khi tồn kho = 0 (pre-order)
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="media" className="mt-4 space-y-2">
            <Label>Hình ảnh sản phẩm</Label>
            <p className="text-muted-foreground text-xs">
              Ảnh đầu tiên là ảnh đại diện. Tối đa 8 ảnh.
            </p>
            <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={cn(
                    'aspect-square rounded-lg',
                    getProductToneClass(data?.tone ?? 'sky'),
                    i === 0 && 'ring-primary ring-2',
                  )}
                />
              ))}
              <button
                type="button"
                className="text-muted-foreground hover:border-primary hover:text-primary flex aspect-square flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed transition-colors"
              >
                <Upload className="size-5" />
                <span className="text-xs">Tải ảnh</span>
              </button>
            </div>
          </TabsContent>

          <TabsContent value="seo" className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="product-seo-title">Tiêu đề SEO</Label>
              <Input id="product-seo-title" defaultValue={data?.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="product-slug">Đường dẫn (slug)</Label>
              <Input id="product-slug" defaultValue="dulux-weathershield-powerflexx-18l" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="product-meta">Mô tả meta</Label>
              <Textarea id="product-meta" rows={3} />
              <p className="text-muted-foreground text-xs">Khuyến nghị 150–160 ký tự</p>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            Huỷ
          </Button>
          <Button variant="secondary">Lưu nháp</Button>
          <Button
            onClick={() => {
              toast.success(isNew ? 'Đã tạo sản phẩm mới' : 'Đã lưu thay đổi');
              onClose();
            }}
          >
            {isNew ? 'Tạo sản phẩm' : 'Lưu thay đổi'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
