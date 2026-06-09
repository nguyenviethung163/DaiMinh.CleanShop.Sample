'use client';

import { useMemo, useState } from 'react';
import { MOCK_ORDERS, ORDER_FILTERS, formatVND, type OrderFilter } from '@/store/lib/commerce-data';
import { CommerceFilterPills } from '@/store/components/commerce/commerce-filter-pills';
import { AccountOrderCard } from './account-order-card';

export function AccountOrdersSection() {
  const [filter, setFilter] = useState<OrderFilter>('Tất cả');

  const orders = useMemo(() => {
    if (filter === 'Tất cả') return MOCK_ORDERS;
    return MOCK_ORDERS.filter((order) => order.status === filter);
  }, [filter]);

  return (
    <>
      <div className="mb-4">
        <h1 className="text-secondary m-0 text-[28px] font-extrabold tracking-[-0.02em]">
          Đơn hàng của tôi
        </h1>
        <p className="text-muted-foreground mt-1.5 text-base">
          Tổng <b className="text-foreground">32 đơn hàng</b> · Đã chi{' '}
          <b className="text-foreground">{formatVND(146280000)}</b> · Tiết kiệm{' '}
          <b className="text-primary">{formatVND(8240000)}</b> từ voucher
        </p>
      </div>

      <CommerceFilterPills options={ORDER_FILTERS} value={filter} onChange={setFilter} />

      <div className="flex flex-col gap-3">
        {orders.map((order) => (
          <AccountOrderCard key={order.id} order={order} />
        ))}
      </div>
    </>
  );
}
