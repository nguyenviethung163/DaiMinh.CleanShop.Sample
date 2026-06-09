'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { ADB } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartConfig = {
  revenue: {
    label: 'Doanh thu',
    color: 'var(--secondary)',
  },
} satisfies ChartConfig;

const data = ADB.BRAND_BARS.labels.map((brand, index) => ({
  brand,
  revenue: ADB.BRAND_BARS.revenue[index],
}));

function formatAxis(value: number) {
  return `${(value / 1e6).toFixed(0)}tr`;
}

export function BrandChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Doanh thu theo thương hiệu</CardTitle>
        <CardDescription>Top 6 thương hiệu tháng này</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-[230px] w-full">
          <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="brand" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={formatAxis}
              width={40}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => `${(Number(value) / 1e6).toFixed(0)} tr`}
                />
              }
            />
            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
