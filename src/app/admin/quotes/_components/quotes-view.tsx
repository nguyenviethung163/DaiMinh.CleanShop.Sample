'use client';

import { useMemo, useState } from 'react';
import { ADB } from '@/lib/data';
import { DeleteQuoteDialog } from './delete-quote-dialog';
import { QuoteDetailSheet } from './quote-detail-sheet';
import { QuoteFormDialog } from './quote-form-dialog';
import { QuotesHeader } from './quotes-header';
import { QuotesKanban } from './quotes-kanban';
import { QuotesSummary } from './quotes-summary';
import { QuotesTable } from './quotes-table';

type Quote = (typeof ADB.QUOTES)[number];

export function QuotesView() {
  const [view, setView] = useState<'kanban' | 'table'>('kanban');
  const [detail, setDetail] = useState<Quote | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Quote | null>(null);

  const stats = useMemo(() => {
    const pipelineValue = ADB.QUOTES.filter(
      (quote) => quote.status !== 'lost' && quote.status !== 'won',
    ).reduce((sum, quote) => sum + quote.value, 0);
    const openCount = ADB.QUOTES.filter(
      (quote) => quote.status !== 'won' && quote.status !== 'lost',
    ).length;
    const wonQuotes = ADB.QUOTES.filter((quote) => quote.status === 'won');
    const wonValue = wonQuotes.reduce((sum, quote) => sum + quote.value, 0);

    return { pipelineValue, openCount, wonCount: wonQuotes.length, wonValue };
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <QuotesHeader
        pipelineValue={stats.pipelineValue}
        view={view}
        onViewChange={setView}
        onCreate={() => setCreating(true)}
      />
      <QuotesSummary
        pipelineValue={stats.pipelineValue}
        openCount={stats.openCount}
        wonCount={stats.wonCount}
        wonValue={stats.wonValue}
      />

      {view === 'kanban' ? (
        <QuotesKanban onSelect={setDetail} />
      ) : (
        <QuotesTable onRowClick={setDetail} onDelete={setDeleteTarget} />
      )}

      <QuoteDetailSheet quote={detail} onClose={() => setDetail(null)} />
      <QuoteFormDialog open={creating} onClose={() => setCreating(false)} />
      <DeleteQuoteDialog quote={deleteTarget} onClose={() => setDeleteTarget(null)} />
    </div>
  );
}
