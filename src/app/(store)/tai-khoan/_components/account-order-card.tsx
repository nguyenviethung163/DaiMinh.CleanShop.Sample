import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getToneGradient } from '@/store/lib/tone-meta';
import { formatVND, orderStatusClasses, type Order } from '@/store/lib/commerce-data';

export interface AccountOrderCardProps {
  order: Order;
}

export function AccountOrderCard({ order }: AccountOrderCardProps) {
  return (
    <article className="overflow-hidden rounded-xl border bg-white">
      <div className="bg-muted flex flex-wrap items-center justify-between gap-2 border border-b px-4 py-3.5 sm:px-[18px]">
        <div className="flex items-center gap-3">
          <span className="text-secondary font-mono font-bold">{order.id}</span>
          <span className="text-muted-foreground text-xs">{order.date}</span>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${orderStatusClasses(order.status)}`}
        >
          {order.status}
        </span>
      </div>

      <div className="p-4">
        <div className="mb-3 flex gap-2">
          {order.products.map((product, index) => (
            <div
              key={index}
              className={cn('relative overflow-hidden', 'h-[52px] w-[52px] shrink-0 rounded-md')}
              style={{ background: getToneGradient(product.tone ?? 'navy') }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(45deg, rgba(255,255,255,.06) 0 2px, transparent 2px 14px)',
                }}
              />
            </div>
          ))}
          {order.items > order.products.length && (
            <div className="bg-muted text-muted-foreground grid h-[52px] w-[52px] shrink-0 place-items-center rounded-md text-xs font-bold">
              +{order.items - order.products.length}
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-muted-foreground text-sm">
            {order.items} sản phẩm · Tổng{' '}
            <b className="text-foreground text-base">{formatVND(order.total)}</b>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              className={cn('gap-2 font-bold', 'border-secondary text-secondary hover:bg-muted')}
            >
              Xem chi tiết
            </Button>
            {order.status === 'Đã giao' && (
              <Button variant="default" size="sm" className={cn('gap-2 font-bold')}>
                Mua lại
              </Button>
            )}
            {order.status === 'Đang giao' && (
              <Button variant="secondary" size="sm" className={cn('gap-2 font-bold')}>
                Theo dõi
              </Button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
