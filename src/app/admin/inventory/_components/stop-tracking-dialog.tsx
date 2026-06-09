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
import type { InventoryItem } from '../_lib/inventory-meta';
import { toast } from 'sonner';

type StopTrackingDialogProps = {
  item: InventoryItem | null;
  onClose: () => void;
};

export function StopTrackingDialog({ item, onClose }: StopTrackingDialogProps) {
  return (
    <AlertDialog open={!!item} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Ngừng theo dõi tồn kho?</AlertDialogTitle>
          <AlertDialogDescription>
            {item &&
              `Sản phẩm “${item.name}” sẽ không còn được quản lý tồn kho. Bạn có thể bật lại bất cứ lúc nào.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Huỷ</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive/90 text-white"
            onClick={() => {
              if (item) toast.error(`Đã ngừng theo dõi ${item.sku}`);
              onClose();
            }}
          >
            Ngừng theo dõi
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
