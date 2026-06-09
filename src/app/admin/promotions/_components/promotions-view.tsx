'use client';

import { useState } from 'react';
import { ADB } from '@/lib/data';
import type { PromotionTab } from '../_lib/promotion-meta';
import { DeleteVoucherDialog } from './delete-voucher-dialog';
import { PromotionsHeader } from './promotions-header';
import { PromotionsSummary } from './promotions-summary';
import { PromotionsTable } from './promotions-table';
import { VoucherFormDialog } from './voucher-form-dialog';

type Voucher = (typeof ADB.VOUCHERS)[number];

export function PromotionsView() {
  const [tab, setTab] = useState<PromotionTab>('voucher');
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<Voucher | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Voucher | null>(null);

  const formOpen = creating || !!editing;

  const closeForm = () => {
    setCreating(false);
    setEditing(null);
  };

  return (
    <div className="flex flex-col gap-6">
      <PromotionsHeader onCreate={() => setCreating(true)} />
      <PromotionsSummary />
      <PromotionsTable
        tab={tab}
        onTabChange={setTab}
        onEdit={setEditing}
        onDelete={setDeleteTarget}
      />

      <VoucherFormDialog voucher={editing} open={formOpen} onClose={closeForm} />
      <DeleteVoucherDialog voucher={deleteTarget} onClose={() => setDeleteTarget(null)} />
    </div>
  );
}
