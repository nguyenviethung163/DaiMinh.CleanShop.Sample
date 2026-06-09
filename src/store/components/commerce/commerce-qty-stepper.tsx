import { cn } from '@/lib/utils';

export interface CommerceQtyStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  className?: string;
}

export function CommerceQtyStepper({
  value,
  onChange,
  min = 1,
  className,
}: CommerceQtyStepperProps) {
  return (
    <div className={cn('inline-flex items-center overflow-hidden rounded-md border', className)}>
      <button
        type="button"
        aria-label="Giảm số lượng"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="text-muted-foreground grid h-[30px] w-[30px] place-items-center text-base"
      >
        −
      </button>
      <div className="grid h-[30px] w-9 place-items-center border border-x text-[13px] font-bold">
        {value}
      </div>
      <button
        type="button"
        aria-label="Tăng số lượng"
        onClick={() => onChange(value + 1)}
        className="text-primary grid h-[30px] w-[30px] place-items-center text-base"
      >
        +
      </button>
    </div>
  );
}
