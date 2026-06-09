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
import type { Post } from '../_lib/cms-meta';
import { toast } from 'sonner';

type DeletePostDialogProps = {
  post: Post | null;
  onClose: () => void;
};

export function DeletePostDialog({ post, onClose }: DeletePostDialogProps) {
  return (
    <AlertDialog open={!!post} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xoá bài viết?</AlertDialogTitle>
          <AlertDialogDescription>
            {post && `Bài “${post.title}” sẽ bị xoá vĩnh viễn khỏi website và trang quản trị.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Huỷ</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive/90 text-white"
            onClick={() => {
              toast.error('Đã xoá bài viết');
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
