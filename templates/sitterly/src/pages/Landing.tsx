import React from 'react';
import { Hero } from '../components/landing/Hero';
import { CareTypes } from '../components/landing/CareTypes';
import { HowItWorks } from '../components/landing/HowItWorks';
import { FeaturedSitters } from '../components/landing/FeaturedSitters';
import { SafetyBand } from '../components/landing/SafetyBand';
import { SitterCta } from '../components/landing/SitterCta';

export function Landing() {
  return (
    <>
      <Hero />
      <CareTypes />
      <HowItWorks />
      <FeaturedSitters />
      <SafetyBand />
      <div className="pt-16 lg:pt-24">
        <SitterCta />
      </div>
    </>);

}