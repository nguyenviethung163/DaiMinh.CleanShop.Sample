import Link from 'next/link';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SearchPopularChips } from './search-popular-chips';

export interface SearchEmptyStateProps {
  query: string;
}

export function SearchEmptyState({ query }: SearchEmptyStateProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border bg-white px-6 py-10 text-center">
        <div className="bg-muted text-secondary mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl">
          <Search className="shrink-0" size={28} strokeWidth={1.7} fill="none" aria-hidden="true" />
        </div>
        <h2 className="text-secondary m-0 text-xl font-extrabold">Không tìm thấy kết quả</h2>
        <p className="text-muted-foreground mx-auto mt-2 max-w-md text-sm leading-relaxed">
          Không có sản phẩm nào khớp với <b className="text-foreground">&ldquo;{query}&rdquo;</b>.
          Thử từ khóa khác hoặc xem danh mục sản phẩm.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Button asChild variant="default" className={cn('gap-2 font-bold')}>
            <Link href="/san-pham">Xem tất cả sản phẩm</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className={cn('gap-2 font-bold', 'border-secondary text-secondary hover:bg-muted')}
          >
            <Link href="/lien-he">Nhờ tư vấn tìm sản phẩm</Link>
          </Button>
        </div>
        <p className="text-muted-foreground mt-4 text-xs">
          Hoặc gọi hotline{' '}
          <Link href="/lien-he" className="text-primary font-bold no-underline">
            1900 6868
          </Link>
        </p>
      </div>

      <SearchPopularChips />
    </div>
  );
}
