'use client';

import { getProductToneClass } from '@/app/admin/products/_lib/product-meta';
import { getPostStatusMeta, type Post } from '../_lib/cms-meta';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn, getInitials } from '@/lib/utils';

type CmsPostsGridProps = {
  rows: Post[];
  onSelect: (post: Post) => void;
};

export function CmsPostsGrid({ rows, onSelect }: CmsPostsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
      {rows.map((post) => {
        const status = getPostStatusMeta(post.status);
        return (
          <Card
            key={post.id}
            className="cursor-pointer overflow-hidden py-0 transition-shadow hover:shadow-md"
            onClick={() => onSelect(post)}
          >
            <CardContent className="p-0">
              <div className={cn('aspect-video w-full', getProductToneClass(post.tone))} />
              <div className="p-3">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <Badge variant="secondary">{post.cat}</Badge>
                  <Badge variant={status.variant}>{status.label}</Badge>
                </div>
                <p className="line-clamp-2 min-h-[2.25rem] leading-snug font-semibold">
                  {post.title}
                </p>
                <div className="text-muted-foreground mt-3 flex items-center gap-2 text-xs">
                  <Avatar className="size-5">
                    <AvatarFallback className="text-[9px]">
                      {getInitials(post.author)}
                    </AvatarFallback>
                  </Avatar>
                  {post.author} · {post.date}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
