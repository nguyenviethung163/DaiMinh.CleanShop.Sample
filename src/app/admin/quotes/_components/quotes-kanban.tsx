'use client';

import { ADB } from '@/lib/data';
import { KANBAN_COLUMNS } from '../_lib/quote-status';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn, getInitials } from '@/lib/utils';

type Quote = (typeof ADB.QUOTES)[number];

type QuotesKanbanProps = {
  onSelect: (quote: Quote) => void;
};

export function QuotesKanban({ onSelect }: QuotesKanbanProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {KANBAN_COLUMNS.map((column) => {
        const items = ADB.QUOTES.filter((quote) => quote.status === column.key);
        const sum = items.reduce((total, quote) => total + quote.value, 0);

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
              {items.map((quote) => (
                <button
                  key={quote.id}
                  type="button"
                  className="bg-card hover:bg-accent/50 rounded-lg border p-3 text-left transition-colors"
                  onClick={() => onSelect(quote)}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-secondary font-mono text-xs font-semibold">
                      {quote.id}
                    </span>
                    <span className="text-muted-foreground text-xs">{quote.date}</span>
                  </div>
                  <p className="text-sm font-semibold">{quote.project}</p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    {quote.customer} · {quote.area}m²
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-primary font-bold">
                      {(quote.value / 1e6).toFixed(0)}tr
                    </span>
                    <Avatar size="sm">
                      <AvatarFallback className="text-[10px]">
                        {getInitials(quote.assignee)}
                      </AvatarFallback>
                    </Avatar>
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
