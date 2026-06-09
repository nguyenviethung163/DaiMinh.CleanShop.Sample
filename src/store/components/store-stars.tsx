import { Star } from 'lucide-react';

export interface StoreStarsProps {
  n: number;
  size?: number;
}

export function StoreStars({ n, size = 12 }: StoreStarsProps) {
  const rounded = Math.round(n);
  return (
    <span className="inline-flex gap-px" style={{ color: '#FFB300' }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className="shrink-0"
          size={size}
          strokeWidth={0}
          fill={i <= rounded ? '#FFB300' : '#e2e6ee'}
          style={{ color: i <= rounded ? '#FFB300' : '#e2e6ee' }}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}
