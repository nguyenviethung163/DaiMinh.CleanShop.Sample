import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StoreContainer } from '@/store/components/store-container';
import { CHECKOUT_STEPS } from '@/store/lib/commerce-data';

export interface CheckoutStepperProps {
  currentStep?: number;
}

export function CheckoutStepper({ currentStep = 2 }: CheckoutStepperProps) {
  return (
    <div className="border border-b bg-white">
      <StoreContainer className="flex max-w-[1040px] [scrollbar-width:none] items-center overflow-x-auto px-4 py-5 [-ms-overflow-style:none] sm:px-6 [&::-webkit-scrollbar]:hidden">
        {CHECKOUT_STEPS.map((label, index) => {
          const step = index + 1;
          const done = step < currentStep;
          const current = step === currentStep;

          return (
            <div key={label} className="flex min-w-0 flex-1 items-center">
              <div className="flex shrink-0 items-center gap-2">
                <div
                  className={cn(
                    'grid h-8 w-8 place-items-center rounded-full text-[13px] font-extrabold',
                    done && 'bg-success text-white',
                    current && 'bg-primary text-white',
                    !done && !current && 'bg-border text-muted-foreground',
                  )}
                >
                  {done ? (
                    <Check
                      className="shrink-0"
                      size={15}
                      strokeWidth={3}
                      fill="none"
                      aria-hidden="true"
                    />
                  ) : (
                    step
                  )}
                </div>
                <div className="hidden sm:block">
                  <div className="text-muted-foreground text-xs font-semibold">BƯỚC {step}</div>
                  <div
                    className={cn(
                      'text-base',
                      current && 'text-primary font-extrabold',
                      done && 'text-foreground font-semibold',
                      !done && !current && 'text-muted-foreground font-semibold',
                    )}
                  >
                    {label}
                  </div>
                </div>
              </div>
              {index < CHECKOUT_STEPS.length - 1 && (
                <div
                  className={cn(
                    'mx-3 hidden h-0.5 flex-1 sm:block',
                    index < currentStep - 1 ? 'bg-success' : 'bg-border',
                  )}
                />
              )}
            </div>
          );
        })}
      </StoreContainer>
    </div>
  );
}
