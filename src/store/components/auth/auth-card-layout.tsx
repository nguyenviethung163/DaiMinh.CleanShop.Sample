import type { ReactNode } from 'react';
import { StoreContainer } from '../store-container';
import { AuthBenefitsPanel } from './auth-benefits-panel';

export interface AuthCardLayoutProps {
  children: ReactNode;
}

export function AuthCardLayout({ children }: AuthCardLayoutProps) {
  return (
    <StoreContainer className="py-8 md:py-12">
      <div className="mx-auto max-w-[960px] overflow-hidden rounded-2xl border bg-white shadow-[0_20px_50px_rgba(11,42,91,0.08)]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr]">
          <div className="p-6 sm:p-8 lg:p-10">{children}</div>
          <div className="hidden lg:block">
            <AuthBenefitsPanel />
          </div>
        </div>
      </div>
    </StoreContainer>
  );
}
