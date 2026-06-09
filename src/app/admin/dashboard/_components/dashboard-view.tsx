'use client';

import { useState } from 'react';
import { ADB } from '@/lib/data';
import { AlertGrid } from './alert-grid';
import { BrandChart } from './brand-chart';
import { CategoryChart } from './category-chart';
import { ChannelChart } from './channel-chart';
import { DashboardHeader } from './dashboard-header';
import { KpiGrid } from './kpi-grid';
import { RecentOrders } from './recent-orders';
import { RevenueChart } from './revenue-chart';
import { TopProducts } from './top-products';

export function DashboardView() {
  const [range, setRange] = useState('30 ngày');

  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader today={ADB.today} range={range} onRangeChange={setRange} />
      <KpiGrid />
      <AlertGrid />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.7fr_1fr]">
        <RevenueChart />
        <ChannelChart />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <BrandChart />
        <CategoryChart />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.6fr_1fr]">
        <RecentOrders />
        <TopProducts />
      </div>
    </div>
  );
}
