'use client';

import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from 'recharts';
import { ADB } from '@/lib/data';
import { formatNum } from '@/lib/format';
import { formatTrillion } from '../_lib/format';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

const brandChartConfig = {
  revenue: { label: 'Doanh thu', color: 'var(--secondary)' },
} satisfies ChartConfig;

const CHART_KEYS = ['chart1', 'chart2', 'chart3', 'chart4', 'chart5'] as const;

const categoryChartConfig = Object.fromEntries(
  ADB.CAT_REVENUE.map((item, index) => [
    CHART_KEYS[index],
    { label: item.label, color: `var(--chart-${index + 1})` },
  ]),
) as ChartConfig;

const topProducts = [...ADB.PRODUCTS].sort((a, b) => b.sold - a.sold).slice(0, 8);

const brandData = ADB.BRAND_BARS.labels.map((brand, index) => ({
  brand,
  revenue: ADB.BRAND_BARS.revenue[index],
}));

const categoryData = ADB.CAT_REVENUE.map((item, index) => ({
  category: item.label,
  value: item.value,
  fill: `var(--color-${CHART_KEYS[index]})`,
}));

export function ProductReport() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Card className="gap-0 py-0">
          <CardHeader className="border-b px-6 py-4">
            <CardTitle>Top sản phẩm bán chạy</CardTitle>
            <CardDescription>Theo số lượng tháng này</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-10 text-center">#</TableHead>
                  <TableHead>Sản phẩm</TableHead>
                  <TableHead className="text-right">Đã bán</TableHead>
                  <TableHead className="text-right">Doanh thu</TableHead>
                  <TableHead className="text-right">Tỷ trọng</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topProducts.map((product, index) => (
                  <TableRow key={product.id}>
                    <TableCell
                      className={cn(
                        'text-center font-bold italic',
                        index < 3 ? 'text-primary' : 'text-muted-foreground',
                      )}
                    >
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Skeleton className="size-8 shrink-0 rounded-md" />
                        <span className="max-w-[220px] truncate font-medium">
                          {product.name.slice(0, 32)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatNum(product.sold)}
                    </TableCell>
                    <TableCell className="text-primary text-right font-semibold">
                      {formatTrillion(product.price * product.sold)}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-right">
                      {5 + (index % 8)}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Doanh thu theo danh mục</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={categoryChartConfig} className="aspect-auto h-[320px] w-full">
              <BarChart
                data={categoryData}
                layout="vertical"
                margin={{ top: 0, right: 8, left: 4, bottom: 0 }}
              >
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
                  content={<ChartTooltipContent formatter={(v) => formatTrillion(Number(v))} />}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {categoryData.map((entry) => (
                    <Cell key={entry.category} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Doanh thu theo thương hiệu (12 tháng)</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={brandChartConfig} className="aspect-auto h-[240px] w-full">
            <BarChart data={brandData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="brand" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} tickFormatter={formatTrillion} width={44} />
              <ChartTooltip
                content={<ChartTooltipContent formatter={(v) => formatTrillion(Number(v))} />}
              />
              <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
