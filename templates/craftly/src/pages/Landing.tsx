import React from 'react';
import { HeroSection } from '../components/landing/HeroSection';
import { CategoryTiles } from '../components/landing/CategoryTiles';
import { NewFromMakers } from '../components/landing/NewFromMakers';
import { MakerSpotlight } from '../components/landing/MakerSpotlight';
import { GiftGuides } from '../components/landing/GiftGuides';
import { MakerCta } from '../components/landing/MakerCta';

export function Landing() {
  return (
    <>
      <HeroSection />
      <CategoryTiles />
      <NewFromMakers />
      <MakerSpotlight />
      <div className="h-16" />
      <GiftGuides />
      <MakerCta />
    </>);

}