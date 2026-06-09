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
import type { ColorItem } from '../_lib/color-meta';
import { toast } from 'sonner';

type DeleteColorDialogProps = {
  color: ColorItem | null;
  onClose: () => void;
};

export function DeleteColorDialog({ color, onClose }: DeleteColorDialogProps) {
  return (
    <AlertDialog open={!!color} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xoá mã màu?</AlertDialogTitle>
          <AlertDialogDescription>
            {color &&
              `Mã màu “${color.name}” (${color.code}) sẽ bị xoá khỏi thư viện. Công thức pha liên quan cũng sẽ bị gỡ.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Huỷ</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive/90 text-white"
            onClick={() => {
              if (color) toast.error(`Đã xoá mã màu ${color.code}`);
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
