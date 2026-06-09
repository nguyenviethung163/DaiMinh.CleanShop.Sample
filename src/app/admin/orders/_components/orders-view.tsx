'use client';

import { useMemo, useState } from 'react';
import { ADB } from '@/lib/data';
import type { OrderTab } from '../_lib/order-tabs';
import { CancelOrderDialog } from './cancel-order-dialog';
import { OrderDetailSheet } from './order-detail-sheet';
import { OrderFormDialog } from './order-form-dialog';
import { OrdersHeader } from './orders-header';
import { OrdersSummary } from './orders-summary';
import { OrdersTable } from './orders-table';

type Order = (typeof ADB.ORDERS)[number];

export function OrdersView() {
  const [tab, setTab] = useState<OrderTab>('all');
  const [selected, setSelected] = useState<string[]>([]);
  const [detail, setDetail] = useState<Order | null>(null);
  const [creating, setCreating] = useState(false);
  const [cancelTarget, setCancelTarget] = useState<Order | null>(null);

  const counts = useMemo(
    () => ({
      all: ADB.ORDERS.length,
      pending: ADB.ORDERS.filter((order) => order.status === 'pending').length,
      confirmed: ADB.ORDERS.filter((order) => order.status === 'confirmed').length,
      shipping: ADB.ORDERS.filter((order) => order.status === 'shipping').length,
      done: ADB.ORDERS.filter((order) => order.status === 'done').length,
      cancelled: ADB.ORDERS.filter((order) => order.status === 'cancelled').length,
    }),
    [],
  );

  const rows = tab === 'all' ? ADB.ORDERS : ADB.ORDERS.filter((order) => order.status === tab);

  const toggle = (id: string) =>
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );

  return (
    <div className="flex flex-col gap-6">
      <OrdersHeader pendingCount={counts.pending} onCreate={() => setCreating(true)} />
      <OrdersSummary pendingCount={counts.pending} />
      <OrdersTable
        tab={tab}
        counts={counts}
        rows={rows}
        selected={selected}
        onTabChange={(value) => {
          setTab(value);
          setSelected([]);
        }}
        onToggle={toggle}
        onToggleAll={(checked) => setSelected(checked ? rows.map((row) => row.id) : [])}
        onClearSelection={() => setSelected([])}
        onRowClick={setDetail}
        onDelete={setCancelTarget}
      />

      <OrderDetailSheet order={detail} onClose={() => setDetail(null)} />
      <OrderFormDialog open={creating} onClose={() => setCreating(false)} />
      <CancelOrderDialog order={cancelTarget} onClose={() => setCancelTarget(null)} />
    </div>
  );
}
