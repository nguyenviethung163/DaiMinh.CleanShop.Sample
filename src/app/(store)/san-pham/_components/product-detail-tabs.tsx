'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { StoreProduct } from '@/store/components/product-card';
import { StoreStars } from '@/store/components/store-stars';

type TabKey = 'desc' | 'spec' | 'review';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'desc', label: 'Mô tả' },
  { key: 'spec', label: 'Thông số' },
  { key: 'review', label: 'Đánh giá (2.105)' },
];

export interface ProductDetailTabsProps {
  product: StoreProduct;
  volume?: string;
}

export function ProductDetailTabs({ product: p, volume = '18L' }: ProductDetailTabsProps) {
  const [tab, setTab] = useState<TabKey>('desc');

  return (
    <div className="mt-6 overflow-hidden rounded-[10px] border bg-white">
      <div className="flex gap-0.5 border border-b px-4">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={cn(
              'text-muted-foreground -mb-px cursor-pointer border-b-[2.5px] border-transparent px-4 py-3 text-base font-semibold',
              tab === key && 'border-b-orange text-foreground font-extrabold',
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="p-6">
        {tab === 'desc' && (
          <p className="text-muted-foreground m-0 text-[15px] leading-[1.8]">
            {p.name} là dòng sơn {p.cat.toLowerCase()} cao cấp của {p.brand}, mang lại độ bền màu
            vượt trội, khả năng kháng khuẩn và chống thấm hiệu quả. Bề mặt mịn màng, dễ thi công, an
            toàn cho sức khỏe người dùng, phù hợp cho cả công trình dân dụng và dự án quy mô lớn.
          </p>
        )}

        {tab === 'spec' && (
          <table className="w-full border-collapse text-base">
            <tbody>
              {(
                [
                  ['Thương hiệu', p.brand],
                  ['Loại sơn', p.cat],
                  ['Dung tích', volume],
                  ['Định mức', '10–12 m²/L/2 lớp'],
                  ['Bảo hành', '15 năm'],
                  ['Xuất xứ', 'Chính hãng'],
                ] as const
              ).map(([k, v]) => (
                <tr key={k}>
                  <td className="text-foreground w-[180px] border border-b py-3 font-semibold">
                    {k}
                  </td>
                  <td className="text-muted-foreground border border-b py-3">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {tab === 'review' && (
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <div className="text-center">
              <div className="text-primary text-[40px] font-black">{p.rating}</div>
              <StoreStars n={p.rating} size={14} />
              <div className="text-muted-foreground mt-1 text-xs">2.105 đánh giá</div>
            </div>
            <div className="text-muted-foreground min-w-0 flex-1">
              Khách hàng đánh giá cao độ phủ, màu lên chuẩn và độ bền của sản phẩm. 96% khách sẽ
              giới thiệu cho bạn bè.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
