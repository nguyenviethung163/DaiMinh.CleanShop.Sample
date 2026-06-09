'use client';

import { Cell, Pie, PieChart } from 'recharts';
import { ADB } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const CHART_KEYS = ['chart1', 'chart2', 'chart3', 'chart4'] as const;

const chartConfig = {
  chart1: { label: 'Website', color: 'var(--chart-4)' },
  chart2: { label: 'Showroom', color: 'var(--chart-2)' },
  chart3: { label: 'Zalo / FB', color: 'var(--chart-3)' },
  chart4: { label: 'Hotline', color: 'var(--chart-5)' },
} satisfies ChartConfig;

const data = ADB.CHANNEL_SPLIT.map((item, index) => ({
  name: item.label,
  value: item.value,
  fill: `var(--color-${CHART_KEYS[index]})`,
}));

export function ChannelChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Kênh bán hàng</CardTitle>
        <CardDescription>Phân bổ doanh thu theo kênh</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto aspect-square h-[220px]">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={56}
              outerRadius={88}
              strokeWidth={2}
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="mt-4 flex flex-col gap-3">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-3 text-sm">
              <span className="size-2.5 shrink-0 rounded-full" style={{ background: item.fill }} />
              <span className="text-muted-foreground flex-1">{item.name}</span>
              <span className="font-semibold">{item.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
