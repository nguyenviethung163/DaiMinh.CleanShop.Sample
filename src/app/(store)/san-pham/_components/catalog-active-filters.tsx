const ACTIVE = ['Sơn nội thất', 'Dulux', 'Jotun', '18L'] as const;

export function CatalogActiveFilters() {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      <span className="text-muted-foreground text-xs">Lọc:</span>
      {ACTIVE.map((c) => (
        <span
          key={c}
          className="bg-primary/10 text-primary inline-flex cursor-pointer items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold"
        >
          {c}
          <span className="opacity-70">×</span>
        </span>
      ))}
      <button type="button" className="text-primary ml-1 cursor-pointer text-xs font-bold">
        Xóa tất cả
      </button>
    </div>
  );
}
