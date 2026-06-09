'use client';

import { useState } from 'react';
import { CustomerReport } from './customer-report';
import { ProductReport } from './product-report';
import { ReportsHeader } from './reports-header';
import { RevenueReport } from './revenue-report';
import { StaffReport } from './staff-report';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function ReportsView() {
  const [range, setRange] = useState('Tháng này');

  return (
    <div className="flex flex-col gap-6">
      <ReportsHeader range={range} onRangeChange={setRange} />

      <Tabs defaultValue="revenue">
        <TabsList>
          <TabsTrigger value="revenue">Doanh thu</TabsTrigger>
          <TabsTrigger value="products">Sản phẩm</TabsTrigger>
          <TabsTrigger value="customers">Khách hàng</TabsTrigger>
          <TabsTrigger value="staff">Nhân viên</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="mt-4">
          <RevenueReport />
        </TabsContent>
        <TabsContent value="products" className="mt-4">
          <ProductReport />
        </TabsContent>
        <TabsContent value="customers" className="mt-4">
          <CustomerReport />
        </TabsContent>
        <TabsContent value="staff" className="mt-4">
          <StaffReport />
        </TabsContent>
      </Tabs>
    </div>
  );
}
