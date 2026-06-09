'use client';

import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function SettingsSaveBar() {
  return (
    <div className="mt-4 flex justify-end gap-2">
      <Button variant="outline">Huỷ thay đổi</Button>
      <Button onClick={() => toast.success('Đã lưu cấu hình')}>
        <Save />
        Lưu cấu hình
      </Button>
    </div>
  );
}
