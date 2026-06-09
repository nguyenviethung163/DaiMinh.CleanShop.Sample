'use client';

import { useMemo, useState } from 'react';
import { ADB } from '@/lib/data';
import type { ColorItem } from '../_lib/color-meta';
import { ColorDetailPanel } from './color-detail-panel';
import { ColorFormDialog } from './color-form-dialog';
import { ColorsGrid } from './colors-grid';
import { ColorsHeader } from './colors-header';
import { ColorsSummary } from './colors-summary';
import { DeleteColorDialog } from './delete-color-dialog';
import { RecipeDialog } from './recipe-dialog';

export function ColorsView() {
  const colors = ADB.COLORS as ColorItem[];
  const [tone, setTone] = useState('Tất cả');
  const [selected, setSelected] = useState<ColorItem>(colors[0]);
  const [recipeOpen, setRecipeOpen] = useState(false);
  const [editing, setEditing] = useState<ColorItem | 'new' | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ColorItem | null>(null);

  const rows = useMemo(
    () => (tone === 'Tất cả' ? colors : colors.filter((c) => c.tone === tone)),
    [colors, tone],
  );

  return (
    <div className="flex flex-col gap-6">
      <ColorsHeader onCreate={() => setEditing('new')} />
      <ColorsSummary />

      <div className="grid gap-4 lg:grid-cols-[1fr_380px]">
        <ColorsGrid
          rows={rows}
          selected={selected}
          tone={tone}
          onToneChange={setTone}
          onSelect={setSelected}
        />
        <ColorDetailPanel
          color={selected}
          onViewRecipe={() => setRecipeOpen(true)}
          onEdit={() => setEditing(selected)}
          onDelete={() => setDeleteTarget(selected)}
        />
      </div>

      <RecipeDialog color={recipeOpen ? selected : null} onClose={() => setRecipeOpen(false)} />
      <ColorFormDialog color={editing} onClose={() => setEditing(null)} />
      <DeleteColorDialog color={deleteTarget} onClose={() => setDeleteTarget(null)} />
    </div>
  );
}
