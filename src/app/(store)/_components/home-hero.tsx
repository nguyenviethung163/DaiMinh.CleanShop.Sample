import Link from 'next/link';
import { ArrowRight, Check, Palette, Sparkles, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getToneGradient } from '@/store/lib/tone-meta';
import { StoreContainer } from '@/store/components/store-container';
import { CategoryStrip } from './category-strip';

const HERO_BANNERS = [
  {
    tone: 'orange',
    sup: 'FLASH SALE',
    title: 'Giảm tới 25%',
    sub: 'Dulux EasyClean 18L',
    tag: '-25%',
  },
  { tone: 'sage', sup: 'MUA 2 TẶNG 1', title: 'Combo nội thất', sub: 'Sơn lót + Bột trét' },
  { tone: 'sky', sup: 'MIỄN PHÍ', title: 'Giao 2 giờ', sub: 'Đơn từ 2.000.000đ' },
  { tone: 'warm', sup: 'TƯ VẤN', title: 'Phối màu miễn phí', sub: 'Đặt lịch chuyên gia' },
];

export function HomeHero() {
  return (
    <div className="border border-b bg-white">
      <StoreContainer className="grid grid-cols-1 gap-4 py-4 lg:grid-cols-[230px_minmax(0,1fr)]">
        <CategoryStrip />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1.45fr_1fr_1fr] lg:grid-rows-2">
          {/* Main hero */}
          <div className="from-navy to-navy-soft relative flex min-h-[280px] flex-col justify-center overflow-hidden rounded-lg bg-gradient-to-br from-48% p-6 text-white sm:min-h-[320px] sm:p-8 lg:col-span-1 lg:row-span-2 lg:min-h-[380px]">
            <div
              className="pointer-events-none absolute -top-10 -right-10 h-[220px] w-[220px] rounded-full opacity-35"
              style={{
                background:
                  'radial-gradient(circle at 30% 30%, var(--primary) 0%, transparent 60%)',
              }}
            />

            <div className="relative z-10 inline-flex items-center gap-2 self-start rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold">
              <Sparkles
                className="shrink-0"
                size={13}
                strokeWidth={1.7}
                fill="none"
                aria-hidden="true"
              />
              Đại lý cấp 1 chính hãng từ 2008
            </div>

            <div className="relative z-10 mt-3 max-w-[460px]">
              <div className="text-primary mb-2.5 text-[13px] font-bold tracking-[0.18em] uppercase">
                Sơn Đại Minh × Dulux × Jotun × Nippon × Kova
              </div>
              <h1 className="m-0 max-w-[480px] text-3xl leading-[1.08] font-extrabold tracking-[-0.02em] sm:text-4xl lg:text-[40px]">
                Sơn Chính Hãng
                <br />
                <span className="text-primary">Giá Tốt</span> Cho Mọi Công Trình
              </h1>
              <p className="mt-3 mb-5 max-w-[380px] text-[15px] leading-[1.55] text-white/85">
                Hơn 18 năm phân phối sơn chính hãng các thương hiệu hàng đầu. Tư vấn phối màu miễn
                phí, giao hàng tận công trình trong 2 giờ.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="default" className="gap-2 font-bold">
                  <Link href="/san-pham">
                    Xem sản phẩm{' '}
                    <ArrowRight
                      className="shrink-0"
                      size={16}
                      strokeWidth={1.7}
                      fill="none"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  className={cn(
                    'gap-2 font-bold',
                    'border border-white/40 bg-white/10 text-white hover:bg-white/15 hover:text-white',
                  )}
                >
                  <Link href="/lien-he">Nhận tư vấn miễn phí</Link>
                </Button>
              </div>
            </div>

            <div className="relative z-10 mt-6 flex flex-wrap gap-6 border-t border-white/15 pt-3.5 text-xs text-white/80">
              <span className="inline-flex items-center gap-2">
                <Check
                  className="shrink-0"
                  size={14}
                  strokeWidth={1.7}
                  fill="none"
                  aria-hidden="true"
                />{' '}
                100% chính hãng
              </span>
              <span className="inline-flex items-center gap-2">
                <Truck
                  className="shrink-0"
                  size={14}
                  strokeWidth={1.7}
                  fill="none"
                  aria-hidden="true"
                />{' '}
                Giao 2 giờ
              </span>
              <span className="inline-flex items-center gap-2">
                <Palette
                  className="shrink-0"
                  size={14}
                  strokeWidth={1.7}
                  fill="none"
                  aria-hidden="true"
                />{' '}
                Tư vấn miễn phí
              </span>
            </div>
          </div>

          {/* Side banners */}
          {HERO_BANNERS.map((b, i) => (
            <Link
              key={i}
              href="/khuyen-mai"
              className="relative block min-h-[140px] overflow-hidden rounded-lg no-underline sm:min-h-[184px]"
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
              <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-b from-black/40 to-black/5 p-3.5 text-white">
                <div>
                  <div className="text-[10px] font-bold tracking-[0.12em] opacity-90">{b.sup}</div>
                  <div className="mt-1 text-lg font-extrabold">{b.title}</div>
                  <div className="mt-0.5 text-xs opacity-85">{b.sub}</div>
                </div>
                {b.tag && (
                  <div className="bg-primary self-end rounded px-2.5 py-1 text-[13px] font-extrabold text-white">
                    {b.tag}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </StoreContainer>
    </div>
  );
}
