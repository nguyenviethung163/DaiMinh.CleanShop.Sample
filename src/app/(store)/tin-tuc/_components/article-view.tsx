import { ARTICLE_CATEGORY } from '../_lib/news-data';
import { StoreContainer } from '@/store/components/store-container';
import { ArticleBreadcrumb } from './article-breadcrumb';
import { ArticleContent } from './article-content';
import { ArticleCover } from './article-cover';
import { ArticleHeader } from './article-header';
import { ArticleRelatedSection } from './article-related-section';
import { ArticleSidebar } from './article-sidebar';
import { ArticleTocNav } from './article-toc-nav';

export function ArticleView() {
  return (
    <div>
      <section className="bg-white">
        <StoreContainer className="max-w-[1040px] pt-8">
          <ArticleBreadcrumb category={ARTICLE_CATEGORY} />
          <ArticleHeader />
        </StoreContainer>
        <ArticleCover />
      </section>

      <StoreContainer className="grid grid-cols-1 gap-8 py-12 sm:grid-cols-[220px_1fr] lg:grid-cols-[220px_1fr_260px] lg:gap-12">
        <ArticleTocNav />
        <ArticleContent />
        <ArticleSidebar />
      </StoreContainer>

      <ArticleRelatedSection />
    </div>
  );
}
