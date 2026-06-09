'use client';

import { CreditCard, DollarSign, ShoppingCart, TrendingUp } from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from 'recharts';
import { ADB } from '@/lib/data';
import { formatTrillion } from '../_lib/format';
import { StatCard } from './stat-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const revenueChartConfig = {
  revenue: { label: 'Doanh thu', color: 'var(--secondary)' },
  previous: { label: 'Kỳ trước', color: 'var(--primary)' },
} satisfies ChartConfig;

const channelChartConfig = {
  current: { label: 'Kỳ này', color: 'var(--secondary)' },
  previous: { label: 'Kỳ trước', color: 'var(--muted-foreground)' },
} satisfies ChartConfig;

const paymentChartConfig = {
  cod: { label: 'COD', color: 'var(--chart-4)' },
  transfer: { label: 'Chuyển khoản', color: 'var(--chart-2)' },
  wallet: { label: 'Ví điện tử', color: 'var(--chart-3)' },
  credit: { label: 'Công nợ', color: 'var(--chart-5)' },
} satisfies ChartConfig;

const revenueData = ADB.REV_30.map((value, index) => ({
  day: ADB.REV_LABELS[index] || `D${index + 1}`,
  revenue: value,
  previous: Math.round(value * 0.86),
}));

const channelLabels = ['Website', 'Showroom', 'Zalo/FB', 'Hotline'];
const channelData = channelLabels.map((name, index) => ({
  name,
  current: [280, 140, 105, 58][index],
  previous: [240, 120, 90, 50][index],
}));

const paymentData = [
  { name: 'COD', value: 42, fill: 'var(--color-cod)' },
  { name: 'Chuyển khoản', value: 28, fill: 'var(--color-transfer)' },
  { name: 'Ví điện tử', value: 18, fill: 'var(--color-wallet)' },
  { name: 'Công nợ', value: 12, fill: 'var(--color-credit)' },
];

export function RevenueReport() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Tổng doanh thu"
          value="1.284 tỷ"
          delta="+14.2%"
          icon={<DollarSign className="size-4" />}
          iconClass="bg-primary/10 text-primary"
          sub="so kỳ trước"
        />
        <StatCard
          label="Lợi nhuận gộp"
          value="358 tr"
          delta="+9.1%"
          icon={<TrendingUp className="size-4" />}
          iconClass="bg-secondary/10 text-secondary"
          sub="biên 27.9%"
        />
        <StatCard
          label="Số đơn hàng"
          value="342"
          delta="+8.2%"
          icon={<ShoppingCart className="size-4" />}
          iconClass="bg-accent text-accent-foreground"
        />
        <StatCard
          label="Giá trị TB/đơn"
          value="3.75tr"
          delta="-2.3%"
          deltaDir="down"
          icon={<CreditCard className="size-4" />}
          iconClass="bg-muted text-muted-foreground"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Doanh thu & lợi nhuận 30 ngày</CardTitle>
          <CardDescription>Đường liền: doanh thu · Đường đứt: kỳ trước</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={revenueChartConfig} className="aspect-auto h-[300px] w-full">
            <AreaChart data={revenueData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="day" tickLine={false} axisLine={false} interval="preserveStartEnd" />
              <YAxis tickLine={false} axisLine={false} tickFormatter={formatTrillion} width={44} />
              <ChartTooltip
                content={<ChartTooltipContent formatter={(v) => formatTrillion(Number(v))} />}
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

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Doanh thu theo kênh</CardTitle>
            <CardDescription>So sánh với kỳ trước</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={channelChartConfig} className="aspect-auto h-[240px] w-full">
              <BarChart data={channelData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `${v}tr`}
                  width={36}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="current" fill="var(--color-current)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="previous" fill="var(--color-previous)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tỷ trọng phương thức thanh toán</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={paymentChartConfig} className="mx-auto aspect-square h-[200px]">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={paymentData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={56}
                  outerRadius={88}
                  strokeWidth={2}
                >
                  {paymentData.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
            <div className="mt-4 flex flex-col gap-3">
              {paymentData.map((item) => (
                <div key={item.name} className="flex items-center gap-3 text-sm">
                  <span
                    className="size-2.5 shrink-0 rounded-full"
                    style={{ background: item.fill }}
                  />
                  <span className="text-muted-foreground flex-1">{item.name}</span>
                  <span className="font-semibold">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
