'use client';

import { useState } from 'react';
import type { StaffMember, StaffTab } from '../_lib/staff-meta';
import { DeleteStaffDialog } from './delete-staff-dialog';
import { StaffContent } from './staff-content';
import { StaffFormDialog } from './staff-form-dialog';
import { StaffHeader } from './staff-header';
import { StaffSummary } from './staff-summary';

export function StaffView() {
  const [tab, setTab] = useState<StaffTab>('members');
  const [editing, setEditing] = useState<StaffMember | 'new' | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<StaffMember | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <StaffHeader onCreate={() => setEditing('new')} />
      <StaffSummary />
      <StaffContent tab={tab} onTabChange={setTab} onEdit={setEditing} onDelete={setDeleteTarget} />

      <StaffFormDialog member={editing} onClose={() => setEditing(null)} />
      <DeleteStaffDialog member={deleteTarget} onClose={() => setDeleteTarget(null)} />
    </div>
  );
}
