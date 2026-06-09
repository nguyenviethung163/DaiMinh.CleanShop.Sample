'use client';

import { useMemo, useState } from 'react';
import { ADB } from '@/lib/data';
import type { CmsTab, Post } from '../_lib/cms-meta';
import { CmsHeader } from './cms-header';
import { CmsPostsGrid } from './cms-posts-grid';
import { CmsPostsTable } from './cms-posts-table';
import { CmsSummary } from './cms-summary';
import { DeletePostDialog } from './delete-post-dialog';
import { PostEditorDialog } from './post-editor-dialog';

function filterByTab(tab: CmsTab, posts: Post[]): Post[] {
  if (tab === 'all') return posts;
  return posts.filter((p) => p.status === tab);
}

export function CmsView() {
  const posts = ADB.POSTS as Post[];
  const [tab, setTab] = useState<CmsTab>('all');
  const [view, setView] = useState<'table' | 'grid'>('table');
  const [editing, setEditing] = useState<Post | 'new' | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Post | null>(null);

  const rows = useMemo(() => filterByTab(tab, posts), [tab, posts]);

  const counts = useMemo(
    () => ({
      all: posts.length,
      published: posts.filter((p) => p.status === 'published').length,
      draft: posts.filter((p) => p.status === 'draft').length,
      review: posts.filter((p) => p.status === 'review').length,
      scheduled: posts.filter((p) => p.status === 'scheduled').length,
    }),
    [posts],
  );

  return (
    <div className="flex flex-col gap-6">
      <CmsHeader onCreate={() => setEditing('new')} />
      <CmsSummary />
      <CmsPostsTable
        tab={tab}
        rows={rows}
        counts={counts}
        view={view}
        onTabChange={setTab}
        onViewChange={setView}
        onRowClick={setEditing}
        onEdit={setEditing}
        onDelete={setDeleteTarget}
        gridSlot={<CmsPostsGrid rows={rows} onSelect={setEditing} />}
      />

      <PostEditorDialog post={editing} onClose={() => setEditing(null)} />
      <DeletePostDialog post={deleteTarget} onClose={() => setDeleteTarget(null)} />
    </div>
  );
}
