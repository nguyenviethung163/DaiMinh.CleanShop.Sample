import { COUNTDOWN_LABELS } from '../_lib/promotions-data';

export interface PromoCountdownProps {
  values: [string, string, string, string];
  label?: string;
}

export function PromoCountdown({ values, label = 'Kết thúc sau' }: PromoCountdownProps) {
  if (values[2] === '') {
    return (
      <div className="rounded bg-white/15 px-2.5 py-1.5 text-sm font-bold tracking-wide">
        {values[0]} {values[1]}
      </div>
    );
  }

  const segments = values.filter(Boolean);

  return (
    <div>
      <div className="mb-1.5 text-xs opacity-70">{label}</div>
      <div className="flex gap-1">
        {segments.map((value, index) => (
          <div
            key={COUNTDOWN_LABELS[index]}
            className="min-w-[50px] rounded bg-black/30 px-2.5 py-1.5 text-center"
          >
            <div className="text-lg leading-none font-extrabold">{value}</div>
            <div className="mt-0.5 text-[8.5px] tracking-[0.08em] opacity-80">
              {COUNTDOWN_LABELS[index]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
