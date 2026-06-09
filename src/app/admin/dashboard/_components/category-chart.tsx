'use client';

import { Bar, BarChart, Cell, XAxis, YAxis } from 'recharts';
import { ADB } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const CHART_KEYS = ['chart1', 'chart2', 'chart3', 'chart4', 'chart5'] as const;

const chartConfig = Object.fromEntries(
  ADB.CAT_REVENUE.map((item, index) => [
    CHART_KEYS[index],
    { label: item.label, color: `var(--chart-${index + 1})` },
  ]),
) as ChartConfig;

const data = ADB.CAT_REVENUE.map((item, index) => ({
  category: item.label,
  value: item.value,
  fill: `var(--color-${CHART_KEYS[index]})`,
}));

function formatValue(value: number) {
  return `${(value / 1e6).toFixed(0)} tr`;
}

export function CategoryChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Doanh thu theo danh mục</CardTitle>
        <CardDescription>Tỷ trọng nhóm sản phẩm</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-[230px] w-full">
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 8, left: 4, bottom: 0 }}>
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="category"
              tickLine={false}
              axisLine={false}
              width={110}
              tick={{ fontSize: 12 }}
            />
            <ChartTooltip
              content={<ChartTooltipContent formatter={(value) => formatValue(Number(value))} />}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {data.map((entry) => (
                <Cell key={entry.category} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
