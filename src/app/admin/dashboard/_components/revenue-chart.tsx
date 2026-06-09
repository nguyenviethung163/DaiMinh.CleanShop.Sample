'use client';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { ADB } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartConfig = {
  revenue: {
    label: 'Doanh thu',
    color: 'var(--secondary)',
  },
  previous: {
    label: 'Kỳ trước',
    color: 'var(--primary)',
  },
} satisfies ChartConfig;

const data = ADB.REV_30.map((value, index) => ({
  day: ADB.REV_LABELS[index] || `D${index + 1}`,
  revenue: value,
  previous: Math.round(value * 0.86),
}));

function formatAxis(value: number) {
  return `${(value / 1e6).toFixed(0)}tr`;
}

function formatTooltip(value: number) {
  return `${(value / 1e6).toFixed(1)} tr`;
}

export function RevenueChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Doanh thu theo ngày</CardTitle>
        <CardDescription>Tổng tháng 5: 1.284.500.000đ · so tháng trước +14.2%</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-[260px] w-full">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval="preserveStartEnd"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={formatAxis}
              width={40}
            />
            <ChartTooltip
              content={<ChartTooltipContent formatter={(value) => formatTooltip(Number(value))} />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Area
              dataKey="previous"
              type="monotone"
              fill="var(--color-previous)"
              fillOpacity={0}
              stroke="var(--color-previous)"
              strokeWidth={2}
              strokeDasharray="4 4"
            />
            <Area
              dataKey="revenue"
              type="monotone"
              fill="var(--color-revenue)"
              fillOpacity={0.2}
              stroke="var(--color-revenue)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
