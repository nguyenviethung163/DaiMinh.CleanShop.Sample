import type { ReactNode } from 'react';

export interface CheckoutSectionProps {
  step: number | string;
  title: string;
  right?: ReactNode;
  children: ReactNode;
}

export function CheckoutSection({ step, title, right, children }: CheckoutSectionProps) {
  return (
    <section className="overflow-hidden rounded-xl border bg-white">
      <div className="flex items-center gap-3 border border-b px-4 py-4 sm:px-5 sm:py-[18px]">
        <div className="bg-secondary grid h-7 w-7 shrink-0 place-items-center rounded-full text-[13px] font-extrabold text-white">
          {step}
        </div>
        <h3 className="text-secondary m-0 text-[17px] font-extrabold">{title}</h3>
        {right && <div className="ml-auto shrink-0">{right}</div>}
      </div>
      <div className="p-4 sm:p-5 md:p-6">{children}</div>
    </section>
  );
}
