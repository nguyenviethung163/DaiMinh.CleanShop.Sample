'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import type { Product } from '../_lib/product-meta';
import { toast } from 'sonner';

type DeleteProductDialogProps = {
  product: Product | null;
  onClose: () => void;
};

export function DeleteProductDialog({ product, onClose }: DeleteProductDialogProps) {
  return (
    <AlertDialog open={!!product} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xoá sản phẩm?</AlertDialogTitle>
          <AlertDialogDescription>
            {product &&
              `Sản phẩm “${product.name}” sẽ bị xoá khỏi danh mục. Dữ liệu tồn kho và lịch sử bán hàng vẫn được lưu trữ.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Huỷ</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive/90 text-white"
            onClick={() => {
              if (product) toast.error(`Đã xoá ${product.sku}`);
              onClose();
            }}
          >
            Xoá
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
