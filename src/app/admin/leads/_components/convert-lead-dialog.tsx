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

type Lead = (typeof ADB.LEADS)[number];

type ConvertLeadDialogProps = {
  lead: Lead | null;
  onClose: () => void;
};

export function ConvertLeadDialog({ lead, onClose }: ConvertLeadDialogProps) {
  return (
    <AlertDialog open={!!lead} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Chuyển “{lead?.name}” thành khách hàng?</AlertDialogTitle>
          <AlertDialogDescription>
            {lead &&
              `Lead sẽ được tạo thành hồ sơ khách hàng chính thức và một báo giá nháp trị giá ${formatVND(lead.value)} sẽ được khởi tạo.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Huỷ</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              if (lead) toast.success(`Đã chuyển đổi ${lead.name} thành khách hàng`);
              onClose();
            }}
          >
            Chuyển đổi
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
