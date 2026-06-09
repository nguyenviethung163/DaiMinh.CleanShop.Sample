'use client';

import { FolderOpen, Plus } from 'lucide-react';
import { ADB } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { TypographyH1, TypographyMuted } from '@/components/ui/typography';

type CmsHeaderProps = {
  onCreate: () => void;
};

export function CmsHeader({ onCreate }: CmsHeaderProps) {
  const publishedCount = ADB.POSTS.filter((p) => p.status === 'published').length;

  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="space-y-1">
        <TypographyH1 className="text-xl">Tin tức / Blog</TypographyH1>
        <TypographyMuted>
          {ADB.POSTS.length} bài viết · {publishedCount} đã đăng
        </TypographyMuted>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <FolderOpen />
          Chuyên mục
        </Button>
        <Button size="sm" onClick={onCreate}>
          <Plus />
          Viết bài mới
        </Button>
      </div>
    </div>
  );
}
