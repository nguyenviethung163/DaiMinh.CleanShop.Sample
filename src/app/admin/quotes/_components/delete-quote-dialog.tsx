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

type Quote = (typeof ADB.QUOTES)[number];

type DeleteQuoteDialogProps = {
  quote: Quote | null;
  onClose: () => void;
};

export function DeleteQuoteDialog({ quote, onClose }: DeleteQuoteDialogProps) {
  return (
    <AlertDialog open={!!quote} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xoá báo giá?</AlertDialogTitle>
          <AlertDialogDescription>
            {quote && `Báo giá ${quote.id} (${quote.project}) sẽ bị xoá khỏi pipeline bán hàng.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Huỷ</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive/90 text-white"
            onClick={() => {
              if (quote) toast.error(`Đã xoá báo giá ${quote.id}`);
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
