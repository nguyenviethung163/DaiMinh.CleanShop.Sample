import { ArrowRight } from 'lucide-react';
import { PROMO_VOUCHERS } from '../_lib/promotions-data';
import { StoreSectionHead } from '@/store/components/store-section';
import { PromoVoucherCard } from './promo-voucher-card';

export function PromoVouchersSection() {
  return (
    <section className="mt-10">
      <StoreSectionHead
        title="Voucher đang có"
        action={
          <span className="text-primary inline-flex cursor-pointer items-center gap-1.5 text-sm font-bold">
            Xem tất cả 12 voucher{' '}
            <ArrowRight
              className="shrink-0"
              size={13}
              strokeWidth={1.7}
              fill="none"
              aria-hidden="true"
            />
          </span>
        }
        className="mb-4"
      />

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {PROMO_VOUCHERS.map((voucher) => (
          <PromoVoucherCard key={voucher.code} voucher={voucher} />
        ))}
      </div>
    </section>
  );
}
