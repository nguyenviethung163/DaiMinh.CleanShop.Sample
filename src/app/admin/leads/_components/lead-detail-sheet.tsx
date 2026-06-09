'use client';

import { Check, ClipboardList, Phone, Plus } from 'lucide-react';
import { ADB } from '@/lib/data';
import { getLeadScoreClass, getLeadStatusVariant } from '../_lib/lead-status';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

type Lead = (typeof ADB.LEADS)[number];

type LeadDetailSheetProps = {
  lead: Lead | null;
  onClose: () => void;
  onConvert: () => void;
};

function getTimeline(lead: Lead) {
  return [
    { title: 'Lead được tạo', detail: lead.source, time: lead.created, done: true },
    {
      title: 'Gọi điện lần 1',
      detail: 'Khách quan tâm, hẹn khảo sát',
      time: '2 ngày trước',
      done: ['contacted', 'qualified', 'proposal', 'won'].includes(lead.status),
    },
    {
      title: 'Gửi bảng màu + báo giá sơ bộ',
      detail: 'Qua Zalo',
      time: 'Hôm qua',
      done: ['proposal', 'won'].includes(lead.status),
    },
    {
      title: 'Chốt đơn',
      detail: '',
      time: 'Hôm nay',
      done: lead.status === 'won',
    },
  ];
}

export function LeadDetailSheet({ lead, onClose, onConvert }: LeadDetailSheetProps) {
  if (!lead) return null;

  const status = ADB.LEAD_STATUS[lead.status as keyof typeof ADB.LEAD_STATUS];
  const timeline = getTimeline(lead);

  const metrics = [
    {
      label: 'Điểm tiềm năng',
      value: String(lead.score),
      className: getLeadScoreClass(lead.score),
    },
    {
      label: 'Giá trị dự kiến',
      value: `${(lead.value / 1e6).toFixed(0)}tr`,
      className: 'text-primary',
    },
    { label: 'Nguồn', value: lead.source, className: 'text-secondary' },
  ];

  const contactRows = [
    ['Họ tên', lead.name],
    ['Điện thoại', lead.phone],
    ['Khu vực', lead.city],
    ['Nhu cầu', lead.need],
    ['Phụ trách', lead.assignee],
  ] as const;

  return (
    <Sheet open={!!lead} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
        <SheetHeader>
          <div className="flex items-start justify-between gap-3 pr-8">
            <div>
              <SheetTitle>{lead.name}</SheetTitle>
              <SheetDescription>
                {lead.id} · {lead.source}
              </SheetDescription>
            </div>
            <Badge variant={getLeadStatusVariant(lead.status)}>{status.label}</Badge>
          </div>
        </SheetHeader>

        <div className="space-y-4 px-4 pb-4">
          <div className="grid grid-cols-3 gap-3">
            {metrics.map((metric) => (
              <Card key={metric.label} className="py-4 text-center">
                <CardContent className="px-3">
                  <p className={cn('text-lg font-bold', metric.className)}>{metric.value}</p>
                  <p className="text-muted-foreground mt-1 text-xs">{metric.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Thông tin liên hệ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-0">
              {contactRows.map(([label, value], index) => (
                <div
                  key={label}
                  className={cn(
                    'flex justify-between py-2 text-sm',
                    index < contactRows.length - 1 && 'border-b',
                  )}
                >
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Lịch sử tương tác</CardTitle>
            </CardHeader>
            <CardContent className="space-y-0">
              {timeline.map((item, index) => (
                <div key={item.title} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        'flex size-6 items-center justify-center rounded-full',
                        item.done
                          ? 'bg-secondary text-secondary-foreground'
                          : 'border-border bg-background border-2',
                      )}
                    >
                      {item.done && <Check className="size-3.5" />}
                    </div>
                    {index < timeline.length - 1 && (
                      <div
                        className={cn(
                          'min-h-5 w-0.5 flex-1',
                          item.done ? 'bg-secondary' : 'bg-border',
                        )}
                      />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p
                      className={cn('text-sm font-semibold', !item.done && 'text-muted-foreground')}
                    >
                      {item.title}
                    </p>
                    {item.detail && <p className="text-muted-foreground text-sm">{item.detail}</p>}
                    <p className="text-muted-foreground mt-1 text-xs">{item.time}</p>
                  </div>
                </div>
              ))}
              <div className="flex gap-2 pt-2">
                <Input placeholder="Thêm ghi chú tương tác…" className="flex-1" />
                <Button variant="outline" size="sm">
                  <Plus />
                  Thêm
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <SheetFooter className="flex-row gap-2 border-t px-4 py-4">
          <Button variant="outline">
            <Phone />
            Gọi
          </Button>
          <Button variant="outline">
            <ClipboardList />
            Tạo báo giá
          </Button>
          <Button className="flex-1" onClick={onConvert}>
            <Check />
            Chuyển thành KH
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
