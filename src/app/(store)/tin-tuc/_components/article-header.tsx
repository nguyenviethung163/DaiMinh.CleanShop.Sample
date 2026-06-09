import { Clock } from 'lucide-react';
import { getStoreIcon } from '@/store/lib/store-icons';
import {
  ARTICLE_AUTHOR,
  ARTICLE_CATEGORY,
  ARTICLE_DATE,
  ARTICLE_DEK,
  ARTICLE_READ_TIME,
  ARTICLE_SHARE_ICONS,
  ARTICLE_TITLE,
} from '../_lib/news-data';
import { NewsCategoryBadge } from './news-category-badge';

export function ArticleHeader() {
  return (
    <header>
      <NewsCategoryBadge label={ARTICLE_CATEGORY.toUpperCase()} variant="navy" />
      <h1 className="text-secondary m-0 my-[18px] text-3xl leading-[1.08] font-extrabold tracking-[-0.025em] md:text-[42px]">
        {ARTICLE_TITLE}
      </h1>
      <p className="text-muted-foreground m-0 mb-[26px] max-w-[760px] text-lg leading-relaxed">
        {ARTICLE_DEK}
      </p>

      <div className="flex flex-wrap items-center gap-4 border border-b pb-[22px]">
        <div className="flex items-center gap-2">
          <div className="bg-muted text-secondary grid h-10 w-10 place-items-center rounded-full font-bold">
            {ARTICLE_AUTHOR.initials}
          </div>
          <div>
            <div className="text-foreground text-sm font-bold">{ARTICLE_AUTHOR.name}</div>
            <div className="text-muted-foreground text-xs">{ARTICLE_AUTHOR.role}</div>
          </div>
        </div>

        <span className="text-muted-foreground text-sm">
          <Clock
            className="mr-1 inline-block shrink-0 align-middle"
            size={13}
            strokeWidth={1.7}
            fill="none"
            aria-hidden="true"
          />
          {ARTICLE_DATE} · {ARTICLE_READ_TIME}
        </span>

        <div className="ml-auto flex gap-2">
          {ARTICLE_SHARE_ICONS.map((icon) => {
            const Icon = getStoreIcon(icon);
            return (
              <button
                key={icon}
                type="button"
                aria-label={icon}
                className="bg-muted text-secondary grid h-[34px] w-[34px] cursor-pointer place-items-center rounded-md"
              >
                <Icon className="shrink-0" size={15} strokeWidth={1.7} aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
