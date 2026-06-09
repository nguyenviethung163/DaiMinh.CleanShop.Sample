import Link from 'next/link';
import { POPULAR_SEARCHES } from '../_lib/search-data';

export function SearchPopularChips() {
  return (
    <div className="rounded-xl border bg-white p-5 md:p-6">
      <div className="text-primary text-xs font-bold tracking-wide uppercase">Gợi ý tìm kiếm</div>
      <h2 className="text-secondary m-0 mt-2 text-lg font-extrabold">Từ khóa phổ biến</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {POPULAR_SEARCHES.map((term) => (
          <Link
            key={term}
            href={`/tim-kiem?q=${encodeURIComponent(term)}`}
            className="bg-muted text-muted-foreground hover:border-primary hover:bg-primary/10 hover:text-primary rounded-full border px-3.5 py-2 text-sm font-semibold no-underline"
          >
            {term}
          </Link>
        ))}
      </div>
    </div>
  );
}
