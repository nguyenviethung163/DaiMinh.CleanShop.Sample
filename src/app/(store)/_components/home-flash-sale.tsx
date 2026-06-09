import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';
import { StoreContainer } from '@/store/components/store-container';

const COUNTDOWN = [
  ['11', 'GIỜ'],
  ['42', 'PHÚT'],
  ['08', 'GIÂY'],
] as const;

export function HomeFlashSale() {
  return (
    <StoreContainer className="pt-4">
      <div className="from-orange-deep via-orange flex flex-col gap-3 rounded-lg bg-gradient-to-r to-[#ff9a4a] p-4 text-white sm:flex-row sm:items-center sm:gap-6">
        <div className="inline-flex items-center gap-2.5 text-xl font-black sm:text-[22px]">
          <Zap className="shrink-0" size={26} strokeWidth={0} fill="#fff" aria-hidden="true" />
          FLASH SALE
        </div>
        <div className="text-base opacity-90">Kết thúc sau</div>
        <div className="flex gap-2">
          {COUNTDOWN.map(([n, u]) => (
            <div
              key={u}
              className="grid min-w-[50px] place-items-center rounded bg-black/25 px-2.5 py-1 text-center"
            >
              <div className="text-lg leading-none font-extrabold">{n}</div>
              <div className="text-[9px] tracking-[0.08em] opacity-80">{u}</div>
            </div>
          ))}
        </div>
        <Link
          href="/khuyen-mai"
          className="ml-0 flex items-center gap-2 font-bold text-white no-underline sm:ml-auto"
        >
          Xem tất cả khuyến mãi{' '}
          <ArrowRight
            className="shrink-0"
            size={16}
            strokeWidth={1.7}
            fill="none"
            aria-hidden="true"
          />
        </Link>
      </div>
    </StoreContainer>
  );
}
