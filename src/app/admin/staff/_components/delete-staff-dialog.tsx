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
import type { StaffMember } from '../_lib/staff-meta';
import { toast } from 'sonner';

type DeleteStaffDialogProps = {
  member: StaffMember | null;
  onClose: () => void;
};

export function DeleteStaffDialog({ member, onClose }: DeleteStaffDialogProps) {
  return (
    <AlertDialog open={!!member} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xoá nhân viên?</AlertDialogTitle>
          <AlertDialogDescription>
            {member &&
              `Tài khoản của “${member.name}” sẽ bị vô hiệu hoá và xoá quyền truy cập hệ thống.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Huỷ</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive/90 text-white"
            onClick={() => {
              if (member) toast.error(`Đã xoá nhân viên ${member.name}`);
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
