'use client';

import { formatVND } from '@/lib/format';
import { ADB } from '@/lib/data';
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
import { toast } from 'sonner';

type Order = (typeof ADB.ORDERS)[number];

type CancelOrderDialogProps = {
  order: Order | null;
  onClose: () => void;
};

export function CancelOrderDialog({ order, onClose }: CancelOrderDialogProps) {
  return (
    <AlertDialog open={!!order} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Huỷ đơn {order?.id}?</AlertDialogTitle>
          <AlertDialogDescription>
            {order &&
              `Đơn của ${order.customer} (${formatVND(order.total)}) sẽ chuyển sang trạng thái Đã huỷ và thông báo cho khách.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Đóng</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive/90 text-white"
            onClick={() => {
              if (order) toast.error(`Đã huỷ đơn ${order.id}`);
              onClose();
            }}
          >
            Xác nhận huỷ
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
