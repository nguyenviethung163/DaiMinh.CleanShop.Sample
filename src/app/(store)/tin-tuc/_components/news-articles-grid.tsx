import { NEWS_ARTICLES } from '../_lib/news-data';
import { StoreSectionHead } from '@/store/components/store-section';
import { NewsArticleCard } from './news-article-card';

export function NewsArticlesGrid() {
  return (
    <div>
      <StoreSectionHead title="Bài viết mới nhất" className="[&_h2]:text-[22px]" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {NEWS_ARTICLES.slice(1).map((article) => (
          <NewsArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
