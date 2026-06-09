'use client';

import { Target } from 'lucide-react';
import { ADB } from '@/lib/data';
import { getLeadScoreClass, KANBAN_COLUMNS } from '../_lib/lead-status';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type Lead = (typeof ADB.LEADS)[number];

type LeadsKanbanProps = {
  onSelect: (lead: Lead) => void;
};

export function LeadsKanban({ onSelect }: LeadsKanbanProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {KANBAN_COLUMNS.map((column) => {
        const items = ADB.LEADS.filter((lead) => lead.status === column.key);
        const sum = items.reduce((total, lead) => total + lead.value, 0);

        return (
          <Card
            key={column.key}
            className={cn('gap-0 overflow-hidden border-t-4 py-0', column.borderClass)}
          >
            <CardHeader className="border-b px-4 py-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{column.title}</CardTitle>
                <Badge variant="secondary">{items.length}</Badge>
              </div>
              <p className="text-muted-foreground text-xs">{(sum / 1e6).toFixed(0)}tr đ</p>
            </CardHeader>
            <CardContent className="flex min-h-20 flex-col gap-3 p-3">
              {items.map((lead) => (
                <button
                  key={lead.id}
                  type="button"
                  className="bg-card hover:bg-accent/50 rounded-lg border p-3 text-left transition-colors"
                  onClick={() => onSelect(lead)}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-secondary font-mono text-xs font-semibold">
                      {lead.id}
                    </span>
                    <span
                      className={cn(
                        'inline-flex items-center gap-1 text-xs font-bold',
                        getLeadScoreClass(lead.score),
                      )}
                    >
                      <Target className="size-3" />
                      {lead.score}
                    </span>
                  </div>
                  <p className="text-sm font-semibold">{lead.need}</p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    {lead.name} · {lead.city}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-primary font-bold">
                      {(lead.value / 1e6).toFixed(0)}tr
                    </span>
                    <Badge variant="outline">{lead.source}</Badge>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
