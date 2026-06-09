import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getToneGradient } from '@/store/lib/tone-meta';
import { StoreSection, StoreSectionHead } from '@/store/components/store-section';

const PROMOS = [
  {
    tone: 'paint',
    sup: 'COMBO GIA ĐÌNH',
    title: 'Mua trọn bộ sơn nhà – tiết kiệm tới 1.500.000đ',
    sub: 'Sơn lót + nội thất + ngoại thất + chống thấm + bột trét',
    cta: 'Xem combo',
    big: true,
  },
  {
    tone: 'orange',
    sup: 'QUÀ TẶNG',
    title: 'Tặng rulo + cọ + băng dính khi mua từ 18L',
    sub: 'Áp dụng cho Dulux, Jotun, Nippon',
    cta: 'Nhận quà',
    big: false,
  },
  {
    tone: 'warm',
    sup: 'CÔNG TRÌNH',
    title: 'Chiết khấu 12% cho đơn từ 50.000.000đ',
    sub: 'Có công nợ linh hoạt cho nhà thầu',
    cta: 'Báo giá ngay',
    big: false,
  },
] as const;

export function HomePromoBanners() {
  return (
    <StoreSection noPaddingBottom>
      <StoreSectionHead
        title="Khuyến mãi & ưu đãi tháng 5"
        action={
          <Link
            href="/khuyen-mai"
            className="text-primary inline-flex items-center gap-1.5 text-sm font-bold no-underline"
          >
            Xem tất cả ưu đãi{' '}
            <ArrowRight
              className="shrink-0"
              size={12}
              strokeWidth={1.7}
              fill="none"
              aria-hidden="true"
            />
          </Link>
        }
      />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        {PROMOS.map((b, i) => (
          <Link
            key={i}
            href="/khuyen-mai"
            className="relative block min-h-[220px] overflow-hidden rounded-[10px] no-underline md:min-h-[280px]"
          >
            <div
              className={cn('relative overflow-hidden', 'absolute inset-0 h-full w-full')}
              style={{ background: getToneGradient(b.tone) }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(45deg, rgba(255,255,255,.06) 0 2px, transparent 2px 14px)',
                }}
              />
            </div>
            <div
              className="absolute inset-0 flex flex-col justify-between text-white"
              style={{
                background: b.big
                  ? 'linear-gradient(95deg, rgba(11,42,91,.85) 0%, rgba(11,42,91,.4) 60%, transparent 100%)'
                  : 'linear-gradient(160deg, rgba(0,0,0,.55) 0%, rgba(0,0,0,.15) 65%)',
                padding: b.big ? '32px 36px' : 22,
              }}
            >
              <div>
                <div className="text-primary text-xs font-bold tracking-[0.14em]">{b.sup}</div>
                <div
                  className="mt-2 leading-[1.15] font-extrabold"
                  style={{ fontSize: b.big ? 28 : 20, maxWidth: b.big ? 360 : '100%' }}
                >
                  {b.title}
                </div>
                <div className="mt-2 text-sm opacity-85">{b.sub}</div>
              </div>
              <span className="bg-primary inline-flex items-center gap-2 self-start rounded-md px-[18px] py-2.5 text-[13px] font-bold text-white shadow-[0_8px_22px_rgba(242,107,31,0.35)]">
                {b.cta}{' '}
                <ArrowRight
                  className="shrink-0"
                  size={14}
                  strokeWidth={1.7}
                  fill="none"
                  aria-hidden="true"
                />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </StoreSection>
  );
}
