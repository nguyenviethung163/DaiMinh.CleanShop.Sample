'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { getToneGradient } from '@/store/lib/tone-meta';

export interface ProductDetailGalleryProps {
  tone: string;
}

export function ProductDetailGallery({ tone }: ProductDetailGalleryProps) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div
        className={cn('relative overflow-hidden', 'aspect-square w-full rounded-lg')}
        style={{ background: getToneGradient(tone), aspectRatio: '1 / 1' }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, rgba(255,255,255,.06) 0 2px, transparent 2px 14px)',
          }}
        />
        <div className="absolute top-2.5 left-2.5 rounded bg-black/35 px-2 py-1 text-[10px] font-semibold tracking-[.04em] text-white/95 uppercase">
          Ảnh sản phẩm
        </div>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {[0, 1, 2, 3].map((i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            className={cn('overflow-hidden rounded-md', active === i && 'ring-orange ring-2')}
          >
            <div
              className={cn('relative overflow-hidden', 'w-full')}
              style={{ background: getToneGradient(tone), aspectRatio: '1 / 1' }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(45deg, rgba(255,255,255,.06) 0 2px, transparent 2px 14px)',
                }}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
