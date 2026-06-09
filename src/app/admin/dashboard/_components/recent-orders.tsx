'use client';

import { ArrowRight } from 'lucide-react';
import { ADB } from '@/lib/data';
import { formatVND } from '@/lib/format';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getInitials, getOrderStatusVariant } from '../_lib/order-status';

export function RecentOrders() {
  return (
    <Card className="gap-0 py-0">
      <CardHeader className="border-b px-6 py-4">
        <CardTitle>Đơn hàng gần đây</CardTitle>
        <CardAction>
          <Button variant="ghost" size="sm">
            Xem tất cả
            <ArrowRight />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Mã đơn</TableHead>
              <TableHead>Khách hàng</TableHead>
              <TableHead>Kênh</TableHead>
              <TableHead>Giá trị</TableHead>
              <TableHead>Trạng thái</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ADB.ORDERS.slice(0, 6).map((order) => {
              const status = ADB.ORDER_STATUS[order.status as keyof typeof ADB.ORDER_STATUS];
              return (
                <TableRow key={order.id}>
                  <TableCell className="text-secondary font-mono font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar size="sm">
                        <AvatarFallback>{getInitials(order.customer)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{order.customer}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{order.channel}</TableCell>
                  <TableCell className="font-semibold">{formatVND(order.total)}</TableCell>
                  <TableCell>
                    <Badge variant={getOrderStatusVariant(order.status)}>{status.label}</Badge>
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
