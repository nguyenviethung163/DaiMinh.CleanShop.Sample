'use client';

import { useMemo, useState } from 'react';
import { ADB } from '@/lib/data';
import { formatNum } from '@/lib/format';
import type { CustomerTab } from '../_lib/customer-meta';
import { CustomerFormDialog } from './customer-form-dialog';
import { CustomerProfileSheet } from './customer-profile-sheet';
import { CustomersHeader } from './customers-header';
import { CustomersSummary } from './customers-summary';
import { CustomersTable } from './customers-table';
import { DeleteCustomerDialog } from './delete-customer-dialog';

type Customer = (typeof ADB.CUSTOMERS)[number];

function filterByTab(tab: CustomerTab): Customer[] {
  if (tab === 'contractor') {
    return ADB.CUSTOMERS.filter((c) => c.type === 'Nhà thầu');
  }
  if (tab === 'business') {
    return ADB.CUSTOMERS.filter((c) => c.type === 'Doanh nghiệp');
  }
  if (tab === 'vip') {
    return ADB.CUSTOMERS.filter((c) => c.tier === 'Bạch kim' || c.tier === 'Vàng');
  }
  return ADB.CUSTOMERS;
}

export function CustomersView() {
  const [tab, setTab] = useState<CustomerTab>('all');
  const [detail, setDetail] = useState<Customer | null>(null);
  const [editing, setEditing] = useState<Customer | 'new' | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<Customer | null>(null);

  const rows = useMemo(() => filterByTab(tab), [tab]);

  const counts = useMemo(
    () => ({
      all: formatNum(8247),
      vip: ADB.CUSTOMERS.filter((c) => c.tier === 'Vàng' || c.tier === 'Bạch kim').length,
      contractor: ADB.CUSTOMERS.filter((c) => c.type === 'Nhà thầu').length,
      business: ADB.CUSTOMERS.filter((c) => c.type === 'Doanh nghiệp').length,
    }),
    [],
  );

  const toggle = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <div className="flex flex-col gap-6">
      <CustomersHeader onCreate={() => setEditing('new')} />
      <CustomersSummary />
      <CustomersTable
        tab={tab}
        rows={rows}
        selected={selected}
        counts={counts}
        onTabChange={setTab}
        onToggle={toggle}
        onToggleAll={(checked) => setSelected(checked ? rows.map((r) => r.id) : [])}
        onRowClick={setDetail}
        onEdit={setEditing}
        onDelete={setDeleteTarget}
      />

      <CustomerProfileSheet customer={detail} onClose={() => setDetail(null)} />
      <CustomerFormDialog customer={editing} onClose={() => setEditing(null)} />
      <DeleteCustomerDialog customer={deleteTarget} onClose={() => setDeleteTarget(null)} />
    </div>
  );
}
