import { Flame } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NEWS_POPULAR } from '../_lib/news-data';

export function NewsPopularWidget() {
  return (
    <div className="rounded-[10px] border bg-white p-5">
      <div className="text-secondary mb-3 inline-flex items-center gap-2 text-base font-extrabold">
        <Flame
          className="text-primary shrink-0"
          size={15}
          strokeWidth={1.7}
          fill="none"
          aria-hidden="true"
        />
        Xem nhiều nhất tuần
      </div>
      {NEWS_POPULAR.map((article, index) => (
        <div
          key={article.id}
          className={cn(
            'grid cursor-pointer grid-cols-[34px_1fr] gap-3',
            index < NEWS_POPULAR.length - 1 && 'mb-3 border border-b pb-3',
          )}
        >
          <div
            className={cn(
              'text-2xl leading-none font-black italic',
              index < 3 ? 'text-primary' : 'text-border',
            )}
          >
            0{index + 1}
          </div>
          <div className="text-foreground line-clamp-2 text-sm leading-snug font-semibold">
            {article.title}
          </div>
        </div>
      ))}
    </div>
  );
}
