'use client';

import { useState } from 'react';
import type { NewsCategoryName } from '../_lib/news-data';
import { StoreContainer } from '@/store/components/store-container';
import { NewsArticlesGrid } from './news-articles-grid';
import { NewsCategoryToolbar } from './news-category-toolbar';
import { NewsFeaturedSection } from './news-featured-section';
import { NewsPagination } from './news-pagination';
import { NewsPopularWidget } from './news-popular-widget';
import { NewsSidebarNewsletter } from './news-sidebar-newsletter';

export function NewsView() {
  const [category, setCategory] = useState<NewsCategoryName>('Tất cả');

  return (
    <div>
      <NewsFeaturedSection />
      <NewsCategoryToolbar category={category} onCategoryChange={setCategory} />

      <StoreContainer className="py-8 md:py-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <NewsArticlesGrid />
            <NewsPagination />
          </div>

          <aside className="flex flex-col gap-6">
            <NewsPopularWidget />
            <NewsSidebarNewsletter />
          </aside>
        </div>
      </StoreContainer>
    </div>
  );
}
