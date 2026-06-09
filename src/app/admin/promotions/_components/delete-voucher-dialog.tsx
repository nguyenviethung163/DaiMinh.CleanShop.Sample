'use client';

import { ADB } from '@/lib/data';
import { formatNum } from '@/lib/format';
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

type Voucher = (typeof ADB.VOUCHERS)[number];

type DeleteVoucherDialogProps = {
  voucher: Voucher | null;
  onClose: () => void;
};

export function DeleteVoucherDialog({ voucher, onClose }: DeleteVoucherDialogProps) {
  return (
    <AlertDialog open={!!voucher} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xoá voucher?</AlertDialogTitle>
          <AlertDialogDescription>
            {voucher &&
              `Mã “${voucher.code}” sẽ ngừng hoạt động ngay lập tức và không thể sử dụng. Đã có ${formatNum(voucher.used)} lượt dùng được ghi nhận.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Huỷ</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive/90 text-white"
            onClick={() => {
              if (voucher) toast.error(`Đã xoá voucher ${voucher.code}`);
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
