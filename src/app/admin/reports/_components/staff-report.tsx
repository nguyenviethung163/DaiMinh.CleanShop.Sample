'use client';

import type { VariantProps } from 'class-variance-authority';
import { ADB } from '@/lib/data';
import type { badgeVariants } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getInitials } from '@/lib/utils';

type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>['variant']>;

function getCompletionVariant(pct: number): BadgeVariant {
  if (pct >= 100) return 'default';
  if (pct >= 80) return 'secondary';
  return 'outline';
}

const completionRates = [112, 96, 88, 78, 64, 52];

export function StaffReport() {
  return (
    <Card className="gap-0 py-0">
      <CardHeader className="border-b px-6 py-4">
        <CardTitle>Hiệu suất nhân viên bán hàng</CardTitle>
        <CardDescription>Theo doanh số tháng này</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Nhân viên</TableHead>
              <TableHead>Phòng ban</TableHead>
              <TableHead className="text-right">Số đơn</TableHead>
              <TableHead className="text-right">Doanh số</TableHead>
              <TableHead className="text-right">Mục tiêu</TableHead>
              <TableHead className="text-right">Hoàn thành</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ADB.STAFF.slice(0, 6).map((staff, index) => {
              const pct = completionRates[index];
              return (
                <TableRow key={staff.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar size="sm">
                        <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                          {getInitials(staff.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{staff.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{staff.dept}</TableCell>
                  <TableCell className="text-right font-medium">{60 - index * 7}</TableCell>
                  <TableCell className="text-right font-semibold">{280 - index * 32}tr</TableCell>
                  <TableCell className="text-muted-foreground text-right">250tr</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={getCompletionVariant(pct)}>{pct}%</Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
