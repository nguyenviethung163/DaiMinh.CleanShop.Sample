'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Bar,
  BarChart,
  Pie,
  PieChart,
  RadialBar,
  RadialBarChart,
  XAxis,
  YAxis,
} from 'recharts';
import { formatNum } from '@/lib/format';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const retentionChartConfig = {
  retention: { label: 'Giữ chân', color: 'var(--secondary)' },
} satisfies ChartConfig;

const customerTypeConfig = {
  returning: { label: 'Quay lại', color: 'var(--secondary)' },
  new: { label: 'Mới', color: 'var(--primary)' },
} satisfies ChartConfig;

const tierChartConfig = {
  bronze: { label: 'Đồng', color: 'var(--chart-5)' },
  silver: { label: 'Bạc', color: 'var(--chart-3)' },
  gold: { label: 'Vàng', color: 'var(--chart-2)' },
  platinum: { label: 'Bạch kim', color: 'var(--chart-4)' },
} satisfies ChartConfig;

const customerTypeData = [
  { name: 'Quay lại', value: 64, fill: 'var(--color-returning)' },
  { name: 'Mới', value: 36, fill: 'var(--color-new)' },
];

const tierData = [
  { tier: 'Đồng', count: 5240, fill: 'var(--color-bronze)' },
  { tier: 'Bạc', count: 1820, fill: 'var(--color-silver)' },
  { tier: 'Vàng', count: 840, fill: 'var(--color-gold)' },
  { tier: 'Bạch kim', count: 347, fill: 'var(--color-platinum)' },
];

const growthData = [120, 145, 138, 162, 158, 180, 195, 210, 188, 205, 230, 248, 240, 265, 280].map(
  (v, index) => ({
    day: ['1/5', '', '', '', '10/5', '', '', '', '20/5', '', '', '', '30/5'][index] || '',
    customers: Math.round(v * 0.6),
  }),
);

const growthChartConfig = {
  customers: { label: 'Khách hàng', color: 'var(--primary)' },
} satisfies ChartConfig;

const retentionData = [{ name: 'retention', value: 78, fill: 'var(--color-retention)' }];

export function CustomerReport() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Khách mới vs quay lại</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={customerTypeConfig} className="mx-auto aspect-square h-[200px]">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={customerTypeData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={90}
                  strokeWidth={2}
                >
                  {customerTypeData.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
            <p className="text-muted-foreground mt-2 text-center text-sm">
              <span className="text-foreground font-semibold">64%</span> khách quay lại
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Phân bổ theo hạng</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={tierChartConfig} className="aspect-auto h-[220px] w-full">
              <BarChart
                data={tierData}
                layout="vertical"
                margin={{ top: 0, right: 8, left: 4, bottom: 0 }}
              >
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="tier"
                  tickLine={false}
                  axisLine={false}
                  width={72}
                />
                <ChartTooltip
                  content={<ChartTooltipContent formatter={(v) => formatNum(Number(v))} />}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {tierData.map((entry) => (
                    <Cell key={entry.tier} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tỷ lệ giữ chân</CardTitle>
            <CardDescription>Retention 90 ngày</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center pt-2">
            <ChartContainer config={retentionChartConfig} className="aspect-square h-[200px]">
              <RadialBarChart
                data={retentionData}
                startAngle={90}
                endAngle={-270}
                innerRadius={70}
                outerRadius={100}
              >
                <RadialBar dataKey="value" background cornerRadius={8} />
              </RadialBarChart>
            </ChartContainer>
            <p className="text-2xl font-bold">78%</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tăng trưởng khách hàng 30 ngày</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={growthChartConfig} className="aspect-auto h-[240px] w-full">
            <AreaChart data={growthData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="day" tickLine={false} axisLine={false} interval="preserveStartEnd" />
              <YAxis tickLine={false} axisLine={false} width={36} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                dataKey="customers"
                type="monotone"
                fill="var(--color-customers)"
                fillOpacity={0.2}
                stroke="var(--color-customers)"
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
