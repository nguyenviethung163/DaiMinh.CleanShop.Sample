'use client';

import { useMemo, useState } from 'react';
import { PRODUCTS } from '@/store/data';
import type { StoreProduct } from '@/store/components/product-card';
import { HomeBrands } from './home-brands';
import { HomeFeaturedProducts } from './home-featured-products';
import { HomeFeatures } from './home-features';
import { HomeFlashSale } from './home-flash-sale';
import { HomeHero } from './home-hero';
import { HomeNews } from './home-news';
import { HomePalettePreview } from './home-palette-preview';
import { HomePromoBanners } from './home-promo-banners';
import { HomeTestimonials } from './home-testimonials';

export function HomeView() {
  const [tab, setTab] = useState('Tất cả');
  const [brand, setBrand] = useState<string | null>(null);

  const products = useMemo(
    () =>
      (PRODUCTS as StoreProduct[]).filter(
        (p) => (tab === 'Tất cả' || p.cat === tab) && (!brand || p.brand === brand),
      ),
    [tab, brand],
  );

  return (
    <div>
      <HomeHero />
      <HomeFlashSale />
      <HomeBrands />
      <HomeFeaturedProducts
        tab={tab}
        brand={brand}
        products={products}
        onTabChange={setTab}
        onBrandChange={setBrand}
      />
      <HomeFeatures />
      <HomePalettePreview />
      <HomePromoBanners />
      <HomeTestimonials />
      <HomeNews />
    </div>
  );
}
