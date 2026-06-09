'use client';

import { useMemo, useState } from 'react';
import { ADB } from '@/lib/data';
import type { Product } from '../_lib/product-meta';
import { DeleteProductDialog } from './delete-product-dialog';
import { ProductFormDialog } from './product-form-dialog';
import { ProductsGrid } from './products-grid';
import { ProductsHeader } from './products-header';
import { ProductsTable } from './products-table';

export function ProductsView() {
  const [view, setView] = useState<'table' | 'grid'>('table');
  const [brand, setBrand] = useState('Tất cả');
  const [selected, setSelected] = useState<string[]>([]);
  const [editing, setEditing] = useState<Product | 'new' | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  const rows = useMemo(
    () =>
      brand === 'Tất cả'
        ? (ADB.PRODUCTS as Product[])
        : (ADB.PRODUCTS.filter((p) => p.brand === brand) as Product[]),
    [brand],
  );

  const toggle = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <div className="flex flex-col gap-6">
      <ProductsHeader onCreate={() => setEditing('new')} />
      <ProductsTable
        rows={rows}
        selected={selected}
        brand={brand}
        brands={ADB.brands}
        onBrandChange={setBrand}
        onToggle={toggle}
        onToggleAll={(checked) => setSelected(checked ? rows.map((r) => r.id) : [])}
        onRowClick={setEditing}
        onEdit={setEditing}
        onDelete={setDeleteTarget}
        view={view}
        onViewChange={setView}
        gridSlot={<ProductsGrid rows={rows} onSelect={setEditing} />}
      />

      <ProductFormDialog product={editing} onClose={() => setEditing(null)} />
      <DeleteProductDialog product={deleteTarget} onClose={() => setDeleteTarget(null)} />
    </div>
  );
}
