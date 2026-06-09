import { Check, ChevronDown, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { StoreStars } from '@/store/components/store-stars';

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-b py-4">
      <div className="text-foreground mb-3 flex items-center justify-between text-base font-bold">
        <span>{title}</span>
        <ChevronDown
          className="shrink-0"
          size={14}
          strokeWidth={1.7}
          fill="none"
          aria-hidden="true"
          style={{ transform: 'rotate(180deg)', color: 'var(--color-muted)' }}
        />
      </div>
      {children}
    </div>
  );
}

function FilterCheck({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full cursor-pointer items-center gap-2 py-1.5 text-left"
    >
      <div
        className={cn(
          'grid h-4 w-4 shrink-0 place-items-center rounded border-[1.5px]',
          active ? 'border-orange bg-primary' : 'border bg-white',
        )}
      >
        {active && (
          <Check
            className="shrink-0"
            size={11}
            strokeWidth={3}
            fill="none"
            aria-hidden="true"
            style={{ color: '#fff' }}
          />
        )}
      </div>
      <span
        className={cn(
          'min-w-0 flex-1 text-sm',
          active ? 'text-foreground font-semibold' : 'text-muted-foreground',
        )}
      >
        {label}
      </span>
      <span className="text-muted-foreground text-xs">({count})</span>
    </button>
  );
}

export interface CatalogFilterPanelProps {
  onApply?: () => void;
  showHeader?: boolean;
}

export function CatalogFilterPanel({ onApply, showHeader = true }: CatalogFilterPanelProps) {
  return (
    <>
      {showHeader && (
        <div className="flex items-center justify-between border border-b py-3.5">
          <div className="text-secondary inline-flex items-center gap-2 text-base font-extrabold">
            <LayoutGrid
              className="shrink-0"
              size={16}
              strokeWidth={1.7}
              fill="none"
              aria-hidden="true"
            />
            Bộ lọc
          </div>
          <button type="button" className="text-primary cursor-pointer text-xs font-bold">
            Đặt lại
          </button>
        </div>
      )}

      <FilterGroup title="Danh mục">
        {(
          [
            ['Sơn nội thất', 248, true],
            ['Sơn ngoại thất', 184],
            ['Sơn chống thấm', 96],
            ['Sơn lót', 64],
            ['Bột trét', 38],
            ['Sơn kinh tế', 112],
          ] as const
        ).map(([label, count, active]) => (
          <FilterCheck key={label} label={label} count={count} active={!!active} />
        ))}
      </FilterGroup>

      <FilterGroup title="Thương hiệu">
        {(
          [
            ['Dulux', 64, true],
            ['Jotun', 52, true],
            ['Nippon', 48],
            ['Kova', 36],
            ['Mykolor', 24],
            ['Spec', 18],
            ['Maxilite', 14],
          ] as const
        ).map(([label, count, active]) => (
          <FilterCheck key={label} label={label} count={count} active={!!active} />
        ))}
        <button type="button" className="text-primary mt-2 cursor-pointer text-sm font-semibold">
          + Xem thêm 11 thương hiệu
        </button>
      </FilterGroup>

      <FilterGroup title="Khoảng giá">
        <div className="mb-3 flex gap-2">
          <input
            placeholder="Từ"
            className="w-full rounded border px-2.5 py-2 text-xs outline-none"
          />
          <input
            placeholder="Đến"
            className="w-full rounded border px-2.5 py-2 text-xs outline-none"
          />
        </div>
        {(
          [
            ['Dưới 500.000đ', 32],
            ['500.000đ – 1.500.000đ', 78],
            ['1.500.000đ – 3.000.000đ', 96],
            ['3.000.000đ – 5.000.000đ', 54],
            ['Trên 5.000.000đ', 28],
          ] as const
        ).map(([label, count]) => (
          <FilterCheck key={label} label={label} count={count} />
        ))}
      </FilterGroup>

      <FilterGroup title="Dung tích">
        <div className="flex flex-wrap gap-2">
          {['1L', '5L', '10L', '17L', '18L', '20kg'].map((v, i) => (
            <span
              key={v}
              className={cn(
                'cursor-pointer rounded border px-2.5 py-1.5 text-xs font-semibold',
                i === 4
                  ? 'border-orange bg-primary/10 text-primary'
                  : 'text-muted-foreground border bg-white',
              )}
            >
              {v}
            </span>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Đánh giá">
        {[5, 4, 3].map((r) => (
          <button
            key={r}
            type="button"
            className="flex w-full cursor-pointer items-center gap-2 py-1.5"
          >
            <StoreStars n={r} size={12} />
            <span className="text-muted-foreground text-xs">từ {r} sao</span>
          </button>
        ))}
      </FilterGroup>

      <Button
        variant="default"
        size="sm"
        className={cn('gap-2 font-bold', 'my-3.5 w-full')}
        onClick={onApply}
      >
        Áp dụng (248 sản phẩm)
      </Button>
    </>
  );
}
