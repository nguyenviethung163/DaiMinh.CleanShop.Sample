import { ARTICLE_RELATED_ARTICLES } from '../_lib/news-data';
import { StoreSection, StoreSectionHead } from '@/store/components/store-section';
import { NewsArticleCard } from './news-article-card';

export function ArticleRelatedSection() {
  return (
    <StoreSection>
      <StoreSectionHead title="Bài viết liên quan" className="[&_h2]:text-[26px]" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ARTICLE_RELATED_ARTICLES.map((article) => (
          <NewsArticleCard key={article.id} article={article} variant="related" />
        ))}
      </div>
    </StoreSection>
  );
}
