'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { CAMPAIGNS } from '../_lib/promotion-meta';

export function CampaignsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
      {CAMPAIGNS.map((campaign) => (
        <Card key={campaign.sup} className="overflow-hidden py-0">
          <CardContent className="flex p-0">
            <div className={cn('w-32 shrink-0', campaign.toneClass)} />
            <div className="min-w-0 flex-1 p-4">
              <div className="flex items-start justify-between gap-2">
                <span className="text-primary text-xs font-bold tracking-widest">
                  {campaign.sup}
                </span>
                <Badge variant={campaign.statusVariant}>{campaign.statusLabel}</Badge>
              </div>
              <p className="mt-2 mb-3 text-base leading-snug font-semibold">{campaign.title}</p>
              <div className="flex gap-5">
                <div>
                  <p className="text-muted-foreground text-xs">Lượt mua</p>
                  <p className="text-lg font-bold">{campaign.sold}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Doanh thu</p>
                  <p className="text-primary text-lg font-bold">{campaign.rev}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
