'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface StoreSearchBarProps {
  className?: string;
  defaultQuery?: string;
}

export function StoreSearchBar({ className, defaultQuery = '' }: StoreSearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultQuery);

  useEffect(() => {
    setQuery(defaultQuery);
  }, [defaultQuery]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    router.push(trimmed ? `/tim-kiem?q=${encodeURIComponent(trimmed)}` : '/tim-kiem');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('border-orange flex w-full overflow-hidden rounded-md border-2', className)}
    >
      <input
        type="search"
        name="q"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Tìm kiếm sản phẩm, thương hiệu, mã sản phẩm…"
        className="text-foreground min-w-0 flex-1 border-0 px-3.5 py-2.5 text-sm outline-none"
      />
      <button
        type="submit"
        className="bg-primary inline-flex shrink-0 items-center justify-center gap-1.5 px-3 font-bold text-white md:px-5"
      >
        <Search className="shrink-0" size={16} strokeWidth={1.7} aria-hidden="true" />
        <span className="hidden md:inline">Tìm kiếm</span>
      </button>
    </form>
  );
}
