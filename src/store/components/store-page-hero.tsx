import Link from 'next/link';
import { StoreContainer } from './store-container';

export interface StorePageHeroProps {
  title: string;
  sub?: string;
  crumb?: string;
}

export function StorePageHero({ title, sub, crumb }: StorePageHeroProps) {
  return (
    <div className="from-navy to-navy-soft bg-gradient-to-br from-0% to-60% text-white">
      <StoreContainer className="py-8 md:py-9">
        <nav className="mb-2 text-xs opacity-70">
          <Link href="/" className="text-inherit no-underline hover:opacity-100">
            Trang chủ
          </Link>
          <span className="opacity-50"> / </span>
          {crumb || title}
        </nav>
        <h1 className="m-0 text-2xl font-extrabold tracking-[-0.02em] md:text-[32px]">{title}</h1>
        {sub && <p className="mt-2 max-w-xl text-[15px] opacity-85">{sub}</p>}
      </StoreContainer>
    </div>
  );
}
