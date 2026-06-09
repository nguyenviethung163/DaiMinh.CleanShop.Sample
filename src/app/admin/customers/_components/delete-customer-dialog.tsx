'use client';

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

type Customer = (typeof ADB.CUSTOMERS)[number];

type DeleteCustomerDialogProps = {
  customer: Customer | null;
  onClose: () => void;
};

export function DeleteCustomerDialog({ customer, onClose }: DeleteCustomerDialogProps) {
  return (
    <AlertDialog open={!!customer} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xoá khách hàng?</AlertDialogTitle>
          <AlertDialogDescription>
            {customer &&
              `Hồ sơ của “${customer.name}” sẽ bị xoá khỏi hệ thống CRM. Lịch sử đơn hàng sẽ được giữ ẩn danh.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Huỷ</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive/90 text-white"
            onClick={() => {
              if (customer) toast.error(`Đã xoá khách hàng ${customer.name}`);
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
