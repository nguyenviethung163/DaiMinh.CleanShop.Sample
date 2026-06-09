'use client';

import { useMemo, useState } from 'react';
import { ADB } from '@/lib/data';
import type { InventoryItem, InventoryTab, StockMove } from '../_lib/inventory-meta';
import { InventoryHeader } from './inventory-header';
import { InventorySummary } from './inventory-summary';
import { InventoryTable } from './inventory-table';
import { StockMoveDialog } from './stock-move-dialog';
import { StopTrackingDialog } from './stop-tracking-dialog';

export function InventoryView() {
  const [tab, setTab] = useState<InventoryTab>('stock');
  const [moveType, setMoveType] = useState<'in' | 'out' | null>(null);
  const [stopTarget, setStopTarget] = useState<InventoryItem | null>(null);

  const lowCount = useMemo(() => ADB.INVENTORY.filter((p) => p.onHand < p.reorder).length, []);

  const stockRows = useMemo(() => {
    const items = ADB.INVENTORY as InventoryItem[];
    if (tab === 'low') return items.filter((p) => p.onHand < p.reorder);
    return items;
  }, [tab]);

  const counts = useMemo(
    () => ({
      stock: ADB.INVENTORY.length,
      moves: ADB.STOCK_MOVES.length,
      low: lowCount,
    }),
    [lowCount],
  );

  return (
    <div className="flex flex-col gap-6">
      <InventoryHeader onStockIn={() => setMoveType('in')} onStockOut={() => setMoveType('out')} />
      <InventorySummary />
      <InventoryTable
        tab={tab}
        stockRows={stockRows}
        moveRows={ADB.STOCK_MOVES as StockMove[]}
        counts={counts}
        onTabChange={setTab}
        onStockIn={() => setMoveType('in')}
        onStockOut={() => setMoveType('out')}
        onStopTracking={setStopTarget}
      />

      <StockMoveDialog type={moveType} onClose={() => setMoveType(null)} />
      <StopTrackingDialog item={stopTarget} onClose={() => setStopTarget(null)} />
    </div>
  );
}
