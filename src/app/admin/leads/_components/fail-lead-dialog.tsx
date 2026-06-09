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

type Lead = (typeof ADB.LEADS)[number];

type FailLeadDialogProps = {
  lead: Lead | null;
  onClose: () => void;
};

export function FailLeadDialog({ lead, onClose }: FailLeadDialogProps) {
  return (
    <AlertDialog open={!!lead} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Đánh dấu lead thất bại?</AlertDialogTitle>
          <AlertDialogDescription>
            {lead &&
              `Lead “${lead.name}” sẽ được chuyển vào nhóm thất bại. Bạn vẫn có thể khôi phục sau.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Đóng</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive/90 text-white"
            onClick={() => {
              toast.error('Đã đánh dấu lead thất bại');
              onClose();
            }}
          >
            Xác nhận
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
