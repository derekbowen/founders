import React from 'react';
import { BenefitsBand } from '../components/landing/BenefitsBand';
import { BrandCta } from '../components/landing/BrandCta';
import { CategoryGrid } from '../components/landing/CategoryGrid';
import { FeaturedProducts } from '../components/landing/FeaturedProducts';
import { Hero } from '../components/landing/Hero';
import { TrendingBrands } from '../components/landing/TrendingBrands';

export function Landing() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <TrendingBrands />
      <BenefitsBand />
      <FeaturedProducts />
      <BrandCta />
    </>);

}