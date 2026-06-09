'use client';

import { useMemo, useState } from 'react';
import { ADB } from '@/lib/data';
import { ConvertLeadDialog } from './convert-lead-dialog';
import { FailLeadDialog } from './fail-lead-dialog';
import { LeadDetailSheet } from './lead-detail-sheet';
import { LeadFormDialog } from './lead-form-dialog';
import { LeadsHeader } from './leads-header';
import { LeadsKanban } from './leads-kanban';
import { LeadsSummary } from './leads-summary';
import { LeadsTable } from './leads-table';

type Lead = (typeof ADB.LEADS)[number];

export function LeadsView() {
  const [view, setView] = useState<'kanban' | 'table'>('kanban');
  const [detail, setDetail] = useState<Lead | null>(null);
  const [creating, setCreating] = useState(false);
  const [convertTarget, setConvertTarget] = useState<Lead | null>(null);
  const [failTarget, setFailTarget] = useState<Lead | null>(null);

  const stats = useMemo(() => {
    const pipelineValue = ADB.LEADS.filter(
      (lead) => lead.status !== 'lost' && lead.status !== 'won',
    ).reduce((sum, lead) => sum + lead.value, 0);
    const wonCount = ADB.LEADS.filter((lead) => lead.status === 'won').length;
    const openCount = ADB.LEADS.filter(
      (lead) => lead.status !== 'won' && lead.status !== 'lost',
    ).length;
    const convRate = Math.round((wonCount / ADB.LEADS.length) * 100);

    return { pipelineValue, wonCount, openCount, convRate };
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <LeadsHeader
        pipelineValue={stats.pipelineValue}
        convRate={stats.convRate}
        view={view}
        onViewChange={setView}
        onCreate={() => setCreating(true)}
      />
      <LeadsSummary
        openCount={stats.openCount}
        pipelineValue={stats.pipelineValue}
        wonCount={stats.wonCount}
        convRate={stats.convRate}
      />

      {view === 'kanban' ? (
        <LeadsKanban onSelect={setDetail} />
      ) : (
        <LeadsTable onRowClick={setDetail} onConvert={setConvertTarget} onDelete={setFailTarget} />
      )}

      <LeadDetailSheet
        lead={detail}
        onClose={() => setDetail(null)}
        onConvert={() => {
          if (detail) setConvertTarget(detail);
          setDetail(null);
        }}
      />
      <LeadFormDialog open={creating} onClose={() => setCreating(false)} />
      <ConvertLeadDialog lead={convertTarget} onClose={() => setConvertTarget(null)} />
      <FailLeadDialog lead={failTarget} onClose={() => setFailTarget(null)} />
    </div>
  );
}
