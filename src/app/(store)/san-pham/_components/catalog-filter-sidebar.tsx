import { CatalogFilterPanel } from './catalog-filter-panel';

export function CatalogFilterSidebar() {
  return (
    <aside className="sticky top-40 hidden self-start rounded-lg border bg-white px-4 lg:block">
      <CatalogFilterPanel />
    </aside>
  );
}
